import { promises as fs } from 'node:fs'
import path from 'node:path'
import { readMultipartFormData, createError } from 'h3'

const ALLOWED_MIME: Record<string, string> = {
  'image/jpeg': '.jpeg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/avif': '.avif',
}

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  const file = form?.find((part) => part.name === 'file' && part.data?.length)
  if (!file) throw createError({ statusCode: 400, statusMessage: 'file field is required' })

  const ext = ALLOWED_MIME[file.type || '']
  if (!ext) {
    throw createError({ statusCode: 415, statusMessage: `Unsupported image type: ${file.type}` })
  }

  const publicDir = path.resolve(process.cwd(), 'src/public/images/studio')
  await fs.mkdir(publicDir, { recursive: true })

  const base = (file.filename || 'image').replace(/\.[^.]+$/, '').replace(/[^\w.-]+/g, '-')
  const name = `${base}${ext}`
  await fs.writeFile(path.join(publicDir, name), file.data)

  return { path: `/images/studio/${name}` }
})

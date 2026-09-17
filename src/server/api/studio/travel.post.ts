import { readBody, createError } from 'h3'
import { listTravelFiles, writeTravelFile, type TravelFootprint } from '../../utils/travelStore'

function toSlug(name: string): string {
  const ascii = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  if (ascii) return ascii
  return `footprint-${Date.now().toString(36)}`
}

export default defineEventHandler(async (event) => {
  const body = await readBody<TravelFootprint>(event)
  if (!body?.name || typeof body.lat !== 'number' || typeof body.lng !== 'number') {
    throw createError({ statusCode: 400, statusMessage: 'name, lat, lng are required' })
  }

  const existing = await listTravelFiles()
  let rel = existing.find((f) => f.name === body.name)?._file
  if (!rel) {
    const used = new Set(existing.map((f) => f._file))
    let slug = toSlug(body.name)
    if (!slug) slug = `footprint-${Date.now().toString(36)}`
    rel = `${slug}.yaml`
    let i = 2
    while (used.has(rel)) {
      rel = `${slug}-${i}.yaml`
      i += 1
    }
  }

  await writeTravelFile(rel, body)
  return { file: rel, footprint: { ...body, _file: rel } }
})

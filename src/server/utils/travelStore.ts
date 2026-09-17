import { promises as fs } from 'node:fs'
import path from 'node:path'

export interface TravelFootprint {
  name: string
  lat: number
  lng: number
  date?: string
  description?: string
  categories?: string[]
  color?: string
  image?: string | string[]
  url?: string
  urlLabel?: string
}

export interface TravelFootprintFile extends TravelFootprint {
  _file: string
}

const TRAVEL_DIR = path.resolve(process.cwd(), 'content/travel')

export async function ensureTravelDir() {
  await fs.mkdir(TRAVEL_DIR, { recursive: true })
}

export async function listTravelFiles(): Promise<TravelFootprintFile[]> {
  await ensureTravelDir()
  const files = await walkYaml(TRAVEL_DIR)
  const result: TravelFootprintFile[] = []
  for (const file of files) {
    const raw = await fs.readFile(file, 'utf-8')
    const data = (await parseYaml(raw)) as Partial<TravelFootprint>
    const rel = path.relative(TRAVEL_DIR, file).split(path.sep).join('/')
    result.push({ ...(data as TravelFootprint), _file: rel })
  }
  return result
}

async function walkYaml(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walkYaml(full)))
    } else if (entry.isFile() && entry.name.endsWith('.yaml')) {
      files.push(full)
    }
  }
  return files
}

export async function readTravelFile(rel: string): Promise<{ raw: string; data: Partial<TravelFootprint> }> {
  const full = resolveTravelFile(rel)
  const raw = await fs.readFile(full, 'utf-8')
  const data = (await parseYaml(raw)) as Partial<TravelFootprint>
  return { raw, data }
}

export async function writeTravelFile(rel: string, footprint: TravelFootprint) {
  const full = resolveTravelFile(rel)
  await fs.mkdir(path.dirname(full), { recursive: true })
  const yaml = serializeFootprintYaml(footprint)
  await fs.writeFile(full, yaml, 'utf-8')
}

export async function deleteTravelFile(rel: string) {
  const full = resolveTravelFile(rel)
  await fs.unlink(full)
}

function resolveTravelFile(rel: string): string {
  const clean = rel.replace(/^[/\\]+/, '')
  const full = path.resolve(TRAVEL_DIR, clean)
  if (full !== TRAVEL_DIR && !full.startsWith(TRAVEL_DIR + path.sep)) {
    throw new Error('Invalid file path')
  }
  return full
}

async function parseYaml(raw: string): Promise<unknown> {
  const { parse } = await import('yaml')
  return parse(raw)
}

export function serializeFootprintYaml(fp: TravelFootprint): string {
  const lines: string[] = []
  const push = (k: string, v: string) => lines.push(`${k}: ${v}`)
  const isEmpty = (v?: string) => v == null || v === ''

  push('name', quoteIfNeeded(fp.name))
  push('lat', String(fp.lat))
  push('lng', String(fp.lng))
  if (!isEmpty(fp.date)) push('date', quoteIfNeeded(fp.date!))
  if (!isEmpty(fp.description)) push('description', quoteIfNeeded(fp.description!))
  if (fp.categories?.length) {
    lines.push('categories:')
    for (const c of fp.categories) lines.push(`  - ${quoteIfNeeded(c)}`)
  }
  if (!isEmpty(fp.color)) push('color', quoteIfNeeded(fp.color!))

  const images = Array.isArray(fp.image) ? fp.image.filter(Boolean) : fp.image ? [fp.image] : []
  if (images.length === 1) {
    push('image', quoteIfNeeded(images[0]))
  } else if (images.length > 1) {
    lines.push('image:')
    for (const img of images) lines.push(`  - ${quoteIfNeeded(img)}`)
  }

  if (!isEmpty(fp.url)) push('url', quoteIfNeeded(fp.url!))
  if (!isEmpty(fp.urlLabel)) push('urlLabel', quoteIfNeeded(fp.urlLabel!))
  return lines.join('\n') + '\n'
}

function quoteIfNeeded(value: string): string {
  if (/[:#\[\]{}"'\\]/.test(value) || value !== value.trim()) {
    return JSON.stringify(value)
  }
  return value
}

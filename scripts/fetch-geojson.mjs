#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = resolve(__dirname, '..')

// 尝试从 .env 加载环境变量（Node 20+）
if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile(resolve(rootDir, '.env'))
  } catch {
    // 没有 .env 或加载失败时忽略
  }
}

const token = process.env.GITHUB_TOKEN

if (!token) {
  console.warn('[fetch-geojson] 未设置 GITHUB_TOKEN，跳过拉取')
  process.exit(0)
}

const owner = 'aiokr'
const repo = 'TriTools'
const path = 'GeoJson/running.geojson'
const ref = 'main'

function parseLfsPointer(text) {
  const oidMatch = text.match(/^oid sha256:([a-f0-9]+)$/m)
  const sizeMatch = text.match(/^size (\d+)$/m)
  if (!oidMatch || !sizeMatch) return null
  return { oid: oidMatch[1], size: Number(sizeMatch[1]) }
}

async function fetchGitHubRaw() {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${ref}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.raw+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'TriPress-Nuxt',
    },
  })

  if (!res.ok) {
    throw new Error(
      `[fetch-geojson] GitHub API 请求失败 ${res.status}: ${await res.text()}`,
    )
  }

  return res.text()
}

async function fetchLfsFile(pointer) {
  const batchUrl = `https://github.com/${owner}/${repo}.git/info/lfs/objects/batch`
  const auth = Buffer.from(`x-access-token:${token}`).toString('base64')

  const batchRes = await fetch(batchUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: 'application/vnd.git-lfs+json',
      'Content-Type': 'application/vnd.git-lfs+json',
    },
    body: JSON.stringify({
      operation: 'download',
      transfer: ['basic'],
      objects: [{ oid: pointer.oid, size: pointer.size }],
    }),
  })

  if (!batchRes.ok) {
    throw new Error(
      `[fetch-geojson] Git LFS batch 请求失败 ${batchRes.status}: ${await batchRes.text()}`,
    )
  }

  const batchData = await batchRes.json()
  const object = batchData.objects?.[0]

  if (!object) {
    throw new Error('[fetch-geojson] Git LFS batch 返回为空')
  }
  if (object.error) {
    throw new Error(
      `[fetch-geojson] Git LFS 对象错误 ${object.error.code}: ${object.error.message}`,
    )
  }

  const download = object.actions?.download
  if (!download?.href) {
    throw new Error('[fetch-geojson] Git LFS 未返回下载链接')
  }

  const fileRes = await fetch(download.href, {
    headers: download.header ?? {},
  })

  if (!fileRes.ok) {
    throw new Error(
      `[fetch-geojson] Git LFS 文件下载失败 ${fileRes.status}: ${await fileRes.text()}`,
    )
  }

  return fileRes.text()
}

async function main() {
  const raw = await fetchGitHubRaw()
  const pointer = parseLfsPointer(raw)
  const content = pointer ? await fetchLfsFile(pointer) : raw

  const out = resolve(rootDir, 'content', 'heatmap', 'running.geojson')
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, content, 'utf-8')

  console.log('[fetch-geojson] 已写入', out)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

#!/usr/bin/env node
import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = resolve(__dirname, '..')

const srcDir = resolve(rootDir, 'src', 'public', 'fonts')
const outDir = resolve(rootDir, 'public', 'fonts')

async function mirror(src, dest) {
  const srcStat = await stat(src).catch(() => null)
  if (!srcStat?.isDirectory()) {
    console.warn('[copy-fonts] 源字体目录不存在，跳过复制:', src)
    return
  }

  await mkdir(dest, { recursive: true })

  const srcFiles = await readdir(src)
  const destFiles = await readdir(dest).catch(() => [])

  for (const file of srcFiles) {
    const from = resolve(src, file)
    const to = resolve(dest, file)
    const fileStat = await stat(from).catch(() => null)
    if (!fileStat?.isFile()) continue
    await cp(from, to, { preserveTimestamps: true, force: true })
    console.log('[copy-fonts] 已复制', file)
  }

  for (const file of destFiles) {
    if (!srcFiles.includes(file)) {
      await rm(resolve(dest, file), { force: true })
      console.log('[copy-fonts] 已删除过期文件', file)
    }
  }
}

async function main() {
  await mirror(srcDir, outDir)
  console.log('[copy-fonts] 字体同步完成')
}

main().catch((err) => {
  console.error('[copy-fonts] 同步失败:', err)
  process.exit(1)
})

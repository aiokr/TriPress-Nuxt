#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = resolve(__dirname, '..')

function run(script) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn('node', [script], {
      cwd: rootDir,
      stdio: 'inherit',
    })
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`脚本退出码 ${code}: ${script}`))
      } else {
        resolvePromise()
      }
    })
  })
}

async function main() {
  await run(resolve(rootDir, 'scripts', 'fetch-geojson.mjs'))
  await run(resolve(rootDir, 'scripts', 'copy-fonts.mjs'))
}

main().catch((err) => {
  console.error('[prebuild] 失败:', err)
  process.exit(1)
})

import { execSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

function getIsDevBranch(): boolean {
  try {
    const vercelBranch = process.env.VERCEL_GIT_COMMIT_REF
    if (vercelBranch) {
      return vercelBranch === 'dev'
    }
    const localBranch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim()
    return localBranch === 'dev'
  } catch {
    return false
  }
}

function findContentImageDirs(dir: string, root: string): Array<{ baseURL: string; dir: string }> {
  const result: Array<{ baseURL: string; dir: string }> = []
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      // 只把名为 images 的子目录作为公共资源发布，避免与文章页面路由冲突
      if (entry.name === 'images' && hasImageFile(fullPath)) {
        const baseURL = `/${relative(root, fullPath).replace(/\\/g, '/')}/`
        result.push({ baseURL, dir: fullPath })
      }
      result.push(...findContentImageDirs(fullPath, root))
    }
  }
  return result
}

function hasImageFile(dir: string): boolean {
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (hasImageFile(fullPath)) return true
    } else if (/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(entry.name)) {
      return true
    }
  }
  return false
}

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/seo",
    "@nuxt/image",
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
  ],

  srcDir: 'src/',

  runtimeConfig: {
    public: {
      mapboxToken: '',
      isDevBranch: getIsDevBranch()
    }
  },

  imports: {
    dirs: ['./stores']
  },

  components: [
    {
      path: '~/components/',
      pathPrefix: true,
    },
    {
      path: '~/components/content/',
      pathPrefix: true,
    },
    {
      path: '~/components/travel/',
      pathPrefix: true,
    }
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'en' },
    }
  },

  site: {
    url: 'https://tripper.press',
    name: 'Tripper Press - Take Photo, Think Seriously.',
    description: 'Take Photo, Think Seriously.',
  },

  sitemap: {
    sources: [
      '/api/postmap'
    ]
  },

  content: {
    build: {
      transformers: [
        '~~/transformers/geojson',
      ],
      markdown: {
        toc: {
          depth: 4,
          searchDepth: 4
        },
      },
    },
    renderer: {
      anchorLinks: false
    }
  },

  image: {
    dir: '../content'
  },

  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: '',
  },

  nitro: {
    prerender: {
      routes: ['/', '/atom.xml'],
      crawlLinks: true
    },
    experimental: {
      wasm: false
    },
    rollupConfig: {
      external: ['@resvg/resvg-wasm', '@resvg/resvg-wasm/index_bg.wasm']
    }
  },

  hooks: {
    async 'nitro:config'(nitroConfig) {
      const contentDir = fileURLToPath(new URL('content', import.meta.url))
      for (const asset of findContentImageDirs(contentDir, contentDir)) {
        nitroConfig.publicAssets ??= []
        nitroConfig.publicAssets.push({
          baseURL: asset.baseURL,
          dir: asset.dir,
          maxAge: 60 * 60 * 24 * 7
        })
      }
    }
  },

  ogImage: {
    defaults: {
      width: 1200,
      height: 630,
    }
  },

  ssr: true,

  compatibilityDate: '2024-07-05'
})
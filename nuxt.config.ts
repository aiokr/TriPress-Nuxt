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
    'nuxt-studio'
  ],

  srcDir: 'src/',

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

  ogImage: {
    defaults: {
      width: 1200,
      height: 630,
    }
  },

  ssr: true,

  studio: {
    dev: true,
    repository: {
      provider: 'github',
      owner: 'aiokr',
      repo: 'TriPress-Nuxt',
      branch: 'studio',
    },
    i18n: {
      defaultLocale: 'zh',
    }
  },

  compatibilityDate: '2024-07-05'
})
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/seo",
    "@nuxt/image",
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
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
      routes: ['/', '/atom.xml']
    }
  },

  ssr: true,

  compatibilityDate: '2024-07-05'
})
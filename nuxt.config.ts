// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    "@nuxt/content",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/turnstile",
    "@vueuse/motion/nuxt",
    "@nuxtjs/seo",
    "@nuxtjs/sitemap",
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
  ogImage: { enabled: false },
  sitemap: {
    sources: [
      '/api/postmap'
    ]
  },
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
    },
    markdown: {
      anchorLinks: false,
    }
  },
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: '',
  },
  turnstile: {
    siteKey: '0x4AAAAAAAcv6femMitqO6lO',
  },
  nitro: {
    prerender: {
      routes: ["/atom.xml", "/sitemap.xml", "/api/postmap"],
    },
  },
  runtimeConfig: {
    turnstile: {
      secretKey: '',
    },
  }
})
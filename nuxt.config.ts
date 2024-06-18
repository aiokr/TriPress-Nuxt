// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', "@nuxt/content", "@pinia/nuxt", "@nuxtjs/color-mode", "@nuxtjs/turnstile"],
  srcDir: 'src/',
  imports: {
    dirs: ['./stores']
  },
  components: [
    {
      path: '~/components/',
      pathPrefix: true,
    },
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
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
  runtimeConfig: {
    turnstile: {
      secretKey: '',
    },
  }
})
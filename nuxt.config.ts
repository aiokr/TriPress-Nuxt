// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', "@nuxt/content", "@pinia/nuxt", "@nuxtjs/color-mode"],
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
  content: {
  },
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: '',
  }
})


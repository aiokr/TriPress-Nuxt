// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', "@nuxt/content", "@pinia/nuxt"],
  components: [
    {
      path: '~/components/',
      pathPrefix: true,
    },
  ],
  content: {
  },
  srcDir: 'src/'
})


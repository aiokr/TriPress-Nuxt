// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: [
    {
      path: '~/components/',
      pathPrefix: true,
    },
  ],
  srcDir: 'src/'
})

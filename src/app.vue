<template>
  <NuxtLayout>
    <NuxtPage />
    <KMenu />
  </NuxtLayout>
</template>

<script setup lang="ts">
import '@/assets/article.css'

useHead({
  title: 'Tripper Press - Take Photo, Think Seriously',
  meta: [
    { name: 'description', content: 'Take Photo, Think Seriously' }
  ],
  script: [
    { src: 'https://cloud.umami.is/script.js', 'data-website-id': '73046b43-aca0-475b-825e-39ad1a7400ce' }
  ]
})
useSeoMeta({
  title: 'Tripper Press - Take Photo, Think Seriously',
  ogTitle: 'Tripper Press - Take Photo, Think Seriously',
  description: 'Take Photo, Think Seriousl',
  ogDescription: 'Take Photo, Think Seriousl'
})

</script>


<style>
body {
  color: #222831;
}

.dark body {
  background: #18181B;
  color: #E2E2E2;
}
</style>
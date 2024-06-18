<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import '@/assets/article.css'

useHead({
  title: 'Tripper Press - Take Photo, Think Seriously',
  meta: [
    { name: 'description', content: 'Take Photo, Think Seriousl' }
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
  background: #f8fafc;
  color: #222831;
}

.dark body {
  background: #18181B;
  color: #E2E2E2;
}

</style>
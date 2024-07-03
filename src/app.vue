<template>
  <NuxtLayout>
    <NuxtPage />
    <KMenu />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import '@/assets/article.css'
import '@/assets/tripper.css'

useHead({
  title: 'Tripper Press - Take Photo, Think Seriously',
  meta: [
    { name: 'description', content: 'Take Photo, Think Seriously' }
  ],
  link: [
    { type: 'application/atom+xml', rel: 'alternate', title: 'Tripper Press Atom Feed', href: '/atom.xml' },
  ],
  script: [
    { src: 'https://analytics.tripper.press/script.js', 'data-website-id': '75e35015-2599-4413-a688-da55060b9599' },
  ],
})
useSeoMeta({
  title: 'Tripper Press - Take Photo, Think Seriously',
  ogTitle: 'Tripper Press - Take Photo, Think Seriously',
  description: 'Take Photo, Think Seriousl',
  ogDescription: 'Take Photo, Think Seriousl'
})

onMounted(() => {
  const script = document.createElement('script')
  script.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-NFSZVFRX');`
  document.head.appendChild(script)
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
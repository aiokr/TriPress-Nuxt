<template>
  <NuxtLayout>
    <NuxtPage />
    <KMenu />
  </NuxtLayout>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NFSZVFRX" height="0" width="0"
      style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
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
  script: [
    { src: 'https://cloud.umami.is/script.js', 'data-website-id': '73046b43-aca0-475b-825e-39ad1a7400ce' },

  ]
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
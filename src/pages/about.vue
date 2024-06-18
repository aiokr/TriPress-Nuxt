<template>
  <main class="container mx-auto pt-36">
    <article class="container max-w-[800px] mx-auto">
      <ContentDoc>
        <template v-slot="{ doc }">
          <ContentRenderer :value="doc" />
        </template>
      </ContentDoc>
    </article>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: '关于 - Tripper Press',
  meta: [
    { name: 'description', content: 'Take Photo, Think Seriousl' }
  ]
})

useSeoMeta({
  title: '关于 - Tripper Press',
  ogTitle: '关于 - Tripper Press',
  description: 'Take Photo, Think Seriousl',
  ogDescription: 'Take Photo, Think Seriousl'
})

</script>
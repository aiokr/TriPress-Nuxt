<template>
  <ContentDoc>
    <template v-slot="{ doc }">
      <article class="md:pt-36 pb-36 container max-w-[1000px] mx-auto">
        <div class="md:rounded-xl bg-white dark:bg-zinc-800">
          <!--Post Cover-->
          <div>
            <img :src="doc.cover" alt="cover" class="w-full h-[360px] object-cover md:rounded-xl" />
          </div>
          <div class="container max-w-[800px] px-4 mx-auto pb-12">
            <h1 class="pt-12 py-8 text-2xl text-text dark:text-dtext">{{ doc.title }}</h1>
            <ContentRenderer :value="doc" />
          </div>
        </div>
      </article>
    </template>
    <template #not-found>
      <h1>Document not found</h1>
    </template>
  </ContentDoc>
</template>

<script setup lang="ts">

useHead({
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

</style>
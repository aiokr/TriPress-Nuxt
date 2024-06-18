<template>
  <main class="container mx-auto">
    <section class="h-[80vh] w-full mt-[10vh] flex justify-center items-center">
      <div class="">
        <div class="text-4xl font-bold p-2">你好，我是</div>
        <div class="text-8xl font-bold marked p-2">aiokr</div>
      </div>
    </section>
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

<style scoped>
.marked {
  background: linear-gradient(104deg, #71afdd00 0.9%, #71afdd7c 2.4%, #71afdd4d 5.8%, #71afdd1a 93%, #71afdd23 96%, #82ffff00 98%), linear-gradient(183deg, #71afdd00 0%, #71afdd3b 7.9%, #71afdd00 15%);
  border-radius: 16px;
}
</style>
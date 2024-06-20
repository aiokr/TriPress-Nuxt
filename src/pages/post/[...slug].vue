<template>
  <ContentDoc>
    <template v-slot="{ doc }">
      <article class="md:pt-24 pb-[1000px] container max-w-[1000px] mx-auto">
        <div class="md:rounded-xl bg-white dark:bg-zinc-800">
          <!--Post Cover-->
          <div class="w-full object-cover md:rounded-t-xl bg-center bg-cover"
            :style="'background-image: url(' + doc.cover + ');'">
            <div class="bg-gradient-to-t from-white to-white/60 dark:from-zinc-800 dark:to-zinc-800/40">
              <div class="pt-16 md:pt-32 pb-24 px-4 container max-w-[800px] mx-auto ">
                <h1 class="text-3xl font-semibold text-text dark:text-dtext">{{ doc.title }}</h1>
              </div>
            </div>
          </div>
          <div class="container max-w-[800px] px-4 mx-auto pb-12">
            <ContentRenderer :value="doc" />
          </div>
          <div class="progress">
            <div class="progressBar" />
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

const url = useRoute().path
const post = await useAsyncData('post', () => queryContent(url).findOne())
// console.log(post.data.value)
const postCover = post.data.value?.cover

useHead({
  meta: [
    { name: 'description', content: 'Take Photo, Think Seriously' }
  ]
})

useSeoMeta({
  title: 'Tripper Press',
  ogTitle: 'Tripper Press',
  twitterTitle: 'Tripper Press',
  description: 'Take Photo, Think Seriously',
  ogDescription: 'Take Photo, Think Seriously',
  twitterDescription: 'Take Photo, Think Seriously',
  ogImage: postCover,
  twitterImage: postCover,
})

</script>

<style scoped>
@keyframes progress-appear {
  0% {
    height: 0px;
  }

  10% {
    height: 12px;
  }

  100% {
    height: 12px;
  }
}

@keyframes progress {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

.progress {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #22283130;
  animation: progress-appear auto forwards, progress auto 1s forwards;
  animation-timeline: view(0% 100%), view(0% 100%);
  animation-range:
    entry 10% contain 25%, 0 calc(100% - 200vh), ;
}
</style>
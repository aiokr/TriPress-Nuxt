<template>
  <ContentDoc>
    <template v-slot="{ doc }">
      <div class="pb-36 relative">
        <div class="bg-white dark:bg-zinc-800">
          <!--Post Header w/ Cover-->
          <div v-if="doc.cover" class="postCard w-full object-cover bg-center bg-cover"
            :style="'background-image: url(' + doc.cover + ');'">
            <div class="bg-gradient-to-t from-white to-white/60 dark:from-zinc-800 dark:to-zinc-800/40">
              <div class="pt-32 pb-24 px-4 container max-w-[800px] mx-auto ">
                <h1 class="text-3xl font-semibold text-text dark:text-dtext">{{ doc.title }}</h1>
              </div>
            </div>
          </div>
          <!--Post Header w/o Cover-->
          <div v-else class="pt-16 md:pt-20 pb-20 px-4 container max-w-[800px] mx-auto">
            <h1 class="text-3xl font-semibold text-text dark:text-dtext">{{ doc.title }}</h1>
          </div>
          <!--Post Content-->
          <article class="container max-w-[800px] px-4 mx-auto pb-12">
            <ContentRenderer :value="doc" />
          </article>
        </div>
        <!--Table of Content-->
        <div class="hidden md:block text-xs leading-7">
          <div v-if="toc && toc.links" class="toc group/toc fixed max-w-96 ml-3 top-[120px] mt-12">
            <ul class="list-none">
              <li v-for="link in toc.links" :key="link.text">
                <a :href="'#' + link.id" class="flex flex-row items-center h-8 group/title">
                  <i class="block h-1 w-4 my-3 mr-2 rounded-full bg-zinc-200 group-hover/toc:bg-zinc-400"></i>
                  <div
                    class="truncate opacity-0 group-hover/toc:opacity-60 group-hover/title:opacity-80 transition-all w-28">
                    {{ link.text }}</div>
                </a>
                <ul v-if="link.children" class="list-none">
                  <a :href="'#' + sublink.id" v-for="sublink in link.children" :key="sublink.text"
                    class="flex flex-row items-center h-8 group/title">
                    <i class="block h-1 w-3 rounded-full bg-zinc-200 group-hover/toc:bg-zinc-400 my-3 mr-2"></i>
                    <div
                      class="pl-2 truncate opacity-0 group-hover/toc:opacity-60 group-hover/title:opacity-80 transition-all w-14">
                      {{ sublink.text }}</div>
                  </a>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <template #not-found>
      <h1>Document not found</h1>
    </template>
  </ContentDoc>
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'post'
})

const url = useRoute().path
const post = await useAsyncData('post', () => queryContent(url).findOne())
// console.log(post.data.value)
const postCover = post.data.value?.cover
const toc = post.data.value?.body?.toc

useHead({
  meta: [
    { name: 'description', content: 'Take Photo, Think Seriously' }
  ]
})

useSeoMeta({
  title: post.data.value?.title + ' | Tripper Press',
  ogTitle: post.data.value?.title + ' | Tripper Press',
  twitterTitle: post.data.value?.title + ' | Tripper Press',
  description: post.data.value?.description || 'Post at Tripper Press',
  ogDescription: post.data.value?.description || 'Post at Tripper Press',
  twitterDescription: post.data.value?.description || 'Post at Tripper Press',
  ogImage: postCover,
  twitterImage: postCover,
})

</script>

<style scoped>
.toc {
  opacity: .8;
  max-height: calc(100vh - 460px);
  overflow-y: scroll;
  scrollbar-width: none;
  transform: translateY(260px);
}

.toc .ul,
.toc .li {
  list-style-type: none !important;
  display: block;
}

@keyframes progress-bar {
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
  height: 6px;
  background-color: #71afdd;
  transform: scaleX(0);
  /* 初始状态要在 CSS 中写出来，否则当动画还没开始的时候，元素直接是结束状态 */
  transform-origin: left;

  animation: progress-bar 1s linear;
  animation-timeline: --post-progress;
  view-timeline: --post-progress;
  animation-range-start: cover 100vh;
  /* 这里的 cover 其实可以省略 */
  animation-range-end: exit-crossing -100vh;

  /* 
    滚动动画的值具体可以参照：https://scroll-driven-animations.style/tools/view-timeline/ranges/
  */
}
</style>
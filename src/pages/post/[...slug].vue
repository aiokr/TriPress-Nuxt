<template v-slot="{ doc }">
  <div class="pb-36 -mt-[72px] relative">
    <div class="">
      <!--Post Header w/ Cover-->
      <div v-if="post?.cover" class="postCard w-full object-cover bg-center bg-cover"
        :style="'background-image: url(' + post?.cover + ');'">
        <div class="bg-gradient-to-t from-white to-white/60 dark:from-zinc-800 dark:to-zinc-800/40">
          <div class="pt-48 pb-24 px-4 container max-w-[800px] mx-auto ">
            <h1 class="text-3xl font-semibold text-text dark:text-dtext">{{ post?.title }}</h1>
          </div>
        </div>
      </div>
      <!--Post Header w/o Cover-->
      <div v-else class="pt-16 md:pt-44 pb-20 px-4 container max-w-[800px] mx-auto">
        <h1 class="text-3xl font-semibold text-text dark:text-dtext">{{ post?.title }}</h1>
      </div>
      <div v-if="post.type === 'rc'" class="container max-w-[800px] px-4 mx-auto py-4 border border-red-400 dark:border-red-700 rounded-lg bg-red-100 dark:bg-red-900">
        This article is a Pre-release version, and its content may be updated at any time.
      </div>
      <!--Post Content-->
      <article class="container max-w-[800px] px-4 mx-auto pb-12">
        <template v-if="post">
          <ContentRenderer :value="post" />
        </template>
        <template v-else>
          <div class="empty-page">
            <p>{{ route.path }}</p>
            <h1>Page Not Found</h1>
            <p>Oops! The content you're looking for doesn't exist.</p>
            <NuxtLink to="/">Go back home</NuxtLink>
          </div>
        </template>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection('post').path(route.path).first()
})

// console.log(post.value)

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
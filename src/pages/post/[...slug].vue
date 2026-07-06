<template v-slot="{ doc }">
  <div class="pb-36 -mt-[72px] relative">
    <div class="">
      <!--Post Header w/ Cover-->
      <div v-if="post?.cover" class="postCard w-full object-cover bg-center bg-cover"
        :style="'background-image: url(' + post?.cover + ');'">
        <div class="bg-gradient-to-t from-white to-white/60 dark:from-dbg dark:to-zinc-800/40">
          <div class="pt-48 pb-24 px-4 container max-w-[800px] mx-auto ">
            <div class="text-xs text-zinc-400 dark:text-dtext/80 pb-2">
              <span v-if="post.date">{{ new Date(post.date).toISOString().split('T')[0] }}</span>
              <span v-if="post.category" class="mx-2">·</span>
              <span v-if="post.category">{{ post.category }}</span>
            </div>
            <div>
              <h1 class="text-3xl font-semibold text-text dark:text-dtext">{{ post?.title }}</h1>
              <LangSwitcher v-if="post" :path="post.path" :has-alt="Boolean(altExists)" />
            </div>
          </div>
        </div>
      </div>
      <!--Post Header w/o Cover-->
      <div v-else class="pt-40 md:pt-44 pb-16 md:pb-24 px-4 container max-w-[800px] mx-auto">
        <div v-if="post" class="text-xs text-zinc-400 dark:text-dtext/80 pb-2">
          <span v-if="post.date">{{ new Date(post.date).toISOString().split('T')[0] }}</span>
          <span v-if="post.category" class="mx-2">·</span>
          <span v-if="post.category">{{ post.category }}</span>
        </div>
        <div>
          <h1 class="text-3xl font-semibold text-text dark:text-dtext">{{ post?.title }}</h1>
          <LangSwitcher v-if="post" :path="post.path" :has-alt="Boolean(altExists)" />
        </div>
      </div>
      <div v-if="post?.type === 'rc'"
        class="container max-w-[800px] px-4 mx-auto py-4 border border-red-400 dark:border-red-700 rounded-lg bg-red-100 dark:bg-red-900">
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
    <!-- 浮动目录栏 (桌面/平板可见) -->
    <ArticleToc
      v-if="post?.body?.toc?.links?.length"
      :links="post.body.toc.links"
    />
  </div>
</template>

<script setup lang="ts">
import { getOtherLangPath, normalizePath, detectLangFromPath } from '~/utils/content'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection('post').path(route.path).first()
})

// 检测是否存在另一语言版本，输出 hreflang SEO 标签
const candidatePath = computed(() => post.value ? getOtherLangPath(normalizePath(post.value.path)) : '')
const { data: altExists } = await useAsyncData(
  `post-alt:${route.path}`,
  () => queryCollection('post').path(candidatePath.value).first().then(r => Boolean(r)),
  { watch: [candidatePath] },
)

if (post.value) {
  const currentLang = detectLangFromPath(post.value.path)
  const baseUrl = 'https://tripper.press'

  const links: Array<{ rel: string; hreflang: string; href: string }> = [
    { rel: 'canonical', hreflang: currentLang, href: `${baseUrl}${post.value.path}` },
  ]
  if (altExists.value) {
    const altLang = currentLang === 'en' ? 'zh' : 'en'
    links.push({ rel: 'alternate', hreflang: altLang, href: `${baseUrl}${candidatePath.value}` })
  }
  useHead({
    // 覆盖 @nuxtjs/seo 默认的 "%s | Tripper Press - Take Photo, Think Seriously."
    titleTemplate: '%s - Tripper Press',
    htmlAttrs: { lang: currentLang },
    link: links as any,
  })
  useSeoMeta({
    title: post.value.title,
    ogTitle: post.value.title,
    description: post.value.description || post.value.excerpt || 'Take Photo, Think Seriously',
    ogDescription: post.value.description || post.value.excerpt || 'Take Photo, Think Seriously',
  })

  // 为博客文章生成 OG Image（暗色模式 + 顶部渐变条）
  defineOgImage({
    component: 'OgImagePost',
    props: {
      title: post.value.title,
      description: post.value.description || post.value.excerpt || '',
      category: post.value.category,
      date: post.value.date,
      lang: currentLang,
    },
  })
} else {
  useHead({
    titleTemplate: '%s - Tripper Press',
    title: 'Page Not Found',
  })
  useSeoMeta({
    title: 'Page Not Found',
    ogTitle: 'Page Not Found',
  })
}

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
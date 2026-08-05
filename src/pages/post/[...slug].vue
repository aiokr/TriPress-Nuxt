<template>
  <ArticleLayout :post="post" :alt-exists="Boolean(altExists)" :edit-url="editUrl">
    <template #not-found>
      <div class="empty-page">
        <p>{{ route.path }}</p>
        <h1>Page Not Found</h1>
        <p>Oops! The content you're looking for doesn't exist.</p>
        <NuxtLink to="/">Go back home</NuxtLink>
      </div>
    </template>
  </ArticleLayout>
</template>

<script setup lang="ts">
import { getOtherLangPath, normalizePath, detectLangFromPath, getGitHubEditUrl } from '~/utils/content'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection('post').path(route.path).first()
})

const editUrl = computed(() => post.value ? getGitHubEditUrl(post.value.path) : '')

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
  defineOgImage('Post', {
    title: post.value.title,
    description: post.value.description || post.value.excerpt || '',
    category: post.value.category,
    date: post.value.date,
    lang: currentLang,
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
</script>

<template>
  <ArticleLayout :post="page" :alt-exists="Boolean(altExists)">
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
import { getOtherLangPath, normalizePath, detectLangFromPath } from '~/utils/content'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const { data: page } = await useAsyncData(`page:${route.path}`, () => {
  return queryCollection('post').path(route.path).first()
})

// 检测是否存在另一语言版本，输出 hreflang SEO 标签
const candidatePath = computed(() => page.value ? getOtherLangPath(normalizePath(page.value.path)) : '')
const { data: altExists } = await useAsyncData(
  `page-alt:${route.path}`,
  () => queryCollection('post').path(candidatePath.value).first().then(r => Boolean(r)),
  { watch: [candidatePath] },
)

if (page.value) {
  const currentLang = detectLangFromPath(page.value.path)
  const baseUrl = 'https://tripper.press'

  const links: Array<{ rel: string; hreflang: string; href: string }> = [
    { rel: 'canonical', hreflang: currentLang, href: `${baseUrl}${page.value.path}` },
  ]
  if (altExists.value) {
    const altLang = currentLang === 'en' ? 'zh' : 'en'
    links.push({ rel: 'alternate', hreflang: altLang, href: `${baseUrl}${candidatePath.value}` })
  }
  useHead({
    titleTemplate: '%s - Tripper Press',
    htmlAttrs: { lang: currentLang },
    link: links as any,
  })
  useSeoMeta({
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description || page.value.excerpt || 'Take Photo, Think Seriously',
    ogDescription: page.value.description || page.value.excerpt || 'Take Photo, Think Seriously',
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

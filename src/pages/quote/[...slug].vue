<template>
  <div v-if="quote" class="container max-w-[800px] mx-auto pt-12 px-4 pb-24">
    <div class="text-xs text-zinc-400 dark:text-dtext/80 pb-6 flex items-center gap-2">
      <span v-if="quote.pinned" class="text-main">置顶</span>
      <span v-if="quote.date">{{ formatDate(quote.date) }}</span>
      <span v-if="quote.tags.length" class="flex items-center gap-1">
        <span>·</span>
        <span v-for="tag in quote.tags" :key="tag" class="text-zinc-400 dark:text-dtext/70">{{ tag }}</span>
      </span>
    </div>
    <article class="quote-body">
      <MemoEditor :content="quote.content" />
    </article>
  </div>
  <div v-else class="empty-page container max-w-[800px] mx-auto pt-40 px-4 text-center">
    <p class="text-zinc-400 dark:text-dtext/60 pb-4">{{ route.path }}</p>
    <h1 class="text-3xl font-bold text-text dark:text-dtext pb-4">Page Not Found</h1>
    <p class="text-zinc-500 dark:text-dtext/70 pb-8">Oops! The quote you're looking for doesn't exist.</p>
    <NuxtLink to="/quotes" class="text-main hover:underline">Go back to Quotes</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Quote } from '~/types/quote'

const route = useRoute()

// /quote/<uid>，兼容 [...slug] 的数组形式
const slug = route.params.slug
const uid = Array.isArray(slug) ? slug[slug.length - 1] ?? '' : String(slug ?? '')

const { data } = await useQuote(uid)
const quote = computed<Quote | null>(() => data.value?.quote ?? null)

if (quote.value) {
  const canonical = 'https://tripper.press/quote/' + quote.value.uid

  useHead({
    titleTemplate: '%s - Tripper Press',
    title: quote.value.title,
    link: [{ rel: 'canonical', href: canonical }]
  })
  useSeoMeta({
    title: quote.value.title,
    ogTitle: quote.value.title,
    description: quote.value.description,
    ogDescription: quote.value.description,
  })
} else {
  // 服务端渲染时返回 404 状态，避免不存在的 Quote 被搜索引擎收录
  const event = useRequestEvent()
  if (event) {
    setResponseStatus(event, 404)
  }

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

<style scoped>
.quote-body {
  font-size: 22px;
  line-height: 1.6em;
}

.quote-body :deep(p) {
  margin-bottom: 0.75em;
}

.quote-body :deep(p:last-child) {
  margin-bottom: 0;
}

.quote-body :deep(img) {
  display: block;
  max-width: 100%;
  border-radius: 8px;
  margin: 0.75em 0 0 0;
}
</style>


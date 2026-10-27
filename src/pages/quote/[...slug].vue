<template>
  <div v-if="quote" class="container max-w-[800px] mx-auto pt-12 px-4 pb-24">
    <div class="text-xs text-zinc-400 dark:text-dtext/80 pb-6 flex items-center gap-2">
      <span v-if="quote.date">{{ formatDate(quote.date) }}</span>
      <span v-if="quote.tags?.length" class="flex items-center gap-1">
        <span>·</span>
        <span v-for="tag in quote.tags" :key="tag" class="text-zinc-400 dark:text-dtext/70">{{ tag }}</span>
      </span>
    </div>
    <article>
      <ContentRenderer :value="quote" />
      <div v-if="quote.cover" class="mt-4">
        <img v-if="isImageUrl(quote.cover)" :src="quote.cover" alt="" class="w-full rounded-lg object-cover max-h-[400px]" />
        <video v-else-if="isVideoUrl(quote.cover)" :src="quote.cover" controls class="w-full rounded-lg max-h-[400px]"></video>
      </div>
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
import { normalizePath } from '~/utils/content'
import { isImageUrl, isVideoUrl } from '~/utils/media'

const route = useRoute()
const { data: quote } = await useAsyncData(route.path, () => {
  return queryCollection('quote').path(route.path).first()
})

function firstParagraphText(body: any): string {
  const text = (node: any): string =>
    typeof node === 'string' ? node : Array.isArray(node) ? node.slice(2).map(text).join('') : ''
  const paragraph = (body?.value ?? []).find((node: any) => Array.isArray(node) && node[0] === 'p')
  return paragraph ? text(paragraph).trim() : ''
}

function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

if (quote.value) {
  const text = firstParagraphText(quote.value.body)
  const title = truncate(text, 40) || quote.value.title
  const description = quote.value.description || truncate(text, 120)
  const canonical = 'https://tripper.press' + normalizePath(quote.value.path)

  useHead({
    titleTemplate: '%s - Tripper Press',
    title,
    link: [{ rel: 'canonical', href: canonical }]
  })
  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
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

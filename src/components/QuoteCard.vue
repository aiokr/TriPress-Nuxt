<template>
  <NuxtLink :to="quote.path" class="quoteCard block w-full p-4 lg:p-6">
    <div class="text-xs text-zinc-400 dark:text-dtext/80 pb-3 flex items-center gap-2">
      <span v-if="quote.date">{{ formatDate(quote.date) }}</span>
      <span v-if="quote.tags?.length" class="flex items-center gap-1">
        <span>·</span>
        <span v-for="tag in quote.tags" :key="tag" class="text-zinc-400 dark:text-dtext/70">{{ tag }}</span>
      </span>
    </div>
    <div class="quote-body text-text dark:text-dtext">
      <ContentRenderer :value="quote" />
    </div>
    <div v-if="quote.cover" class="mt-4">
      <img v-if="isImageUrl(quote.cover)" :src="quote.cover" alt="" class="w-full rounded-lg object-cover max-h-[400px]" />
      <video v-else-if="isVideoUrl(quote.cover)" :src="quote.cover" controls class="w-full rounded-lg max-h-[400px]"></video>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { isImageUrl, isVideoUrl } from '~/utils/media'

interface Quote {
  path: string
  date?: string
  title?: string
  description?: string
  cover?: string
  tags?: string[]
  body?: any
  [key: string]: any
}

defineProps<{
  quote: Quote
}>()
</script>

<style scoped>
.quoteCard {
  transition: transform 0.3s;
}

.quoteCard:hover {
  transform: translateX(5px);
}

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

.quote-body :deep(a) {
  color: #71afdd;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.quote-body :deep(img) {
  display: block;
  max-width: 100%;
  border-radius: 8px;
  margin: 0.75em 0 0 0;
}
</style>

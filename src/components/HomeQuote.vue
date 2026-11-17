<template>
  <article ref="host" class="home-quote min-w-0">
    <div v-if="quote.content.trim()" class="quote-content">
      <MemoEditor :content="quote.content" />
    </div>

    <div v-if="quote.attachments.length" class="quote-photos"
      :class="{ 'quote-photos-strip no-scrollbar': quote.attachments.length > 1 }" role="group" aria-label="图片附件">
      <a v-for="(attachment, index) in quote.attachments" :key="`${attachment.fileUrl}-${index}`"
        :href="attachment.fileUrl" target="_blank" rel="noopener noreferrer" data-quote-image
        :aria-label="`查看大图 ${index + 1}`" class="quote-photo">
        <img :src="attachment.thumbnailUrl || attachment.fileUrl" :alt="`图片 ${index + 1}`"
          loading="lazy" decoding="async" referrerpolicy="no-referrer" />
      </a>
    </div>

    <footer class="quote-meta mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs text-fg-muted">
      <NuxtLink :to="quote.path">
        <time v-if="quote.date" :datetime="quote.date">{{ formatDate(quote.date) }}</time>
        <template v-else>查看 Quote</template>
      </NuxtLink>
      <span v-if="quote.tags.length" aria-hidden="true">·</span>
      <span v-for="tag in quote.tags" :key="tag">{{ tag }}</span>
    </footer>
  </article>
</template>

<script setup lang="ts">
import type { Quote } from '~/types/quote'

defineProps<{ quote: Quote }>()

const host = ref<HTMLElement | null>(null)
useQuoteLightbox(host)
</script>

<style scoped>
.home-quote {
  @apply text-base leading-relaxed text-fg;
}

.quote-content :deep(.mbe-root) {
  --mbe-block-gap: 0.75rem;
  font-size: inherit;
  line-height: inherit;
}

.quote-content :deep(p) {
  font-size: inherit;
  line-height: inherit;
  text-align: start;
}

.quote-content :deep(.mbe-root > :first-child) {
  margin-top: 0;
}

.quote-content :deep(.mbe-root > :last-child) {
  margin-bottom: 0;
}

.quote-content :deep(img.mbe-image) {
  @apply cursor-zoom-in rounded-lg;
}

.quote-photos {
  @apply flex items-start gap-3;
}

.quote-content + .quote-photos {
  @apply mt-3;
}

.quote-photos-strip {
  @apply overflow-x-auto overscroll-x-contain;
}

.quote-photo {
  @apply block max-w-full shrink-0 cursor-zoom-in overflow-hidden rounded-lg;
}

.quote-photo img {
  @apply m-0 block h-auto max-h-96 max-w-full;
}

.quote-photos-strip .quote-photo {
  max-width: 85%;
}

.quote-photos-strip img {
  @apply h-44 w-auto object-cover sm:h-60;
}

.quote-photo:focus-visible,
.quote-content :deep(img.mbe-image:focus-visible) {
  outline: 2px solid rgb(var(--focus));
  outline-offset: -2px;
}

.quote-meta a {
  font-weight: inherit;
  text-decoration: none;
}

.quote-meta a:hover {
  text-decoration: underline;
}
</style>

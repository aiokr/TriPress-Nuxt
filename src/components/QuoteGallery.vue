<template>
  <div v-if="attachments?.length" class="fan-gallery" :style="{ '--count': attachments.length }" aria-label="图片附件">
    <a v-for="(attachment, index) in attachments" :key="`${attachment.fileUrl}-${index}`"
      :href="attachment.fileUrl" target="_blank" rel="noopener noreferrer" class="fan-card"
      :style="cardStyle(index)" @click.stop>
      <img :src="attachment.thumbnailUrl || attachment.fileUrl" :alt="`图片 ${index + 1}`" loading="lazy" />
    </a>
  </div>
</template>

<script setup lang="ts">
import type { QuoteAttachment } from '~/types/quote'

const props = defineProps<{ attachments: QuoteAttachment[] }>()

function cardStyle(index: number) {
  const middle = (props.attachments.length - 1) / 2
  const offset = index - middle
  const normalized = middle ? offset / middle : 0
  return {
    '--offset': offset,
    '--angle': `${normalized * 14}deg`,
    '--drop': `${normalized * normalized * 18}px`,
    zIndex: index + 1,
  }
}
</script>

<style scoped>
.fan-gallery {
  --card-width: min(132px, calc(90vw / (1 + (var(--count) - 1) * .58)));
  position: relative;
  /* Include the card's 4:5 height, its rotated corners and the outer arc drop. */
  height: calc(var(--card-width) * 1.5 + 40px);
  margin: 12px auto 0;
  max-width: 100%;
}
.fan-card {
  position: absolute;
  left: 50%;
  top: 20px;
  width: var(--card-width);
  aspect-ratio: 4 / 5;
  transform: translateX(calc(-50% + var(--offset) * var(--card-width) * .58)) translateY(var(--drop)) rotate(var(--angle));
  transition: transform .28s ease, box-shadow .28s ease;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 14px #0003;
}
.fan-card:hover, .fan-card:focus-visible {
  z-index: 100 !important;
  transform: translateX(calc(-50% + var(--offset) * var(--card-width) * .58)) translateY(-12px) rotate(0);
}
.fan-card img { width: 100%; height: 100%; object-fit: cover; }
@media (prefers-reduced-motion: reduce) { .fan-card { transition: none; } }
</style>

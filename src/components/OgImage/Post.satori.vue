<template>
  <!--
    暗色模式博客文章 OG Image（1200 × 630）
    纯色底 #222831 + 白色字体
  -->
  <div
    class="og-root relative w-[1200px] h-[630px] overflow-hidden flex flex-col font-serif"
    style="background: #222831; color: #ffffff;"
  >
    <!-- 顶部品牌行 -->
    <div class="relative z-10 flex items-center gap-3 px-16 pt-12 text-white">
      <span
        class="w-2.5 h-2.5 rounded-full"
        style="background: #71afdd;"
      ></span>
      <span class="text-base tracking-[0.3em] uppercase text-zinc-300">Tripper Press</span>
    </div>

    <!-- 标题区 -->
    <div class="relative z-10 flex-1 flex flex-col justify-center px-16">
      <div class="flex items-center gap-3 text-zinc-400 text-base pb-2">
        <span v-if="category">{{ category }}</span>
        <span v-if="category && date">·</span>
        <span v-if="date">{{ formattedDate }}</span>
      </div>
      <h1
        class="font-bold max-w-[1000px] text-white"
        style="font-size: 60px; line-height: 1.15; letter-spacing: -0.01em;"
      >
        {{ title }}
      </h1>
      <p
        v-if="descriptionText"
        class="max-w-[900px] text-zinc-300"
        style="font-size: 24px; line-height: 1.5; margin-top: 16px;"
      >
        {{ descriptionText }}
      </p>
    </div>

    <!-- 底部 -->
    <div class="relative z-10 flex items-center justify-between px-16 pb-12 text-zinc-400 text-base">
      <span class="tracking-wide">tripper.press</span>
      <span
        v-if="lang === 'zh'"
        class="px-3 py-1 border border-zinc-500/40 rounded text-sm text-zinc-300"
      >中文</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  description?: string
  category?: string
  date?: string
  lang?: 'en' | 'zh'
}>()

const formattedDate = computed(() => {
  if (!props.date) return ''
  try {
    return new Date(props.date).toISOString().split('T')[0]
  } catch {
    return props.date
  }
})

// Satori 不稳定支持 -webkit-line-clamp / text-overflow:ellipsis，
// 在脚本里手动截断到 ~120 字符以保证两行内显示完整。
const descriptionText = computed(() => {
  const raw = (props.description || '').replace(/\s+/g, ' ').trim()
  if (!raw) return ''
  const max = props.lang === 'zh' ? 80 : 140
  return raw.length > max ? raw.slice(0, max - 1) + '…' : raw
})
</script>

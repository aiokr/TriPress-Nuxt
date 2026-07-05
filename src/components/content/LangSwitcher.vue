<template>
  <div
    v-if="hasAlt"
    class="lang-switcher inline-flex items-center text-xs select-none mt-2"
  >
    <span class="text-zinc-400 dark:text-dtext/60 mr-1.5">Language:</span>
    <!-- 固定顺序：EN 在前，/ 分隔，中文在后。当前语言 = 加粗下划线，对方语言 = 可点击链接 -->
    <span
      v-if="currentLang === 'en'"
      class="px-0.5 font-bold underline underline-offset-4 text-text dark:text-dtext"
    >EN</span>
    <NuxtLink
      v-else
      :to="otherPath"
      class="px-0.5 text-zinc-400 dark:text-dtext/60 hover:text-text dark:hover:text-dtext transition"
    >EN</NuxtLink>
    <span class="mx-1.5 text-zinc-300 dark:text-dtext/40">/</span>
    <span
      v-if="currentLang === 'zh'"
      class="px-0.5 font-bold underline underline-offset-4 text-text dark:text-dtext"
    >中文</span>
    <NuxtLink
      v-else
      :to="otherPath"
      class="px-0.5 text-zinc-400 dark:text-dtext/60 hover:text-text dark:hover:text-dtext transition"
    >中文</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import {
  detectLangFromPath,
  getOtherLangPath,
  normalizePath,
  type Lang,
} from '~/utils/content'

const props = defineProps<{
  /** 当前文章路径，例如 /post/2024/release-tripper-nuxt */
  path: string
  /** 是否存在另一语言版本（由父级查询后传入） */
  hasAlt: boolean
}>()

const currentLang = computed<Lang>(() => detectLangFromPath(props.path))
const targetLang = computed<Lang>(() => (currentLang.value === 'en' ? 'zh' : 'en'))
const otherPath = computed(() => getOtherLangPath(normalizePath(props.path)))
</script>

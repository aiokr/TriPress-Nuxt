<template>
  <aside class="hidden md:block w-64 shrink-0">
    <div class="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar px-4 py-6">
      <nav v-if="group">
        <div class="px-2 pb-2 text-xs font-semibold uppercase tracking-wider">
          <NuxtLink v-if="group.indexPath" :to="group.indexPath" :class="[
            'block rounded transition-colors',
            isCurrent(group.indexPath)
              ? 'text-main'
              : 'text-zinc-400 dark:text-zinc-500 hover:text-text dark:hover:text-dtext'
          ]">
            {{ group.displayName }}
          </NuxtLink>
          <span v-else class="text-zinc-400 dark:text-zinc-500">{{ group.displayName }}</span>
        </div>
        <ul class="space-y-1">
          <li v-for="doc in group.docs" :key="doc.path">
            <NuxtLink :to="doc.path" :class="[
              'block px-2 py-1.5 rounded text-sm transition-colors',
              isCurrent(doc.path)
                ? 'text-main font-semibold bg-main/10'
                : 'text-zinc-600 dark:text-dtext/70 hover:text-text hover:bg-hover'
            ]">
              {{ doc.title }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div v-else class="px-2 text-sm text-zinc-400 dark:text-dtext/60">
        No docs yet
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps<{
  /** 当前系列 key（文件夹名或 frontmatter series），只展示该系列下的文章 */
  series?: string
  currentPath?: string
}>()

interface DocItem {
  path: string
  title: string
  series?: string
  date?: string
  order?: number
  description?: string
}

const { data: docs } = await useAsyncData('docs-sidebar', () => {
  return queryCollection('docs')
    .select('path', 'title', 'series', 'date', 'order', 'description')
    .all() as Promise<DocItem[]>
})

const normalize = (p: string) => p.replace(/\/$/, '')
const isCurrent = (path: string) => normalize(path) === normalize(props.currentPath ?? '')

/** 系列 key：优先 frontmatter 的 series，否则取路径第二段（/docs/<series>/<slug>） */
const seriesKey = (doc: DocItem) => doc.series || doc.path.split('/')[2] || ''

/** 是否为系列索引文件（content/docs/<series>/index.md，路径无文章 slug） */
const isSeriesIndex = (doc: DocItem) => doc.path.split('/').filter(Boolean).length === 2

const group = computed(() => {
  if (!props.series) return null
  const list = (docs.value ?? []) as DocItem[]
  const items = list.filter((d) => seriesKey(d) === props.series)
  const indexDoc = items.find(isSeriesIndex)
  const articles = items
    .filter((d) => !isSeriesIndex(d))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || (b.date ?? '').localeCompare(a.date ?? ''))
  return {
    displayName: indexDoc?.title ?? props.series,
    indexPath: indexDoc?.path,
    docs: articles,
  }
})
</script>

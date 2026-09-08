<template>
  <div class="container max-w-[1000px] mx-auto px-4 py-12 min-h-[60vh]">
    <div class="pb-6">
      <div class="text-2xl font-bold text-text dark:text-dtext pb-6">Tripper Press Docs Center</div>
      <hr />
    </div>
    <div v-if="!seriesList.length" class="text-zinc-400 dark:text-dtext/60 text-sm py-12 text-center">
      No docs yet
    </div>
    <section v-for="series in seriesList" :key="series.key" class="mb-10">
      <div class="flex items-baseline gap-3 pb-3">
        <h2 class="text-lg font-semibold text-text dark:text-dtext">
          <NuxtLink v-if="series.indexPath" :to="series.indexPath" class="hover:text-main transition-colors">
            {{ series.name }}
          </NuxtLink>
          <span v-else>{{ series.name }}</span>
        </h2>
        <span class="text-xs text-zinc-400 dark:text-dtext/60">{{ series.docs.length }} docs</span>
      </div>
      <p v-if="series.description" class="text-sm text-zinc-500 dark:text-dtext/70 pb-3">{{ series.description }}</p>
      <ul class="space-y-1">
        <li v-for="doc in series.docs" :key="doc.path">
          <NuxtLink :to="doc.path"
            class="group flex items-baseline justify-between gap-4 px-2 py-2 rounded transition-colors hover:bg-hover">
            <span class="text-sm text-zinc-600 dark:text-dtext/70 group-hover:text-text dark:group-hover:text-dtext">
              {{ doc.title }}
            </span>
            <span v-if="doc.date" class="text-xs text-zinc-400 dark:text-dtext/50 shrink-0">{{ formatDate(doc.date) }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useHead({ title: 'Docs' })
useSeoMeta({
  title: 'Docs - Tripper Press',
  ogTitle: 'Docs - Tripper Press',
  description: 'Take Photo, Think Seriously',
  ogDescription: 'Take Photo, Think Seriously',
})

interface DocItem {
  path: string
  title: string
  series?: string
  date?: string
  order?: number
  description?: string
}

const { data: docs } = await useAsyncData('docs-index', () => {
  return queryCollection('docs')
    .select('path', 'title', 'series', 'date', 'order', 'description')
    .all() as Promise<DocItem[]>
})

const seriesKey = (doc: DocItem) => doc.series || doc.path.split('/')[2] || ''
const isSeriesIndex = (doc: DocItem) => doc.path.split('/').filter(Boolean).length === 2

interface SeriesGroup {
  key: string
  name: string
  description?: string
  order: number
  indexPath?: string
  docs: DocItem[]
}

const seriesList = computed<SeriesGroup[]>(() => {
  const map = new Map<string, DocItem[]>()
  for (const doc of (docs.value ?? []) as DocItem[]) {
    const key = seriesKey(doc)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(doc)
  }
  return Array.from(map, ([key, items]) => {
    const indexDoc = items.find(isSeriesIndex)
    return {
      key,
      name: indexDoc?.title ?? key,
      description: indexDoc?.description,
      order: indexDoc?.order ?? 999,
      indexPath: indexDoc?.path,
      docs: items
        .filter((d) => !isSeriesIndex(d))
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || (b.date ?? '').localeCompare(a.date ?? '')),
    }
  }).sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
})
</script>

<template>
  <main class="container max-w-[1000px] mx-auto pt-20 px-4 pb-20">
    <div class="pb-6">
      <div class="text-3xl font-bold text-text dark:text-dtext pb-2">运动热力图</div>
    </div>

    <section class="mb-10">
      <div class="flex flex-wrap items-center gap-3 pb-4">
        <button
          v-for="item in filters"
          :key="item.value"
          type="button"
          @click="activeFilter = item.value"
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-all"
          :class="activeFilter === item.value
            ? 'border-zinc-400 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 text-text dark:text-dtext'
            : 'border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-dbg/60 text-zinc-600 dark:text-dtext/70 hover:border-zinc-300 dark:hover:border-zinc-700'"
        >
          <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: item.color }" />
          <span>{{ item.label }}</span>
        </button>

        <a href="https://www.strava.com/athletes/152925000" target="_blank" rel="noopener noreferrer"
          class="ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-dbg/60 text-sm text-zinc-600 dark:text-dtext/70 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
          <span class="w-2.5 h-2.5 rounded-full bg-[#fc5200]" />
          <span>Follow me on Strava</span>
        </a>
      </div>

      <ClientOnly>
        <MapHeatmap :filter="activeFilter" />
        <template #fallback>
          <div class="w-full h-[480px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-sm text-zinc-500 dark:text-dtext/70">
            Loading heatmap…
          </div>
        </template>
      </ClientOnly>
    </section>
  </main>
</template>

<script setup lang="ts">
type ActivityFilter = 'all' | 'running' | 'cycling'

const activeFilter = ref<ActivityFilter>('all')

const filters: { value: ActivityFilter; label: string; color: string }[] = [
  { value: 'all', label: '全部', color: '#a1a1aa' },
  { value: 'running', label: '跑步', color: '#ff5500' },
  { value: 'cycling', label: '骑行', color: '#00c3ff' },
]

useHead({
  title: '运动热力图 - Lab - Tripper Press',
  meta: [
    { name: 'description', content: '基于 Mapbox MTS 的轨迹图。' }
  ]
})

useSeoMeta({
  title: '运动热力图 - Lab - Tripper Press',
  ogTitle: '运动热力图 - Lab - Tripper Press',
  description: '基于 Mapbox MTS 的轨迹图。',
  ogDescription: '基于 Mapbox MTS 的轨迹图。'
})
</script>

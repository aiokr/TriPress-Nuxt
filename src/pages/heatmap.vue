<template>
  <main class="container max-w-[1000px] mx-auto pt-20 px-4 pb-20">
    <div class="pb-6 hidden sm:block">
      <div class="text-3xl font-bold text-text dark:text-dtext pb-2">运动热力图</div>
    </div>

    <section class="mb-10 -mx-4 sm:mx-0 -mt-20 sm:mt-0 relative">
      <div class="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 absolute bottom-4 left-4 z-10 sm:static sm:pb-4">
        <button type="button" @click="heatmapRef?.toggleFullscreen()"
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-all"
          :class="heatmapRef?.isFullscreen
            ? 'border-zinc-400 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 text-text dark:text-dtext'
            : 'border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-dbg/60 text-zinc-600 dark:text-dtext/70 hover:border-zinc-300 dark:hover:border-zinc-700'">
          <IconsFullscreenExit v-if="heatmapRef?.isFullscreen" />
          <IconsFullscreen v-else />
          <span>{{ heatmapRef?.isFullscreen ? '退出全屏' : '全屏' }}</span>
        </button>

        <button v-for="item in filters" :key="item.value" type="button" @click="activeFilter = item.value"
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-all"
          :class="activeFilter === item.value
            ? 'border-zinc-400 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 text-text dark:text-dtext'
            : 'border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-dbg/60 text-zinc-600 dark:text-dtext/70 hover:border-zinc-300 dark:hover:border-zinc-700'">
          <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: item.color }" />
          <span>{{ item.label }}</span>
        </button>

        <a href="https://www.strava.com/athletes/152925000" target="_blank" rel="noopener noreferrer"
          class="hidden sm:inline-flex ml-auto items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-dbg/60 text-sm text-zinc-600 dark:text-dtext/70 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
          <span class="w-2.5 h-2.5 rounded-full bg-[#fc5200]" />
          <span>Follow me on Strava</span>
        </a>
      </div>

      <Heatmap ref="heatmapRef" :filter="activeFilter" :geojson="mergedGeojson">
        <template #fullscreen-controls>
          <button type="button" @click="heatmapRef?.toggleFullscreen()"
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-all"
            :class="heatmapRef?.isFullscreen
              ? 'border-zinc-400 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 text-text dark:text-dtext'
              : 'border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-dbg/60 text-zinc-600 dark:text-dtext/70 hover:border-zinc-300 dark:hover:border-zinc-700'">
            <IconsFullscreenExit v-if="heatmapRef?.isFullscreen" />
            <IconsFullscreen v-else />
            <span>{{ heatmapRef?.isFullscreen ? '退出全屏' : '全屏' }}</span>
          </button>

          <button v-for="item in filters" :key="item.value" type="button" @click="activeFilter = item.value"
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-all"
            :class="activeFilter === item.value
              ? 'border-zinc-400 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 text-text dark:text-dtext'
              : 'border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-dbg/60 text-zinc-600 dark:text-dtext/70 hover:border-zinc-300 dark:hover:border-zinc-700'">
            <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: item.color }" />
            <span>{{ item.label }}</span>
          </button>
        </template>
      </Heatmap>
    </section>

    <section v-if="showDebug" class="mb-10">
      <div class="flex items-center gap-3 pb-4">
        <div class="text-xl font-bold text-text dark:text-dtext">GeoJSON 调试信息</div>
        <span class="text-xs px-2 py-0.5 rounded-full bg-main/10 text-main dark:bg-main/20 border border-main/20">dev
          only</span>
      </div>

      <div class="space-y-3 text-sm">
        <div class="text-xs text-zinc-400 dark:text-dtext/60">共 {{ fileStats.length }} 个文件，{{ totalFeatures }} 条要素</div>
        <div v-for="file in fileStats" :key="file.name"
          class="border rounded-xl p-4 bg-white/40 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800">
          <div class="flex items-center justify-between pb-3">
            <div class="flex items-center gap-2">
              <span class="font-mono text-text dark:text-dtext">{{ file.name }}</span>
              <span class="text-xs px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-dtext/70">{{ file.count }}</span>
            </div>
          </div>
          <div class="space-y-1.5">
            <div v-for="(feature, idx) in file.features" :key="idx"
              class="flex items-center justify-between gap-3 text-xs text-zinc-600 dark:text-dtext/70">
              <div class="flex items-center gap-2 min-w-0">
                <span class="w-1.5 h-1.5 rounded-full shrink-0"
                  :style="{ backgroundColor: feature.activity === 'running' ? '#ff5500' : feature.activity === 'cycling' ? '#00c3ff' : '#a1a1aa' }" />
                <span class="truncate">{{ feature.name }}</span>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <span v-if="feature.activity" class="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-dtext/60 uppercase">{{ feature.activity }}</span>
                <span class="font-mono text-zinc-400 dark:text-dtext/50">{{ feature.type }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!fileStats.length" class="text-sm text-zinc-400 dark:text-dtext/60">No geojson files found.</div>
      </div>
    </section>

    <section v-if="heatmapPage" class="mb-10">
      <div class="pb-4">
        <div class="text-xl font-bold text-text dark:text-dtext">{{ heatmapPage.title }}</div>
      </div>
      <article class="prose dark:prose-invert max-w-none">
        <ContentRenderer :value="heatmapPage" />
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { FeatureCollection } from 'geojson'

type ActivityFilter = 'all' | 'running' | 'cycling'

interface FileStat {
  name: string
  count: number
  features: Array<{
    name: string
    type: string
    activity?: string
    coordCount?: number
  }>
}

const activeFilter = ref<ActivityFilter>('all')
const heatmapRef = ref<{ toggleFullscreen: () => void; isFullscreen: boolean }>()

const filters: { value: ActivityFilter; label: string; color: string }[] = [
  { value: 'all', label: '全部', color: '#a1a1aa' },
  { value: 'running', label: '跑步', color: '#ff5500' },
  { value: 'cycling', label: '骑行', color: '#00c3ff' },
]

const runtime = useRuntimeConfig()
const showDebug = computed(() => import.meta.env.DEV || runtime.public.isDevBranch)

const { data: heatmapItems } = await useAsyncData('heatmap2-tracks', () => queryCollection('heatmap').all())
const { data: heatmapPage } = await useAsyncData('heatmap-page', () => queryCollection('post').path('/heatmap').first())

function inferActivityFromStem(stem: string): 'running' | 'cycling' | undefined {
  const name = stem.split('/').pop() || stem
  const lower = name.toLowerCase()
  if (lower.includes('run')) return 'running'
  if (lower.includes('ride') || lower.includes('cycl') || lower.includes('bike')) return 'cycling'
  return undefined
}

function classifyActivity(feature: any, fallback?: 'running' | 'cycling'): 'running' | 'cycling' | undefined {
  const explicit = feature?.properties?.activity
  if (explicit === 'running' || explicit === 'cycling') {
    return explicit
  }
  const type = String(feature?.properties?.type || '').toLowerCase()
  if (type.includes('running') || type.includes('run')) return 'running'
  if (type.includes('cycling') || type.includes('ride') || type.includes('cycl') || type.includes('bike')) return 'cycling'
  return fallback
}

const mergedGeojson = computed<FeatureCollection>(() => {
  const items = heatmapItems.value || []
  const features = items.flatMap((item: any) => {
    const fallback = inferActivityFromStem(item.stem || item.id || '')
    return (item.features || []).map((feature: any) => {
      const activity = classifyActivity(feature, fallback)
      if (!activity) return feature
      return {
        ...feature,
        properties: {
          ...feature.properties,
          activity,
        },
      }
    })
  })
  return {
    type: 'FeatureCollection',
    features,
  }
})

const fileStats = computed<FileStat[]>(() => {
  const items = heatmapItems.value || []
  return items.map((item: any) => {
    const stem = item.stem || item.id || 'unknown'
    const fallback = inferActivityFromStem(stem)
    const features = (item.features || []).map((feature: any, idx: number) => {
      const props = feature?.properties || {}
      const activity = classifyActivity(feature, fallback)
      return {
        name: String(props.name || `Feature ${idx + 1}`),
        type: String(props.type || feature?.geometry?.type || 'unknown'),
        activity,
        coordCount: typeof props.coordCount === 'number' ? props.coordCount : undefined,
      }
    })
    return {
      name: stem.split('/').pop() || stem,
      count: features.length,
      features,
    }
  })
})

const totalFeatures = computed(() => fileStats.value.reduce((sum, file) => sum + file.count, 0))

useHead({
  title: '运动热力图 - Lab - Tripper Press',
  meta: [
    { name: 'description', content: '基于 content GeoJSON 的轨迹图。' }
  ]
})

useSeoMeta({
  title: '运动热力图- Lab - Tripper Press',
  ogTitle: '运动热力图 - Lab - Tripper Press',
  description: '基于 content GeoJSON 的轨迹图。',
  ogDescription: '基于 content GeoJSON 的轨迹图。'
})
</script>

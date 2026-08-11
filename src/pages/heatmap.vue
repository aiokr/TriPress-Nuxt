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
        <MapHeatmap ref="heatmapRef" :filter="activeFilter" @debug-update="onDebugUpdate" />
        <template #fallback>
          <div class="w-full h-[480px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-sm text-zinc-500 dark:text-dtext/70">
            Loading heatmap…
          </div>
        </template>
      </ClientOnly>
    </section>

    <section v-if="showDebug" class="mb-10">
      <div class="flex items-center gap-3 pb-4">
        <div class="text-xl font-bold text-text dark:text-dtext">MTS 调试信息</div>
        <span class="text-xs px-2 py-0.5 rounded-full bg-main/10 text-main dark:bg-main/20 border border-main/20">dev only</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="border rounded-xl p-4 bg-white/40 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800">
          <div class="text-xs text-zinc-500 dark:text-dtext/70 pb-2 uppercase tracking-wider">Tileset / Source</div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-zinc-500 dark:text-dtext/70">Source ID</span>
              <span class="font-mono text-text dark:text-dtext">{{ debugInfo?.source.id ?? '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-zinc-500 dark:text-dtext/70">Type</span>
              <span class="font-mono text-text dark:text-dtext">{{ debugInfo?.source.type ?? '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-zinc-500 dark:text-dtext/70">Loaded</span>
              <span class="font-mono" :class="debugInfo?.source.loaded ? 'text-green-600 dark:text-green-400' : 'text-red-500'">{{ debugInfo?.source.loaded ? 'yes' : 'no' }}</span>
            </div>
            <div class="pt-1 break-all text-xs text-zinc-400 dark:text-dtext/60">{{ debugInfo?.source.url ?? '-' }}</div>
          </div>
        </div>

        <div class="border rounded-xl p-4 bg-white/40 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800">
          <div class="text-xs text-zinc-500 dark:text-dtext/70 pb-2 uppercase tracking-wider">Source-layers / Layers</div>
          <div class="space-y-2 text-sm">
            <div v-for="layer in debugInfo?.layers" :key="layer.id" class="flex flex-col gap-0.5">
              <div class="flex justify-between">
                <span class="font-mono text-text dark:text-dtext">{{ layer.id }}</span>
                <span class="font-mono text-xs px-1.5 py-0.5 rounded" :class="layer.visibility === 'visible'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : layer.visibility === 'none'
                    ? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                    : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'">{{ layer.visibility }}</span>
              </div>
              <div class="text-xs text-zinc-400 dark:text-dtext/60 font-mono truncate">{{ layer.sourceLayer }}</div>
            </div>
            <div v-if="!debugInfo?.layers.length" class="text-sm text-zinc-400 dark:text-dtext/60">No layers loaded yet.</div>
          </div>
        </div>

        <div class="border rounded-xl p-4 bg-white/40 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800">
          <div class="flex items-center justify-between pb-2">
            <div class="text-xs text-zinc-500 dark:text-dtext/70 uppercase tracking-wider">Features</div>
            <button type="button" @click="refreshDebug" class="text-xs px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-dbg/60 text-zinc-600 dark:text-dtext/70 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all">刷新</button>
          </div>
          <div class="space-y-2 text-sm">
            <div class="text-xs text-zinc-400 dark:text-dtext/60">Source features (loaded tiles)</div>
            <div class="grid grid-cols-2 gap-2">
              <div class="flex justify-between">
                <span class="text-zinc-500 dark:text-dtext/70">Running</span>
                <span class="font-mono text-text dark:text-dtext">{{ debugInfo?.sourceFeatures[runningLayer] ?? 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-zinc-500 dark:text-dtext/70">Cycling</span>
                <span class="font-mono text-text dark:text-dtext">{{ debugInfo?.sourceFeatures[cyclingLayer] ?? 0 }}</span>
              </div>
            </div>
            <div class="text-xs text-zinc-400 dark:text-dtext/60 pt-1">Rendered features (visible)</div>
            <div class="grid grid-cols-2 gap-2">
              <div class="flex justify-between">
                <span class="text-zinc-500 dark:text-dtext/70">Running</span>
                <span class="font-mono text-text dark:text-dtext">{{ debugInfo?.renderedFeatures.running ?? 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-zinc-500 dark:text-dtext/70">Cycling</span>
                <span class="font-mono text-text dark:text-dtext">{{ debugInfo?.renderedFeatures.cycling ?? 0 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
type ActivityFilter = 'all' | 'running' | 'cycling'

interface DebugInfo {
  source: { id: string; url: string; type: 'vector'; loaded: boolean }
  layers: Array<{ id: string; sourceLayer: string; visibility: 'visible' | 'none' | 'unknown' }>
  sourceFeatures: Record<string, number>
  renderedFeatures: Record<string, number>
}

const activeFilter = ref<ActivityFilter>('all')
const heatmapRef = ref<{ refreshDebug: () => void; runningLayer: string; cyclingLayer: string } | null>(null)

const filters: { value: ActivityFilter; label: string; color: string }[] = [
  { value: 'all', label: '全部', color: '#a1a1aa' },
  { value: 'running', label: '跑步', color: '#ff5500' },
  { value: 'cycling', label: '骑行', color: '#00c3ff' },
]

const runtime = useRuntimeConfig()
const showDebug = computed(() => import.meta.env.DEV || runtime.public.isDevBranch)

const debugInfo = ref<DebugInfo | null>(null)

const runningLayer = computed(() => heatmapRef.value?.runningLayer ?? 'running')
const cyclingLayer = computed(() => heatmapRef.value?.cyclingLayer ?? 'cycling')

function onDebugUpdate(payload: DebugInfo) {
  debugInfo.value = payload
}

function refreshDebug() {
  heatmapRef.value?.refreshDebug()
}

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

<template>
  <div class="w-full h-[480px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative bg-zinc-50 dark:bg-zinc-900">
    <div ref="mapEl" class="w-full h-full" />
    <div v-if="status !== 'ready'" class="absolute inset-0 flex items-center justify-center text-sm text-zinc-500 dark:text-dtext/70 pointer-events-none">
      <span v-if="status === 'loading'">Loading heatmap…</span>
      <span v-else-if="status === 'error'" class="text-red-500">Heatmap failed to load: {{ errorMsg }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Map } from 'mapbox-gl'
import { nextTick } from 'vue'

const mapEl = ref<HTMLElement>()
const colorMode = useColorMode()
const config = useRuntimeConfig()
const status = ref<'loading' | 'error' | 'ready'>('loading')
const errorMsg = ref('')

let map: Map | null = null

const tilesetUrl = 'mapbox://aiokr.lfapj3zsn6r7' as const
const sourceLayer = 'tracks' as const

function styleUrl(isDark: boolean): string {
  return isDark
    ? 'mapbox://styles/mapbox/dark-v11'
    : 'mapbox://styles/mapbox/light-v11'
}

onMounted(async () => {
  await nextTick()

  if (!mapEl.value) {
    status.value = 'error'
    errorMsg.value = 'Container not found'
    return
  }

  try {
    const mapboxgl = (await import('mapbox-gl')).default
    await import('mapbox-gl/dist/mapbox-gl.css')

    if (!mapboxgl || !mapboxgl.Map) {
      throw new Error('mapbox-gl did not load correctly')
    }

    mapboxgl.accessToken = config.public.mapboxToken

    map = new mapboxgl.Map({
      container: mapEl.value,
      style: styleUrl(colorMode.value === 'dark'),
      center: [116.4, 39.9],
      zoom: 9,
    })

    map.addControl(new mapboxgl.NavigationControl())

    map.on('load', () => {
      map?.addSource('tracks', {
        type: 'vector',
        url: tilesetUrl,
      })

      map?.addLayer({
        id: 'tracks-heat',
        type: 'heatmap',
        source: 'tracks',
        'source-layer': sourceLayer,
        paint: {
          'heatmap-weight': 1,
          'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 3, 1, 14, 3],
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 3, 2, 14, 20],
          'heatmap-color': [
            'interpolate', ['linear'], ['heatmap-density'],
            0, 'rgba(0,0,0,0)',
            0.2, 'rgba(65,105,225,0.6)',
            0.4, 'rgba(0,200,150,0.7)',
            0.6, 'rgba(255,220,0,0.8)',
            0.8, 'rgba(255,80,0,0.9)',
            1, 'rgba(255,0,0,1)',
          ],
          'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 13, 1, 15, 0],
        },
      })

      map?.addLayer({
        id: 'tracks-point',
        type: 'circle',
        source: 'tracks',
        'source-layer': sourceLayer,
        minzoom: 13,
        paint: {
          'circle-radius': 1.5,
          'circle-color': '#ff5500',
          'circle-opacity': ['interpolate', ['linear'], ['zoom'], 13, 0, 15, 0.8],
        },
      })

      status.value = 'ready'
    })

    watch(
      () => colorMode.value,
      (mode) => {
        map?.setStyle(styleUrl(mode === 'dark'))
      }
    )
  } catch (err: any) {
    status.value = 'error'
    errorMsg.value = err?.message || String(err)
    console.error('[MapHeatmap] failed to initialize', err)
  }
})

onUnmounted(() => {
  map?.remove()
  map = null
})
</script>

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
const sourceLayer = '0d3d69f7f36b02455901' as const

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
      center: [109.4283, 24.3265],
      zoom: 11,
    })

    map.addControl(new mapboxgl.NavigationControl())

    function fitToData(mbgl: typeof mapboxgl, layer: string) {
      if (!map) return

      const features = map.querySourceFeatures('tracks', { sourceLayer: layer })
      if (!features.length) {
        setTimeout(() => fitToData(mbgl, layer), 1000)
        return
      }

      const bounds = new mbgl.LngLatBounds()
      let hasPoint = false
      for (const f of features) {
        if (f.geometry.type === 'Point') {
          const [lon, lat] = f.geometry.coordinates
          bounds.extend([lon, lat])
          hasPoint = true
        }
      }

      if (hasPoint) {
        map.fitBounds(bounds, { padding: 40, maxZoom: 14, duration: 800 })
      }
    }

    map.on('load', () => {
      map?.addSource('tracks', {
        type: 'vector',
        url: tilesetUrl,
      })

      map?.addLayer({
        id: 'tracks-line',
        type: 'line',
        source: 'tracks',
        'source-layer': sourceLayer,
        paint: {
          'line-color': '#ff5500',
          'line-width': ['interpolate', ['linear'], ['zoom'], 0, 1, 11, 1.5, 16, 3],
          'line-opacity': ['interpolate', ['linear'], ['zoom'], 0, 0.5, 11, 0.7, 16, 0.9],
        },
      })

      map?.addLayer({
        id: 'tracks-glow',
        type: 'line',
        source: 'tracks',
        'source-layer': sourceLayer,
        paint: {
          'line-color': '#ff5500',
          'line-width': ['interpolate', ['linear'], ['zoom'], 0, 2, 11, 4, 16, 9],
          'line-opacity': ['interpolate', ['linear'], ['zoom'], 0, 0.08, 11, 0.1, 16, 0.15],
          'line-blur': ['interpolate', ['linear'], ['zoom'], 0, 1, 11, 3, 16, 7],
        },
      }, 'tracks-line')

      fitToData(mapboxgl, sourceLayer)

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

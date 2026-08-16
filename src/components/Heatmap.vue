<template>
  <div
    class="w-full h-[480px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative bg-zinc-50 dark:bg-zinc-900">
    <div ref="mapEl" class="w-full h-full" />
    <div v-if="status !== 'ready'"
      class="absolute inset-0 flex items-center justify-center text-sm text-zinc-500 dark:text-dtext/70 pointer-events-none">
      <span v-if="status === 'loading'">Loading heatmap…</span>
      <span v-else-if="status === 'error'" class="text-red-500">Heatmap failed to load: {{ errorMsg }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FeatureCollection } from 'geojson'
import type { GeoJSONSource, Map } from 'mapbox-gl'

interface Props {
  filter?: 'all' | 'running' | 'cycling'
  geojson?: FeatureCollection
}

const props = withDefaults(defineProps<Props>(), {
  filter: 'all',
})

const mapEl = ref<HTMLElement>()
const colorMode = useColorMode()
const config = useRuntimeConfig()
const status = ref<'loading' | 'error' | 'ready'>('loading')
const errorMsg = ref('')

let map: Map | null = null

function styleUrl(isDark: boolean): string {
  return isDark
    ? 'mapbox://styles/mapbox/dark-v11'
    : 'mapbox://styles/mapbox/light-v11'
}

function setLayerVisibility(filter: Props['filter']) {
  if (!map) return

  const visibility = {
    running: filter === 'all' || filter === 'running',
    cycling: filter === 'all' || filter === 'cycling',
  }

  for (const [id, visible] of Object.entries(visibility)) {
    const lineId = `${id}-line`
    const glowId = `${id}-glow`
    const value = visible ? 'visible' : 'none'

    if (map.getLayer(lineId)) {
      map.setLayoutProperty(lineId, 'visibility', value)
    }
    if (map.getLayer(glowId)) {
      map.setLayoutProperty(glowId, 'visibility', value)
    }
  }
}

function addTrackLine(id: string, activity: string, color: string) {
  if (!map) return

  const lineId = `${id}-line`
  const glowId = `${id}-glow`

  try {
    if (!map.getLayer(lineId)) {
      map.addLayer({
        id: lineId,
        type: 'line',
        source: 'tracks',
        filter: ['==', ['get', 'activity'], activity],
        minzoom: 3,
        paint: {
          'line-color': color,
          'line-width': ['interpolate', ['linear'], ['zoom'], 3, 1, 11, 1.5, 16, 3],
          'line-opacity': ['interpolate', ['linear'], ['zoom'], 3, 0.5, 11, 0.7, 16, 0.9],
        },
      })
    }

    if (!map.getLayer(glowId)) {
      map.addLayer({
        id: glowId,
        type: 'line',
        source: 'tracks',
        filter: ['==', ['get', 'activity'], activity],
        minzoom: 3,
        paint: {
          'line-color': color,
          'line-width': ['interpolate', ['linear'], ['zoom'], 3, 2, 11, 4, 16, 9],
          'line-opacity': ['interpolate', ['linear'], ['zoom'], 3, 0.08, 11, 0.1, 16, 0.15],
          'line-blur': ['interpolate', ['linear'], ['zoom'], 3, 1, 11, 3, 16, 7],
        },
      }, lineId)
    }
  } catch (err: any) {
    console.warn(`[MapHeatmap2] failed to add layer for ${id}:`, err?.message || err)
  }
}

function initLayers() {
  if (!map || !props.geojson) return

  const source = map.getSource('tracks')
  if (source && 'setData' in source) {
    (source as GeoJSONSource).setData(props.geojson)
  } else {
    if (source) map.removeSource('tracks')
    map.addSource('tracks', {
      type: 'geojson',
      data: props.geojson,
    })
  }

  addTrackLine('running', 'running', '#ff5500')
  addTrackLine('cycling', 'cycling', '#00c3ff')

  setLayerVisibility(props.filter)

  status.value = 'ready'
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
      center: [109.4157, 24.36],
      zoom: 11,
    })

    map.addControl(new mapboxgl.NavigationControl())

    map.on('load', initLayers)

    map.on('style.load', () => {
      initLayers()
    })

    watch(
      () => colorMode.value,
      (mode) => {
        map?.setStyle(styleUrl(mode === 'dark'))
      }
    )

    watch(
      () => props.filter,
      (filter) => {
        setLayerVisibility(filter)
      }
    )

    watch(
      () => props.geojson,
      (newGeojson) => {
        if (!map || !newGeojson || !map.isStyleLoaded()) return
        const source = map.getSource('tracks')
        if (source && 'setData' in source) {
          (source as GeoJSONSource).setData(newGeojson)
        } else {
          initLayers()
        }
      }
    )
  } catch (err: any) {
    status.value = 'error'
    errorMsg.value = err?.message || String(err)
    console.error('[MapHeatmap2] failed to initialize', err)
  }
})

onUnmounted(() => {
  map?.remove()
  map = null
})
</script>

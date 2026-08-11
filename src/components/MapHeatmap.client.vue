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
import type { Map, MapboxGeoJSONFeature } from 'mapbox-gl'
import { nextTick } from 'vue'

interface Props {
  filter?: 'all' | 'running' | 'cycling'
}

const props = withDefaults(defineProps<Props>(), {
  filter: 'all',
})

const emit = defineEmits<{
  (e: 'debug-update', payload: DebugInfo): void
}>()

const mapEl = ref<HTMLElement>()
const colorMode = useColorMode()
const config = useRuntimeConfig()
const status = ref<'loading' | 'error' | 'ready'>('loading')
const errorMsg = ref('')

let map: Map | null = null

const tilesetUrl = 'mapbox://aiokr.lfapj3zsn6r7' as const
const runningLayer = '0d3d69f7f36b02455901' as const
const cyclingLayer = '1c9ee4e3752da27bc064' as const

interface LayerMeta {
  id: string
  sourceLayer: string
  visibility: 'visible' | 'none' | 'unknown'
}

interface DebugInfo {
  source: { id: string; url: string; type: 'vector'; loaded: boolean }
  layers: LayerMeta[]
  sourceFeatures: Record<string, number>
  renderedFeatures: Record<string, number>
}

function styleUrl(isDark: boolean): string {
  return isDark
    ? 'mapbox://styles/mapbox/dark-v11'
    : 'mapbox://styles/mapbox/light-v11'
}

function getLayerVisibility(layerId: string): 'visible' | 'none' | 'unknown' {
  if (!map?.getLayer(layerId)) return 'unknown'
  const v = map.getLayoutProperty(layerId, 'visibility')
  if (v === 'visible' || v === 'none') return v
  return 'unknown'
}

function getSourceInfo(): DebugInfo['source'] {
  const loaded = !!map && !!map.getSource('tracks')
  return {
    id: 'tracks',
    url: tilesetUrl,
    type: 'vector',
    loaded,
  }
}

function getLayersInfo(): LayerMeta[] {
  return [
    { id: 'running-line', sourceLayer: runningLayer, visibility: getLayerVisibility('running-line') },
    { id: 'running-glow', sourceLayer: runningLayer, visibility: getLayerVisibility('running-glow') },
    { id: 'cycling-line', sourceLayer: cyclingLayer, visibility: getLayerVisibility('cycling-line') },
    { id: 'cycling-glow', sourceLayer: cyclingLayer, visibility: getLayerVisibility('cycling-glow') },
  ]
}

function countSourceFeatures(sourceLayer: string): number {
  if (!map) return 0
  try {
    return map.querySourceFeatures('tracks', { sourceLayer }).length
  } catch {
    return 0
  }
}

function countRenderedFeatures(layerIds: string[]): number {
  if (!map) return 0
  try {
    return map.queryRenderedFeatures({ layers: layerIds }).length
  } catch {
    return 0
  }
}

function buildDebugInfo(): DebugInfo {
  return {
    source: getSourceInfo(),
    layers: getLayersInfo(),
    sourceFeatures: {
      [runningLayer]: countSourceFeatures(runningLayer),
      [cyclingLayer]: countSourceFeatures(cyclingLayer),
    },
    renderedFeatures: {
      running: countRenderedFeatures(['running-line', 'running-glow']),
      cycling: countRenderedFeatures(['cycling-line', 'cycling-glow']),
    },
  }
}

function emitDebugUpdate() {
  if (!map || status.value !== 'ready') return
  emit('debug-update', buildDebugInfo())
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

  nextTick(emitDebugUpdate)
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
      center: [109.4343, 24.3678],
      zoom: 11.17,
    })

    map.addControl(new mapboxgl.NavigationControl())

    function fitToData(mbgl: typeof mapboxgl, layers: string[], attempts = 0) {
      if (!map || attempts > 5) return

      const allFeatures: mapboxgl.MapboxGeoJSONFeature[] = []
      for (const layer of layers) {
        allFeatures.push(...map.querySourceFeatures('tracks', { sourceLayer: layer }))
      }

      if (!allFeatures.length) {
        setTimeout(() => fitToData(mbgl, layers, attempts + 1), 500)
        return
      }

      const bounds = new mbgl.LngLatBounds()
      let hasPoint = false
      for (const f of allFeatures) {
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

    function addTrackLine(id: string, layer: string, color: string) {
      try {
        map?.addLayer({
          id: `${id}-line`,
          type: 'line',
          source: 'tracks',
          'source-layer': layer,
          minzoom: 3,
          paint: {
            'line-color': color,
            'line-width': ['interpolate', ['linear'], ['zoom'], 3, 1, 11, 1.5, 16, 3],
            'line-opacity': ['interpolate', ['linear'], ['zoom'], 3, 0.5, 11, 0.7, 16, 0.9],
          },
        })

        map?.addLayer({
          id: `${id}-glow`,
          type: 'line',
          source: 'tracks',
          'source-layer': layer,
          minzoom: 3,
          paint: {
            'line-color': color,
            'line-width': ['interpolate', ['linear'], ['zoom'], 3, 2, 11, 4, 16, 9],
            'line-opacity': ['interpolate', ['linear'], ['zoom'], 3, 0.08, 11, 0.1, 16, 0.15],
            'line-blur': ['interpolate', ['linear'], ['zoom'], 3, 1, 11, 3, 16, 7],
          },
        }, `${id}-line`)
      } catch (err: any) {
        console.warn(`[MapHeatmap] failed to add layer "${layer}" for ${id}:`, err?.message || err)
      }
    }

    function initLayers() {
      if (!map) return

      if (!map.getSource('tracks')) {
        map.addSource('tracks', {
          type: 'vector',
          url: tilesetUrl,
        })
      }

      addTrackLine('running', runningLayer, '#ff5500')
      addTrackLine('cycling', cyclingLayer, '#00c3ff')

      setLayerVisibility(props.filter)

      fitToData(mapboxgl, [runningLayer, cyclingLayer])

      status.value = 'ready'

      map.once('idle', () => {
        emitDebugUpdate()
      })
    }

    map.on('load', initLayers)

    map.on('style.load', () => {
      initLayers()
    })

    map.on('moveend', () => {
      emitDebugUpdate()
    })

    map.on('zoomend', () => {
      emitDebugUpdate()
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

defineExpose({
  tilesetUrl,
  runningLayer,
  cyclingLayer,
  map: computed(() => map),
  refreshDebug: () => emitDebugUpdate(),
})
</script>

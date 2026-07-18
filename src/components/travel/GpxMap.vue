<template>
  <div class="w-full h-[500px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative bg-zinc-50 dark:bg-zinc-900">
    <div ref="mapEl" class="w-full h-full" />
    <div
      v-if="loading || status === 'loading'"
      class="absolute inset-0 z-10 flex items-center justify-center bg-white/60 dark:bg-dbg/60 backdrop-blur pointer-events-none"
    >
      <span class="text-sm text-zinc-500 dark:text-dtext/70">Loading track…</span>
    </div>
    <div
      v-else-if="status === 'error'"
      class="absolute inset-0 z-10 flex items-center justify-center text-sm text-red-500 pointer-events-none"
    >
      Map failed to load: {{ errorMsg }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Map, GeoJSONSource, Marker as MapboxMarker } from 'mapbox-gl'
import { useGpx } from '~/composables/useGpx'
import { haversine } from '~/utils/geo'
import type { Feature, FeatureCollection, LineString, MultiLineString, MultiPoint } from 'geojson'

const props = withDefaults(
  defineProps<{
    lat: number
    lng: number
    gpxUrl?: string
    showStartEndMarkers?: boolean
  }>(),
  {
    showStartEndMarkers: false,
  }
)

const mapEl = ref<HTMLElement>()
const colorMode = useColorMode()
const config = useRuntimeConfig()
const loading = ref(false)
const status = ref<'loading' | 'error' | 'ready'>('loading')
const errorMsg = ref('')

let map: Map | null = null
let trackGeojson: FeatureCollection<LineString> | null = null
let trackPointsGeojson: Feature<MultiPoint> | null = null
let trackSegmentsGeojson: FeatureCollection<LineString> | null = null
let trackBounds: [[number, number], [number, number]] | null = null
// 保存开始/结束标记引用，避免 style.load 重新触发时重复添加
let startMarker: MapboxMarker | null = null
let endMarker: MapboxMarker | null = null

function extractPositions(geojson: FeatureCollection<LineString>): [number, number][] {
  const coords: [number, number][] = []
  for (const feature of geojson.features) {
    const geom = feature.geometry as LineString | MultiLineString
    if (geom.type === 'LineString') {
      for (const c of geom.coordinates) coords.push([c[0], c[1]])
    } else if (geom.type === 'MultiLineString') {
      for (const line of geom.coordinates) {
        for (const c of line) coords.push([c[0], c[1]])
      }
    }
  }
  return coords
}

function buildPointsGeojson(geojson: FeatureCollection<LineString>): Feature<MultiPoint> {
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'MultiPoint',
      coordinates: extractPositions(geojson) as [number, number][],
    },
  }
}

function buildSegmentGeojson(geojson: FeatureCollection<LineString>): FeatureCollection<LineString> {
  const positions = extractPositions(geojson)
  const features: Feature<LineString>[] = []
  let segment: [number, number][] = []

  for (let i = 0; i < positions.length; i++) {
    if (i === 0) {
      segment.push(positions[i])
      continue
    }
    const [lng1, lat1] = positions[i - 1]
    const [lng2, lat2] = positions[i]
    const distance = haversine(lat1, lng1, lat2, lng2)
    if (distance <= 1) {
      segment.push(positions[i])
    } else {
      if (segment.length > 1) {
        features.push({
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: segment },
        })
      }
      segment = [positions[i]]
    }
  }
  if (segment.length > 1) {
    features.push({
      type: 'Feature',
      properties: {},
      geometry: { type: 'LineString', coordinates: segment },
    })
  }

  return { type: 'FeatureCollection', features }
}

function styleUrl(isDark: boolean): string {
  return isDark
    ? 'mapbox://styles/mapbox/dark-v11'
    : 'mapbox://styles/mapbox/light-v11'
}

onMounted(async () => {
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
      center: [props.lng, props.lat],
      zoom: 11,
    })
    map.addControl(new mapboxgl.NavigationControl())

    function renderTrack() {
      if (!map || !trackPointsGeojson || !trackSegmentsGeojson) return

      if (map.getSource('track-segments')) {
        ;(map.getSource('track-segments') as GeoJSONSource).setData(trackSegmentsGeojson)
      } else {
        map.addSource('track-segments', { type: 'geojson', data: trackSegmentsGeojson })
        map.addLayer({
          id: 'track-segments',
          type: 'line',
          source: 'track-segments',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#71afdd',
            'line-width': 2,
            'line-opacity': 0.8,
          },
        })
      }

      if (map.getSource('track-points')) {
        ;(map.getSource('track-points') as GeoJSONSource).setData(trackPointsGeojson)
      } else {
        map.addSource('track-points', { type: 'geojson', data: trackPointsGeojson })
        map.addLayer({
          id: 'track-points',
          type: 'circle',
          source: 'track-points',
          paint: {
            'circle-radius': 2,
            'circle-color': '#71afdd',
            'circle-opacity': 0.85,
          },
        })
        if (trackBounds) {
          map.fitBounds(trackBounds, { padding: 40 })
        }
      }
    }

    function addStartEndMarkers() {
      if (!map || !trackGeojson) return

      // 幂等：style.load 会在颜色模式切换时再次触发，先移除旧标记再添加，
      // 避免在地图上留下重复的起终点标记
      startMarker?.remove()
      endMarker?.remove()
      startMarker = null
      endMarker = null

      const start = trackGeojson.features[0]?.geometry?.coordinates[0]
      const lastFeature = trackGeojson.features[trackGeojson.features.length - 1]
      const lastLine = lastFeature?.geometry?.coordinates
      const end = lastLine?.[lastLine.length - 1]
      if (start) {
        startMarker = new mapboxgl.Marker({ color: '#71afdd' })
          .setLngLat(start as [number, number])
          .addTo(map)
      }
      if (end) {
        endMarker = new mapboxgl.Marker({ color: '#e67e22' })
          .setLngLat(end as [number, number])
          .addTo(map)
      }
    }

    map.on('load', () => {
      status.value = 'ready'
      if (props.gpxUrl) {
        renderTrack()
        if (props.showStartEndMarkers) addStartEndMarkers()
      }
    })

    map.on('style.load', () => {
      renderTrack()
      if (props.showStartEndMarkers) addStartEndMarkers()
    })

    if (props.gpxUrl) {
      loading.value = true
      try {
        const data = await useGpx(props.gpxUrl)
        trackGeojson = data.geojson
        trackPointsGeojson = buildPointsGeojson(data.geojson)
        trackSegmentsGeojson = buildSegmentGeojson(data.geojson)
        trackBounds = data.bounds
        renderTrack()
        if (props.showStartEndMarkers) addStartEndMarkers()
      } catch (err: any) {
        status.value = 'error'
        errorMsg.value = err?.message || 'Failed to load GPX track'
        console.error('Failed to load GPX track', err)
      } finally {
        loading.value = false
      }
    }

    watch(
      () => colorMode.value,
      (mode) => {
        map?.setStyle(styleUrl(mode === 'dark'))
      }
    )
  } catch (err: any) {
    status.value = 'error'
    errorMsg.value = err?.message || String(err)
    console.error('[GpxMap] failed to initialize', err)
  }
})

onUnmounted(() => {
  map?.remove()
  map = null
})
</script>

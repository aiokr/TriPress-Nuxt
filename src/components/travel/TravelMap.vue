<template>
  <div
    class="w-full h-[520px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative bg-zinc-50 dark:bg-zinc-900"
  >
    <div ref="mapEl" class="w-full h-full" />
    <div
      v-if="status !== 'ready'"
      class="absolute inset-0 flex items-center justify-center text-sm text-zinc-500 dark:text-dtext/70 pointer-events-none"
    >
      <span v-if="status === 'loading'">Loading map…</span>
      <span v-else-if="status === 'error'" class="text-red-500 px-4 text-center">Map failed to load: {{ errorMsg }}</span>
    </div>
    <div
      v-else-if="pointCount === 0"
      class="absolute inset-0 flex items-center justify-center text-sm text-zinc-500 dark:text-dtext/70 pointer-events-none z-10"
    >
      该分类下暂无足迹
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Map, GeoJSONSource } from 'mapbox-gl'
import type { Feature, FeatureCollection, Point } from 'geojson'

export interface Footprint {
  name: string
  lat: number
  lng: number
  date?: string
  description?: string
  categories?: string[]
  color?: string
  image?: string
  url?: string
  urlLabel?: string
}

const props = defineProps<{
  footprints: Footprint[]
  activeCategory: string
}>()

const emit = defineEmits<{
  select: [name: string | null]
}>()

const mapEl = ref<HTMLElement>()
const colorMode = useColorMode()
const config = useRuntimeConfig()
const status = ref<'loading' | 'error' | 'ready'>('loading')
const errorMsg = ref('')

const pointCount = computed(() =>
  props.activeCategory === 'all'
    ? props.footprints.length
    : props.footprints.filter((f) => f.categories?.includes(props.activeCategory)).length
)

function styleUrl(isDark: boolean): string {
  return isDark ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11'
}

function buildFeatureCollection(list: Footprint[]): FeatureCollection<Point> {
  return {
    type: 'FeatureCollection',
    features: list.map((f) => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [f.lng, f.lat] },
      properties: {
        name: f.name,
        date: f.date,
        description: f.description,
        categories: f.categories ?? [],
        color: f.color ?? '#71afdd',
        image: f.image,
        url: f.url,
        urlLabel: f.urlLabel,
      },
    })),
  }
}

function addLayers(map: Map) {
  if (map.getLayer('clusters') || map.getLayer('cluster-count') || map.getLayer('unclustered-point')) return

  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'footprints',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': '#71afdd',
      'circle-radius': ['step', ['get', 'point_count'], 18, 10, 24, 100, 32],
    },
  })

  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'footprints',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': ['get', 'point_count_abbreviated'],
      'text-size': 13,
      'text-font': ['DIN Pro Medium'],
      'text-allow-overlap': true,
    },
    paint: { 'text-color': '#ffffff' },
  })

  map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: 'footprints',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': ['get', 'color'],
      'circle-radius': 9,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff',
    },
  })
}

function popupHTML(props_: GeoJSON.GeoJsonProperties): string {
  const name = props_?.name || ''
  const date = props_?.date
  const description = props_?.description
  const image = props_?.image
  const url = props_?.url
  const urlLabel = props_?.urlLabel || '查看详情'
  const categories: string[] = props_?.categories ?? []
  const color = props_?.color || '#71afdd'

  const dateHtml = date ? `<div style="color:#71717a;font-size:12px;margin-top:2px;">📅 ${date}</div>` : ''
  const descHtml = description ? `<div style="margin-top:6px;font-size:13px;line-height:1.5;color:inherit;">${description}</div>` : ''
  const imgHtml = image
    ? `<img src="${image}" alt="${name}" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:8px;display:block;"/>`
    : `<div style="width:100%;height:6px;border-radius:3px;background:${color};margin-bottom:8px;"></div>`
  const catHtml =
    categories.length > 0
      ? `<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:8px;">${categories
          .map((c) => `<span style="font-size:11px;padding:2px 8px;border-radius:999px;background:rgba(113,175,221,0.15);color:inherit;">${c}</span>`)
          .join('')}</div>`
      : ''
  const linkHtml = url
    ? `<div style="margin-top:10px;"><a href="${url}" target="_blank" rel="noreferrer" style="display:inline-block;padding:6px 14px;border-radius:999px;background:${color};color:#fff;font-size:13px;text-decoration:none;">${urlLabel}</a></div>`
    : ''

  return `<div style="min-width:220px;max-width:260px;font-family:inherit;">
      ${imgHtml}
      <div style="font-weight:600;font-size:15px;">${name}</div>
      ${dateHtml}
      ${descHtml}
      ${catHtml}
      ${linkHtml}
    </div>`
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

    const visibleFootprints =
      props.activeCategory === 'all'
        ? props.footprints
        : props.footprints.filter((f) => f.categories?.includes(props.activeCategory))

    const map = new mapboxgl.Map({
      container: mapEl.value,
      style: styleUrl(colorMode.value === 'dark'),
      center: [105, 30],
      zoom: 2,
    })
    map.addControl(new mapboxgl.NavigationControl())

    const popup = new mapboxgl.Popup({ offset: 16, closeButton: true, maxWidth: '280px' })

    function updateData() {
      const data = buildFeatureCollection(
        props.activeCategory === 'all'
          ? props.footprints
          : props.footprints.filter((f) => f.categories?.includes(props.activeCategory))
      )
      const source = map.getSource('footprints') as GeoJSONSource | undefined
      if (source) source.setData(data)
    }

    map.on('load', () => {
      map.addSource('footprints', {
        type: 'geojson',
        data: buildFeatureCollection(visibleFootprints),
        cluster: true,
        clusterMaxZoom: 11,
        clusterRadius: 48,
      })
      addLayers(map)
      status.value = 'ready'

      map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] })
        const clusterId = features[0]?.properties?.cluster_id
        const source = map.getSource('footprints') as GeoJSONSource
        if (!clusterId || !source) return
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err || zoom == null || !features[0]?.geometry) return
          const center = (features[0].geometry as GeoJSON.Point).coordinates as [number, number]
          map.easeTo({ center, zoom: zoom + 1 })
        })
      })

      map.on('click', 'unclustered-point', (e) => {
        const feature = e.features?.[0] as Feature<Point> | undefined
        if (!feature?.geometry) return
        const name = feature.properties?.name as string | undefined
        if (name) emit('select', name)
        const coordinates = feature.geometry.coordinates.slice() as [number, number]
        const html = popupHTML(feature.properties)
        popup.setLngLat(coordinates).setHTML(html).addTo(map)
      })

      map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = ''
      })
      map.on('mouseenter', 'unclustered-point', () => {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseleave', 'unclustered-point', () => {
        map.getCanvas().style.cursor = ''
      })
    })

    map.on('style.load', () => {
      addLayers(map)
      updateData()
    })

    watch(
      () => colorMode.value,
      (mode) => {
        map.setStyle(styleUrl(mode === 'dark'))
      }
    )

    watch(
      () => props.activeCategory,
      () => {
        popup.remove()
        emit('select', null)
        updateData()
      }
    )

    onUnmounted(() => {
      map.remove()
    })
  } catch (err: any) {
    status.value = 'error'
    errorMsg.value = err?.message || String(err)
    console.error('[TravelMap] failed to initialize', err)
  }
})
</script>
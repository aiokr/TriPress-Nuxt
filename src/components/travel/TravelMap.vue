<template>
  <div class="w-full h-full relative flex flex-col">
    <div ref="mapEl" class="w-full flex-1 min-h-0" />
    <div v-if="status !== 'ready'"
      class="absolute inset-0 flex items-center justify-center text-sm text-zinc-500 dark:text-dtext/70 pointer-events-none">
      <span v-if="status === 'loading'">Loading map…</span>
      <span v-else-if="status === 'error'" class="text-red-500 px-4 text-center">Map failed to load: {{ errorMsg
        }}</span>
    </div>
    <div v-else-if="pointCount === 0"
      class="absolute inset-0 flex items-center justify-center text-sm text-zinc-500 dark:text-dtext/70 pointer-events-none z-10">
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
  image?: string | string[]
  url?: string
  urlLabel?: string
  file?: string
}

const props = withDefaults(
  defineProps<{
    footprints: Footprint[]
    activeCategory?: string
    disablePopup?: boolean
  }>(),
  {
    activeCategory: 'all',
    disablePopup: false,
  }
)

const emit = defineEmits<{
  select: [identifier: string | null]
}>()

const mapEl = ref<HTMLElement>()
const colorMode = useColorMode()
const config = useRuntimeConfig()
const status = ref<'loading' | 'error' | 'ready'>('loading')
const errorMsg = ref('')

// 参照 Heatmap.vue 的写法：模块级持有 map 实例，在 setup 作用域同步注册 onUnmounted，
// 避免 async onMounted 中 await 之后再注册导致的
// "onUnmounted is called when there is no active component instance" 问题
let map: Map | null = null
let onWindowResize: (() => void) | null = null
let resizeObserver: ResizeObserver | null = null
onUnmounted(() => {
  if (onWindowResize) window.removeEventListener('resize', onWindowResize)
  resizeObserver?.disconnect()
  resizeObserver = null
  map?.remove()
  map = null
})

const pointCount = computed(() =>
  props.activeCategory === 'all'
    ? props.footprints.length
    : props.footprints.filter((f) => f.categories?.includes(props.activeCategory)).length
)

function styleUrl(isDark: boolean): string {
  return isDark ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11'
}

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace('#', '')
  const full = m.length === 3 ? m.split('').map((c) => c + c).join('') : m
  const num = parseInt(full, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

function buildFeatureCollection(list: Footprint[]): FeatureCollection<Point> {
  return {
    type: 'FeatureCollection',
    features: list.map((f) => {
      const [r, g, b] = hexToRgb(f.color ?? '#71afdd')
      return {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [f.lng, f.lat] },
        properties: {
          name: f.name,
          file: f.file,
          date: f.date,
          description: f.description,
          categories: f.categories ?? [],
          color: f.color ?? '#71afdd',
          image: Array.isArray(f.image) ? f.image[0] : f.image,
          url: f.url,
          urlLabel: f.urlLabel,
          r,
          g,
          b,
        },
      }
    }),
  }
}

function setupGeo(map: Map, list: Footprint[]) {
  // style.change / setStyle 会清除已添加的 source 与 layer，这里幂等重建
  if (!map.getSource('footprints')) {
    map.addSource('footprints', {
      type: 'geojson',
      data: buildFeatureCollection(list),
      cluster: true,
      clusterMaxZoom: 11,
      clusterRadius: 48,
      clusterProperties: {
        sumR: ['+', ['get', 'r']],
        sumG: ['+', ['get', 'g']],
        sumB: ['+', ['get', 'b']],
      },
    })
  }

  if (map.getLayer('clusters') || map.getLayer('cluster-count') || map.getLayer('unclustered-point')) return

  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'footprints',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'rgb',
        ['/', ['get', 'sumR'], ['get', 'point_count']],
        ['/', ['get', 'sumG'], ['get', 'point_count']],
        ['/', ['get', 'sumB'], ['get', 'point_count']],
      ],
      'circle-radius': ['step', ['get', 'point_count'], 18, 10, 24, 100, 32],
      'circle-opacity': 0.85,
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
  // 参照 Heatmap.vue：先让 Vue 完成本次渲染/布局，确保容器已有最终尺寸再创建地图
  await nextTick()

  if (!mapEl.value) {
    status.value = 'error'
    errorMsg.value = 'Container not found'
    return
  }

  // 防御性检查：如果容器还没有实际尺寸，等待一帧让浏览器完成布局
  const rect = mapEl.value?.getBoundingClientRect()
  if (rect && (rect.width === 0 || rect.height === 0)) {
    await new Promise((resolve) => requestAnimationFrame(resolve))
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
      center: [105, 20],
      zoom: 2,
      preserveDrawingBuffer: true,
    })
    const mapRef = map
    mapRef.addControl(new mapboxgl.NavigationControl())

    const popup = new mapboxgl.Popup({ offset: 16, closeButton: true, maxWidth: '280px' })

    const currentFootprints = () =>
      props.activeCategory === 'all'
        ? props.footprints
        : props.footprints.filter((f) => f.categories?.includes(props.activeCategory))

    function fitToFootprints(list: Footprint[]) {
      if (!list.length) {
        mapRef.jumpTo({ center: [105, 20], zoom: 2 })
        return
      }
      const bounds = new mapboxgl.LngLatBounds()
      for (const f of list) {
        bounds.extend([f.lng, f.lat])
      }
      mapRef.fitBounds(bounds, {
        padding: 60,
        maxZoom: 12,
        duration: 800,
      })
    }

    function updateData() {
      const data = buildFeatureCollection(currentFootprints())
      const source = mapRef.getSource('footprints') as GeoJSONSource | undefined
      if (source) source.setData(data)
    }

    // 只在首个 style.load 初始化一次地理数据，避免 load + style.load 重复执行
    // 导致 source/layer 被多次添加或 fitBounds 竞争
    let initialized = false
    const initGeo = () => {
      if (initialized) return
      initialized = true
      setupGeo(mapRef, currentFootprints())
      status.value = 'ready'
      // 延迟一次 resize + triggerRepaint，确保容器在动态布局稳定后 canvas 尺寸正确
      requestAnimationFrame(() => {
        mapRef.resize()
        fitToFootprints(currentFootprints())
        mapRef.triggerRepaint()
      })
    }
    mapRef.on('style.load', initGeo)

    // 地图交互事件只挂载一次（点击/悬浮依赖已渲染的图层，注册时机无碍）
    mapRef.on('click', 'clusters', (e) => {
      const features = mapRef.queryRenderedFeatures(e.point, { layers: ['clusters'] })
      const clusterId = features[0]?.properties?.cluster_id
      const source = mapRef.getSource('footprints') as GeoJSONSource
      if (!clusterId || !source) return
      source.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err || zoom == null || !features[0]?.geometry) return
        const center = (features[0].geometry as GeoJSON.Point).coordinates as [number, number]
        mapRef.easeTo({ center, zoom: zoom + 1 })
      })
    })

    mapRef.on('click', 'unclustered-point', (e) => {
      const feature = e.features?.[0] as Feature<Point> | undefined
      if (!feature?.geometry) return
      const file = feature.properties?.file as string | undefined
      const name = feature.properties?.name as string | undefined
      if (file || name) emit('select', file || name || null)
      if (!props.disablePopup) {
        const coordinates = feature.geometry.coordinates.slice() as [number, number]
        const html = popupHTML(feature.properties)
        popup.setLngLat(coordinates).setHTML(html).addTo(mapRef)
      }
    })

    for (const layer of ['clusters', 'unclustered-point']) {
      mapRef.on('mouseenter', layer, () => {
        mapRef.getCanvas().style.cursor = 'pointer'
      })
      mapRef.on('mouseleave', layer, () => {
        mapRef.getCanvas().style.cursor = ''
      })
    }

    // 视口尺寸变化（如打开/关闭 F12 手机模拟、拖拽窗口）时延迟到布局稳定后仅调用 resize()，
    // 不强制重绘。仅监听 window resize，不监听容器，避免初始化阶段过早 resize
    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    onWindowResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        mapRef.resize()
      }, 100)
    }
    window.addEventListener('resize', onWindowResize)

    // 容器尺寸变化（如父级 flex 布局中兄弟元素出现/隐藏导致宽度变化）时也需要 resize
    if (mapEl.value) {
      let roTimer: ReturnType<typeof setTimeout> | null = null
      resizeObserver = new ResizeObserver(() => {
        if (status.value !== 'ready') return
        if (roTimer) clearTimeout(roTimer)
        roTimer = setTimeout(() => {
          mapRef.resize()
        }, 100)
      })
      resizeObserver.observe(mapEl.value)
    }

    watch(
      () => colorMode.value,
      (mode) => {
        mapRef.setStyle(styleUrl(mode === 'dark'))
      }
    )

    watch(
      () => props.activeCategory,
      () => {
        popup.remove()
        emit('select', null)
        updateData()
        fitToFootprints(currentFootprints())
      }
    )

    watch(
      () => props.footprints,
      (list) => {
        if (!list || !list.length) return
        const source = mapRef.getSource('footprints') as GeoJSONSource | undefined
        if (source) {
          source.setData(buildFeatureCollection(currentFootprints()))
          fitToFootprints(currentFootprints())
        } else {
          setupGeo(mapRef, list)
          fitToFootprints(list)
        }
      }
    )
  } catch (err: any) {
    status.value = 'error'
    errorMsg.value = err?.message || String(err)
    console.error('[TravelMap] failed to initialize', err)
  }
})
</script>
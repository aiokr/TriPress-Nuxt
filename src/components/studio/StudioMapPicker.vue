<template>
  <div
    class="w-full h-[320px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative bg-zinc-50 dark:bg-zinc-900"
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
      v-if="status === 'ready'"
      class="absolute left-3 bottom-3 z-10 text-xs px-2 py-1 rounded bg-white/85 dark:bg-zinc-900/85 text-zinc-500 dark:text-dtext/70 pointer-events-none"
    >
      点击地图设置坐标，拖动标记可微调
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Map } from 'mapbox-gl'
type MarkerInstance = InstanceType<typeof import('mapbox-gl')['Marker']>

const props = defineProps<{
  lat: number
  lng: number
}>()

const emit = defineEmits<{
  pick: [lat: number, lng: number]
}>()

const mapEl = ref<HTMLElement>()
const colorMode = useColorMode()
const config = useRuntimeConfig()
const status = ref<'loading' | 'error' | 'ready'>('loading')
const errorMsg = ref('')

// 参照 TravelMap.vue：模块级持有实例，在 setup 作用域同步注册 onUnmounted
let map: Map | null = null
let marker: MarkerInstance | null = null
onUnmounted(() => {
  marker?.remove()
  marker = null
  map?.remove()
  map = null
})

function hasValidPoint(): boolean {
  return typeof props.lat === 'number' && typeof props.lng === 'number' && (props.lat !== 0 || props.lng !== 0)
}

function styleUrl(isDark: boolean): string {
  return isDark ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11'
}

function emitPick(lat: number, lng: number) {
  emit('pick', Number(lat.toFixed(6)), Number(lng.toFixed(6)))
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
    const initPoint = hasValidPoint() ? { lat: props.lat, lng: props.lng } : { lat: 35, lng: 105 }
    map = new mapboxgl.Map({
      container: mapEl.value,
      style: styleUrl(colorMode.value === 'dark'),
      center: [initPoint.lng, initPoint.lat],
      zoom: hasValidPoint() ? 9 : 2,
    })
    const mapRef = map
    mapRef.addControl(new mapboxgl.NavigationControl())

    if (hasValidPoint()) {
      marker = new mapboxgl.Marker({ draggable: true })
        .setLngLat([props.lng, props.lat])
        .addTo(mapRef)
      marker.on('dragend', () => {
        const ll = marker!.getLngLat()
        emitPick(ll.lat, ll.lng)
      })
    }

    mapRef.on('click', (e) => {
      if (!marker) {
        marker = new mapboxgl.Marker({ draggable: true })
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(mapRef)
        marker.on('dragend', () => {
          const ll = marker!.getLngLat()
          emitPick(ll.lat, ll.lng)
        })
      } else {
        marker.setLngLat([e.lngLat.lng, e.lngLat.lat])
      }
      emitPick(e.lngLat.lat, e.lngLat.lng)
    })

    watch(
      () => colorMode.value,
      (mode) => {
        mapRef.setStyle(styleUrl(mode === 'dark'))
      }
    )

    watch(
      () => [props.lat, props.lng],
      ([lat, lng]) => {
        if (typeof lat !== 'number' || typeof lng !== 'number') return
        if (lat === 0 && lng === 0) {
          marker?.remove()
          marker = null
          return
        }

        // 仅当标记位置与输入值不一致时才移动，避免拖动标记时互相覆盖
        const current = marker?.getLngLat()
        const hasMoved = !current || Math.abs(current.lat - lat) > 1e-6 || Math.abs(current.lng - lng) > 1e-6

        if (!marker) {
          marker = new mapboxgl.Marker({ draggable: true })
            .setLngLat([lng, lat])
            .addTo(mapRef)
          marker.on('dragend', () => {
            const ll = marker!.getLngLat()
            emitPick(ll.lat, ll.lng)
          })
        } else if (hasMoved) {
          marker.setLngLat([lng, lat])
        }

        // 侧边栏切换条目时，让地图飞到目标坐标
        if (hasMoved) {
          mapRef.flyTo({
            center: [lng, lat],
            zoom: Math.max(mapRef.getZoom(), 12),
            essential: true,
          })
        }
      }
    )

    status.value = 'ready'
  } catch (err: any) {
    status.value = 'error'
    errorMsg.value = err?.message || String(err)
    console.error('[StudioMapPicker] failed to initialize', err)
  }
})
</script>

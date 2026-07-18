<template>
  <div
    class="w-full h-[480px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative bg-zinc-50 dark:bg-zinc-900"
  >
    <div ref="mapEl" class="w-full h-full" />
    <div
      v-if="status !== 'ready'"
      class="absolute inset-0 flex items-center justify-center text-sm text-zinc-500 dark:text-dtext/70 pointer-events-none"
    >
      <span v-if="status === 'loading'">Loading map…</span>
      <span v-else-if="status === 'error'" class="text-red-500">Map failed to load: {{ errorMsg }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Map, Marker } from 'mapbox-gl'

interface City {
  path: string
  title: string
  city: string
  lat: number
  lng: number
}

const props = defineProps<{
  cities: City[]
}>()

const mapEl = ref<HTMLElement>()
const colorMode = useColorMode()
const config = useRuntimeConfig()
const status = ref<'loading' | 'error' | 'ready'>('loading')
const errorMsg = ref('')

let map: Map | null = null
let markers: Marker[] = []

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
      center: [105, 30],
      zoom: 2,
    })

    map.addControl(new mapboxgl.NavigationControl())

    function createMarkerElement(): HTMLElement {
      const el = document.createElement('div')
      el.className =
        'w-4 h-4 rounded-full bg-[#71afdd] border-2 border-white shadow-md cursor-pointer'
      return el
    }

    function clearMarkers() {
      markers.forEach((marker) => marker.remove())
      markers = []
    }

    function addMarkers() {
      if (!map) return
      clearMarkers()
      for (const city of props.cities) {
        const popup = new mapboxgl.Popup({ offset: 12 }).setHTML(
          `<a href="${city.path}" class="font-semibold text-main hover:underline">${city.city}</a>`
        )
        const marker = new mapboxgl.Marker({ element: createMarkerElement() })
          .setLngLat([city.lng, city.lat])
          .setPopup(popup)
          .addTo(map)
        markers.push(marker)
      }
    }

    map.on('load', () => {
      addMarkers()
      status.value = 'ready'
    })

    map.on('style.load', () => {
      addMarkers()
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
    console.error('[TravelMap] failed to initialize', err)
  }
})

onUnmounted(() => {
  map?.remove()
  map = null
})
</script>

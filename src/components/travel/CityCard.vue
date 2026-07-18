<template>
  <NuxtLink
    :to="city.path"
    class="group block rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dbg transition hover:shadow-lg hover:-translate-y-1"
  >
    <div class="aspect-[3/2] bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
      <img
        v-if="thumbUrl"
        :src="thumbUrl"
        :alt="city.city"
        class="w-full h-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-sm text-zinc-400 dark:text-dtext/50"
      >
        {{ city.gpx ? 'Loading map…' : 'No track' }}
      </div>
    </div>
    <div class="p-4">
      <div class="text-lg font-semibold text-text dark:text-dtext">{{ city.city }}</div>
      <div class="text-sm text-zinc-500 dark:text-dtext/70">{{ city.country }}</div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface City {
  path: string
  city: string
  country: string
  date: string
  days?: number
  gpx?: string
}

const props = defineProps<{
  city: City
}>()

const colorMode = useColorMode()
const thumbUrl = ref('')

onMounted(async () => {
  if (!props.city.gpx) return
  try {
    thumbUrl.value = await useGpxThumb(props.city.gpx, colorMode.value === 'dark')
  } catch (err) {
    console.error('Failed to load city thumbnail', err)
  }
})

</script>

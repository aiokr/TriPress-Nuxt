<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white/60 dark:bg-dbg/60"
    >
      <div class="text-2xl font-bold text-main">{{ stat.value }}</div>
      <div class="text-xs text-zinc-500 dark:text-dtext/70">{{ stat.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface City {
  days?: number
  gpx?: string
}

const props = defineProps<{
  cities: City[]
}>()

const stats = computed(() => {
  const list = props.cities ?? []
  return [{ label: 'Cities', value: list.length }]
})
</script>

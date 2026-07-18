<template>
  <div class="pb-24">
    <section class="container max-w-[1000px] mx-auto pt-12 px-4">
      <div class="pb-8">
        <h1 class="text-3xl font-bold text-text dark:text-dtext pb-2">Travel</h1>
        <p class="text-zinc-500 dark:text-dtext/70">Cities I have visited and the footprints I left.</p>
      </div>

      <TravelStats :cities="cities ?? []" class="mb-8" />
      <TravelMap :cities="cities ?? []" class="mb-10" />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CityCard v-for="city in cities" :key="city.path" :city="city" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Travel - Tripper Press',
})

useSeoMeta({
  title: 'Travel - Tripper Press',
  ogTitle: 'Travel - Tripper Press',
  description: 'Cities I have visited and the footprints I left.',
  ogDescription: 'Cities I have visited and the footprints I left.',
})

const { data: cities } = await useAsyncData('travel-list', () =>
  queryCollection('travel').order('date', 'DESC').all()
)
</script>

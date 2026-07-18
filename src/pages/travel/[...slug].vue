<template>
  <div v-if="city" class="pb-24">
    <section class="container max-w-[1000px] mx-auto pt-12 px-4">
      <div class="pb-6">
        <div class="text-xs text-zinc-400 dark:text-dtext/80 pb-2">
          <NuxtLink to="/travel" class="hover:text-main">Travel</NuxtLink>
          <span class="mx-2">/</span>
          <span>{{ city.country }}</span>
        </div>
        <h1 class="text-3xl font-bold text-text dark:text-dtext">{{ city.title }}</h1>
      </div>

      <GpxMap :lat="city.lat" :lng="city.lng" :gpx-url="city.gpx" class="mb-8" />

      <article class="prose dark:prose-invert max-w-none">
        <ContentRenderer :value="city" />
      </article>

      <div class="pt-12">
        <NuxtLink to="/travel" class="text-main hover:underline">← Back to Travel</NuxtLink>
      </div>
    </section>
  </div>

  <div v-else class="container max-w-[1000px] mx-auto pt-24 px-4 text-center">
    <h1 class="text-2xl font-bold text-text dark:text-dtext">City not found</h1>
    <NuxtLink to="/travel" class="text-main hover:underline">Back to Travel</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: city } = await useAsyncData(route.path, () =>
  queryCollection('travel').path(route.path).first()
)

if (city.value) {
  useHead({
    title: `${city.value.title} - Travel - Tripper Press`,
  })
  useSeoMeta({
    title: city.value.title,
    ogTitle: city.value.title,
    description: city.value.description || `Footprints in ${city.value.city}, ${city.value.country}.`,
    ogDescription: city.value.description || `Footprints in ${city.value.city}, ${city.value.country}.`,
  })
} else {
  useHead({ title: 'City not found - Tripper Press' })
}

</script>
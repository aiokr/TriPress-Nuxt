<template>
  <main class="container max-w-[1000px] mx-auto pt-20 px-4 pb-20">
    <div class="pb-6">
      <div class="text-3xl font-bold text-text dark:text-dtext pb-2">运动热力图</div>
    </div>

    <section class="mb-10">
      <ClientOnly>
        <MapHeatmap />
        <template #fallback>
          <div class="w-full h-[480px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-sm text-zinc-500 dark:text-dtext/70">
            Loading heatmap…
          </div>
        </template>
      </ClientOnly>
    </section>

    <section>
      <div class="grid grid-cols-4 gap-4">
        <a href="https://www.strava.com/athletes/152925000" target="_blank" rel="noopener noreferrer"
          class="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white/60 dark:bg-dbg/60 hover:shadow-md transition-all">
          <div class="font-bold text-[#fc5200] leading-6">
            <span class="leading-6">Follow me on Strava</span>
          </div>
        </a>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: '运动热力图 - Lab - Tripper Press',
  meta: [
    { name: 'description', content: '基于 Mapbox MTS 的轨迹图。' }
  ]
})

useSeoMeta({
  title: '运动热力图 - Lab - Tripper Press',
  ogTitle: '运动热力图 - Lab - Tripper Press',
  description: '基于 Mapbox MTS 的轨迹图。',
  ogDescription: '基于 Mapbox MTS 的轨迹图。'
})
</script>

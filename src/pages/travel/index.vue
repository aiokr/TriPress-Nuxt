<template>
  <div class="pb-24">
    <section class="container max-w-[1000px] mx-auto pt-12 px-4">
      <div class="pb-6">
        <h1 class="text-3xl font-bold text-text dark:text-dtext pb-2">Travel</h1>
        <p class="text-zinc-500 dark:text-dtext/70">山河有迹，步履成章。</p>
      </div>

      <div class="flex flex-wrap gap-2 mb-4">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          class="px-3 py-1.5 rounded-full text-sm border transition"
          :class="
            activeCategory === cat
              ? 'bg-main text-white border-main'
              : 'border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-dtext/70 hover:border-main hover:text-main'
          "
        >
          {{ cat }}
        </button>
      </div>

      <TravelMap
        :footprints="footprints ?? []"
        :active-category="activeCategory"
        class="mb-8"
        @select="onSelect"
      />

      <div v-if="selectedFootprint" class="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dbg p-4 md:p-6">
        <div class="flex items-start gap-4">
          <img
            v-if="selectedFootprint.image"
            :src="selectedFootprint.image"
            :alt="selectedFootprint.name"
            class="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover shrink-0"
          />
          <span
            v-else
            class="shrink-0 w-16 h-16 rounded-xl"
            :style="{ background: selectedFootprint.color || '#71afdd' }"
          />
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-3">
              <h2 class="text-xl font-bold text-text dark:text-dtext">
                <a v-if="selectedFootprint.url" :href="selectedFootprint.url" class="hover:text-main">{{ selectedFootprint.name }}</a>
                <span v-else>{{ selectedFootprint.name }}</span>
              </h2>
            </div>
            <div class="mt-1 text-sm text-zinc-500 dark:text-dtext/60">
              {{ selectedFootprint.date || '' }}<template v-if="selectedFootprint.date && selectedFootprint.categories?.length"> · </template>{{
                selectedFootprint.categories?.join(' / ')
              }}
            </div>
            <p v-if="selectedFootprint.description" class="mt-3 text-sm text-zinc-600 dark:text-dtext/75 leading-relaxed">
              {{ selectedFootprint.description }}
            </p>
            <a
              v-if="selectedFootprint.url"
              :href="selectedFootprint.url"
              class="mt-4 inline-block px-4 py-2 rounded-full text-sm"
              :style="{ background: selectedFootprint.color || '#71afdd' }"
            >
              <span class="text-white">{{ selectedFootprint.urlLabel || '查看详情' }}</span>
            </a>
          </div>
        </div>
      </div>
      <div
        v-else
        class="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-10 text-center text-sm text-zinc-400 dark:text-dtext/50"
      >
        在地图上点击一个足迹点，查看对应详情
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

const { data: footprints } = await useAsyncData('travel-footprints', () =>
  queryCollection('travel').all()
)

const activeCategory = ref('all')
const selectedName = ref<string | null>(null)

const categories = computed(() => {
  const set = new Set<string>(['all'])
  for (const fp of footprints.value ?? []) {
    for (const c of fp.categories ?? []) set.add(c)
  }
  return Array.from(set)
})

const selectedFootprint = computed(() => {
  if (!selectedName.value) return null
  return (footprints.value ?? []).find((f) => f.name === selectedName.value) ?? null
})

function onSelect(name: string | null) {
  selectedName.value = name
}
</script>
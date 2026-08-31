<template>
  <div class="pb-24">
    <section class="container max-w-[1200px] mx-auto pt-12 px-4">
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

      <div class="flex flex-col lg:flex-row gap-4 items-stretch mb-8">
        <TravelMap
          :footprints="footprints ?? []"
          :active-category="activeCategory"
          class="flex-1"
          @select="onSelect"
        />

        <div
          v-if="selectedFootprint"
          class="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dbg lg:w-[340px] p-4 md:p-5"
        >
          <div v-if="footprintImages.length" class="mb-3">
            <img
              :src="footprintImages[activeImageIndex]"
              :alt="selectedFootprint.name"
              class="w-full h-40 lg:h-auto lg:max-h-[300px] rounded-xl object-cover lg:object-contain shrink-0"
            />
            <div
              v-if="footprintImages.length > 1"
              class="mt-2 flex gap-2 overflow-x-auto"
            >
              <button
                v-for="(img, i) in footprintImages"
                :key="img"
                type="button"
                @click="activeImageIndex = i"
                class="min-w-[60px] h-12 rounded-lg overflow-hidden border-2 shrink-0 transition"
                :class="i === activeImageIndex ? 'border-main' : 'border-transparent opacity-70 hover:opacity-100'"
              >
                <img
                  :src="img"
                  :alt="`${selectedFootprint.name} ${i + 1}`"
                  class="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
          <div v-else class="mb-3">
            <span
              class="shrink-0 w-16 h-16 rounded-xl"
              :style="{ background: selectedFootprint.color || '#71afdd' }"
            />
          </div>
          <div class="min-w-0 lg:block lg:w-full">
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
        <div
          v-else
          class="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 lg:w-[340px] p-10 text-center text-sm text-zinc-400 dark:text-dtext/50 flex items-center justify-center"
        >
          在地图上点击一个足迹点，查看对应详情
        </div>
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
const activeImageIndex = ref(0)

const categories = computed(() => {
  const set = new Set<string>(['all'])
  for (const fp of footprints.value ?? []) {
    for (const c of fp.categories ?? []) set.add(c)
  }
  return Array.from(set)
})

const footprintImages = computed<string[]>(() => {
  const raw = selectedFootprint.value?.image
  if (!raw) return []
  const list = Array.isArray(raw) ? raw : [raw]
  return list.filter(Boolean)
})

const selectedFootprint = computed(() => {
  if (!selectedName.value) return null
  return (footprints.value ?? []).find((f) => f.name === selectedName.value) ?? null
})

function onSelect(name: string | null) {
  selectedName.value = name
  activeImageIndex.value = 0
}
</script>
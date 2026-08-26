<template>
  <div class="container max-w-[800px] px-2 md:px-0 mx-auto">
    <section
      class="w-full transition-shadow rounded px-2 md:px-8 lg:px-0 pt-12 md:pt-20 pb-20 flex flex-col md:flex-row md:items-center justify-between gap-12">
      <div class="relative md:hidden">

        <img class="hidden dark:block" src="https://imgur.lzmun.com/picgo/logo/notionavatarwhite.png" width="108px"
          height="108px" />
        <img class="dark:hidden" src="https://imgur.lzmun.com/picgo/logo/notionavatarblack.png" width="108px"
          height="108px" />
        <div class="absolute inset-0 -z-10 bg-gradient-to-tl from-main/60 to-main/10 opacity-0 blur-2xl md:opacity-50">
        </div>
      </div>
      <h1 class="text-3xl font-bold font-serif drop-shadow-lg">
        Tripper Press
      </h1>
      <div class="hidden md:block md:relative">
        <img class="hidden dark:block" src="https://imgur.lzmun.com/picgo/logo/notionavatarwhite.png" width="144px"
          height="144px" />
        <img class="dark:hidden" src="https://imgur.lzmun.com/picgo/logo/notionavatarblack.png" width="144px"
          height="144px" />
      </div>
    </section>

    <section class="px-2 md:px-8 lg:px-0">
      <NuxtLink to="/heatmap"
        class="group relative block h-[300px] rounded-2xl shadow-feature-card dark:shadow-feature-card-dark mb-12 overflow-hidden">
        <div class="absolute inset-0 rounded-2xl overflow-hidden">
          <img v-if="thumbUrl" :src="thumbUrl" alt="sport heatmap"
            class="w-full h-full object-cover transition duration-500 scale-[120%] group-hover:scale-100" />
          <div v-else
            class="w-full h-full bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400">
            Loading map…
          </div>
        </div>
        <div
          class="absolute inset-y-0 left-0 z-0 flex flex-col gap-4 justify-center px-5 py-4 rounded-l-2xl bg-gradient-to-r from-black/20 to-transparent min-w-[200px]">
          <div>
            <div class="text-4xl font-bold text-white">{{ runningStats?.count ?? '-' }}</div>
            <div class="text-lg text-white/70 mt-1">Runs</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-white">{{ runningStats?.distance ?? '-' }}</div>
            <div class="text-lg  text-white/70 mt-1">km</div>
          </div>
        </div>
      </NuxtLink>
      <div class="flex flex-col gap-6 rounded-2xl p-4 shadow-feature-card dark:shadow-feature-card-dark lg:p-6">
        <div class="pb-1 flex items-center justify-between">
          <div class="text-xl font-bold text-text dark:text-dtext">Recently Posts</div>
          <NuxtLink to="/posts" class="text-main transition-colors">All Posts</NuxtLink>
        </div>
        <NuxtLink v-for="post in posts" :key="post.path" :to="post.path" class="postCard w-full rounded-xl block">
          <div class="md:px-2 md:pt-2 rounded-b-xl">
            <div class="text-xs text-zinc-400 dark:text-dtext/80 pb-2 flex items-center gap-2">
              <span v-if="post.date">{{ formatDate(post.date) }}</span>
              <span v-if="post.category" class="mx-1">·</span>
              <span v-if="post.category">{{ post.category }}</span>
              <span v-if="hasZh(post.path)"
                class="ml-1 px-1.5 py-0.5 rounded border border-main/50 text-main text-[10px]">中</span>
            </div>
            <h2 class="text-xl text-text dark:text-dtext pb-2">{{ post.title }}</h2>
            <div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>

</template>

<script setup lang="ts">
import { getOtherLangPath, normalizePath } from '~/utils/content'
import type { FeatureCollection } from 'geojson'

const appConfig = useAppConfig()
const colorMode = useColorMode()
const thumbUrl = ref('')

useHead({
  title: 'Tripper Press - Take Photo, Think Seriously',
  meta: [
    { name: 'description', content: 'Take Photo, Think Seriousl' }
  ]
})

useSeoMeta({
  title: 'Tripper Press - Take Photo, Think Seriously',
  ogTitle: 'Tripper Press - Take Photo, Think Seriously',
  description: 'Take Photo, Think Seriously',
  ogDescription: 'Take Photo, Think Seriously',
})

// 列表只展示默认语言（en）版本；过滤掉 .zh 翻译副本和 type=page 的独立页面
const { data: posts } = await useAsyncData('home-posts', async () => {
  const all = await queryCollection('post')
    .order('date', 'DESC')
    .where('type', '<>', 'draft')
    .all()
  return all.filter((p: any) => p.lang !== 'zh' && p.type !== 'page').slice(0, 6)
})

// 查询每个 en 文章是否存在中文翻译，用于显示"中"徽章
const { data: zhMap } = await useAsyncData('home-posts-zh-map', async () => {
  const zhPosts = await queryCollection('post').all()
  return zhPosts.filter((p: any) => p.lang === 'zh').map((p: any) => getOtherLangPath(p.path))
})

const hasZh = (path: string) => zhMap.value?.includes(normalizePath(path)) ?? false

// 首页运动热力图缩略图
const { data: heatmapItems } = await useAsyncData('home-heatmap-tracks', () => queryCollection('heatmap').all())

interface RunningStatsJson {
  summary?: {
    totalCount?: number
    totalDistance?: number
  }
}

const { data: runningJson } = await useAsyncData('home-running-stats', async () => {
  try {
    return await $fetch<RunningStatsJson>('/GeoJson/running.json')
  } catch {
    return undefined
  }
})

function inferActivityFromStem(stem: string): 'running' | 'cycling' | undefined {
  const name = stem.split('/').pop() || stem
  const lower = name.toLowerCase()
  if (lower.includes('run')) return 'running'
  if (lower.includes('ride') || lower.includes('cycl') || lower.includes('bike')) return 'cycling'
  return undefined
}

function classifyActivity(feature: any, fallback?: 'running' | 'cycling'): 'running' | 'cycling' | undefined {
  const explicit = feature?.properties?.activity
  if (explicit === 'running' || explicit === 'cycling') {
    return explicit
  }
  const type = String(feature?.properties?.type || '').toLowerCase()
  if (type.includes('running') || type.includes('run')) return 'running'
  if (type.includes('cycling') || type.includes('ride') || type.includes('cycl') || type.includes('bike')) return 'cycling'
  return fallback
}

const mergedGeojson = computed<FeatureCollection>(() => {
  const items = heatmapItems.value || []
  const features = items.flatMap((item: any) => {
    const fallback = inferActivityFromStem(item.stem || item.id || '')
    return (item.features || []).map((feature: any) => {
      const activity = classifyActivity(feature, fallback)
      if (!activity) return feature
      return {
        ...feature,
        properties: {
          ...feature.properties,
          activity,
        },
      }
    })
  })
  return {
    type: 'FeatureCollection',
    features,
  }
})

const runningStats = computed(() => {
  const json = runningJson.value
  const summary = json?.summary
  if (summary?.totalCount != null && summary?.totalDistance != null) {
    return {
      count: summary.totalCount,
      distance: Number(summary.totalDistance).toFixed(1),
    }
  }
  return null
})

async function updateThumb() {
  if (!mergedGeojson.value.features.length) return
  thumbUrl.value = await useHeatmapThumb(mergedGeojson.value, colorMode.value === 'dark')
}

onMounted(() => {
  updateThumb()
})

watch(() => colorMode.value, () => {
  updateThumb()
})
</script>

<style scoped>
.postCard {
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.6s;
}

.postCard:hover {
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.6s;
  transform: translateX(5px);
}

.postCard:hover .postCoverWoCover {
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.6s, opacity 0.3s;
  opacity: 1;
}

.postCoverWoCover {
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.6s, opacity 0.3s;
}

.postCategory {
  @apply text-xs font-semibold text-zinc-500 bg-zinc-100 p-2 rounded-lg opacity-80 dark:bg-dtext/10 dark:text-dtext;
}

.travlePlanAlready {
  mask-image: linear-gradient(black 0%, rgb(0, 0, 0) 30%, rgba(0, 0, 0, 0.2) 80%, transparent 100%);
}

.bookCover {
  mask-image: linear-gradient(black 0%, rgb(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.2) 80%, transparent 100%);
}

.warnBanner {
  --orange: #ffc75f30;
  --white: #ffc75f10;
  background:
    linear-gradient(90deg, #ffffff, #ffffffb0 80%, #ffffff00 100%),
    repeating-linear-gradient(-45deg, var(--orange) 0%, var(--orange) 2%, var(--white) 2%, var(--white) 4%, var(--orange) 4%);
}

.dark .warnBanner {
  --orange: #ffc75f60;
  --white: #ffc75f40;
  background:
    linear-gradient(90deg, #18181b, #18181bb0 80%, #18181b00 100%),
    repeating-linear-gradient(-45deg, var(--orange) 0%, var(--orange) 2%, var(--white) 2%, var(--white) 4%, var(--orange) 4%);
}
</style>

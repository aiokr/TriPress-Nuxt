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
        class="relative block rounded-feature-card shadow-feature-card dark:shadow-feature-card-dark mb-12 overflow-hidden transition-shadow">
        <div class="relative z-[1] p-4 lg:p-6 md:pr-[48%]">
          <div class="text-lg pb-2 md:text-base text-zinc-500 dark:text-dtext/70 mt-1">Runs in {{ currentYear }}</div>
          <div class="flex items-end gap-6 md:gap-10">
            <div>
              <div class="text-4xl md:text-5xl font-bold text-text dark:text-dtext italic"><CountUp
                  :value="currentYearStats?.count ?? 0" /> <span class="text-xl md:text-2xl">runs</span></div>
            </div>
            <div>
              <div class="text-4xl md:text-5xl font-bold text-main italic"><CountUp
                  :value="currentYearStats?.distance ?? 0" :decimals="1" /> <span
                  class="text-xl md:text-2xl">km</span></div>
            </div>
          </div>
        </div>
        <div class="running-preview absolute inset-y-0 right-0 w-[45%]">
          <img class="hidden dark:block w-full h-full object-cover object-left" src="/images/running-page-dark.png"
            alt="Running heatmap dark" />
          <img class="dark:hidden w-full h-full object-cover object-left" src="/images/running-page.png"
            alt="Running heatmap" />
        </div>
      </NuxtLink>
      <div class="flex flex-col gap-8 px-4 md:px-8">
        <NuxtLink v-for="item in homeItems" :key="item.path" :to="item.path" :class="['homeItem block', item._kind === 'quote' && 'border-l-2 border-zinc-200 pl-4 dark:border-zinc-700']">
          <div class="text-xs text-zinc-400 dark:text-dtext/80 pb-2 flex items-center gap-2">
            <span v-if="item.date">{{ formatDate(item.date) }}</span>
            <template v-if="item._kind === 'post'">
              <span v-if="item.category" class="mx-1">·</span>
              <span v-if="item.category">{{ item.category }}</span>
              <span v-if="hasZh(item.path)"
                class="ml-1 px-1.5 py-0.5 rounded border border-main/50 text-main text-[10px]">中</span>
            </template>
            <template v-if="item._kind === 'quote' && item.tags?.length">
              <span class="mx-1">·</span>
              <span v-for="tag in item.tags" :key="tag" class="text-zinc-400 dark:text-dtext/70">{{ tag }}</span>
            </template>
          </div>
          <h2 v-if="item._kind === 'post'" class="text-xl text-text dark:text-dtext">{{ item.title }}</h2>
          <div v-else-if="item._kind === 'quote'" class="quote-excerpt text-lg italic text-zinc-600 dark:text-dtext/80">
            <ContentRenderer :value="item" :excerpt="true" />
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>

</template>

<script setup lang="ts">
import { getOtherLangPath, normalizePath } from '~/utils/content'

const currentYear = new Date().getFullYear()

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

// 首页 Recently Posts：混合 Post 与 Quote，按 date 倒序展示
// Post 过滤：默认语言（en）、排除 .zh 翻译副本、排除 type=page/rc/draft
// Quote 过滤：排除 type=draft
const { data: homeItems } = await useAsyncData('home-items', async () => {
  const [allPosts, allQuotes] = await Promise.all([
    queryCollection('post').order('date', 'DESC').all(),
    queryCollection('quote').order('date', 'DESC').all()
  ])

  const filteredPosts = allPosts
    .filter((p: any) => p.lang !== 'zh' && ['post', 'Post'].includes(p.type))
    .map((p: any) => ({ ...p, _kind: 'post' as const }))

  const filteredQuotes = allQuotes
    .filter((q: any) => q.type !== 'draft')
    .map((q: any) => ({ ...q, _kind: 'quote' as const }))

  return [...filteredPosts, ...filteredQuotes]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)
})

// 查询每个 en 文章是否存在中文翻译，用于显示"中"徽章
const { data: zhMap } = await useAsyncData('home-posts-zh-map', async () => {
  const zhPosts = await queryCollection('post').all()
  return zhPosts.filter((p: any) => p.lang === 'zh').map((p: any) => getOtherLangPath(p.path))
})

const hasZh = (path: string) => zhMap.value?.includes(normalizePath(path)) ?? false

interface RunningStatsJson {
  summary?: {
    totalCount?: number
    totalDistance?: number
  }
  years?: Record<string, {
    count?: number
    distance?: number
  }>
}

const { data: runningJson } = await useAsyncData('home-running-stats', async () => {
  try {
    return await $fetch<RunningStatsJson>('/GeoJson/running.json')
  } catch {
    return undefined
  }
})

const currentYearStats = computed(() => {
  const year = runningJson.value?.years?.[String(currentYear)]
  if (year?.count != null && year?.distance != null) {
    return {
      count: year.count,
      distance: Number(year.distance),
    }
  }
  return null
})

const totalStats = computed(() => {
  const summary = runningJson.value?.summary
  if (summary?.totalCount != null && summary?.totalDistance != null) {
    return {
      count: summary.totalCount,
      distance: Number(summary.totalDistance).toFixed(1),
    }
  }
  return null
})
</script>

<style scoped>
.running-preview {
  -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.4) 50%, #000 100%);
  mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.4) 50%, #000 100%);
}

.homeItem {
  transition: transform 0.3s;
}

.homeItem:hover {
  transform: translateX(5px);
}

.quote-excerpt :deep(p) {
  margin: 0;
}

.quote-excerpt :deep(p + p) {
  margin-top: 0.5em;
}

.postCategory {
  @apply text-xs font-semibold text-zinc-500 bg-zinc-100 p-2 rounded-lg opacity-80 bg-subtle text-fg;
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

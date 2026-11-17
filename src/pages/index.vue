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
      <NuxtLink to="/heatmap" class="home-card relative mb-12 overflow-hidden">
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
      <div ref="feedElement" class="flex flex-col gap-8">
        <div v-if="isFeedLoading" class="py-10 text-center text-sm text-zinc-400 dark:text-dtext/60">
          正在加载内容…
        </div>
        <template v-else>
          <template v-for="item in paginatedItems" :key="`${item._kind}:${item.path}`">
            <NuxtLink v-if="item._kind === 'post'" :to="item.path" class="home-card px-4 py-5 md:px-8 md:py-6">
              <div v-if="item.date || item.category || item.hasTranslation"
                class="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-fg-muted">
                <span v-if="item.date">{{ formatDate(item.date) }}</span>
                <span v-if="item.date && item.category" aria-hidden="true">·</span>
                <span v-if="item.category">{{ item.category }}</span>
                <span v-if="item.hasTranslation"
                  class="rounded border border-main/50 px-1.5 py-0.5 text-[10px] text-link">中</span>
              </div>
              <h2 class="break-words text-xl font-semibold text-fg">{{ item.title }}</h2>
              <p v-if="item.summary" class="mt-2 break-words text-sm leading-6 text-fg-muted">
                {{ item.summary }}
              </p>
            </NuxtLink>
            <HomeQuote v-else :quote="item" class="quote-item mx-4 md:mx-8" />
          </template>

          <div v-if="paginatedItems.length === 0"
            class="py-10 text-center text-sm text-zinc-400 dark:text-dtext/60">
            暂无内容
          </div>

          <nav v-if="totalPages > 1" class="flex items-center justify-center gap-4 pt-4 pb-8" aria-label="首页内容分页">
            <button type="button" class="paginationButton" :disabled="currentPage <= 1"
              @click="goToPage(currentPage - 1)">
              上一页
            </button>
            <span class="text-xs tabular-nums text-zinc-400 dark:text-dtext/60">
              {{ currentPage }} / {{ totalPages }}
            </span>
            <button type="button" class="paginationButton" :disabled="currentPage >= totalPages"
              @click="goToPage(currentPage + 1)">
              下一页
            </button>
          </nav>
        </template>
      </div>
    </section>
  </div>

</template>

<script setup lang="ts">
import type { HomePostIndexItem } from '~/types/home-feed'
import type { Quote, QuotesResponse } from '~/types/quote'

type HomePostItem = HomePostIndexItem & {
  _kind: 'post'
  path: string
}

type HomeQuoteItem = Quote & {
  _kind: 'quote'
}

type HomeItem = HomePostItem | HomeQuoteItem

const PAGE_SIZE = 16

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

// 首页在浏览器中读取构建期文章索引与实时 Quote，然后按日期混排。
const { data: postsData, status: postsStatus } = useFetch<HomePostIndexItem[]>('/content/home-posts.json', {
  server: false,
  default: () => [],
})

// TODO: /api/quotes 当前会返回每条 Quote 的完整 Markdown 与解析 body；首页只需要列表字段，
// Quote 数量继续增长后应增加精简 Feed API，避免分页前下载全部正文。
const { data: quotesData, status: quotesStatus } = useFetch<QuotesResponse>('/api/quotes', {
  server: false,
  default: () => ({ quotes: [] }),
})

const allHomeItems = computed<HomeItem[]>(() => {
  const posts: HomePostItem[] = (postsData.value ?? []).map(post => ({
    ...post,
    path: post.link,
    _kind: 'post',
  }))
  const quotes: HomeQuoteItem[] = (quotesData.value?.quotes ?? []).map(quote => ({
    ...quote,
    _kind: 'quote',
  }))

  return [...posts, ...quotes]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const route = useRoute()
const router = useRouter()
const feedElement = ref<HTMLElement | null>(null)

const requestedPage = computed(() => {
  const value = Number.parseInt(String(route.query.page || '1'), 10)
  return Number.isFinite(value) && value > 0 ? value : 1
})
const totalPages = computed(() => Math.max(1, Math.ceil(allHomeItems.value.length / PAGE_SIZE)))
const currentPage = computed(() => Math.min(requestedPage.value, totalPages.value))
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return allHomeItems.value.slice(start, start + PAGE_SIZE)
})
const isFeedLoading = computed(() => ['idle', 'pending'].includes(postsStatus.value)
  || ['idle', 'pending'].includes(quotesStatus.value))

watch([requestedPage, totalPages, isFeedLoading], ([requested, pages, loading]) => {
  if (loading || requested <= pages) return
  void router.replace({
    query: {
      ...route.query,
      page: pages > 1 ? String(pages) : undefined,
    },
  })
})

async function goToPage(page: number) {
  const nextPage = Math.min(Math.max(page, 1), totalPages.value)
  await router.push({
    query: {
      ...route.query,
      page: nextPage > 1 ? String(nextPage) : undefined,
    },
  })
  await nextTick()
  feedElement.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

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

.home-card {
  @apply block w-full rounded bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus;
  text-decoration: none;
  /* 保持 ach.tripper.press 卡片的阴影层顺序和过渡。 */
  box-shadow: theme('boxShadow.feature-card');
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.6s;
}

.home-card:hover {
  transform: translateY(-5px);
  box-shadow: 1px 10px 30px 0 rgb(0 0 0 / 0.1);
}

@media (prefers-reduced-motion: reduce) {
  .home-card {
    transition: none;
  }

  .home-card:hover {
    transform: none;
  }
}

.quote-item + .quote-item {
  @apply mt-4;
}

.paginationButton {
  @apply rounded border border-zinc-200 px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:border-main hover:text-main disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-dtext;
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

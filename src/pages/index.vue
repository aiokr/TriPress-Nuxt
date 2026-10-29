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
      <div ref="feedElement" class="flex flex-col gap-8 px-4 md:px-8">
        <NuxtLink v-for="item in paginatedItems" :key="`${item._kind}:${item.path}`" :to="item.path"
          class="homeItem block">
          <div class="text-xs text-zinc-400 dark:text-dtext/80 pb-2 flex items-center gap-2">
            <span v-if="item.date">{{ formatDate(item.date) }}</span>
            <template v-if="item._kind === 'post'">
              <span v-if="item.category" class="mx-1">·</span>
              <span v-if="item.category">{{ item.category }}</span>
              <span v-if="item.hasTranslation"
                class="ml-1 px-1.5 py-0.5 rounded border border-main/50 text-main text-[10px]">中</span>
            </template>
            <template v-if="item._kind === 'quote' && item.tags?.length">
              <span class="mx-1">·</span>
              <span v-for="tag in item.tags" :key="tag" class="text-zinc-400 dark:text-dtext/70">{{ tag }}</span>
            </template>
          </div>
          <template v-if="item._kind === 'post'">
            <h2 class="text-xl text-text dark:text-dtext">{{ item.title }}</h2>
            <p v-if="item.summary" class="pt-2 text-sm leading-6 text-zinc-500 dark:text-dtext/70">
              {{ item.summary }}
            </p>
          </template>
          <article v-else-if="item._kind === 'quote'" class="quote-excerpt text-zinc-600 dark:text-dtext/80">
            <MemoEditor :content="item.content" />
          </article>
        </NuxtLink>

        <div v-if="isFeedLoading" class="py-10 text-center text-sm text-zinc-400 dark:text-dtext/60">
          正在加载内容…
        </div>
        <div v-else-if="paginatedItems.length === 0"
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
  const posts: HomePostItem[] = postsData.value.map(post => ({
    ...post,
    path: post.link,
    _kind: 'post',
  }))
  const quotes: HomeQuoteItem[] = quotesData.value.quotes.map(quote => ({
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

.homeItem {
  position: relative;
}

/* 悬浮时在左侧显示主题色竖线，卡片本身不位移 */
.homeItem::before {
  content: '';
  position: absolute;
  left: -0.75rem;
  top: 0.25rem;
  bottom: 0.25rem;
  width: 2px;
  border-radius: 9999px;
  @apply bg-main;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.homeItem:hover::before {
  opacity: 1;
}

.paginationButton {
  @apply rounded border border-zinc-200 px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:border-main hover:text-main disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-dtext;
}

/* 首页 Quote：在 article 正文（16px / 1.75）的基础上缩小并收紧行距 */
.quote-excerpt {
  font-size: 14px;
  line-height: 1.4em;
}

.quote-excerpt :deep(p) {
  margin: 0;
  font-size: inherit;
  line-height: inherit;
}

.quote-excerpt :deep(ul),
.quote-excerpt :deep(ol) {
  font-size: inherit;
  line-height: inherit;
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

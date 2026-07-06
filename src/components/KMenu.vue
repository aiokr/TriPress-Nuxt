<template>
  <Transition>
    <div v-if="kMenuVisiable"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      class="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen z-40">
      <button
        type="button"
        aria-label="Close search"
        class="background fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-black/20 z-40 cursor-default"
        @click="closekMenu"></button>
      <div
        class="fixed top-12 left-3 right-3 sm:left-0 sm:right-0 container max-w-xl mx-auto min-h-48 bg-white/80 dark:bg-dbg/80 backdrop-blur rounded-2xl shadow-xl p-3 flex flex-col z-50 max-h-[80vh]">
        <label for="kmenu-search-input" class="sr-only">Search</label>
        <input
          id="kmenu-search-input"
          ref="inputRef"
          v-model="kSearch"
          type="search"
          placeholder="Search posts (title & content)"
          autocomplete="off"
          spellcheck="false"
          class="w-full h-9 p-2 text-sm ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-main shadow-sm rounded-lg text-slate-700 dark:bg-slate-800 dark:ring-0 dark:text-slate-200 dark:highlight-white/5 dark:hover:bg-slate-700 transition"
          @keydown.down.prevent="moveSel(1)"
          @keydown.up.prevent="moveSel(-1)"
          @keydown.enter.prevent="openSelected" />

        <!-- 结果区 -->
        <div class="mt-2 flex-1 min-h-0 overflow-y-auto text-sm">
          <!-- 索引未就绪 -->
          <div v-if="status !== 'ready' && kSearch.trim()" class="py-8 text-center text-zinc-400 dark:text-slate-500">
            <span v-if="status === 'loading'">Loading search index…</span>
            <span v-else-if="status === 'error'">Search index failed to load</span>
            <span v-else>Preparing search…</span>
          </div>
          <!-- 有查询、无结果 -->
          <div v-else-if="kSearch.trim() && status === 'ready' && results.length === 0" class="py-8 text-center text-zinc-400 dark:text-slate-500">
            No results for "<span class="text-slate-600 dark:text-slate-300">{{ kSearch }}</span>"
          </div>
          <!-- 空查询：提示 -->
          <div v-else-if="!kSearch.trim()" class="py-6 text-center text-xs text-zinc-400 dark:text-slate-500">
            Type to search across all posts' titles &amp; content
          </div>
          <!-- 结果列表 -->
          <ul v-else class="flex flex-col gap-1">
            <li v-for="(item, i) in results" :key="item.id">
              <NuxtLink
                :to="item.id"
                class="block px-3 py-2 rounded-lg transition"
                :class="selected === i
                  ? 'bg-main/15 text-text dark:text-dtext'
                  : 'text-zinc-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'"
                @click="closekMenu"
                @mouseenter="selected = i">
                <div class="font-medium truncate">
                  <span v-if="item.snippets?.title" v-html="item.snippets.title"></span>
                  <span v-else>{{ item.title }}</span>
                </div>
                <div v-if="item.snippets?.content" class="text-xs text-zinc-400 dark:text-slate-500 line-clamp-2 mt-1" v-html="item.snippets.content"></div>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- 底部状态栏 -->
        <div v-if="kSearch.trim() && status === 'ready'" class="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[10px] text-zinc-400 dark:text-slate-500 flex items-center justify-between">
          <span>↑ ↓ navigate · ↵ open · Esc close</span>
          <span>{{ results.length }} result{{ results.length === 1 ? '' : 's' }}</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useMagicKeys, useDebounceFn } from '@vueuse/core'

// 搜索结果项的本地类型（与 @nuxt/content 的 SearchResult 保持一致）
interface SearchHit {
  collection: string
  id: string
  title: string
  titles: string[]
  level: number
  content: string
  rank: number
  snippets?: { title?: string, content?: string }
}

// FTS5 全文搜索：基于 SQLite FTS5 的客户端倒排索引
// 索引按需构建（immediate: false），在用户首次打开菜单时再启动，节省首屏资源
const { status, search, init } = useSearchCollection('post', { immediate: false })

const kMenuVisiable = ref(false)
const kSearch = ref('')
const results = ref<SearchHit[]>([])
const selected = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
let lastFocused: HTMLElement | null = null

const { alt_k, ctrl_k, meta_k, escape } = useMagicKeys()

const openkMenu = async () => {
  lastFocused = (document.activeElement as HTMLElement) ?? null
  kMenuVisiable.value = true
  // 首次打开时按需构建 FTS 索引
  if (status.value === 'idle') {
    init()
  }
  await nextTick()
  inputRef.value?.focus()
}

const closekMenu = () => {
  kMenuVisiable.value = false
  kSearch.value = ''
  results.value = []
  selected.value = 0
  // 恢复打开前焦点
  if (lastFocused && typeof lastFocused.focus === 'function') {
    lastFocused.focus()
  }
  lastFocused = null
}

const togglekMenu = () => {
  if (kMenuVisiable.value) closekMenu()
  else openkMenu()
}

// 实际执行搜索（带 debounce），覆盖标题与全文（FTS5 默认同时索引两者）
const runSearch = useDebounceFn(async (q: string) => {
  if (!q.trim()) {
    results.value = []
    selected.value = 0
    return
  }
  if (status.value === 'idle') {
    await init()
  }
  if (status.value !== 'ready') {
    return
  }
  results.value = await search(q, {
    limit: 12,
    snippet: { columns: ['title', 'content'], around: 30 },
  })
  selected.value = 0
}, 150)

watch(kSearch, (v) => {
  runSearch(v)
})

// 索引从 loading 变为 ready 时，如果当前有查询则补跑一次
watch(status, (s) => {
  if (s === 'ready' && kSearch.value.trim()) {
    runSearch(kSearch.value)
  }
})

// 键盘上下选择 / 回车打开
const moveSel = (delta: number) => {
  if (results.value.length === 0) return
  const len = results.value.length
  selected.value = (selected.value + delta + len) % len
}

const openSelected = () => {
  const item = results.value[selected.value]
  if (!item) return
  closekMenu()
  navigateTo(item.id)
}

// 快捷键监听：先声明函数再注册 watch，避免 TDZ
// ⌘+K (Mac) / Ctrl+K (Win/Linux) / Alt+K 都能打开
watchEffect(() => {
  if (ctrl_k.value || alt_k.value || meta_k.value) {
    togglekMenu()
  }
})

watch(escape, (pressed) => {
  if (pressed && kMenuVisiable.value) {
    closekMenu()
  }
})
</script>

<style>
/* 搜索面板过渡 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease-in-out;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* FTS5 片段高亮：在浅色 / 深色主题下都可读 */
mark {
  background: rgba(113, 175, 221, 0.25);
  color: inherit;
  padding: 0 0.15em;
  border-radius: 2px;
}
.dark mark {
  background: rgba(113, 175, 221, 0.35);
}
</style>

<template>
  <aside
    v-if="hasLinks"
    class="article-toc fixed top-1/2 -translate-y-1/2 right-4 md:right-6 z-30 hidden md:block"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div class="flex items-center gap-3 justify-end">
      <!-- 展开后的目录面板（折叠时 max-w-0，展开时 max-w-64 增长） -->
      <div
        :class="[
          'overflow-hidden transition-all duration-200 ease-out',
          isHovered
            ? 'max-w-64 opacity-100'
            : 'max-w-0 opacity-0',
        ]"
      >
        <div
          class="w-64 max-h-[70vh] overflow-y-auto
                 bg-white/95 dark:bg-zinc-900/95 backdrop-blur
                 border border-zinc-200 dark:border-zinc-700
                 rounded-lg shadow-lg p-4"
        >
          <h3
            class="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3"
          >
            Table of Contents
          </h3>
          <ul class="space-y-1 text-sm">
            <li v-for="link in flatLinks" :key="link.id">
              <a
                :href="`#${link.id}`"
                :class="[
                  'block py-0.5 leading-snug truncate',
                  'text-zinc-600 dark:text-zinc-400',
                  'hover:text-text dark:hover:text-dtext',
                  'transition-colors border-l-2 pl-2',
                  activeId === link.id
                    ? '!text-text dark:!text-dtext font-medium border-zinc-500 dark:border-zinc-400'
                    : 'border-transparent',
                ]"
                @click.prevent="scrollToSection(link.id)"
              >
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 收起态：一组横向细短条，每条对应一个标题，右对齐 -->
      <div class="flex flex-col items-end gap-3 shrink-0">
        <div
          v-for="link in flatLinks"
          :key="link.id"
          :class="[
            'h-[2px] rounded-full transition-colors',
            barWidthClass(link.depth),
            activeId === link.id
              ? 'bg-zinc-700 dark:bg-zinc-300'
              : 'bg-zinc-300 dark:bg-zinc-600',
          ]"
        />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
interface TocLink {
  id: string
  depth: number
  text: string
  children?: TocLink[]
}

const props = defineProps<{
  links: TocLink[]
}>()

const isHovered = ref(false)
let closeTimer: ReturnType<typeof setTimeout> | null = null

const onEnter = () => {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
  isHovered.value = true
}

const onLeave = () => {
  // 延迟关闭，避免从短条移到面板时闪烁
  closeTimer = setTimeout(() => {
    isHovered.value = false
    closeTimer = null
  }, 150)
}

// 展平树形结构，仅保留 h2/h3/h4
const flatLinks = computed<TocLink[]>(() => {
  const out: TocLink[] = []
  const walk = (items: TocLink[]) => {
    for (const item of items) {
      if (item.depth >= 2 && item.depth <= 4) {
        out.push(item)
      }
      if (item.children?.length) walk(item.children)
    }
  }
  walk(props.links || [])
  return out
})

const hasLinks = computed(() => flatLinks.value.length > 0)

const indent = (depth: number) => {
  if (depth <= 2) return '0'
  if (depth === 3) return '0.75rem'
  return '1.5rem' // depth 4
}

// h2 最长，h3 居中，h4 最短
const barWidthClass = (depth: number) => {
  if (depth === 2) return 'w-7' // 28px
  if (depth === 3) return 'w-5' // 20px
  return 'w-3' // 12px
}

const activeId = ref<string | null>(null)
let observer: IntersectionObserver | null = null
let headingEls: HTMLElement[] = []
// 点击跳转时锁定 activeId，避免在 smooth scroll 过程中被 observer 改写
let lockUntil = 0
let lockTimer: ReturnType<typeof setTimeout> | null = null

const setupObserver = () => {
  observer?.disconnect()
  observer = null
  headingEls = []
  activeId.value = null

  if (!import.meta.client) return

  headingEls = flatLinks.value
    .map(l => document.getElementById(l.id))
    .filter((el): el is HTMLElement => Boolean(el))

  if (!headingEls.length) return

  observer = new IntersectionObserver(
    (entries) => {
      // 锁定期间不更新 activeId
      if (Date.now() < lockUntil) return

      // 优先取当前可见的、距离顶部最近的标题
      const visible = entries
        .filter(e => e.isIntersecting)
        .map(e => ({ id: e.target.id, top: e.boundingClientRect.top }))
        .sort((a, b) => a.top - b.top)

      if (visible.length) {
        activeId.value = visible[0].id
        return
      }

      // 没有可见标题时（刚跨过 trigger 区），找最后经过的那一个
      const triggerTop = 120
      let bestId: string | null = null
      let bestTop = -Infinity
      for (const h of headingEls) {
        const top = h.getBoundingClientRect().top
        if (top <= triggerTop && top > bestTop) {
          bestTop = top
          bestId = h.id
        }
      }
      if (bestId) activeId.value = bestId
    },
    {
      // 触发区：顶部 80px 之下、视口 40% 高度之上
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0,
    }
  )

  headingEls.forEach(h => observer!.observe(h))
}

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  // 立即锁定 activeId 并屏蔽 observer 一段时间，覆盖 smooth scroll 全程
  activeId.value = id
  lockUntil = Date.now() + 1500
  if (lockTimer) clearTimeout(lockTimer)
  lockTimer = setTimeout(() => {
    lockUntil = 0
    lockTimer = null
  }, 1500)
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

onMounted(() => {
  setupObserver()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  if (closeTimer) clearTimeout(closeTimer)
  if (lockTimer) clearTimeout(lockTimer)
})

// 切换文章时重新挂载 observer
watch(
  () => props.links,
  () => {
    nextTick(() => setupObserver())
  },
  { flush: 'post' }
)
</script>

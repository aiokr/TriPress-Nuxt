<template>
  <NuxtLayout>
    <NuxtPage />
    <KMenu />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted, nextTick, onBeforeUnmount } from 'vue'
import '@/assets/article.css'
import '@/assets/tripper.css'

const route = useRoute()

function isScrollable(el: HTMLElement): boolean {
  const style = getComputedStyle(el)
  return (
    style.overflowY === 'auto' || style.overflowY === 'scroll' ||
    style.overflowX === 'auto' || style.overflowX === 'scroll'
  )
}

function isVerticallyScrollable(el: HTMLElement): boolean {
  const style = getComputedStyle(el)
  return (
    (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
    el.scrollHeight > el.clientHeight
  )
}

function findScrollContainer(el: HTMLElement | null): HTMLElement | Window {
  let cur: HTMLElement | null = el
  while (cur && cur !== document.body) {
    if (isScrollable(cur)) {
      return cur
    }
    cur = cur.parentElement
  }
  if (el) {
    for (const node of Array.from(el.querySelectorAll<HTMLElement>('*'))) {
      if (isVerticallyScrollable(node)) {
        return node
      }
    }
  }
  return window
}

const scrollPositions = new Map<string, number>()

let activeContainer: HTMLElement | Window | null = null
let activeHandler: (() => void) | null = null

function unbindScrollListener() {
  if (activeContainer && activeHandler) {
    if (activeContainer === window) {
      window.removeEventListener('scroll', activeHandler)
    } else {
      activeContainer.removeEventListener('scroll', activeHandler)
    }
  }
  activeContainer = null
  activeHandler = null
}

function bindScrollListener(container: HTMLElement | Window) {
  unbindScrollListener()
  activeContainer = container
  activeHandler = () => {
    const top = container === window
      ? window.scrollY
      : (container as HTMLElement).scrollTop
    scrollPositions.set(route.path, top)
  }
  if (container === window) {
    window.addEventListener('scroll', activeHandler, { passive: true })
  } else {
    container.addEventListener('scroll', activeHandler, { passive: true })
  }
}

function scrollContainerTo(container: HTMLElement | Window, top: number) {
  if (container === window) {
    window.scrollTo({ top, behavior: 'instant' as ScrollBehavior })
  } else {
    ;(container as HTMLElement).scrollTo({ top, behavior: 'instant' as ScrollBehavior })
  }
}

async function setupScrollContainer(restore: boolean) {
  await nextTick()
  const mainElement = document.querySelector('#main-content') ?? document.querySelector('main')
  const container = findScrollContainer(mainElement)

  bindScrollListener(container)

  if (!restore) return
  const saved = scrollPositions.get(route.path)
  scrollContainerTo(container, saved ?? 0)
}

// 初始加载只绑定监听，强制回顶会打断浏览器原生的刷新后滚动恢复
onMounted(() => setupScrollContainer(false))
watch(() => route.path, () => setupScrollContainer(true))

onBeforeUnmount(() => {
  unbindScrollListener()
})

useHead({
  title: 'Tripper Press - Take Photo, Think Seriously',
  meta: [
    { name: 'description', content: 'Take Photo, Think Seriously' }
  ],
  link: [
    { type: 'application/atom+xml', rel: 'alternate', title: 'Tripper Press Atom Feed', href: '/atom.xml' },
  ],
})
useSeoMeta({
  title: 'Tripper Press - Take Photo, Think Seriously',
  ogTitle: 'Tripper Press - Take Photo, Think Seriously',
  description: 'Take Photo, Think Seriousl',
  ogDescription: 'Take Photo, Think Seriousl'
})

onMounted(() => {
  if (import.meta.env.DEV) return

  const script = document.createElement('script')
  script.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-NFSZVFRX');`
  script.onerror = () => {}
  document.head.appendChild(script)
})

</script>


<style>
body {
  color: #222831;
}

.dark body {
  background: #18181B;
  color: #E2E2E2;
}
</style>
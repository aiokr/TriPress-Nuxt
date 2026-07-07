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

// 找到 main 元素最近的可滚动祖先（处理 default.vue 用 w-screen h-screen overflow-auto
// 作为滚动容器的情况；如果没有可滚动祖先，则回退到 window）
function findScrollContainer(el: HTMLElement | null): HTMLElement | Window {
  let cur: HTMLElement | null = el
  while (cur && cur !== document.body) {
    const style = getComputedStyle(cur)
    if (
      style.overflowY === 'auto' || style.overflowY === 'scroll' ||
      style.overflowX === 'auto' || style.overflowX === 'scroll'
    ) {
      return cur
    }
    cur = cur.parentElement
  }
  return window
}

// 每个路由的滚动位置记忆（用于返回时恢复原位置）
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

watch(() => route.path, async () => {
  await nextTick()
  const mainElement = document.querySelector('main')
  const container = findScrollContainer(mainElement)

  // 在新的容器上监听滚动，实时记录当前位置
  bindScrollListener(container)

  // 优先恢复上次保存的滚动位置；新页面则回顶部
  const saved = scrollPositions.get(route.path)
  scrollContainerTo(container, saved ?? 0)
})

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
  script: [
    { src: 'https://analytics.tripper.press/script.js', 'data-website-id': '75e35015-2599-4413-a688-da55060b9599' },
  ],
})
useSeoMeta({
  title: 'Tripper Press - Take Photo, Think Seriously',
  ogTitle: 'Tripper Press - Take Photo, Think Seriously',
  description: 'Take Photo, Think Seriousl',
  ogDescription: 'Take Photo, Think Seriousl'
})

onMounted(() => {
  const script = document.createElement('script')
  script.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-NFSZVFRX');`
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
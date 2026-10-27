<script setup lang="ts">
/**
 * 将 ` ```mermaid ` 代码块渲染为可交互的 Mermaid 图表。
 * 在客户端加载 mermaid 并调用 render() 生成 SVG，避免 SSR 期间引入 DOM 依赖。
 */
const props = defineProps<{
  code: string
}>()

const colorMode = useColorMode()

const svg = ref('')
const error = ref<string | null>(null)

let renderId = 0

/**
 * 给 mermaid 提供一个离屏渲染宿主。
 *
 * mermaid.render(id, code) 不传第三个参数时，会把一个装着整张图的临时 div 直接
 * 追加到 document.body（见 mermaid 内部 render 实现）。这个临时节点位于应用外壳
 * （h-screen 滚动容器）之外：页面加载时它会让 body 超出视口，触发窗口级的纵向、
 * 横向滚动条；而本站外壳是 100vw 宽，滚动条一出现，底部就会闪出横向滚动条，
 * 内容也随之左右跳动。
 *
 * 这里改为传入一个固定在视口外、overflow:hidden 的容器：排版、测量和绘制都在
 * 容器内部完成，不再参与文档尺寸计算；渲染完成后组件只取回 SVG 字符串。
 */
function createRenderHost(): HTMLDivElement {
  const host = document.createElement('div')
  host.setAttribute('aria-hidden', 'true')
  // 用离屏的 fixed 容器而不是 display: none：后者会让元素脱离布局，mermaid 内部的
  // getBBox / getBoundingClientRect 量不到尺寸。
  host.style.cssText = [
    'position: fixed',
    'top: 0',
    'left: -30000px',
    'width: 100vw',
    'height: 100vh',
    'overflow: hidden',
  ].join('; ')
  document.body.appendChild(host)
  return host
}

async function render() {
  if (!import.meta.client) return
  error.value = null
  const { default: mermaid } = await import('mermaid')
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: colorMode.value === 'dark' ? 'dark' : 'default',
    fontFamily: 'inherit',
  })
  const id = `mermaid-${Date.now()}-${renderId++}`
  const host = createRenderHost()
  try {
    const { svg: result } = await mermaid.render(id, props.code, host)
    svg.value = result
  } catch (e) {
    console.error('[Mermaid] failed to render:', e)
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    // mermaid 只删它自己的临时节点（失败时还会残留），宿主必须由这里移除，
    // 否则每次渲染都会在 body 上堆积一个离屏容器
    host.remove()
  }
}

onMounted(render)
watch(colorMode, () => render())
</script>

<template>
  <figure class="mermaid not-prose my-6">
    <div v-if="error"
      class="rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-4">
      <div class="mb-2 text-sm font-semibold text-red-600 dark:text-red-400">Mermaid 渲染失败</div>
      <pre class="whitespace-pre-wrap break-words font-mono text-xs text-red-700 dark:text-red-300"><code>{{ code }}</code></pre>
    </div>
    <div v-else-if="svg" class="mermaid-svg overflow-x-auto" v-html="svg" />
    <div v-else
      class="flex items-center justify-center rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 py-10 text-sm text-zinc-400 dark:text-dtext/50">
      加载图表中…
    </div>
  </figure>
</template>

<style scoped>
.mermaid-svg :deep(svg) {
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  display: block;
}
</style>

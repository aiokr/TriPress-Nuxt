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
  try {
    const { svg: result } = await mermaid.render(id, props.code)
    svg.value = result
  } catch (e) {
    console.error('[Mermaid] failed to render:', e)
    error.value = e instanceof Error ? e.message : String(e)
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

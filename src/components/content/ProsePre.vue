<script setup lang="ts">
/**
 * 覆盖默认的 prose-pre 组件。
 * 当代码块语言为 mermaid 时，用 Mermaid 组件渲染图表；
 * 其余代码块保持默认的 <pre> 行为。
 */
const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array,
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  }
})

const isMermaid = computed(() => props.language?.toLowerCase() === 'mermaid')
</script>

<template>
  <Mermaid v-if="isMermaid" :code="code" />
  <pre v-else :class="$props.class"><slot /></pre>
</template>

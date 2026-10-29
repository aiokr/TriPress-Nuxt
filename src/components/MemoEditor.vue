<template>
  <ClientOnly>
    <div ref="editorRef" class="memo-editor" />
    <template #fallback>
      <div class="memo-editor-fallback whitespace-pre-wrap">{{ props.content }}</div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Editor } from '@usememos/editor'
import '@usememos/editor/style.css'

interface Props {
  content: string
}

const props = defineProps<Props>()

const editorRef = ref<HTMLElement | null>(null)
let editor: Editor | null = null

function createEditor(element: HTMLElement) {
  if (editor) return
  editor = new Editor({
    element,
    content: props.content,
    editable: false,
    markdown: { breaks: true, setext: false },
    placeholder: '',
    theme: {
      colorScheme: 'auto',
    },
    toolbar: false,
    slashMenu: false,
    onLinkClick: () => true,
  })
}

// ClientOnly 的默认插槽要等它自身 mounted 之后的下一轮渲染才会出现，
// 那时本组件的 onMounted 已经执行完、editorRef 仍为 null，
// 直接写在 onMounted 里会导致编辑器永远不会初始化（正文为空）。
// 所以监听模板 ref，等元素真正挂载后再创建编辑器。
watch(editorRef, (element) => {
  if (element) createEditor(element)
}, { flush: 'post' })

onUnmounted(() => {
  editor?.destroy()
  editor = null
})

watch(() => props.content, (newContent) => {
  if (editor && newContent !== editor.getMarkdown()) {
    editor.setMarkdown(newContent)
  }
})
</script>

<style scoped>
/* 编辑器根节点会带上 .mbe-root，其自身样式把字号固定为 16px，
   这里让正文沿用引用的字号（.quote-body 的 22px）。 */
.memo-editor {
  font-size: inherit;
  line-height: inherit;
}
</style>
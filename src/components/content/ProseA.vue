<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  href?: string
  target?: string
}>()

const attrs = useAttrs()

// 原生锚点会滚动目标所在的容器；路由链接只滚动窗口。
const isFootnote = () => props.href?.startsWith('#') && (
  'data-footnote-ref' in attrs || 'data-footnote-backref' in attrs
)
</script>

<template>
  <a v-if="isFootnote()" v-bind="attrs" :href="props.href" :target="props.target">
    <slot />
  </a>
  <NuxtLink v-else v-bind="attrs" :href="props.href" :target="props.target">
    <slot />
  </NuxtLink>
</template>

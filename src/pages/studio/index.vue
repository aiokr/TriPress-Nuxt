<script setup lang="ts">
definePageMeta({ layout: 'studio' })

// Studio 功能首页：重定向到 travel 编辑
await navigateTo('/studio/travel', { replace: true })
</script>

<template>
  <div />
</template>

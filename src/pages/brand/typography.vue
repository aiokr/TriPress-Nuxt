<template>
  <section class="max-w-[1000px] mx-auto py-10 lg:py-16">
    <h1 class="heading-1 text-fg pb-6">Typography</h1>

    <h2 class="heading-2 text-fg pb-6">Type Scale</h2>

    <div>
      <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b py-5">
        <p class="heading-1 text-fg">页面标题 Heading 1</p>
        <p class="text-sm text-fg-subtle md:ml-auto">heading-1</p>
        <p class="w-full caption text-fg-subtle pt-1">font-size 36px (30px in mobile) · font-weight 700 · line-height 1.2 · letter-spacing -0.035em</p>
      </div>
      <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b py-5">
        <p class="heading-2 text-fg">章节标题 Heading 2</p>
        <p class="text-sm text-fg-subtle md:ml-auto">heading-2</p>
        <p class="w-full caption text-fg-subtle pt-1">font-size 28px (24px in mobile) · font-weight 600 · line-height 1.3 · letter-spacing -0.028em</p>
      </div>
      <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b py-5">
        <p class="heading-3 text-fg">小节标题 Heading 3</p>
        <p class="text-sm text-fg-subtle md:ml-auto">heading-3</p>
        <p class="w-full caption text-fg-subtle pt-1">font-size 22px (20px in mobile) · font-weight 600 · line-height 1.4 · letter-spacing -0.02em</p>
      </div>
      <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b py-5">
        <p class="heading-4 text-fg">段落标题 Heading 4</p>
        <p class="text-sm text-fg-subtle md:ml-auto">heading-4</p>
        <p class="w-full caption text-fg-subtle pt-1">font-size 18px (17px in mobile) · font-weight 600 · line-height 1.5 · letter-spacing -0.012em</p>
      </div>
      <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b py-5">
        <p class="heading-5 text-fg">强调小标题 Heading 5</p>
        <p class="text-sm text-fg-subtle md:ml-auto">heading-5</p>
        <p class="w-full caption text-fg-subtle pt-1">font-size 16px · font-weight 600 · line-height 1.5 · letter-spacing normal</p>
      </div>
      <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b py-5">
        <p class="heading-6 text-fg">眉题 Heading 6 · Eyebrow</p>
        <p class="text-sm text-fg-subtle md:ml-auto">heading-6</p>
        <p class="w-full caption text-fg-subtle pt-1">font-size 16px · font-weight 500 · line-height 1.5 · letter-spacing 0.02em · uppercase</p>
      </div>
      <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b py-5">
        <p class="article-body text-fg">正文段落 Article Body</p>
        <p class="text-sm text-fg-subtle md:ml-auto">article-body</p>
        <p class="w-full caption text-fg-subtle pt-1">font-size 16px (15.5px in mobile) · font-weight 400 · line-height 1.75 · letter-spacing -0.003em</p>
      </div>
      <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1  py-5">
        <p class="caption text-fg-subtle">图注与辅助说明 Caption</p>
        <p class="text-sm text-fg-subtle md:ml-auto">caption</p>
        <p class="w-full caption text-fg-subtle pt-1">font-size 14px · font-weight 400 · line-height 1.5 · letter-spacing normal</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'brand',
})

useHead({
  title: 'Brand - Typography',
})

useSeoMeta({
  title: 'Brand - Typography',
  ogTitle: 'Brand - Typography',
})
</script>

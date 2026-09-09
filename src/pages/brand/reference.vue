<template>
  <section class="max-w-[1000px] mx-auto py-10 lg:py-16">
    <h1 class="heading-1 text-fg pb-6">Reference</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="flex-1 flex flex-col rounded">
        <div class="bg-[#007CFF] text-white p-4 text-lg font-bold rounded-t">Kimi Brand</div>
        <div class="bg-sub-bg p-4 rounded-b h-full">
          <a target="_blank" class="text-text underline decoration-[2px] underline-offset-[3px] decoration-[#71afdd]"
            href="https://www.kimi.ai/zh-hans/resources/kimi-brand">
            https://www.kimi.ai/zh-hans/resources/kimi-brand
          </a>
        </div>
      </div>
      <div class="flex-1 flex flex-col rounded">
        <div class="bg-[#171717] text-white p-4 text-lg font-bold rounded-t">Vercel Geist Design System</div>
        <div class="bg-sub-bg p-4 rounded-b h-full">
          <a target="_blank" class="text-text underline decoration-[2px] underline-offset-[3px] decoration-[#71afdd]"
            href="https://vercel.com/geist/brands">
            https://vercel.com/geist/brands
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'brand',
})

useHead({
  title: 'Brand - Reference',
})

useSeoMeta({
  title: 'Brand - Reference',
  ogTitle: 'Brand - Reference',
})
</script>

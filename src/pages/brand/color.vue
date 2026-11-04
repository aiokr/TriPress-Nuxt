<template>
  <section class="max-w-[1000px] mx-auto py-10 lg:py-16">
    <h1 class="heading-1 text-fg pb-6">Color System</h1>

    <h2 class="heading-2 text-fg pb-6">Brand Color</h2>

    <article class="text-fg">
      <p>The brand color palette of TriPress is anchored by sky blue as its
        primary hue, complemented by a vibrant
        orange that conveys fervor and intensity, and a cool purple that underscores calmness and composure, from which
        a nine-tier chromatic scale is derived.</p>
      <p>TriPress 品牌视觉体系以天空蓝为核心主色，辅以表现热烈张力的橙色与传递冷静质感的紫色作为品牌辅色，并在此基础上构建包含九个层级的色阶系统。</p>
    </article>

    <div class="grid grid-cols-3 md:grid-cols-7 gap-4 pb-6">
      <ColorSwatch name="primary" hex="#71afdd" class="h-20 bg-main rounded text-white" />
      <ColorSwatch name="accent-warm" hex="#e69d65" class="h-20 bg-accent-warm rounded text-white" />
      <ColorSwatch name="accent-cold" hex="#8279d2" class="h-20 bg-accent-cold rounded text-white" />
    </div>

    <div class="w-full h-48 md:h-16 overflow-hidden rounded mb-4 grid grid-cols-4 md:grid-cols-9">
      <ColorSwatch name="primary-50" hex="#eaf3fa" class="bg-primary-50 text-[#222831]" />
      <ColorSwatch name="primary-100" hex="#cae1f2" class="bg-primary-100 text-[#222831]" />
      <ColorSwatch name="primary-200" hex="#a0cae8" class="bg-primary-200 text-[#222831]" />
      <ColorSwatch name="primary-300" hex="#71afdd" class="bg-primary-300 text-white" />
      <ColorSwatch name="primary-400" hex="#4697d3" class="bg-primary-400 text-white" />
      <ColorSwatch name="primary-500" hex="#2c7db9" class="bg-primary-500 text-white" />
      <ColorSwatch name="primary-600" hex="#236494" class="bg-primary-600 text-white" />
      <ColorSwatch name="primary-700" hex="#1c4e73" class="bg-primary-700 text-white" />
      <ColorSwatch name="primary-800" hex="#143852" class="bg-primary-800 text-white" />
    </div>

    <div class="w-full h-48 md:h-16 overflow-hidden rounded mb-4 grid grid-cols-4 md:grid-cols-9">
      <ColorSwatch name="accent-warm-50" hex="#fbf1e9" class="bg-accent-warm-50 text-[#222831]" />
      <ColorSwatch name="accent-warm-100" hex="#f6dbc6" class="bg-accent-warm-100 text-[#222831]" />
      <ColorSwatch name="accent-warm-200" hex="#efbf9a" class="bg-accent-warm-200 text-[#222831]" />
      <ColorSwatch name="accent-warm-300" hex="#e69d65" class="bg-accent-warm-300 text-white" />
      <ColorSwatch name="accent-warm-400" hex="#df813a" class="bg-accent-warm-400 text-white" />
      <ColorSwatch name="accent-warm-500" hex="#c56820" class="bg-accent-warm-500 text-white" />
      <ColorSwatch name="accent-warm-600" hex="#9e531a" class="bg-accent-warm-600 text-white" />
      <ColorSwatch name="accent-warm-700" hex="#7b4114" class="bg-accent-warm-700 text-white" />
      <ColorSwatch name="accent-warm-800" hex="#582e0e" class="bg-accent-warm-800 text-white" />
    </div>

    <div class="w-full h-48 md:h-16 overflow-hidden rounded mb-4 grid grid-cols-4 md:grid-cols-9">
      <ColorSwatch name="accent-cold-50" hex="#edecf9" class="bg-accent-cold-50 text-[#222831]" />
      <ColorSwatch name="accent-cold-100" hex="#d1cdee" class="bg-accent-cold-100 text-[#222831]" />
      <ColorSwatch name="accent-cold-200" hex="#ada7e2" class="bg-accent-cold-200 text-[#222831]" />
      <ColorSwatch name="accent-cold-300" hex="#8279d2" class="bg-accent-cold-300 text-white" />
      <ColorSwatch name="accent-cold-400" hex="#5e53c6" class="bg-accent-cold-400 text-white" />
      <ColorSwatch name="accent-cold-500" hex="#4539ac" class="bg-accent-cold-500 text-white" />
      <ColorSwatch name="accent-cold-600" hex="#372e8a" class="bg-accent-cold-600 text-white" />
      <ColorSwatch name="accent-cold-700" hex="#2b246b" class="bg-accent-cold-700 text-white" />
      <ColorSwatch name="accent-cold-800" hex="#1f194d" class="bg-accent-cold-800 text-white" />
    </div>


    <h2 class="heading-2 text-fg pt-12 pb-6">Foundational Color</h2>
    <article class="text-fg">
      <p>Concurrently, foundational colors have been designated for the
        display of primary elements, including text and backgrounds, with the deliberate aim of ensuring maximum visual
        prominence and legibility.</p>
      <p>同时，另设基础色，专用于文字、背景等核心视觉元素的呈现，以确保视觉层次清晰、信息传达醒目有力。</p>
    </article>

    <div class="w-full h-48 md:h-16 overflow-hidden rounded mb-4 grid grid-cols-4 md:grid-cols-11">
      <ColorSwatch name="frost-25" hex="#f9fafb" class="bg-frost-25 text-[#222831]" />
      <ColorSwatch name="frost-50" hex="#f3f4f7" class="bg-frost-50 text-[#222831]" />
      <ColorSwatch name="frost-100" hex="#eaedf0" class="bg-frost-100 text-[#222831]" />
      <ColorSwatch name="frost-200" hex="#d8dde4" class="bg-frost-200 text-[#222831]" />
      <ColorSwatch name="frost-300" hex="#bdc5d1" class="bg-frost-300 text-[#222831]" />
      <ColorSwatch name="frost-400" hex="#99a5b8" class="bg-frost-400 text-[#222831]" />
      <ColorSwatch name="frost-500" hex="#74859f" class="bg-frost-500 text-white" />
      <ColorSwatch name="frost-600" hex="#58677e" class="bg-frost-600 text-white" />
      <ColorSwatch name="frost-700" hex="#3f4a5a" class="bg-frost-700 text-white" />
      <ColorSwatch name="frost-800" hex="#222831" class="bg-frost-800 text-white" />
      <ColorSwatch name="frost-900" hex="#13161b" class="bg-frost-900 text-white" />
    </div>

    <div class="w-full h-48 md:h-16 overflow-hidden rounded mb-4 grid grid-cols-4 md:grid-cols-11">
      <ColorSwatch name="neutral-25" hex="#fafafa" class="bg-neutral-25 text-black" />
      <ColorSwatch name="neutral-50" hex="#f4f4f4" class="bg-neutral-50 text-black" />
      <ColorSwatch name="neutral-100" hex="#ededed" class="bg-neutral-100 text-black" />
      <ColorSwatch name="neutral-200" hex="#dcdcdc" class="bg-neutral-200 text-black" />
      <ColorSwatch name="neutral-300" hex="#c4c4c4" class="bg-neutral-300 text-black" />
      <ColorSwatch name="neutral-400" hex="#a4a4a4" class="bg-neutral-400 text-black" />
      <ColorSwatch name="neutral-500" hex="#848484" class="bg-neutral-500 text-black" />
      <ColorSwatch name="neutral-600" hex="#666666" class="bg-neutral-600 text-white" />
      <ColorSwatch name="neutral-700" hex="#494949" class="bg-neutral-700 text-white" />
      <ColorSwatch name="neutral-800" hex="#282828" class="bg-neutral-800 text-white" />
      <ColorSwatch name="neutral-900" hex="#161616" class="bg-neutral-900 text-white" />
    </div>

    <div class="w-full h-48 md:h-16 overflow-hidden rounded mb-4 grid grid-cols-4 md:grid-cols-11">
      <ColorSwatch name="stone-50" hex="#fafaf9" class="bg-stone-50 text-black" />
      <ColorSwatch name="stone-100" hex="#f5f5f4" class="bg-stone-100 text-black" />
      <ColorSwatch name="stone-200" hex="#e7e5e4" class="bg-stone-200 text-black" />
      <ColorSwatch name="stone-300" hex="#d6d3d1" class="bg-stone-300 text-black" />
      <ColorSwatch name="stone-400" hex="#a8a29e" class="bg-stone-400 text-black" />
      <ColorSwatch name="stone-500" hex="#78716c" class="bg-stone-500 text-white" />
      <ColorSwatch name="stone-600" hex="#57534e" class="bg-stone-600 text-white" />
      <ColorSwatch name="stone-700" hex="#44403c" class="bg-stone-700 text-white" />
      <ColorSwatch name="stone-800" hex="#292524" class="bg-stone-800 text-white" />
      <ColorSwatch name="stone-900" hex="#1c1917" class="bg-stone-900 text-white" />
      <ColorSwatch name="stone-950" hex="#0c0a09" class="bg-stone-950 text-white" />
    </div>

    <BrandColorUsage />

  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'brand',
})

useHead({
  title: 'Brand - Color',
})

useSeoMeta({
  title: 'Brand - Color',
  ogTitle: 'Brand - Color',
})
</script>

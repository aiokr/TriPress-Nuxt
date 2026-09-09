<template>
  <section class="max-w-[1000px] mx-auto py-10 lg:py-16">
    <div class="pb-4">
      <h1 class="heading-1 text-fg pb-4">TriPress Brand Guidelines</h1>
      <p class="article-body text-fg-muted">
        The design language of TriPress: color, typography, and the principles that keep every surface consistent.
      </p>
      <a v-if="brandUpdatedAt" class="inline-block text-sm text-sub-text dark:text-dsub-text pt-4"
        href="https://github.com/aiokr/TriPress-Nuxt/commits/master/src/pages/brand" target="_blank">Last
        Updated: {{ brandUpdatedAt }}</a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
      <NuxtLink v-for="item in entries" :key="item.to" :to="item.to"
        class="group flex flex-col rounded border p-6 transition-colors hover:border-main">
        <div class="flex items-baseline justify-between pb-3">
          <h2 class="text-lg font-bold text-fg">{{ item.title }}</h2>
          <span class="text-fg-subtle transition-transform duration-200 group-hover:translate-x-1">→</span>
        </div>
        <p class="caption">{{ item.desc }}</p>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'brand',
})

const { public: { brandUpdatedAt } } = useRuntimeConfig()

useHead({
  title: 'Brand',
})

useSeoMeta({
  title: 'Brand',
  ogTitle: 'Brand',
})

const entries = [
  {
    to: '/brand/color',
    title: 'Color',
    desc: 'Brand, foundational, and semantic color system.',
  },
  {
    to: '/brand/typography',
    title: 'Typography',
    desc: 'Type scale and typography guidelines.',
  },
  {
    to: '/brand/combination',
    title: 'Combination',
    desc: 'Color and typography in combination, in light and dark.',
  },
  {
    to: '/brand/reference',
    title: 'Reference',
    desc: 'Design references and inspirations.',
  },
]
</script>

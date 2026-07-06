<template>
  <div class="container max-w-[1000px] mx-auto pt-20 px-4">
    <div class="pb-6">
      <div class="text-3xl font-bold text-text dark:text-dtext pb-2">Lab</div>
      <div class="text-dtext pb-16">
        A collection of small tools and experiments.
      </div>
      <hr />
    </div>
    <div class="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <NuxtLink
        v-for="tool in tools"
        :key="tool.name"
        :to="tool.link"
        class="block border rounded-xl p-5 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 bg-white/40 dark:bg-zinc-900/40">
        <div class="flex items-center gap-3 pb-3">
          <div class="w-10 h-10 rounded-lg bg-main/10 flex items-center justify-center text-main font-bold text-lg">
            {{ tool.name.charAt(0) }}
          </div>
          <div class="text-lg font-bold text-text dark:text-dtext">{{ tool.name }}</div>
        </div>
        <div class="text-sm text-slate-500 dark:text-slate-400 pb-3">
          {{ tool.description }}
        </div>
        <div class="text-xs text-main inline-flex items-center gap-1">
          Open
          <span>&rarr;</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const tools = [
  {
    name: 'Trade Lab',
    description: '投资研究工具集 — 跟踪市场、记录交易、分析收益。',
    link: '/lab/trade',
  },
  {
    name: 'Englisg Learning Tools',
    description: 'C',
    link: '',
  },
]

useHead({
  title: 'Lab - Tripper Press',
  meta: [
    { name: 'description', content: 'A collection of small tools and experiments.' }
  ]
})

useSeoMeta({
  title: 'Lab - Tripper Press',
  ogTitle: 'Lab - Tripper Press',
  description: 'A collection of small tools and experiments.',
  ogDescription: 'A collection of small tools and experiments.'
})
</script>

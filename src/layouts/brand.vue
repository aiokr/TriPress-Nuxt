<script setup lang="ts">
const navItems = [
  { path: '/brand', label: 'Introduction', exact: true },
  { path: '/brand/color', label: 'Color' },
  { path: '/brand/typography', label: 'Typography' },
  { path: '/brand/combination', label: 'Combination' },
  { path: '/brand/reference', label: 'Reference' },
]

const route = useRoute()

function isActive(item: (typeof navItems)[number]) {
  return item.exact ? route.path === item.path : route.path.startsWith(item.path)
}
</script>

<template>
  <NuxtLayout name="default">
    <div class="h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      <nav class="lg:hidden flex gap-2 overflow-x-auto px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shrink-0 w-full">
        <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path"
          class="shrink-0 px-3 py-1.5 rounded-full text-sm transition-colors"
          :class="isActive(item)
            ? 'bg-main/10 text-main font-medium'
            : 'text-fg-muted bg-sub-bg dark:bg-white/5'">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <aside
        class="hidden lg:block shrink-0 w-52 ml-[max(1rem,calc((100vw-1200px)/2+1rem))] mr-10 overflow-y-auto py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <nav class="flex flex-col gap-1">
          <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path"
            class="flex items-baseline justify-between px-3 py-2 rounded text-sm transition-colors"
            :class="isActive(item)
              ? 'bg-main/10 text-main font-medium'
              : 'text-fg-muted hover:bg-hover hover:text-fg'">
            <span>{{ item.label }}</span>
          </NuxtLink>
        </nav>
      </aside>

      <div class="flex-1 min-w-0 min-h-0 overflow-y-auto">
        <div class="px-4 lg:pl-0 lg:pr-[max(1rem,calc((100vw-1200px)/2+1rem))]">
          <slot />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

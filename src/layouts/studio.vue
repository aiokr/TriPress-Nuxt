<script setup lang="ts">
const route = useRoute()

const navItems = [
  { key: 'travel', label: 'Travel 足迹', icon: '🗺️', to: '/studio/travel' },
]

function isActive(to: string) {
  return route.path.startsWith(to)
}
</script>

<template>
  <div class="h-screen flex overflow-hidden">
    <!-- 左侧全局侧边栏 -->
    <aside class="w-[220px] shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dbg flex flex-col">
      <div class="px-4 py-5 border-b border-zinc-100 dark:border-zinc-800">
        <NuxtLink to="/studio" class="text-lg font-bold text-text dark:text-dtext hover:opacity-80 transition">Studio</NuxtLink>
      </div>
      <nav class="flex flex-col gap-1 p-2 flex-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.key"
          :to="item.to"
          class="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition text-left w-full"
          :class="
            isActive(item.to)
              ? 'bg-main/10 text-main font-medium'
              : 'text-zinc-600 dark:text-dtext/70 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          "
        >
          <span class="text-base leading-none">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </aside>

    <!-- 右侧功能区 -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <slot />
    </div>
  </div>
</template>

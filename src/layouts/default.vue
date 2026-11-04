<script setup lang="ts">
import Header from '@/components/Header.vue';

const route = useRoute()
const isBrandRoute = computed(() => route.path.startsWith('/brand'))
const isStudioRoute = computed(() => route.path.startsWith('/studio'))
</script>

<template>
  <div class="w-full h-screen overflow-auto">
    <a href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-1.5 focus:rounded focus:bg-action focus:text-on-action focus:shadow">
      Skip to content
    </a>
    <div class="common-layout">
      <Header v-if="!isStudioRoute" />
      <main id="main-content" tabindex="-1">
        <slot />
      </main>
      <Footer v-if="!isBrandRoute && !isStudioRoute" />
    </div>
  </div>
</template>

<style>
.el-aside {
  height: calc(100vh - 64px);
  transition: width 0.3s ease;
  scrollbar-width: none;
  overflow: hidden;

}

.el-container {
  transition: width 0.3s ease;
}
</style>

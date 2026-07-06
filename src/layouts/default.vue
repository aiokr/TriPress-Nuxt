<script setup lang="ts">
import Header from '@/components/Header.vue';
</script>

<template>
  <div class="w-screen h-screen overflow-auto">
    <a href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-1.5 focus:rounded focus:bg-main focus:text-white focus:shadow">
      Skip to content
    </a>
    <div class="common-layout">
      <div aria-hidden="true" class="fixed top-0 right-0 left-0 h-12 w-full px-36 flex blur-3xl -z-50">
        <div class="bg-main/40 flex-1 h-full"></div>
        <div class="bg-purple-300/40 w-1/5 h-full"></div>
        <div class="bg-pink-300/30 w-2/5 h-full"></div>
      </div>
      <Header />
      <main id="main-content" tabindex="-1">
        <slot />
      </main>
      <Footer />
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
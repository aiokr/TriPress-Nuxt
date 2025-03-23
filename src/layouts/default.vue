<script setup lang="ts">
import Header from '@/components/Header.vue';
</script>

<template>
  <main class="w-screen h-screen overflow-auto">
    <div class="common-layout">
      <div class="fixed top-0 right-0 left-0 h-12 w-full px-36 flex blur-3xl -z-50">
        <div class="bg-main/40 flex-1 h-full"></div>
        <div class="bg-purple-300/40 w-1/5 h-full"></div>
        <div class="bg-pink-300/30 w-2/5 h-full"></div>
      </div>
      <Header />
      <slot />
      <Footer />
    </div>
  </main>
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
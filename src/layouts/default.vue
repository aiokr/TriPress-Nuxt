<script setup lang="ts">
import Header from '@/components/Header.vue';
</script>

<template>
  <main class="w-screen h-screen overflow-auto">
    <div class="common-layout">
      <Header />
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
<template>
  <main class="w-screen h-screen overflow-auto">
    <div class="flex gap-2">
      <div class="categories w-64 border sticky">
        <div v-for="category in allCategories" :key="category" class="category">{{ category }}</div>
      </div>
      <div class="posts"></div>
      <div class="fixed top-0 right-0 left-0 h-12 w-full px-36 flex blur-3xl">
        <div class="bg-main/40 flex-1 h-full"></div>
        <div class="bg-purple-300/40 w-1/5 h-full"></div>
        <div class="bg-pink-300/30 w-2/5 h-full"></div>
      </div>
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
const posts = await queryContent("/post").only(["_path", "title", "date", "category", "cover"]).sort({ date: -1 }).find();
const allCategories = Array.from(new Set(posts.map((post) => post.category).filter((category) => category !== undefined)));
</script>

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
<template>
  <main class="bg-white/60 backdrop-blur-lg fixed top-0 left-0 right-0">
    <div class="container max-w-[1200px] mx-auto px-3 flex items-center justify-between  h-16">
     <router-link to="/">
      <img src="https://imgur.lzmun.com/picgo/after2022/tripper2colorfull.png_avatar" alt="logo" class="rounded-full w-8 h-8  mr-auto" />
      </router-link>
      <div class="flex gap-4">
        <router-link to="/" class="headerLink mr-4">Home</router-link>
        <router-link to="/about" class="headerLink">About</router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import { defineProps } from 'vue';
</script>

<style scoped>
.headerLink {
@apply text-sm text-text py-4 transition-all duration-300 ease-in-out;
}

.headerLink::after {
  content: "";
  display: block;
  transition: width .2s;
  width: 0;
  border-bottom: solid 3px #71afdd;
}

.headerLink:hover::after {
  width: 100%;
}
</style>
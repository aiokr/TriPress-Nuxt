<template>
  <main class="bg-white/60 dark:bg-dbg/60 backdrop-blur-lg fixed top-0 left-0 right-0 px-4">
    <div class="container max-w-[1200px] mx-auto px-3 flex items-center justify-between  h-16">
      <router-link to="/">
        <img src="https://imgur.lzmun.com/picgo/after2022/tripper2colorfull.png_avatar" alt="logo"
          class="rounded-full w-8 h-8  mr-auto" />
      </router-link>
      <div class="flex gap-6 items-center justify-center">
        <router-link to="/" class="headerLink">Home</router-link>
        <router-link to="/about" class="headerLink">About</router-link>
        <button v-if="colorMode.preference === 'dark'" @click="colorMode.preference = 'light'" class="themeBtn">
          <IconMoon />
        </button>
        <button v-else @click="colorMode.preference = 'dark'" class="themeBtn">
          <IconSun />
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import IconSun from './icons/IconSun.vue';
import IconMoon from './icons/IconMoon.vue';
const colorMode = useColorMode();

</script>

<style scoped>
.headerLink {
  @apply block text-sm text-text py-4 transition-all duration-300 ease-in-out dark:text-dtext;
}

.headerLink::before {
  content: "";
  display: block;
  transition: width .2s;
  width: 0;
  border-bottom: solid 3px #71afdd00;
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

.themeBtn {
  @apply block text-text dark:text-dtext;
}
</style>
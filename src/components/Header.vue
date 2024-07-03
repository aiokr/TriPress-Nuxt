<template>
  <main
    class="container max-w-[1040px] mx-auto bg-white/60 dark:bg-dbg/80 backdrop-blur lg:border dark:border-white/20 rounded-b-2xl md:rounded-2xl shadow-lg shadow-gray-50/25 dark:shadow-zinc-900/25 sticky top-0 lg:top-4 px-4 z-10">
    <div class="container max-w-[1200px] mx-auto px-3 flex items-center justify-between  h-16">
      <router-link to="/">
        <img src="https://imgur.lzmun.com/picgo/after2022/tripper2whitefull.png_avatar" alt="logo"
          class="dark:hidden rounded-full w-8 h-8  mr-auto" />
        <img src="https://imgur.lzmun.com/picgo/after2022/tripper2colorfull.png_avatar" alt="logo"
          class="hidden dark:block rounded-full w-8 h-8  mr-auto" />
      </router-link>
      <div class="flex gap-6 items-center justify-center">
        <router-link to="/" class="headerLink">Home</router-link>
        <router-link to="/posts" class="headerLink">Posts</router-link>
        <router-link to="/darkroom" class="headerLink">Darkroom</router-link>
        <router-link to="/about" class="headerLink">About</router-link>
        <button v-if="colorMode.value === 'dark'" @click="handleColorMode" data-umami-event="changeColorModeToLight"
          class="themeBtn">
          <IconMoon />
        </button>
        <button v-else-if="colorMode.value === 'light'" @click="handleColorMode"
          data-umami-event="changeColorModeToDark" class="themeBtn">
          <IconSun />
        </button>
        <button @click="clickHeaderMenuBtn" class="headerMenu headerMenuBtn md:hidden">
          <IconsMenu />
        </button>
      </div>
    </div>
  </main>
  <div v-if="headerMenuOpen"
    class="headerMenu fixed px-4 py-3 min-w-48 rounded-lg shadow-lg border bg-white dark:bg-zinc-900 flex flex-col gap-3 z-10"
    :style="headerMenuStyle">
    <router-link to="/" class="headerMenuLink">Home</router-link>
    <router-link to="/posts" class="headerMenuLink">Posts</router-link>
    <router-link to="/darkroom" class="headerMenuLink">Darkroom</router-link>
    <router-link to="/about" class="headerMenuLink">About</router-link>
  </div>
</template>

<script setup lang="ts">
import IconSun from './icons/IconSun.vue';
import IconMoon from './icons/IconMoon.vue';
const colorMode = useColorMode();

const handleColorMode = () => {
  if (colorMode.preference === 'dark') {
    colorMode.preference = 'light';
  } else {
    colorMode.preference = 'dark';
  }
};
const headerMenuOpen = ref(false);

const clickHeaderMenuBtn = () => {
  headerMenuOpen.value = !headerMenuOpen.value;
  console.log(headerMenuOpen.value)
};

const handleClickOutside = (event: any) => {
  const headerMenu = document.querySelector('.headerMenu');
  if (headerMenuOpen.value === true && headerMenu && !headerMenu.contains(event.target)) {
    headerMenuOpen.value = false;
  }
};

const headerMenuPosition = ref({ left: 0, top: 0 });

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  function getHeaderMenuPosition() {
    const headerMenuBtn: any = document.querySelector('.headerMenuBtn');
    const headerMenuLeft = headerMenuBtn?.offsetLeft - 160;
    const headerMenuTop = headerMenuBtn?.offsetTop - 24;
    return headerMenuPosition.value = { left: headerMenuLeft, top: headerMenuTop };
  }
  getHeaderMenuPosition();

});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const headerMenuStyle = computed(() => {
  return {
    transform: `translate(${headerMenuPosition.value.left}px, ${headerMenuPosition.value.top}px)`,
  };
});


</script>

<style scoped>
.headerLink {
  @apply text-sm text-text py-4 transition-all duration-300 ease-in-out dark:text-dtext hidden md:block;
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
  @apply text-text dark:text-dtext;
}
</style>
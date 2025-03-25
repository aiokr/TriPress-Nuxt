<template>
  <main class="container w-[1040px] font-serif border-t mx-auto mb-24 pt-4 lg:pt-8 mt-12 md:mt-16 px-4">
    <div class="grid gap-4 justify-between items-start pr-16 grid-cols-1 md:grid-cols-4">
      <div class="col-span-1 md:col-span-2 flex flex-row items-center justify-start">
        <router-link to="/">
          <img src="https://imgur.lzmun.com/picgo/after2022/tripper2whitefull.png_avatar" alt="logo"
            class="dark:hidden rounded-full w-8 h-8  mr-auto" />
          <img src="https://imgur.lzmun.com/picgo/logo/tripper2colorfull.png_avatar" alt="logo"
            class="hidden dark:block rounded-full w-8 h-8  mr-auto" />
        </router-link>
        <div class="p-4 font-bold text-xl">
          Tripper Press
          <div class="text-base">
            少年没有乌托邦，心向远方自明朗。
          </div>
        </div>
      </div>
      <div class="col-span-1">
        <h2 class="text-xl text-text dark:text-dtext pt-8">Links</h2>
        <div class="flex flex-col gap-2 pt-3 pl-1">
          <NuxtLink to="/okr/2025" class="block text-zinc-500 dark:text-dtext/80">OKR</NuxtLink>
        </div>
      </div>
      <div class="col-span-1">
        <h2 class="text-xl text-text dark:text-dtext pt-8">Contact</h2>
        <div class="flex flex-col gap-2 pt-3 pl-1">
          <a href="mailto:i@tripper.press" target="_blank" class="block text-zinc-500 dark:text-dtext/80">Email</a>
          <a href="https://x.com/skomobi" target="_blank" class="block text-zinc-500 dark:text-dtext/80">X / Twitter</a>
        </div>
      </div>
    </div>
  </main>
</template>
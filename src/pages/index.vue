<template>
  <div class="container max-w-[800px] px-2 md:px-0 mx-auto">
    <section
      class="w-full transition-shadow rounded px-4 md:px-3 pt-16 md:pt-32 pb-20 md:pb-36 flex flex-col md:flex-row md:items-center justify-between gap-12">
      <div class="relative md:hidden">
        <img src="https://imgur.lzmun.com/picgo/after2022/tripper2colorfull.png_avatar" width="64px" height="64px" />
        <div class="absolute inset-0 -z-10 bg-gradient-to-tl from-main/60 to-main/10 opacity-0 blur-2xl md:opacity-50">
        </div>
      </div>
      <div class="text-2xl font-light">
        <div class="pb-2">
          Chen WJP
          <div class="text-base text-submain">Always as a student</div>
        </div>
      </div>
      <div class="hidden md:block md:relative">
        <img src="https://imgur.lzmun.com/picgo/after2022/tripper2colorfull.png_avatar" width="72px" height="72px" />
        <div class="absolute inset-0 -z-10 bg-gradient-to-tl from-main/60 to-main/10 opacity-0 blur-2xl md:opacity-50">
        </div>
      </div>
    </section>
    <!--About-->
    <div class="flex items-center justify-between px-3 md:px-2">
      <div class="text-lg font-light pb-6">About</div>
    </div>
    <!--Work Experience-->
    <div class="flex items-center justify-between px-3 md:px-2">
      <div class="text-lg font-light pb-6">Work Experience</div>
    </div>
    <section class="text-lg font-light">
      <div class=" mx-auto px-3 md:px-2 pb-8 grid grid-cols-1 md:grid-cols-6 gap-6">
        <div class="col-span-1 md:col-span-1 text-slate-400">
          <div>2022 - Now</div>
        </div>
        <div class="col-span-1 md:col-span-5 text-slate-800 dark:text-slate-50">
          <div>MuTian Technology Co., Ltd</div>
        </div>
      </div>
      <div class=" mx-auto px-3 md:px-2 pb-8 grid grid-cols-1 md:grid-cols-6 gap-6">
        <div class="col-span-1 md:col-span-1 text-slate-400">
          <div>2022</div>
        </div>
        <div class="col-span-1 md:col-span-5 text-slate-800 dark:text-slate-50">
          <div>Media Operation Intern at Propaganda Department of Liuzhou Chengzhong District</div>
          <div class="text-slate-400 text-base">Liuzhou</div>
        </div>
      </div>
    </section>
    <!--Certifications-->
    <div class="flex items-center justify-between px-3 md:px-2">
      <div class="text-lg font-light pb-6">Certifications</div>
    </div>
    <section class="text-lg font-light">
      <div class=" mx-auto px-3 md:px-2 pb-8 grid grid-cols-1 md:grid-cols-6 gap-6">
        <div class="col-span-1 md:col-span-1 text-slate-400">
          <div>2021</div>
        </div>
        <div class="col-span-1 md:col-span-5 text-slate-800 dark:text-slate-50">
          <div>College English Test Level 4 (CET4)</div>
        </div>
      </div>
    </section>
    <!--Side Projects-->
    <div class="flex items-center justify-between px-3 md:px-2">
      <div class="text-lg font-light pb-6">Side Projects</div>
    </div>
    <section class="text-lg font-light">
      <div class=" mx-auto px-3 md:px-2 pb-8 grid grid-cols-1 md:grid-cols-6 gap-6">
        <div class="col-span-1 md:col-span-1 text-slate-400">
          Ongoing
        </div>
        <div class="col-span-1 md:col-span-5 text-slate-800 dark:text-slate-50">
          <div>Tripper Press</div>
          <div class="text-slate-400 text-base">Personal website built with Nuxt</div>
          <NuxtLink to="https://github.com/aiokr/tripress-nuxt" class="text-sm text-main"></NuxtLink>
        </div>
      </div>
    </section>
    <!--Education-->
    <div class="flex items-center justify-between px-3 md:px-2">
      <div class="text-lg font-light pb-6">Education</div>
    </div>
    <section class="text-lg font-light">
      <div class=" mx-auto px-3 md:px-2 pb-16 grid grid-cols-1 md:grid-cols-6 gap-6">
        <div class="col-span-1 md:col-span-1 text-slate-400">
          <div>2018-2022</div>
        </div>
        <div class="col-span-1 md:col-span-5 text-slate-800 dark:text-slate-50">
          <div>Nanning Normal University</div>
          <div>Bachelor of Cultural Industry Management</div>
        </div>
      </div>
    </section>
    <div class="flex items-center justify-between px-3 md:px-2 pt-12">
      <div class="text-2xl font-light pb-6 pt-8">Posts</div>
      <NuxtLink to="/posts" class="text-sm text-main">All Posts</NuxtLink>
    </div>
    <section class="container mx-auto px-3 md:px-2 pb-16 gap-6">
      <NuxtLink v-for="post in posts" :to="post.path"
        class="postCard block w-full rounded-xl bg-white dark:bg-zinc-800">
        <div class="p-3 md:p-4 md:pt-4 lg:px-0 flex flex-col justify-between">
          <div>
            <h2 class="text-2xl text-text dark:text-dtext pb-4 font-light">{{ post.title }}</h2>
            <div v-if="post.date" class="text-sm text-zinc-400 dark:text-dtext/80 pb-2">
              <span>{{ new Date(post.date).toISOString().split('T')[0] }}</span> ·
              <span v-if="post.category">{{ post.category }}</span>
            </div>
            <p v-if="post.excerpt" class="pb-6 text-xs text-zinc-400">{{ post.excerpt }}</p>
          </div>
        </div>
      </NuxtLink>
    </section>
    <Footer />
  </div>
  <div class="right-0 left-0 h-36 w-full px-36 flex blur-3xl -z-50 -mt-36">
    <div class="bg-main/30 flex-1 h-full"></div>
  </div>
</template>

<script setup>
const appConfig = useAppConfig()

useHead({
  title: 'Tripper Press - Take Photo, Think Seriously',
  meta: [
    { name: 'description', content: 'Take Photo, Think Seriousl' }
  ]
})

useSeoMeta({
  title: 'Tripper Press - Take Photo, Think Seriously',
  ogTitle: 'Tripper Press - Take Photo, Think Seriously',
  description: 'Take Photo, Think Seriously',
  ogDescription: 'Take Photo, Think Seriously',
})

const { data: posts } = await useAsyncData('post', () => {
  return queryCollection('post')
    .order('date', 'DESC')
    .where('type', '<>', 'draft')
    .limit(3)
    .all()
})

</script>

<style scoped>
.postCard {
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.6s;
}

.postCard:hover {
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.6s;
}

.postCategory {
  @apply text-xs font-semibold text-zinc-500 bg-zinc-100 p-2 rounded-lg opacity-80 dark:bg-dtext/10 dark:text-dtext;
}

.travlePlanAlready {
  mask-image: linear-gradient(black 0%, rgb(0, 0, 0) 30%, rgba(0, 0, 0, 0.2) 80%, transparent 100%);
}

.bookCover {
  mask-image: linear-gradient(black 0%, rgb(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.2) 80%, transparent 100%);
}

.warnBanner {
  --orange: #ffc75f30;
  --white: #ffc75f10;
  background:
    linear-gradient(90deg, #ffffff, #ffffffb0 80%, #ffffff00 100%),
    repeating-linear-gradient(-45deg, var(--orange) 0%, var(--orange) 2%, var(--white) 2%, var(--white) 4%, var(--orange) 4%);
}

.dark .warnBanner {
  --orange: #ffc75f60;
  --white: #ffc75f40;
  background:
    linear-gradient(90deg, #18181b, #18181bb0 80%, #18181b00 100%),
    repeating-linear-gradient(-45deg, var(--orange) 0%, var(--orange) 2%, var(--white) 2%, var(--white) 4%, var(--orange) 4%);
}
</style>

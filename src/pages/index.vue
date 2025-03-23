<template>
  <div class="container max-w-[800px] px-2 md:px-0 mx-auto">
    <section
      class="w-full transition-shadow rounded px-2 md:px-8 lg:px-0 pt-16 md:pt-32 pb-20 md:pb-36 flex flex-col md:flex-row md:items-center justify-between gap-12">
      <div class="relative md:hidden">

        <img class="hidden dark:block" src="https://imgur.lzmun.com/picgo/logo/notionavatarwhite.png" width="108px" height="108px" />
        <img class="dark:hidden" src="https://imgur.lzmun.com/picgo/logo/notionavatarblack.png" width="108px" height="108px" />        <div class="absolute inset-0 -z-10 bg-gradient-to-tl from-main/60 to-main/10 opacity-0 blur-2xl md:opacity-50">
        </div>
      </div>
      <div class="text-3xl font-bold font-serif drop-shadow-lg">
        Tripper Press
      </div>
      <div class="hidden md:block md:relative">
        <img class="hidden dark:block" src="https://imgur.lzmun.com/picgo/logo/notionavatarwhite.png" width="144px" height="144px" />
        <img class="dark:hidden" src="https://imgur.lzmun.com/picgo/logo/notionavatarblack.png" width="144px" height="144px" />
      </div>
    </section>

    <div class="flex items-center justify-between px-2 md:px-8 lg:px-0  pt-12">
      <h1 class="text-2xl font-light pb-6 pt-8">Posts</h1>
      <NuxtLink to="/posts" class="text-sm text-main">All Posts</NuxtLink>
    </div>
    <section class="container mx-auto px-2 md:px-8 lg:px-0 pb-16 gap-6">
      <NuxtLink v-for="post in posts" :to="post.path" class="postCard block w-full">
        <div class="pb-4 md:pb-6 lg:px-0 flex flex-col justify-between">
          <div>
            <h2 class="text-xl text-text dark:text-dtext pb-2 font-light">{{ post.title }}</h2>
            <div class="text-sm text-zinc-400 dark:text-dtext/80 pb-2">
              <span v-if="post.date">{{ new Date(post.date).toISOString().split('T')[0] }}</span>
              <span v-if="post.category" class="mx-2">·</span>
              <span v-if="post.category">{{ post.category }}</span>
            </div>
            <p v-if="post.excerpt" class="pb-6 text-xs text-zinc-400">{{ post.excerpt }}</p>
          </div>
        </div>
      </NuxtLink>
    </section>
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

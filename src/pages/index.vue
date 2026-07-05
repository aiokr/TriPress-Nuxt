<template>
  <div class="container max-w-[800px] px-2 md:px-0 mx-auto">
    <section
      class="w-full transition-shadow rounded px-2 md:px-8 lg:px-0 pt-12 md:pt-20 pb-12 flex flex-col md:flex-row md:items-center justify-between gap-12">
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

    <section class="px-2 md:px-8 lg:px-0">
      <div class="pb-6">
        <div class="text-2xl font-bold text-text dark:text-dtext pb-6">文章</div>
        <hr />
      </div>
      <div class="grid grid-cols-5">
        <div class="col-span-5 md:col-span-4">
          <NuxtLink v-for="post in posts" :key="post.path" :to="post.path"
            class="postCard w-full rounded-xl mb-8 grid grid-cols-5">
            <img v-if="post.cover" :src="post.cover" alt="cover" class="w-full object-cover rounded-xl aspect-square" />
            <div v-else class="postCoverWoCover opacity-40 w-full object-cover rounded-xl p-1 bg-main dark:bg-slate-600 flex items-end justify-end">
              <span class="text-4xl font-serif font-bold text-white" v-if="post.date">{{ new
                Date(post.date).toISOString().split('T')[0].split('-').slice(1).join('/') }}</span>
            </div>
            <div class="pl-4 pt-2 md:px-6 md:pt-2 rounded-b-xl col-span-4">
              <div class="text-xs text-zinc-400 dark:text-dtext/80 pb-2 flex items-center gap-2">
                <span v-if="post.date">{{ new Date(post.date).toISOString().split('T')[0] }}</span>
                <span v-if="post.category" class="mx-1">·</span>
                <span v-if="post.category">{{ post.category }}</span>
                <span v-if="hasZh(post.path)" class="ml-1 px-1.5 py-0.5 rounded border border-main/50 text-main text-[10px]">中</span>
              </div>
              <h2 class="text-xl text-text dark:text-dtext pb-6">{{ post.title }}</h2>
              <div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
  
</template>

<script setup lang="ts">
import { getOtherLangPath, normalizePath } from '~/utils/content'

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

// 列表只展示默认语言（en）版本；过滤掉 .zh 翻译副本
const { data: posts } = await useAsyncData('post', async () => {
  const all = await queryCollection('post')
    .order('date', 'DESC')
    .where('type', '<>', 'draft')
    .all()
  return all.filter((p: any) => p.lang !== 'zh').slice(0, 8)
})

// 查询每个 en 文章是否存在中文翻译，用于显示"中"徽章
const { data: zhMap } = await useAsyncData('post-zh-map', async () => {
  const zhPosts = await queryCollection('post').all()
  return zhPosts.filter((p: any) => p.lang === 'zh').map((p: any) => getOtherLangPath(p.path))
})

const hasZh = (path: string) => zhMap.value?.includes(normalizePath(path)) ?? false
</script>

<style scoped>
.postCard {
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.6s;
}

.postCard:hover {
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.6s;
  transform: translateX(5px);
}

.postCard:hover .postCoverWoCover {
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.6s, opacity 0.3s;
  opacity: 1;
}

.postCoverWoCover {
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.6s, opacity 0.3s;
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

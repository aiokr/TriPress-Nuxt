<template>
  <div class="">
    <section class="container max-w-[1000px] mx-auto pt-12 px-4">
      <div class="pb-6">
        <div class="text-2xl font-bold text-text dark:text-dtext pb-6">文章</div>
        <hr />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div class="md:col-span-4">
          <NuxtLink v-if="isAllPosts" v-for="post in filteredPosts" :key="post.path" :to="post.path"
            class="postCard w-full rounded-xl mb-8 grid grid-cols-5">
            <img v-if="post.cover" :src="post.cover" alt="cover" class="w-full object-cover rounded-xl aspect-square" />
            <div v-else
              class="postCoverWoCover opacity-40 w-full object-cover rounded-xl p-1 bg-main dark:bg-slate-600 flex items-end justify-end">
              <span class="text-4xl font-serif font-bold text-white" v-if="post.date">{{ new
                Date(post.date).toISOString().split('T')[0].split('-').slice(1).join('/') }}</span>
            </div>
            <div class="pl-4 pt-2 md:px-6 md:pt-2 rounded-b-xl col-span-4">
              <div class="text-xs text-zinc-400 dark:text-dtext/80 pb-2 flex items-center">
                <span v-if="post.date">{{ new Date(post.date).toISOString().split('T')[0] }}</span>
                <span v-if="post.category" class="mx-1">·</span>
                <span v-if="post.category">{{ post.category }}</span>
                <span v-if="hasZh(post.path)"
                  class="ml-1 px-1.5 py-0.5 rounded border border-main/50 text-main text-[10px]">中</span>
              </div>
              <h2 class="text-xl text-text dark:text-dtext pb-6">{{ post.title }}</h2>
              <div>
              </div>
            </div>
          </NuxtLink>
          <div v-if="filteredPosts.length === 0" class="text-zinc-400 dark:text-dtext/60 text-sm py-12 text-center">
            该分类下暂无文章
          </div>
        </div>
        <aside class="md:col-span-1">
          <div class="text-sm font-semibold text-text dark:text-dtext pb-3">分类</div>
          <ul class="space-y-1">
            <li>
              <button type="button" @click="selectedCategory = ''" :class="[
                'w-full text-left px-2 py-1.5 rounded text-sm transition-colors flex justify-between',
                selectedCategory === ''
                  ? 'text-main font-semibold bg-main/10'
                  : 'text-zinc-500 dark:text-dtext/70 hover:text-text dark:hover:text-dtext hover:bg-zinc-100 dark:hover:bg-dtext/10'
              ]">
                <span>全部</span>
                <span class="inline-block w-5 text-xs text-zinc-400">{{ totalCount }}</span>
              </button>
            </li>
            <li v-for="cat in categories" :key="cat.name">
              <button type="button" @click="selectedCategory = cat.name" :class="[
                'w-full text-left px-2 py-1.5 rounded text-sm transition-colors flex justify-between',
                selectedCategory === cat.name
                  ? 'text-main font-semibold bg-main/10'
                  : 'text-zinc-500 dark:text-dtext/70 hover:text-text dark:hover:text-dtext hover:bg-zinc-100 dark:hover:bg-dtext/10'
              ]">
                <span>{{ cat.name }}</span>
                <span class="inline-block w-5 text-xs text-zinc-400">{{ cat.count }}</span>
              </button>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { getOtherLangPath, normalizePath } from "~/utils/content";

useHead({
  title: '文章 - Tripper Press',
  meta: [
    { name: 'description', content: 'Take Photo, Think Seriousl' }
  ]
})

useSeoMeta({
  title: '文章 - Tripper Press',
  ogTitle: '文章 - Tripper Press',
  description: 'Take Photo, Think Seriousl',
  ogDescription: 'Take Photo, Think Seriousl'
})

const selectedCategory = ref("");
const isAllPosts = ref(true);

// 列表只展示默认语言（en）版本，且排除 type=page 的独立页面
const { data: posts } = await useAsyncData('posts-list', () => {
  return queryCollection('post')
    .where('type', '<>', 'draft')
    .where('type', '<>', 'page')
    .where('lang', '=', 'en')
    .order('date', 'DESC')
    .all()
})

// 查询中文版本集合，用于在列表中显示徽章
const { data: zhMap } = await useAsyncData('posts-list-zh-map', async () => {
  const zhPosts = await queryCollection('post').where('lang', '=', 'zh').all()
  return zhPosts.map(p => getOtherLangPath(p.path))
})

const hasZh = (path: string) => zhMap.value?.includes(normalizePath(path)) ?? false

// 从文章中提取分类及数量，按数量倒序
const categories = computed(() => {
  const map = new Map<string, number>()
  for (const p of posts.value ?? []) {
    if (!p.category) continue
    map.set(p.category, (map.get(p.category) ?? 0) + 1)
  }
  return Array.from(map, ([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

const totalCount = computed(() => posts.value?.length ?? 0)

const filteredPosts = computed(() => {
  const list = posts.value ?? []
  if (!selectedCategory.value) return list
  return list.filter(p => p.category === selectedCategory.value)
})

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
  @apply text-xs font-semibold text-zinc-500 bg-zinc-100 py-2 px-2 rounded opacity-80 dark:bg-dtext/10 dark:text-dtext;
}

.marked {
  background: linear-gradient(104deg, #71afdd00 0.9%, #71afdd7c 2.4%, #71afdd4d 5.8%, #71afdd1a 93%, #71afdd23 96%, #82ffff00 98%), linear-gradient(183deg, #71afdd00 0%, #71afdd3b 7.9%, #71afdd00 15%);
  border-radius: 1.5px;
}
</style>
<template>
  <div class="">
    <section class="container max-w-[1000px] mx-auto pt-12 px-4">
      <div class="pb-6">
        <div class="text-2xl font-bold text-text dark:text-dtext pb-6">文章</div>
        <hr />
      </div>
      <div class="grid grid-cols-5">
        <div class="col-span-4 md:col-span-4">
          <NuxtLink v-if="isAllPosts" v-for="post in posts" :key="post.path" :to="post.path"
            class="postCard w-full rounded-xl mb-8 grid grid-cols-5">
            <img v-if="post.cover" :src="post.cover" alt="cover" class="w-full object-cover rounded-xl aspect-square" />
            <div v-else class="postCoverWoCover opacity-40 w-full object-cover rounded-xl p-1 bg-main flex items-end justify-end">
              <span class="text-4xl font-serif font-bold text-white" v-if="post.date">{{ new
                Date(post.date).toISOString().split('T')[0].split('-').slice(1).join('/') }}</span>
            </div>
            <div class="pl-4 pt-2 md:px-6 md:pt-2 rounded-b-xl col-span-4">
              <div class="text-xs text-zinc-400 dark:text-dtext/80 pb-2">
                <span v-if="post.date">{{ new Date(post.date).toISOString().split('T')[0] }}</span>
                <span v-if="post.category" class="mx-2">·</span>
                <span v-if="post.category">{{ post.category }}</span>
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

<script lang="ts" setup>
import { ref, onMounted } from "vue";

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

const queryCategory = ref("");
const queryPosts = ref<any>();
const isAllPosts = ref(true);

const { data: posts } = await useAsyncData('post', () => {
  return queryCollection('post')
    .where('type', '<>', 'draft')
    .order('date', 'DESC')
    .all()
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
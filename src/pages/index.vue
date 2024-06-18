<template>
  <div class="">
    <section class="w-full transition-shadow rounded mb-12 pt-16 h-[300px] flex items-center justify-center">
      <div class="text-2xl font-bold text-text dark:text-dtext drop-shadow-md hidden md:block">山涤余霭，宇暧微霄。有风自南，翼彼新苗。</div>
      <div class="text-2xl font-bold text-text dark:text-dtext drop-shadow-md block md:hidden">山涤余霭，宇暧微霄。<br />有风自南，翼彼新苗。</div>
    </section>
    <section class="container max-w-[800px] mx-auto px-4 pb-16">
      <NuxtLink v-for="post in posts" :to="post._path" class="postCard block w-full hover:shadow-2xl rounded-xl mb-12 bg-white dark:bg-zinc-800">
        <img v-if="post.cover" :src="post.cover" alt="cover" class="h-[180px] md:h-[233px] w-full object-cover rounded-xl" />
        <div class="min-h-[160px] p-8 pt-7 md:p-12 md:pt-10 rounded-b-xl">
          <div v-if="post.date" class="text-xs text-zinc-400 dark:text-dtext/80 pb-4">
            <span>{{ new Date(post.date).toISOString().split('T')[0] }}</span>
          </div>
          <h2 class="text-xl text-text dark:text-dtext pb-6">{{ post.title }}</h2>
          <p v-if="post.excerpt" class="pb-6 text-xs text-zinc-400">{{ post.excerpt }}</p>
          <div>
            <span v-if="post.category" class="postCategory">{{ post.category }}</span>
          </div>
        </div>
      </NuxtLink>
    </section>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'Tripper Press - Take Photo, Think Seriously',
  meta: [
    { name: 'description', content: 'Take Photo, Think Seriousl' }
  ]
})
useSeoMeta({
  title: 'Tripper Press - Take Photo, Think Seriously',
  ogTitle: 'Tripper Press - Take Photo, Think Seriously',
  description: 'Take Photo, Think Seriousl',
  ogDescription: 'Take Photo, Think Seriousl'
})

const posts = await queryContent("/post").only(["_path", "title", "excerpt", "date", "type", "category", "cover"]).sort({ date: -1 }).find();

</script>

<style scoped>
.postCard {
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.6s;
}

.postCard:hover {
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.6s;
  transform: translateY(-5px);
}

.postCategory {
  @apply text-xs font-semibold text-zinc-500 bg-zinc-100 py-2 px-2 rounded opacity-80 dark:bg-dtext/10 dark:text-dtext;
}
</style>
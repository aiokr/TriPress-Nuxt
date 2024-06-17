<template>
  <div class="">
    <section class="w-full transition-shadow rounded mb-12 pt-16 h-[300px] flex items-center justify-center">
      <div class="text-2xl font-bold text-text drop-shadow-md">山涤余霭，宇暧微霄。有风自南，翼彼新苗。</div>
    </section>
    <section class="container max-w-[800px] mx-auto">
      <NuxtLink v-for="post in posts" :to="post._path" class="postCard block w-full hover:shadow-2xl rounded-xl mb-6">
        <img v-if="post.cover" :src="post.cover" alt="cover" class="h-[233px] w-full object-cover rounded-xl" />
        <div class="min-h-[200px] p-12 pt-10 bg-white dark:bg-slate-700 rounded-b-xl">
          <div class="text-xs text-zinc-400 pb-4">
            <span>{{ new Date(post.date).toISOString().split('T')[0] }}</span>
          </div>
          <h2 class="text-2xl text-text pb-6">{{ post.title }}</h2>
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
const posts = await queryContent("/").only(["_path", "title", "excerpt", "date", "tag", "category", "cover"]).sort({ date: -1 }).find();
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
  @apply text-xs font-semibold text-zinc-500 bg-zinc-100 py-2 px-2 rounded opacity-80;
}
</style>
<template>
  <div class="container max-w-[800px] mx-auto">
    <section class="w-full transition-shadow rounded px-4 pt-32 pb-36 flex items-center justify-between">
      <div class="text-2xl font-bold">
        <p class="pb-2">I'm aiokr,<br />
          want to be a
        <div class="wantToBeGrid inline-grid h-9 text-main overflow-hidden">
          <div :style="wantToBeStyle">
            <div>Full Stack Developer</div>
            <div>Photographer</div>
            <div>Motion/ Graphic Designer</div>
            <div>Blogger & Vlogger</div>
            <div>Full Stack Developer</div>
          </div>
        </div>
        </p>
      </div>
      <div class="relative">
        <img src="https://imgur.lzmun.com/picgo/after2022/tripper2colorfull.png_avatar" width="72px" height="72px">
        <div class="absolute inset-0 -z-10 bg-gradient-to-tl from-main/60 to-main/10 opacity-0 blur-2xl md:opacity-50">
        </div>
      </div>
    </section>

    <section class="container max-w-[800px] mx-auto px-4 pb-16">
      <NuxtLink v-for="post in posts" :to="post._path"
        class="postCard block border dark:border-white/20 w-full hover:shadow-2xl rounded-xl mb-12 bg-white dark:bg-zinc-800">
        <img v-if="post.cover" :src="post.cover" alt="cover"
          class="h-[180px] md:h-[233px] w-full object-cover rounded-t-xl" />
        <div class="min-h-[160px] p-8 pt-7 md:p-12 md:pt-10 rounded-b-xl">
          <div v-if="post.date" class="text-sm text-zinc-400 dark:text-dtext/80 pb-4">
            <span>{{ new Date(post.date).toISOString().split('T')[0] }}</span>
          </div>
          <h2 class="text-2xl text-text dark:text-dtext pb-6">{{ post.title }}</h2>
          <p v-if="post.excerpt" class="pb-6 text-xs text-zinc-400">{{ post.excerpt }}</p>
          <div>
            <span v-if="post.category" class="postCategory">{{ post.category }}</span>
          </div>
        </div>
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

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

const wantToBeIndex = ref(1);
const wantToBeStyle = ref({
  transform: 'translateY(0)',
});

onMounted(() => {
  function wangToBeAnimate() {
    let startNum = wantToBeIndex.value;
    if (startNum === 4) {
      startNum = 0;
    }
    const endNum = startNum + 1;
    const duration = 300;
    const startTime = new Date().getTime();

    const animate = () => {
      const currentTime = new Date().getTime();
      const progress = Math.min((currentTime - startTime) / duration, 1);
      wantToBeIndex.value = startNum + (endNum - startNum) * progress;
      wantToBeStyle.value = {
        transform: `translateY(-${wantToBeIndex.value * 32}px)`
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }

  setInterval(() => {
    wangToBeAnimate();
  }, 3600);

});

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

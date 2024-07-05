<template>
  <div class="container max-w-[1000px] px-2 md:px-0 mx-auto">
    <section
      class="w-full transition-shadow rounded px-4 md:px-3 pt-16 md:pt-32 pb-20 md:pb-36 flex flex-col md:flex-row md:items-center justify-between gap-12">
      <div class="relative md:hidden">
        <img src="https://imgur.lzmun.com/picgo/after2022/tripper2colorfull.png_avatar" width="64px" height="64px">
        <div class="absolute inset-0 -z-10 bg-gradient-to-tl from-main/60 to-main/10 opacity-0 blur-2xl md:opacity-50">
        </div>
      </div>
      <div class="text-3xl font-bold">
        <div class="pb-2">I'm aiokr,<br />
          want to be a
          <div class="wantToBeGrid inline-grid h-10 text-main overflow-hidden">
            <div class="grid gap-1" :style="wantToBeStyle">
              <div>Full Stack Developer</div>
              <div>Photographer</div>
              <div>Motion/ Graphic Designer</div>
              <div>Blogger & Vlogger</div>
              <div>Full Stack Developer</div>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden md:block md:relative">
        <img src="https://imgur.lzmun.com/picgo/after2022/tripper2colorfull.png_avatar" width="72px" height="72px">
        <div class="absolute inset-0 -z-10 bg-gradient-to-tl from-main/60 to-main/10 opacity-0 blur-2xl md:opacity-50">
        </div>
      </div>
    </section>
    <div class="flex items-center justify-between px-3 md:px-2">
      <div class="text-3xl font-bold pb-6">About Me</div>
    </div>
    <section class="grid grid-cols-1 md:grid-cols-2 gap-6 px-3 md:px-2 pb-12">
      <div class="flex-1 md:col-span-2 shadow-card dark:shadow-card-dark rounded-lg p-3">
        <div class="font-bold py-2 text-center">Building……</div>
      </div>
      <div class="flex-1 shadow-card dark:shadow-card-dark rounded-lg p-3">
        <div class="text-xs text-zinc-300 dark:text-dtext/40 pt-2 pb-1">I Want To Travaling All Around The World</div>
        <div class="text-lg font-bold pb-2">My Destination Plan</div>
        <div class=" flex flex-col text-sm gap-1 h-36 overflow-hidden">
          <li v-for="plan in planningTravelPlan" :key="plan">
            {{ plan.destination }}
          </li>
          <div class="travlePlanAlready">
            <li v-for="plan in alreadyTravelPlan" :key="plan" class="line-through text-zinc-300 dark:text-dtext/40">
              {{ plan.destination }}
            </li>
          </div>
        </div>
      </div>
      <div class="shadow-card dark:shadow-card-dark rounded-lg p-3">
        <div class="text-xs text-zinc-300 dark:text-dtext/40 pt-2 pb-1">stay hungry, stay foolish</div>
        <div class="text-lg font-bold">Currently Reading</div>
        <a :href="currentReadingBookLink" target="_blank">
          <img :src="currentReadingBookCover"
            class="bookCover h-40 w-32 object-cover overflow-hidden mx-auto translate-y-3" />
          <div class="text-center text-2xl font-bold">{{ currentReadingBook }}</div>
        </a>
      </div>
    </section>
    <div class="flex items-center justify-between px-3 md:px-2">
      <div class="text-3xl font-bold pb-6">Posts</div>
      <NuxtLink to="/posts" class="text-sm text-main">All Posts</NuxtLink>
    </div>
    <section class="container mx-auto px-3 md:px-2 pb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
      <NuxtLink v-for="post in posts" :to="post._path"
        class="postCard block border-zinc-400/20 dark:border-white/20 w-full shadow-card dark:shadow-card-dark hover:shadow-lg rounded-xl bg-white dark:bg-zinc-800">
        <img v-if="post.cover" :src="post.cover" :alt="post.title + ' cover'"
          class="h-[180px] md:h-[233px] w-full object-cover rounded-2xl p-2" />
        <img v-else src="https://imgur.lzmun.com/tricms/1713761252690-2022-03-16-DSC09021-web.jpg"
          :alt="post.title + ' default cover'" class="h-[180px] md:h-[233px] w-full object-cover rounded-2xl p-2" />
        <div class="h-[200px] p-3 md:p-4 md:pt-4 flex flex-col justify-between">
          <div>
            <div v-if="post.date" class="text-sm text-zinc-400 dark:text-dtext/80 pb-2">
              <span>{{ new Date(post.date).toISOString().split('T')[0] }}</span>
            </div>
            <h2 class="text-2xl text-text dark:text-dtext pb-4">{{ post.title }}</h2>
            <p v-if="post.excerpt" class="pb-6 text-xs text-zinc-400">{{ post.excerpt }}</p>
          </div>
          <div class="pb-1">
            <span v-if="post.category" class="postCategory">{{ post.category }}</span>
          </div>
        </div>
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const appConfig = useAppConfig()

const currentReadingBook = appConfig.content.reading.bookName
const currentReadingBookCover = appConfig.content.reading.cover
const currentReadingBookLink = appConfig.content.reading.link

const travelPlan = appConfig.content.travel
const alreadyTravelPlan = travelPlan.filter((item) => item.already === true).slice(0, 6)
const planningTravelPlan = travelPlan.filter((item) => item.already !== true)

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
        transform: `translateY(-${wantToBeIndex.value * 40}px)`
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

const posts = await queryContent("/post").only(["_path", "title", "date", "category", "cover", "type"]).where({ type: { $ne: 'draft' } }).limit(4).sort({ date: -1 }).find();

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
  @apply text-xs font-semibold text-zinc-500 bg-zinc-100 p-2 rounded-lg opacity-80 dark:bg-dtext/10 dark:text-dtext;
}

.travlePlanAlready {
  mask-image: linear-gradient(black 0%, rgb(0, 0, 0) 30%, rgba(0, 0, 0, 0.2) 80%, transparent 100%);
}

.bookCover {
  mask-image: linear-gradient(black 0%, rgb(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.2) 80%, transparent 100%);
}
</style>

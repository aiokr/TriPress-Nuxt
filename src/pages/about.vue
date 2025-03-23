<template>
  <main class="flex flex-col">
    <div class="h-[calc(80vh)] mt-[calc(10vh-64px)] mb-[10vh] flex justify-center items-center">
      <div class="pt-72 md:pt-4">
        <div class="pt-24">
          <div class="inline-block text-2xl font-bold marked mx-2 p-2 mb-16">Chen WJP</div>
        </div>
        <!--About-->
        <div class="flex items-center justify-between px-3 md:px-2">
          <div class="text-lg font-bold md:font-light pb-6">About</div>
        </div>
        <!--Work Experience-->
        <div class="flex items-center justify-between px-3 md:px-2">
          <div class="text-lg font-bold md:font-light pb-6">Work Experience</div>
        </div>
        <section class="text-lg font-light">
          <div class=" mx-auto px-3 md:px-2 pb-8 grid grid-cols-1 md:grid-cols-6 gap-2">
            <div class="col-span-1 md:col-span-1 text-slate-400">
              <div>2022 - Now</div>
            </div>
            <div class="col-span-1 md:col-span-5 text-slate-800 dark:text-slate-50">
              <div>MuTian Technology Co., Ltd</div>
            </div>
          </div>
          <div class=" mx-auto px-3 md:px-2 pb-8 grid grid-cols-1 md:grid-cols-6 gap-2">
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
          <div class="text-lg font-bold md:font-light pb-6">Certifications</div>
        </div>
        <section class="text-lg font-light">
          <div class=" mx-auto px-3 md:px-2 pb-8 grid grid-cols-1 md:grid-cols-6 gap-2">
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
          <div class="text-lg font-bold md:font-light pb-6">Side Projects</div>
        </div>
        <section class="text-lg font-light">
          <div class=" mx-auto px-3 md:px-2 pb-8 grid grid-cols-1 md:grid-cols-6 gap-2">
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
          <div class="text-lg font-bold md:font-light pb-6">Education</div>
        </div>
        <section class="text-lg font-light">
          <div class=" mx-auto px-3 md:px-2 pb-16 grid grid-cols-1 md:grid-cols-6 gap-2">
            <div class="col-span-1 md:col-span-1 text-slate-400">
              <div>2018-2022</div>
            </div>
            <div class="col-span-1 md:col-span-5 text-slate-800 dark:text-slate-50">
              <div>Nanning Normal University</div>
              <div>Bachelor of Cultural Industry Management</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup>

import IconsTwitter from '~/components/icons/Twitter.vue';
import IconYoutube from '~/components/icons/Youtube.vue';
import IconHome from '~/components/icons/Home.vue';
import IconSkill from '~/components/icons/Skill.vue';

useHead({
  title: '关于 - Tripper Press',
  meta: [
    { name: 'description', content: 'Take Photo, Think Seriousl' }
  ]
})

useSeoMeta({
  title: '关于 - Tripper Press',
  ogTitle: '关于 - Tripper Press',
  description: 'Take Photo, Think Seriousl',
  ogDescription: 'Take Photo, Think Seriousl'
})

</script>

<style scoped>
.marked {
  background: linear-gradient(104deg, #71afdd00 0.9%, #71afdd7c 2.4%, #71afdd4d 5.8%, #71afdd1a 93%, #71afdd23 96%, #82ffff00 98%), linear-gradient(183deg, #71afdd00 0%, #71afdd3b 7.9%, #71afdd00 15%);
  border-radius: 4px;
}

@keyframes aboutContainerKeyframes {
  0% {
    background-position: 60vw 0;
  }

  30% {
    background-position: 0 0;
  }

  50% {

    background-position: 0 0;
  }

  65% {

    background-position: 60vw 0;
  }

  100% {

    background-position: 60vw 0;
  }

}

.aboutContainer {
  animation: aboutContainerKeyframes 1s ease-in-out;
  animation-timeline: scroll();
  background: linear-gradient(to right, #ffffff00 0, #ffffff00 40vw, #71afdd 40vw, #71afdd 100vw);
  background-repeat: no-repeat;
}

@keyframes coverKeyframes {
  0% {
    width: 100%;
    position: sticky;
    top: 10vh;
  }

  10% {
    width: 45%;
    position: sticky;
    top: 10vh;
    opacity: 1;
  }

  40% {
    width: 45%;
    position: sticky;
    top: 10vh;
    opacity: 1;
  }

  60% {
    width: 45%;
    position: sticky;
    opacity: 0;
  }

  100% {
    width: 40%;
    position: sticky;
    opacity: 0;
  }
}

.aboutCover {
  animation: coverKeyframes 1s ease-in-out;
  animation-timeline: scroll();
}

@keyframes skillKeyframes {
  0% {
    opacity: 0;
  }

  20% {
    opacity: 1;
  }

  40% {
    opacity: 1;
  }

  70% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

.aboutSkill {
  animation: skillKeyframes 1s ease-in-out;
  animation-timeline: scroll();
  position: sticky;
  margin-left: 42vw;
  top: 10vh;
}
</style>
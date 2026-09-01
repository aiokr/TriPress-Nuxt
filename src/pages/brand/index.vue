<template>
  <section class="container max-w-[1000px] mx-auto pt-24 px-4">
    <div class="pb-12">
      <div class="text-4xl font-bold text-text text-center dark:text-dtext pb-2">TriPress Brand</div>
      <a v-if="brandUpdatedAt" class="block text-sm text-sub-text dark:text-dtext text-center pb-12" href="https://github.com/aiokr/TriPress-Nuxt/" target="_blank">Last Updated: {{ brandUpdatedAt }}</a>
    </div>

    <h2 class="text-2xl font-bold text-text dark:text-dtext pb-6">Color System</h2>

    <h3 class="text-xl font-bold text-text dark:text-dtext pb-6">Brand Color</h3>

    <article class="text-text dark:text-dtext">
      <p>The brand color palette of TriPress is anchored by sky blue as its
        primary hue, complemented by a vibrant
        orange that conveys fervor and intensity, and a cool purple that underscores calmness and composure, from which
        a nine-tier chromatic scale is derived.</p>
      <p>TriPress 品牌视觉体系以天空蓝为核心主色，辅以表现热烈张力的橙色与传递冷静质感的紫色作为品牌辅色，并在此基础上构建包含九个层级的色阶系统。</p>
    </article>

    <div class="grid grid-cols-3 md:grid-cols-7 gap-4 pb-6">
      <div class="flex-1 h-20 bg-main rounded flex items-end justify-start p-2 text-white uppercase">#71afdd</div>
      <div class="flex-1 h-20 bg-accent-warm rounded flex items-end justify-start p-2 text-white uppercase">#efbf9a
      </div>
      <div class="flex-1 h-20 bg-accent-cold rounded flex items-end justify-start p-2 text-white uppercase">#8279d2
      </div>
    </div>

    <div class="w-full h-48 md:h-16 overflow-hidden rounded mb-4 grid grid-cols-4 md:grid-cols-9">
      <ColorSwatch name="primary-50" hex="#eaf3fa" class="bg-primary-50 text-text" />
      <ColorSwatch name="primary-100" hex="#cae1f2" class="bg-primary-100 text-text" />
      <ColorSwatch name="primary-200" hex="#a0cae8" class="bg-primary-200 text-text" />
      <ColorSwatch name="primary-300" hex="#71afdd" class="bg-primary-300 text-white" />
      <ColorSwatch name="primary-400" hex="#4697d3" class="bg-primary-400 text-white" />
      <ColorSwatch name="primary-500" hex="#2c7db9" class="bg-primary-500 text-white" />
      <ColorSwatch name="primary-600" hex="#236494" class="bg-primary-600 text-white" />
      <ColorSwatch name="primary-700" hex="#1c4e73" class="bg-primary-700 text-white" />
      <ColorSwatch name="primary-800" hex="#143852" class="bg-primary-800 text-white" />
    </div>

    <div class="w-full h-48 md:h-16 overflow-hidden rounded mb-4 grid grid-cols-4 md:grid-cols-9">
      <ColorSwatch name="accent-warm-50" hex="#fbf1e9" class="bg-accent-warm-50 text-text" />
      <ColorSwatch name="accent-warm-100" hex="#f6dbc6" class="bg-accent-warm-100 text-text" />
      <ColorSwatch name="accent-warm-200" hex="#efbf9a" class="bg-accent-warm-200 text-text" />
      <ColorSwatch name="accent-warm-300" hex="#e69d65" class="bg-accent-warm-300 text-white" />
      <ColorSwatch name="accent-warm-400" hex="#df813a" class="bg-accent-warm-400 text-white" />
      <ColorSwatch name="accent-warm-500" hex="#c56820" class="bg-accent-warm-500 text-white" />
      <ColorSwatch name="accent-warm-600" hex="#9e531a" class="bg-accent-warm-600 text-white" />
      <ColorSwatch name="accent-warm-700" hex="#7b4114" class="bg-accent-warm-700 text-white" />
      <ColorSwatch name="accent-warm-800" hex="#582e0e" class="bg-accent-warm-800 text-white" />
    </div>

    <div class="w-full h-48 md:h-16 overflow-hidden rounded mb-4 grid grid-cols-4 md:grid-cols-9">
      <ColorSwatch name="accent-cold-50" hex="#edecf9" class="bg-accent-cold-50 text-text" />
      <ColorSwatch name="accent-cold-100" hex="#d1cdee" class="bg-accent-cold-100 text-text" />
      <ColorSwatch name="accent-cold-200" hex="#ada7e2" class="bg-accent-cold-200 text-text" />
      <ColorSwatch name="accent-cold-300" hex="#8279d2" class="bg-accent-cold-300 text-white" />
      <ColorSwatch name="accent-cold-400" hex="#5e53c6" class="bg-accent-cold-400 text-white" />
      <ColorSwatch name="accent-cold-500" hex="#4539ac" class="bg-accent-cold-500 text-white" />
      <ColorSwatch name="accent-cold-600" hex="#372e8a" class="bg-accent-cold-600 text-white" />
      <ColorSwatch name="accent-cold-700" hex="#2b246b" class="bg-accent-cold-700 text-white" />
      <ColorSwatch name="accent-cold-800" hex="#1f194d" class="bg-accent-cold-800 text-white" />
    </div>


    <h3 class="text-xl font-bold text-text dark:text-dtext pt-12 pb-6">Foundational Color</h3>
    <article class="text-text dark:text-dtext">
      <p>Concurrently, six foundational colors have been designated for the
        display of primary elements, including text and backgrounds, with the deliberate aim of ensuring maximum visual
        prominence and legibility.</p>
      <p>同时，另设六种基础色，专用于文字、背景等核心视觉元素的呈现，以确保视觉层次清晰、信息传达醒目有力。</p>
    </article>

    <div class="grid grid-cols-3 md:grid-cols-7 gap-4 pb-6">
      <div class="flex-1 h-20 bg-text rounded flex items-end justify-start p-2 text-white uppercase">#222831</div>
      <div class="flex-1 h-20 bg-sub-text rounded flex items-end justify-start p-2 text-white uppercase">#b7c0cd</div>
      <div class="flex-1 h-20 bg-dtext rounded flex items-end justify-start p-2 text-text uppercase">#E2E2E2</div>
      <div class="flex-1 h-20 bg-white rounded flex items-end justify-start p-2 text-text border uppercase">#ffffff
      </div>
      <div class="flex-1 h-20 bg-sub-bg rounded flex items-end justify-start p-2 text-text border uppercase">#fafafa
      </div>
      <div class="flex-1 h-20 bg-dbg rounded flex items-end justify-start p-2 text-white border uppercase">#18181B</div>
    </div>

    <h3 class="text-xl font-bold text-text dark:text-dtext pb-6 pt-12">Semantic Color</h3>
    <article class="text-text dark:text-dtext">
      <p>Furthermore, three functional semantic colors are derived from the core primary hue, respectively applied to
        status feedback and informational prompts across various contexts. Among them, the "Info" indicator is directly
        represented by the brand's primary color, as it carries no inherent emotional bias and thus naturally aligns
        with the brand's core chromatic identity.</p>
      <p>此外，基于核心主色衍生出三种功能性语义色，分别用于不同场景下的状态反馈与信息提示；其中，信息提示「Info」直接由品牌主色承担，因其本身不带有情绪倾向，与品牌核心色调天然契合。</p>
    </article>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-success-bg text-success-text rounded border-l-[16px] border-success p-2 pl-3">Success</div>
      <div class="bg-warning-bg text-warning-text rounded border-l-[16px] border-warning p-2 pl-3">Warning</div>
      <div class="bg-danger-bg text-danger-text rounded border-l-[16px] border-danger p-2 pl-3">Danger</div>
      <div class="bg-info-bg text-info-text rounded border-l-[16px] border-info p-2 pl-3">Info</div>
    </div>

    <h2 class="text-2xl font-bold text-text dark:text-dtext pb-6 pt-32">Combination</h2>

    <div class="flex w-full gap-2 overflow-x-auto">
      <div class="flex-1 min-w-[85%] sm:min-w-0 w-full rounded  bg-white border p-4 flex flex-col justify-between">
        <article>
          <div class="text-lg font-bold pb-2 !text-text">在阳光下</div>
          <p class="!text-text">
            红日初升，其道大光。河出伏流，一泻汪洋。潜龙腾渊，鳞爪飞扬。乳虎啸谷，百兽震惶。
          </p>
          <p class="!text-text">
            I too am not a bit tamed, I too am untranslatable, <br />
            I sound my barbaric yawp over the roofs of the world.
          </p>
        </article>
        <div class="flex flex-row gap-4 pb-2">
          <div class="bg-main rounded-full w-8 h-8" />
          <div class="bg-accent-warm rounded-full w-8 h-8" />
          <div class="bg-accent-cold rounded-full w-8 h-8" />
          <div class="bg-success rounded-full w-8 h-8 text-center flex items-center justify-center">
            <IconsSuccess class="w-5 h-5 text-white" />
          </div>
          <div class="bg-warning rounded-full w-8 h-8 text-center flex items-center justify-center">
            <IconsWarning class="w-5 h-5 text-white" />
          </div>
          <div class="bg-danger rounded-full w-8 h-8 text-center flex items-center justify-center">
            <IconsClose class="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
      <div class="flex-1 min-w-[85%] sm:min-w-0 w-full rounded bg-sub-bg border p-4 flex flex-col justify-between">
        <article>
          <div class="text-lg font-bold pb-2 !text-text ">在阴天</div>
          <p class="!text-text">
            鹰隼试翼，风尘翕张。奇花初胎，矞矞皇皇。干将发硎，有作其芒。天戴其苍，地履其黄。纵有千古，横有八荒。前途似海，来日方长。
          </p>
          <p class="!text-text">
            To see a World in a Grain of Sand <br />
            And a Heaven in a Wild Flower, <br />
            Hold Infinity in the palm of your hand <br />
            And Eternity in an hour.
          </p>
        </article>
        <div class="flex flex-row gap-4 pb-2">
          <div class="bg-main rounded-full w-8 h-8" />
          <div class="bg-accent-warm rounded-full w-8 h-8" />
          <div class="bg-accent-cold rounded-full w-8 h-8" />
          <div class="bg-success rounded-full w-8 h-8 text-center flex items-center justify-center">
            <IconsSuccess class="w-5 h-5 text-white" />
          </div>
          <div class="bg-warning rounded-full w-8 h-8 text-center flex items-center justify-center">
            <IconsWarning class="w-5 h-5 text-white" />
          </div>
          <div class="bg-danger rounded-full w-8 h-8 text-center flex items-center justify-center">
            <IconsClose class="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
      <div class="flex-1 min-w-[85%] sm:min-w-0 w-full rounded  bg-dbg border p-4 flex flex-col justify-between">
        <article>
          <div class="text-lg font-bold pb-2 text-dtext">在月光下</div>
          <p class="text-dtext">
            庭下如积水空明，水中藻、荇交横，盖竹柏影也。
          </p>
          <p class="text-dtext">
            How sweet the moonlight sleeps upon this bank! <br />
            Here will we sit and let the sounds of music <br />
            Creep in our ears: soft stillness and the night <br />
            Become the touches of sweet harmony.
          </p>
        </article>
        <div class="flex flex-row gap-4 pb-2">
          <div class="bg-main rounded-full w-8 h-8" />
          <div class="bg-accent-warm rounded-full w-8 h-8" />
          <div class="bg-accent-cold rounded-full w-8 h-8" />
          <div class="bg-success rounded-full w-8 h-8 text-center flex items-center justify-center">
            <IconsSuccess class="w-5 h-5 text-white" />
          </div>
          <div class="bg-warning rounded-full w-8 h-8 text-center flex items-center justify-center">
            <IconsWarning class="w-5 h-5 text-white" />
          </div>
          <div class="bg-danger rounded-full w-8 h-8 text-center flex items-center justify-center">
            <IconsClose class="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>

    <h2 class="text-2xl font-bold text-text dark:text-dtext pb-6 pt-32">Reference</h2>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="flex-1 flex flex-col rounded shadow-feature-card dark:shadow-feature-card-dark">
        <div class="bg-primary-800 text-white p-4 text-lg font-bold rounded-t">Kimi Brand</div>
        <div class="bg-sub-bg p-4 rounded-b h-full">
          <a target="_blank" class="text-text underline decoration-[2px] underline-offset-[3px] decoration-[#71afdd]"
            href="https://www.kimi.ai/zh-hans/resources/kimi-brand">
            https://www.kimi.ai/zh-hans/resources/kimi-brand
          </a>
        </div>
      </div>
      <div class="flex-1 flex flex-col rounded shadow-feature-card dark:shadow-feature-card-dark">
        <div class="bg-primary-600 text-white p-4 text-lg font-bold rounded-t">Vercel Geist Design System</div>
        <div class="bg-sub-bg p-4 rounded-b h-full">
          <a target="_blank" class="text-text underline decoration-[2px] underline-offset-[3px] decoration-[#71afdd]"
            href="https://vercel.com/geist/brands">
            https://vercel.com/geist/brands
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { public: { brandUpdatedAt } } = useRuntimeConfig()

useHead({
  title: 'Brand',
})

useSeoMeta({
  title: 'Brand',
  ogTitle: 'Brand',
})
</script>
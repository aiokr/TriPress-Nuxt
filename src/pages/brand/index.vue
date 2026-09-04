<template>
  <section class="container max-w-[1000px] mx-auto pt-24 px-4">
    <div class="flex flex-col items-center justify-center pb-12 ">
      <div class="text-4xl font-bold text-text text-center dark:text-dtext pb-2">TriPress Brand</div>
      <a v-if="brandUpdatedAt" class="inline-block text-sm text-sub-text dark:text-dtext text-center pb-12"
        href="https://github.com/aiokr/TriPress-Nuxt/" target="_blank">Last Updated: {{ brandUpdatedAt }}</a>
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
      <p>Concurrently, foundational colors have been designated for the
        display of primary elements, including text and backgrounds, with the deliberate aim of ensuring maximum visual
        prominence and legibility.</p>
      <p>同时，另设基础色，专用于文字、背景等核心视觉元素的呈现，以确保视觉层次清晰、信息传达醒目有力。</p>
    </article>

    <div class="w-full h-48 md:h-16 overflow-hidden rounded mb-4 grid grid-cols-4 md:grid-cols-11">
      <ColorSwatch name="neutral-25" hex="#f9fafb" class="bg-neutral-25 text-text" />
      <ColorSwatch name="neutral-50" hex="#f3f4f7" class="bg-neutral-50 text-text" />
      <ColorSwatch name="neutral-100" hex="#eaedf0" class="bg-neutral-100 text-text" />
      <ColorSwatch name="neutral-200" hex="#d8dde4" class="bg-neutral-200 text-text" />
      <ColorSwatch name="neutral-300" hex="#bdc5d1" class="bg-neutral-300 text-text" />
      <ColorSwatch name="neutral-400" hex="#99a5b8" class="bg-neutral-400 text-text" />
      <ColorSwatch name="neutral-500" hex="#74859f" class="bg-neutral-500 text-white" />
      <ColorSwatch name="neutral-600" hex="#58677e" class="bg-neutral-600 text-white" />
      <ColorSwatch name="neutral-700" hex="#3f4a5a" class="bg-neutral-700 text-white" />
      <ColorSwatch name="neutral-800" hex="#222831" class="bg-neutral-800 text-white" />
      <ColorSwatch name="neutral-900" hex="#13161b" class="bg-neutral-900 text-white" />
    </div>

    <h4 class="text-lg font-bold text-text dark:text-dtext pt-8 pb-4">Background</h4>

    <div class="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div class="flex h-12 items-center gap-3 border-b min-w-[800px]">
        <div class="w-5 h-5 rounded-full bg-white border border-neutral-400" />
        <p class="text-sm leading-[20px] font-medium text-text dark:text-dtext w-[120px]">Background 1</p>
        <div
          class="flex items-center justify-center text-xs font-bold w-[56px] h-[22px] rounded-full bg-neutral-100 text-neutral-600 uppercase">
          Light</div>
        <p class="text-sm text-text dark:text-dtext w-[260px]">Default element background</p>
        <p class="text-sm text-sub-text dark:text-dsub-text ml-auto uppercase">#FFFFFF</p>
        <p class="text-sm text-sub-text dark:text-dsub-text w-[120px] text-right">white</p>
      </div>
      <div class="flex h-12 items-center gap-3 border-b min-w-[800px]">
        <div class="w-5 h-5 rounded-full bg-neutral-50 border border-neutral-400" />
        <p class="text-sm leading-[20px] font-medium text-text dark:text-dtext w-[120px]">Background 2</p>
        <div
          class="flex items-center justify-center text-xs font-bold w-[56px] h-[22px] rounded-full bg-neutral-100 text-neutral-600 uppercase">
          Light</div>
        <p class="text-sm text-text dark:text-dtext w-[260px]">Secondary background</p>
        <p class="text-sm text-sub-text dark:text-dsub-text ml-auto uppercase">#f3f4f7</p>
        <p class="text-sm text-sub-text dark:text-dsub-text w-[120px] text-right">neutral-50</p>
      </div>
      <div class="flex h-12 items-center gap-3 border-b min-w-[800px]">
        <div class="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-400" />
        <p class="text-sm leading-[20px] font-medium text-text dark:text-dtext w-[120px]">Background 1</p>
        <div
          class="flex items-center justify-center text-xs font-bold w-[56px] h-[22px] rounded-full bg-neutral-800 text-neutral-200 uppercase">
          Dark</div>
        <p class="text-sm text-text dark:text-dtext w-[260px]">Default element background</p>
        <p class="text-sm text-sub-text dark:text-dsub-text ml-auto uppercase">#13161b</p>
        <p class="text-sm text-sub-text dark:text-dsub-text w-[120px] text-right">neutral-900</p>
      </div>
      <div class="flex h-12 items-center gap-3 border-none min-w-[800px]">
        <div class="w-5 h-5 rounded-full bg-neutral-800 border border-neutral-400" />
        <p class="text-sm leading-[20px] font-medium text-text dark:text-dtext w-[120px]">Background 2</p>
        <div
          class="flex items-center justify-center text-xs font-bold w-[56px] h-[22px] rounded-full bg-neutral-800 text-neutral-200 uppercase">
          Dark</div>
        <p class="text-sm text-text dark:text-dtext w-[260px]">Secondary background</p>
        <p class="text-sm text-sub-text dark:text-dsub-text ml-auto uppercase">#222831</p>
        <p class="text-sm text-sub-text dark:text-dsub-text w-[120px] text-right">neutral-800</p>
      </div>
    </div>

    <h4 class="text-lg font-bold text-text dark:text-dtext pt-8 pb-4">Text</h4>

    <div class="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div class="flex h-12 items-center gap-3 border-b min-w-[800px]">
        <div class="w-5 h-5 rounded-full bg-neutral-800 border border-neutral-400" />
        <p class="text-sm leading-[20px] font-medium text-text dark:text-dtext w-[120px]">Text 1</p>
        <div
          class="flex items-center justify-center text-xs font-bold w-[56px] h-[22px] rounded-full bg-neutral-100 text-neutral-600 uppercase">
          Light</div>
        <p class="text-sm text-text dark:text-dtext w-[260px]">Primary text, headings</p>
        <p class="text-sm text-sub-text dark:text-dsub-text ml-auto uppercase">#222831</p>
        <p class="text-sm text-sub-text dark:text-dsub-text w-[120px] text-right">neutral-800</p>
      </div>
      <div class="flex h-12 items-center gap-3 border-b min-w-[800px]">
        <div class="w-5 h-5 rounded-full bg-neutral-600 border border-neutral-400" />
        <p class="text-sm leading-[20px] font-medium text-text dark:text-dtext w-[120px]">Text 2</p>
        <div
          class="flex items-center justify-center text-xs font-bold w-[56px] h-[22px] rounded-full bg-neutral-100 text-neutral-600 uppercase">
          Light</div>
        <p class="text-sm text-text dark:text-dtext w-[260px]">Secondary text, captions</p>
        <p class="text-sm text-sub-text dark:text-dsub-text ml-auto uppercase">#58677e</p>
        <p class="text-sm text-sub-text dark:text-dsub-text w-[120px] text-right">neutral-600</p>
      </div>
      <div class="flex h-12 items-center gap-3 border-b min-w-[800px]">
        <div class="w-5 h-5 rounded-full bg-neutral-400 border border-neutral-400" />
        <p class="text-sm leading-[20px] font-medium text-text dark:text-dtext w-[120px]">Text 3</p>
        <div
          class="flex items-center justify-center text-xs font-bold w-[56px] h-[22px] rounded-full bg-neutral-100 text-neutral-600 uppercase">
          Light</div>
        <p class="text-sm text-text dark:text-dtext w-[260px]">Placeholder, disabled</p>
        <p class="text-sm text-sub-text dark:text-dsub-text ml-auto uppercase">#99a5b8</p>
        <p class="text-sm text-sub-text dark:text-dsub-text w-[120px] text-right">neutral-400</p>
      </div>
      <div class="flex h-12 items-center gap-3 border-b min-w-[800px]">
        <div class="w-5 h-5 rounded-full bg-neutral-100 border border-neutral-400" />
        <p class="text-sm leading-[20px] font-medium text-text dark:text-dtext w-[120px]">Text 1</p>
        <div
          class="flex items-center justify-center text-xs font-bold w-[56px] h-[22px] rounded-full bg-neutral-800 text-neutral-200 uppercase">
          Dark</div>
        <p class="text-sm text-text dark:text-dtext w-[260px]">Primary text, headings</p>
        <p class="text-sm text-sub-text dark:text-dsub-text ml-auto uppercase">#eaedf0</p>
        <p class="text-sm text-sub-text dark:text-dsub-text w-[120px] text-right">neutral-100</p>
      </div>
      <div class="flex h-12 items-center gap-3 border-b min-w-[800px]">
        <div class="w-5 h-5 rounded-full bg-neutral-400 border border-neutral-400" />
        <p class="text-sm leading-[20px] font-medium text-text dark:text-dtext w-[120px]">Text 2</p>
        <div
          class="flex items-center justify-center text-xs font-bold w-[56px] h-[22px] rounded-full bg-neutral-800 text-neutral-200 uppercase">
          Dark</div>
        <p class="text-sm text-text dark:text-dtext w-[260px]">Secondary text, captions</p>
        <p class="text-sm text-sub-text dark:text-dsub-text ml-auto uppercase">#99a5b8</p>
        <p class="text-sm text-sub-text dark:text-dsub-text w-[120px] text-right">neutral-400</p>
      </div>
      <div class="flex h-12 items-center gap-3 border-none min-w-[800px]">
        <div class="w-5 h-5 rounded-full bg-neutral-600 border border-neutral-400" />
        <p class="text-sm leading-[20px] font-medium text-text dark:text-dtext w-[120px]">Text 3</p>
        <div
          class="flex items-center justify-center text-xs font-bold w-[56px] h-[22px] rounded-full bg-neutral-800 text-neutral-200 uppercase">
          Dark</div>
        <p class="text-sm text-text dark:text-dtext w-[260px]">Placeholder, disabled</p>
        <p class="text-sm text-sub-text dark:text-dsub-text ml-auto uppercase">#58677e</p>
        <p class="text-sm text-sub-text dark:text-dsub-text w-[120px] text-right">neutral-600</p>
      </div>
    </div>

    <h3 class="text-xl font-bold text-text dark:text-dtext pb-6 pt-12">Semantic Color</h3>
    <article class="text-text dark:text-dtext">
      <p>Furthermore, three functional semantic colors are derived from the core primary hue, respectively applied to
        status feedback and informational prompts across various contexts. Among them, the "Info" indicator is
        directly
        represented by the brand's primary color, as it carries no inherent emotional bias and thus naturally aligns
        with the brand's core chromatic identity.</p>
      <p>此外，基于核心主色衍生出三种功能性语义色，分别用于不同场景下的状态反馈与信息提示；其中，信息提示「Info」直接由品牌主色承担，因其本身不带有情绪倾向，与品牌核心色调天然契合。</p>
    </article>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 pb-6">
      <div>
        <div class="bg-success-bg text-success-text rounded border-l-[16px] border-success p-2 pl-3 mb-4">Success
        </div>
        <div class="h-16 overflow-hidden rounded mb-4 grid grid-cols-3">
          <ColorSwatch name="success-bg" hex="#e6f5ee" class="bg-success-bg text-success-text" />
          <ColorSwatch name="success" hex="#3fa97a" class="bg-success text-white" />
          <ColorSwatch name="success-text" hex="#1e6b4c" class="bg-success-text text-white" />
        </div>
      </div>
      <div>
        <div class="bg-warning-bg text-warning-text rounded border-l-[16px] border-warning p-2 pl-3 mb-4">Warning
        </div>
        <div class="h-16 overflow-hidden rounded mb-4 grid grid-cols-3">
          <ColorSwatch name="warning-bg" hex="#fbf1de" class="bg-warning-bg text-warning-text" />
          <ColorSwatch name="warning" hex="#e0a23c" class="bg-warning text-white" />
          <ColorSwatch name="warning-text" hex="#96620f" class="bg-warning-text text-white" />
        </div>
      </div>
      <div>
        <div class="bg-danger-bg text-danger-text rounded border-l-[16px] border-danger p-2 pl-3 mb-4">Danger</div>
        <div class="h-16 overflow-hidden rounded mb-4 grid grid-cols-3">
          <ColorSwatch name="danger-bg" hex="#faeaea" class="bg-danger-bg text-danger-text" />
          <ColorSwatch name="danger" hex="#d95d5d" class="bg-danger text-white" />
          <ColorSwatch name="danger-text" hex="#a83232" class="bg-danger-text text-white" />
        </div>
      </div>
      <div>
        <div class="bg-info-bg text-info-text rounded border-l-[16px] border-info p-2 pl-3 mb-4">Info</div>
        <div class="h-16 overflow-hidden rounded mb-4 grid grid-cols-3">
          <ColorSwatch name="info-bg" hex="#eaf3fa" class="bg-info-bg text-info-text" />
          <ColorSwatch name="info" hex="#71afdd" class="bg-info text-white" />
          <ColorSwatch name="info-text" hex="#236494" class="bg-info-text text-white" />
        </div>
      </div>
    </div>

    <h2 class="text-2xl font-bold text-text dark:text-dtext pb-6 pt-32">Combination</h2>

    <div class="flex w-full gap-2 overflow-x-auto">
      <div class="flex-1 min-w-[85%] sm:min-w-0 w-full rounded bg-white border p-4 flex flex-col justify-between">
        <article>
          <div class="text-lg font-bold pb-2 !text-text">在阳光下</div>
          <p class="!text-text">
            红日初升，其道大光。河出伏流，一泻汪洋。潜龙腾渊，鳞爪飞扬。乳虎啸谷，百兽震惶。
            <span class="block w-full text-right !text-sub-text">
              ——《少年中国说》 梁启超
            </span>
          </p>
          <p class="!text-text">
            I too am not a bit tamed, I too am untranslatable, <br />
            I sound my barbaric yawp over the roofs of the world.
            <span class="block w-full text-right !text-sub-text">
              — Walt Whitman, Song of Myself (1855)
            </span>
          </p>
        </article>
        <BrandColorPalette />
      </div>
      <div class="flex-1 min-w-[85%] sm:min-w-0 w-full rounded  bg-dsub-bg border p-4 flex flex-col justify-between">
        <article>
          <div class="text-lg font-bold pb-2 text-dtext">在月光下</div>
          <p class="text-dtext">
            庭下如积水空明，水中藻、荇交横，盖竹柏影也。
            <span class="block w-full text-right !text-dsub-text">
              ——《记承天寺夜游》 苏轼
            </span>
          </p>
          <p class="text-dtext">
            How sweet the moonlight sleeps upon this bank! <br />
            Here will we sit and let the sounds of music <br />
            Creep in our ears: soft stillness and the night <br />
            Become the touches of sweet harmony.
            <span class="block w-full text-right !text-dsub-text">
              — William Shakespeare, The Merchant of Venice, Act V, Scene 1
            </span>
          </p>
        </article>
        <BrandColorPalette />
      </div>
    </div>

    <h2 class="text-2xl font-bold text-text dark:text-dtext pb-6 pt-32">Reference</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
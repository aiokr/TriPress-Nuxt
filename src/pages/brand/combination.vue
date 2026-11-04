<template>
  <section class="max-w-[1000px] mx-auto py-10 lg:py-16">
    <h1 class="heading-1 text-fg pb-6">Combination</h1>

    <div class="flex w-full gap-2 overflow-x-auto">
      <div class="flex-1 min-w-[85%] sm:min-w-0 w-full theme-light rounded bg-surface border border-line p-4 flex flex-col justify-between">
        <article>
          <div class="heading-3 font-bold pb-2 !text-fg">在阳光下</div>
          <p class="!text-fg">
            红日初升，其道大光。河出伏流，一泻汪洋。潜龙腾渊，鳞爪飞扬。乳虎啸谷，百兽震惶。
            <span class="block w-full text-right !text-fg-muted caption">
              ——《少年中国说》 梁启超
            </span>
          </p>
          <p class="!text-fg">
            I too am not a bit tamed, I too am untranslatable, <br />
            I sound my barbaric yawp over the roofs of the world.
            <span class="block w-full text-right !text-fg-muted caption">
              — Walt Whitman, Song of Myself (1855)
            </span>
          </p>
        </article>
        <BrandColorPalette />
      </div>
      <div class="flex-1 min-w-[85%] sm:min-w-0 w-full theme-dark rounded bg-canvas border border-line p-4 flex flex-col justify-between">
        <article>
          <div class="heading-3 font-bold pb-2 !text-fg">在月光下</div>
          <p class="!text-fg">
            庭下如积水空明，水中藻、荇交横，盖竹柏影也。
            <span class="block w-full text-right !text-fg-muted caption">
              ——《记承天寺夜游》 苏轼
            </span>
          </p>
          <p class="!text-fg">
            How sweet the moonlight sleeps upon this bank! <br />
            Here will we sit and let the sounds of music <br />
            Creep in our ears: soft stillness and the night <br />
            Become the touches of sweet harmony.
            <span class="block w-full text-right !text-fg-muted caption">
              — William Shakespeare, The Merchant of Venice, Act V, Scene 1
            </span>
          </p>
        </article>
        <BrandColorPalette />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'brand',
})

useHead({
  title: 'Brand - Combination',
})

useSeoMeta({
  title: 'Brand - Combination',
  ogTitle: 'Brand - Combination',
})
</script>

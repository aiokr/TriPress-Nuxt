<template>
  <ContentDoc>
    <template v-slot="{ doc }">
      <article class="md:pt-36 pb-24 container max-w-[1000px] mx-auto">
        <div class="md:rounded-xl bg-white dark:bg-zinc-800">
          <!--Post Cover-->
          <div>
            <img :src="doc.cover" alt="cover" class="w-full h-[360px] object-cover md:rounded-xl" />
          </div>
          <div class="container max-w-[800px] px-4 mx-auto pb-12">
            <h1 class="pt-12 py-8 text-2xl text-text dark:text-dtext">{{ doc.title }}</h1>
            <ContentRenderer :value="doc" />
          </div>
        </div>
      </article>
    </template>
    <template #not-found>
      <h1>Document not found</h1>
    </template>
  </ContentDoc>
</template>

<script setup>

</script>

<style>
article p,
article h1,
article h2,
article h3,
article h4,
article h5,
article h6 {
  table-layout: fixed !important;
  word-wrap: break-word !important;
  word-break: normal !important;
  text-align: justify !important;
  text-justify: inter-ideograph !important;
}

article p {
  margin: 1em 0px !important;
  font-size: 16px;
  font-weight: 400;
  color: #222831;
  line-height: 1.8em;
  letter-spacing: 0;
}

.dark article p {
  @apply text-dtext
}
</style>
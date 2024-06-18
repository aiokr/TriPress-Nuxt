<template>
  <ContentDoc>
    <template v-slot="{ doc }">
      <article class="md:pt-36 pb-36 container max-w-[1000px] mx-auto">
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

<script setup lang="ts">

useHead({
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
}

article p {
  margin: 1em 0px !important;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.8em;
  letter-spacing: 0;
}

article {
  color: #222831;
}

.dark article {
  @apply !text-dtext
}

article h1, article h2, article h3, article h4, article h5, article h6 {
  margin: 1.2em 0 0.5em 0;
  padding: 0;
  font-style: bold !important;
  color: #222831;
  text-align: left !important;
  font-weight: 600;
}

.dark article h1,
.dark article h2,
.dark article h3,
.dark article h4,
.dark article h5,
.dark article h6 {
  @apply !text-dtext
}

article h1 {
  font-style: normal;
  font-size: 1.8em;
  line-height: 140%;
  text-align: left !important;
}

article h2 {
  font-size: 1.6em !important;
}

article h3 {
  font-size: 1.4em;
}

article h4 {
  font-size: 1.2em;
}

article h5 {
  font-size: 1em;
  font-weight: 500;
}

article h6 {
  font-size: 1em;
  font-weight: 400;
}

article strong {
  font-weight: 700;
}

article a {
  text-decoration: underline 2px;
  text-decoration-color: #71afdd;
}

article ol,
article blockquote ol,
article ul,
article blockquote ul {
  margin-left: 1.2em;
  line-height: 1.8em;
}

article ol,
article blockquote ol {
  list-style-type: decimal;
}

article ul,
article blockquote ul {
  list-style-type: disc;
}

article blockquote {
  padding: 0 0px 0 10px;
  margin: 1.5em 0px !important;
  border-left: 3px solid #71afdd;
  quotes: none;
}

article blockquote::before,
article .stressed-quote::before {
  content: "“";
  display: block;
  font-style: normal;
  font-size: 28px;
  color: #71afdd;
  font-weight: bold;
  line-height: 30px;
}

article code {
  font-size: 0.9em;
  padding: 0.2em 0.4em;
  background: #f8f8f8;
  border-radius: 3px;
}

article pre {
  padding: 0 1em;
  overflow: auto;
  background: #f8f8f8;
  border-radius: 12px;
}
</style>
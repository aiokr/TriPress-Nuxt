<template>
  <div>
    <section class="container max-w-[1000px] mx-auto pt-12 px-4 pb-24">
      <div class="pb-6">
        <div class="text-2xl font-bold text-text dark:text-dtext pb-6">Quotes</div>
        <hr />
      </div>
      <div class="flex flex-col gap-6">
        <QuoteCard v-for="quote in quotes" :key="quote.path" :quote="quote" />
      </div>
      <div v-if="!quotes?.length" class="text-zinc-400 dark:text-dtext/60 text-sm py-12 text-center">
        暂无 Quote
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Quotes - Tripper Press',
  meta: [
    { name: 'description', content: 'Short quotes and thoughts from Tripper Press.' }
  ]
})

useSeoMeta({
  title: 'Quotes - Tripper Press',
  ogTitle: 'Quotes - Tripper Press',
  description: 'Short quotes and thoughts from Tripper Press.',
  ogDescription: 'Short quotes and thoughts from Tripper Press.'
})

const { data: quotes } = await useAsyncData('quotes-list', () => {
  return queryCollection('quote')
    .orWhere(group => group.where('type', 'IS NULL').orWhere(sub => sub.where('type', '<>', 'draft')))
    .order('date', 'DESC')
    .all()
})
</script>

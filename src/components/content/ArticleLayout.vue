<template>
  <div class="pb-36 -mt-[72px] relative">
    <div>
      <!--Header w/ Cover-->
      <div v-if="post?.cover" class="postCard w-full object-cover bg-center bg-cover"
        :style="'background-image: url(' + post?.cover + ');'">
        <div class="bg-gradient-to-t from-white to-white/60 dark:from-dbg dark:to-zinc-800/40">
          <div class="pt-48 pb-24 px-4 container max-w-[800px] mx-auto">
            <div class="text-xs text-zinc-400 dark:text-dtext/80 pb-2">
              <span v-if="post.date">{{ formatDate(post.date) }}</span>
              <span v-if="post.category" class="mx-2">·</span>
              <span v-if="post.category">{{ post.category }}</span>
            </div>
            <div>
              <h1 class="text-3xl font-semibold text-text dark:text-dtext">{{ post?.title }}</h1>
              <LangSwitcher v-if="post" :path="post.path" :has-alt="altExists" />
            </div>
          </div>
        </div>
      </div>
      <!--Header w/o Cover-->
      <div v-else class="pt-40 md:pt-44 pb-16 md:pb-24 px-4 container max-w-[800px] mx-auto">
        <div v-if="post" class="text-xs text-zinc-400 dark:text-dtext/80 pb-2">
          <span v-if="post.date">{{ formatDate(post.date) }}</span>
          <span v-if="post.category" class="mx-2">·</span>
          <span v-if="post.category">{{ post.category }}</span>
        </div>
        <div>
          <h1 class="text-3xl font-semibold text-text dark:text-dtext">{{ post?.title }}</h1>
          <LangSwitcher v-if="post" :path="post.path" :has-alt="altExists" />
        </div>
      </div>
      <div v-if="post?.type === 'rc'"
        class="container max-w-[800px] px-4 mx-auto py-4 border border-red-400 dark:border-red-700 rounded-lg bg-red-100 dark:bg-red-900">
        This article is a Pre-release version, and its content may be updated at any time.
      </div>
      <!--Content-->
      <article class="container max-w-[800px] px-4 mx-auto pb-12">
        <template v-if="post">
          <ContentRenderer :value="post" />
        </template>
        <slot v-else name="not-found" />
      </article>
    </div>
    <ArticleToc
      v-if="post?.body?.toc?.links?.length"
      :links="post.body.toc.links"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  post: any
  altExists?: boolean
}>()

const formatDate = (date: string) => new Date(date).toISOString().split('T')[0]
</script>

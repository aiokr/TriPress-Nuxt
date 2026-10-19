<template>
  <div class="docs-page container max-w-[1200px] mx-auto px-4 flex gap-6"
    :class="{ 'docs-page--annotated': hasSidenotes }">
    <DocsSidebar :series="currentSeries" :current-path="route.path" />
    <template v-if="post">
      <main class="flex-1 min-w-0 pb-36 relative">
        <article class="docs-article max-w-[800px] mx-auto px-4 pb-12">
          <!--文档头-->
          <div class="docs-heading pt-12 md:pt-16 pb-12 px-4 md:px-0">
            <div class="text-xs text-zinc-400 dark:text-dtext/80 pb-2">
              <span v-if="post.series">{{ post.series }}</span>
              <span v-if="post.series && post.date" class="mx-2">·</span>
              <span v-if="post.date">{{ formatDate(post.date) }}</span>
            </div>
            <h1 class="text-3xl font-semibold text-text dark:text-dtext">{{ post.title }}</h1>
            <p v-if="post.description" class="pt-3 text-sm text-zinc-500 dark:text-dtext/70">{{ post.description }}</p>
          </div>
          <!--正文-->
          <ContentRenderer v-if="renderedPost" :value="renderedPost" />
          <!--编辑链接-->
          <div v-if="editUrl"
            class="mt-8 py-4 px-4 border border-main/40 dark:border-main/50 rounded-lg bg-main/10 dark:bg-main/15">
            <a :href="editUrl" target="_blank" rel="noopener" class="text-main transition-colors">
              Edit this article on GitHub
            </a>
          </div>
        </article>
        <ArticleToc
          v-if="post.body?.toc?.links?.length"
          :links="post.body.toc.links"
        />
      </main>
    </template>
    <div v-else class="flex-1 py-12">
      <div class="empty-page">
        <p>{{ route.path }}</p>
        <h1>Page Not Found</h1>
        <p>Oops! The content you're looking for doesn't exist.</p>
        <NuxtLink to="/">Go back home</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getGitHubEditUrl } from '~/utils/content'
import { withDocSidenotes } from '~/utils/docSidenotes'
import { useDocPreferencesStore } from '~/stores/docPreferences'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const docPreferences = useDocPreferencesStore()
const { data: post } = await useAsyncData(`doc:${route.path}`, () => {
  return queryCollection('docs').path(route.path).first()
})

const editUrl = computed(() => post.value ? getGitHubEditUrl(post.value.path) : '')
const renderedPost = computed(() => post.value
  ? { ...post.value, body: docPreferences.footnotePlacement === 'side'
    ? withDocSidenotes(post.value.body)
    : post.value.body }
  : null)
const hasSidenotes = computed(() => Boolean(post.value && renderedPost.value?.body !== post.value.body))

// 当前系列 key：优先 frontmatter 的 series，否则取路径第二段（/docs/<series>/<slug>）
const currentSeries = computed(() => {
  if (!post.value) return ''
  return post.value.series || post.value.path.split('/')[2] || ''
})

if (post.value) {
  const baseUrl = 'https://tripper.press'
  useHead({
    titleTemplate: '%s - Tripper Press',
    link: [
      { rel: 'canonical', href: `${baseUrl}${post.value.path}` },
    ] as any,
  })
  useSeoMeta({
    title: post.value.title,
    ogTitle: post.value.title,
    description: post.value.description || 'Take Photo, Think Seriously',
    ogDescription: post.value.description || 'Take Photo, Think Seriously',
  })
} else {
  useHead({
    titleTemplate: '%s - Tripper Press',
    title: 'Page Not Found',
  })
  useSeoMeta({
    title: 'Page Not Found',
    ogTitle: 'Page Not Found',
  })
}
</script>

<style>
.docs-page--annotated {
  max-width: 1536px;
}

.docs-page--annotated .docs-article {
  max-width: none;
}

.doc-note-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  margin-bottom: 1.4rem;
}

.doc-note-text {
  min-width: 0;
}

.doc-note-text > :last-child {
  margin-bottom: 0;
}

article .doc-sidenotes {
  min-width: 0;
  margin-top: 0.75rem;
  padding-left: 1rem;
  border-left: 1px solid #e4e4e7;
  color: #71717a;
  overflow-wrap: anywhere;
}

.dark article .doc-sidenotes {
  border-color: #3f3f46;
  color: #a1a1aa;
}

article .doc-sidenotes ol {
  margin: 0;
  padding-left: 1.6em;
}

article .doc-sidenotes li,
article .doc-sidenotes p,
article .doc-sidenotes ol,
article .doc-sidenotes ul {
  font-size: 13px;
  line-height: 1.7;
  text-align: left;
  color: inherit;
}

article .doc-sidenotes li {
  margin-bottom: 0.65em;
}

article .doc-sidenotes li:last-child,
article .doc-sidenotes li > :last-child {
  margin-bottom: 0;
}

article .doc-sidenotes li[id] {
  scroll-margin-top: 80px;
}

article .doc-sidenotes li:target {
  background: rgb(113 175 221 / 12%);
  border-radius: 4px;
}

@media (min-width: 1024px) {
  .docs-page--annotated .docs-heading {
    max-width: calc((100% - 2rem) * 0.65);
  }

  .doc-note-row {
    grid-template-columns: minmax(0, 1.85fr) minmax(0, 1fr);
    column-gap: 2rem;
  }

  article .doc-sidenotes {
    margin-top: 0;
  }
}
</style>

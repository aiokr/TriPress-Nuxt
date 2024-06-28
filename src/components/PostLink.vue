<template>
  <NuxtLink :to="post._path" @click="updateCurrentPost(post)"
    class="h-24 flex justify-between gap-1 mx-1 mb-1 p-1 rounded-lg hover:bg-main/20 transition-all"
    :style="props.currentPost._path === post._path ? 'background-color: #71afdd; color: #fff' : ''">
    <div class="p-1 text-sm mr-auto">
      <div class="text-xs text-text/30 dark:text-dtext/30 pb-1">{{ new Date(post.date).toISOString().split('T')[0] }}
      </div>
      <div>{{ post.title }}</div>
    </div>
    <div v-if="post.cover" class="aspect-square rounded-lg bg-center bg-cover h-full p-1"
      :style="'background-image: url(' + post.cover + ')'">
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  post: any;
  currentPost: any;
}>();

const emit = defineEmits(['updateCurrentPost']);

const isCurrentPost = computed(() => {
  return props.currentPost._id === props.post._id;
});

const updateCurrentPost = (post: any) => {
  emit('updateCurrentPost', post);
};
</script>
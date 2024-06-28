<template>
  <NuxtLink :to="post._path" @click="updateCurrentPost(post)"
    class="h-24 grid grid-cols-3 m-2 px-1 py-2 rounded-lg hover:bg-main/20 transition-all"
    :style="props.currentPost._path === post._path ? 'background-color: #71afdd; color: #fff' : ''">
    <div class="col-span-2 p-1">
      {{ post.title }}
    </div>
    <div class="aspect-square rounded bg-center bg-cover w-fit" :style="'background-image: url(' + post.cover + ')'">
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
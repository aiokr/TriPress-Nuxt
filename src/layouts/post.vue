<template>
  <main class="w-screen h-screen overflow-auto">
    <div class="fixed top-0 right-0 left-0 h-12 w-full px-36 flex blur-3xl -z-50">
      <div class="bg-main/40 flex-1 h-full"></div>
      <div class="bg-purple-300/40 w-1/5 h-full"></div>
      <div class="bg-pink-300/30 w-2/5 h-full"></div>
    </div>
    <div class="flex">
      <div v-if="isAsideCollapsed" class="z-10 hidden md:flex md:w-[448px]">
        <div
          class="categories w-40 border-r dark:border-white/20 sticky flex flex-col items-start justify-between gap-1">
          <div class="p-2">
            <div class="pt-6 pb-2 font-bold text-lg p-1">Categories</div>
            <button class="category p-1 block rounded w-full text-start text-sm" @click="chooseAllCategories"
              :style="isAllCategories ? '' : 'color: #22283150'">
              All Categories
            </button>
            <button v-for="category in allCategories" :key="category"
              class="category p-1 block rounded w-full text-start text-sm"
              :style="currentCategories.includes(category) ? '' : 'color: #22283150'"
              @click="handleCategoryClick(category)">
              {{ category }}
            </button>
          </div>
          <button class="pt-auto h-10 border-t dark:border-white/20 w-full flex items-center justify-center"
            @click="handleAsideCollapse">
            <IconsExpandLeft />
          </button>
        </div>
        <div class="posts w-72 border-r dark:border-white/20 flex flex-col">
          <PostLink v-for="post in queryPosts" :post="post" :currentPost="currentPost"
            @updateCurrentPost="updateCurrentPost" />
        </div>
      </div>
      <div class="postArea flex-1 flex flex-col h-screen overflow-y-auto">
        <div
          class="fixed md:sticky top-0 left-0 right-0 bg-white/60 dark:bg-dbg/80 backdrop-blur h-12 border-b dark:border-white/20 flex items-center">
          <button @click="handleAsideCollapse" class="p-3 hidden md:block">
            <IconsExpandLeft />
          </button>
          <div class="text-xs text-text/30 dark:text-dtext/30 ml-4 md:ml-2 mr-auto">
            <NuxtLink to="/" class="hover:text-text dark:hover:text-dtext transition-all">TriPress</NuxtLink>
            /
            <NuxtLink to="/posts" class="hover:text-text dark:hover:text-dtext transition-all">Posts</NuxtLink>
            /
            <span>{{ currentPost.category }}</span>
            /
            <span>{{ currentPost.title }}</span>
          </div>
          <button v-if="colorMode.value === 'light'" class="p-2" @click="handleColorMode">
            <IconsIconSun />
          </button>
          <button v-if="colorMode.value === 'dark'" class="p-2" @click="handleColorMode">
            <IconsIconMoon />
          </button>
        </div>
        <div class="">
          <slot />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

onMounted(() => {
  // 首次进入文章阅读页面时，获取当前文章
  const currentUrl = window.location.pathname;
  currentPost.value = queryPosts.value.find((post) => post._path === currentUrl);
});

const colorMode = useColorMode(); // 颜色模式

// 侧边栏是否折叠
const isAsideCollapsed = ref<boolean>(true); // false 为不展示侧边栏
const handleAsideCollapse = () => {
  isAsideCollapsed.value = !isAsideCollapsed.value;
};

// 所有文章和所有分类数据
const posts = await queryContent("/post").only(["_path", "title", "date", "category", "cover"]).sort({ date: -1 }).find();
const allCategories = Array.from(new Set(posts.map((post) => post.category).filter((category) => category !== undefined)));

const currentCategories = ref(allCategories); // 当前选中的分类
const queryPosts = ref(posts); // 当前分类中的文章列表
const currentPost = ref<any>(''); // 当前展示的文章

// 更新当前文章
const updateCurrentPost = (post: any) => {
  currentPost.value = post;
};

// 是否所有分类都被选中
const isAllCategories = computed(() => currentCategories.value.length === allCategories.length);

// 点击分类
const handleCategoryClick = (category: string) => {
  if (currentCategories.value.includes(category)) {
    currentCategories.value = currentCategories.value.filter((c) => c !== category);
  } else {
    currentCategories.value = [...currentCategories.value, category];
  }
};

// 选择全部分类
const chooseAllCategories = () => {
  if (isAllCategories.value) {
    currentCategories.value = [];
  } else {
    currentCategories.value = allCategories;
  }
};

// 监听分类变化
watch(currentCategories, () => {
  if (currentCategories.value.length === 0) {
    queryPosts.value = posts;
  } else {
    queryPosts.value = posts.filter((post) => currentCategories.value.includes(post.category));
  }
});


// 切换颜色模式
const handleColorMode = () => {
  if (colorMode.preference === 'dark') {
    colorMode.preference = 'light';
  } else {
    colorMode.preference = 'dark';
  }
};

</script>

<style>
.el-aside {
  height: calc(100vh - 64px);
  transition: width 0.3s ease;
  scrollbar-width: none;
}

.el-container {
  transition: width 0.3s ease;
}

.postArea {
  @media screen and (max-width: 1024px) {
    width: 100vw
  }
}
</style>
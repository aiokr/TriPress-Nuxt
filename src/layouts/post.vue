<template>
  <main class="">
    <div class="fixed top-0 right-0 left-0 h-12 w-full px-36 flex blur-3xl -z-50">
      <div class="bg-main/40 flex-1 h-full"></div>
      <div class="bg-purple-300/40 w-1/5 h-full"></div>
      <div class="bg-pink-300/30 w-2/5 h-full"></div>
    </div>
    <div class="flex transition-all">
      <!--侧边栏-->
      <div class="z-10 hidden md:flex">
        <!--分类列表-->
        <Transition name="collapsed">
          <div v-if="!isCategoriesListCollapsed"
            class="categories h-screen sticky flex flex-col items-start gap-1 w-48">
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
          </div>
        </Transition>
        <!--文章列表-->
        <div v-if="!isPostsListCollapsed" class="posts dark:border-white/20 flex flex-col gap-1" style="width: 320px;">
          <div class="p-2 h-12 flex gap-2 items-center">
            <button @click="handleCategoryCollapse" class="p-3 hidden md:block transition duration-500"
              :style="isCategoriesListCollapsed ? 'transform: rotateY(180deg);' : ''">
              <IconsExpandLeft />
            </button>
            <input placeholder="Search"
              class="w-full h-8 p-2 text-sm pring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-main shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700 transition" />
          </div>
          <div class=" h-[calc(100vh-54px)] overflow-y-scroll no-scrollbar">
            <PostLink v-for="post in queryPosts" :post="post" :currentPost="currentPost"
              @updateCurrentPost="updateCurrentPost" />
          </div>
        </div>
        <!--拖动手柄 - 文章列表和主要区域中间-->
        <ClientOnly>
          <div id="posts-drag-bar"
            class="drag-bar posts-drag-bar border-r dark:border-white/20 w-2 hover:bg-zinc-300 transition"></div>
        </ClientOnly>
      </div>
      <!--主要区域-->
      <div class="postArea flex-1 flex flex-col h-screen overflow-y-auto">
        <div
          class="fixed md:sticky top-0 left-0 right-0 bg-white/60 dark:bg-dbg/80 backdrop-blur h-12 border-b dark:border-white/20 flex items-center justify-between z-10">
          <div class="text-xs text-text/30 dark:text-dtext/30 ml-4 mr-auto truncate">
            <NuxtLink to="/" class="hover:text-text dark:hover:text-dtext transition-all">TriPress</NuxtLink>
            /
            <NuxtLink to="/posts" class="hover:text-text dark:hover:text-dtext transition-all">Posts</NuxtLink>
            /
            <span>{{ currentPost.category }}</span>
            /
            <span>{{ currentPost.title }}</span>
          </div>
          <ClientOnly>
            <button v-if="colorMode.value === 'light'" class="p-2" @click="handleColorMode"
              data-umami-event="changeColorModeToDark">
              <IconsIconSun />
            </button>
            <button v-else-if="colorMode.value === 'dark'" class="p-2" @click="handleColorMode"
              data-umami-event="changeColorModeToLight">
              <IconsIconMoon />
            </button>
          </ClientOnly>
        </div>
        <div class="max-h-[calc(100vh-48px)]">
          <slot />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onKeyStroke } from '@vueuse/core'

onMounted(() => {
  // 首次进入文章阅读页面时，获取当前文章
  const currentUrl = window.location.pathname;
  currentPost.value = queryPosts.value.find((post) => post._path === currentUrl);
});

// 侧边栏拖动功能
onMounted(() => {
  let postsDragBar = document.getElementById('posts-drag-bar');
  let titleDragBar = document.getElementById('title-drag-bar');

  postsDragBar?.addEventListener('mousedown', (e) => {
    let startX = e.clientX;
    let startWidth = (document.querySelector('.posts') as HTMLElement)?.offsetWidth;

    if (isPostsListCollapsed.value === true) {
      isPostsListCollapsed.value = false;
    }

    // 鼠标移动事件
    document.onmousemove = (e) => {
      window.getSelection()?.removeAllRanges(); // 防止选中文字
      let moveX = e.clientX - startX;
      if (startWidth + moveX < 220) {
        return;
      }
      (document.querySelector('.posts') as HTMLElement).style.width = startWidth + moveX + 'px';
    };

    // 鼠标松开事件
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      window.getSelection()?.removeAllRanges(); // 防止选中文字
    };
  });

  titleDragBar?.addEventListener('mousedown', (e) => {
    let startX = e.clientX;
    let startWidth = (document.querySelector('.categories') as HTMLElement)?.offsetWidth;

    if (isCategoriesListCollapsed.value === true) {
      isCategoriesListCollapsed.value = false;
    }

    // 鼠标移动事件
    document.onmousemove = (e) => {
      window.getSelection()?.removeAllRanges(); // 防止选中文字
      let moveX = e.clientX - startX;
      if (startWidth + moveX < 180 && startWidth + moveX > 120) {
        return;
      } else if (startWidth + moveX < 120) {
        isCategoriesListCollapsed.value = true;
      }
      (document.querySelector('.categories') as HTMLElement).style.width = startWidth + moveX + 'px';
    };

    // 鼠标松开事件
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      window.getSelection()?.removeAllRanges(); // 防止选中文字
    };
  });
});

const colorMode = useColorMode(); // 颜色模式

// 侧边栏是否折叠
const isAsideCollapsed = ref<boolean>(false); // true 为折叠侧边栏 / false 为展示侧边栏
const isPostsListCollapsed = ref<boolean>(false); // true 为折叠文章列表 / false 为展示文章列表
const isCategoriesListCollapsed = ref<boolean>(true); // true 为折叠分类列表 / false 为展示分类列表
const handleAsideCollapse = () => {
  isAsideCollapsed.value = true;
  isPostsListCollapsed.value = true;
  isCategoriesListCollapsed.value = true;
};

const handleCategoryCollapse = () => {
  isCategoriesListCollapsed.value = !isCategoriesListCollapsed.value;
};

const handlePostsCollapse = () => {
  isPostsListCollapsed.value = !isPostsListCollapsed.value;
};

// 文章区域顶部折叠按钮
const handlePostHeaderCollapse = () => {
  // 当分类和文章列表都展开时，全部折叠
  if (isPostsListCollapsed.value === false && isCategoriesListCollapsed.value === false) {
    isPostsListCollapsed.value = true;
    isCategoriesListCollapsed.value = true;
  } else if (isPostsListCollapsed.value === true && isCategoriesListCollapsed.value === true) {
    isPostsListCollapsed.value = false;
    isCategoriesListCollapsed.value = false;
  } else {
    isPostsListCollapsed.value = true;
  }
};

// 所有文章和所有分类数据
const posts = await queryContent("/post").only(["_path", "title", "date", "category", "cover", "type"]).where({ type: { $ne: 'draft' } }).sort({ date: -1 }).find();
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
.collapsed-enter-from {
  transform: translateX(-120px);
  width: 0px;
}

.collapsed-leave-from {
  width: 192px;
}

.collapsed-leave-to {
  width: 0px;
}

.collapsed-enter-active {
  transition: transform 0.3s, opacity 0.3s, width 0.3s;
}

.collapsed-leave-active {
  transform: translateX(-120px);
  transition: transform 0.3s, opacity 0.3s, width 0.3s;
}

.postArea {
  @media screen and (max-width: 1024px) {
    width: 100vw
  }
}
</style>
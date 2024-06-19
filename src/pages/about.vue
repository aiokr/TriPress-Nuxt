<template>
  <main class="container mx-auto">
    <section class="h-[calc(80vh-64px)] w-full mt-[10vh] flex justify-center items-center">
      <div class="">
        <div class="text-4xl font-bold p-2">你好，我是</div>
        <div class="inline-block text-8xl font-bold marked p-2 mb-8">aiokr</div>
        <div id="linksDock" class="border rounded-lg w-max px-3 h-16 flex justify-start items-center gap-3"
          @mouseenter="onMouseenter" @mousemove="onMousemove" @mouseleave="onMouseleave">
          <NuxtLink v-for="link in links" :key="link.link" :to="link.link" target="_blank"
            :style="'width:' + iconWidth + 'px; height:' + iconWidth + 'px;'"
            class="linksDockItem flex items-center justify-center aspect-square rounded-full bg-dtext/20 hover:bg-dtext/40 transition-colors">
            <component :is="link.icon" />
          </NuxtLink>
        </div>
      </div>
    </section>
    <article class="container max-w-[800px] mx-auto">
      <ContentDoc>
        <template v-slot="{ doc }">
          <ContentRenderer :value="doc" />
        </template>
      </ContentDoc>
    </article>
  </main>
</template>

<script setup>
import IconsTwitter from '~/components/icons/Twitter.vue';
import IconYoutube from '~/components/icons/Youtube.vue';

useHead({
  title: '关于 - Tripper Press',
  meta: [
    { name: 'description', content: 'Take Photo, Think Seriousl' }
  ]
})

useSeoMeta({
  title: '关于 - Tripper Press',
  ogTitle: '关于 - Tripper Press',
  description: 'Take Photo, Think Seriousl',
  ogDescription: 'Take Photo, Think Seriousl'
})

// 默认图标宽度
let iconWidth = ref(42);

const links = ref([
  {
    title: 'X',
    width: iconWidth.value,
    link: 'https://x.com/skomobi',
    icon: IconsTwitter
  },
  {
    title: 'Youtube',
    width: iconWidth.value,
    link: 'https://youtube.com/@tripress',
    icon: IconYoutube
  }
])

let iconOriWidth = 44;
let iconBigWidth = 72;


// Dock 元素
import { ref, onMounted } from 'vue';

const linksDock = ref(null);
const linksDockItem = ref([]);

onMounted(() => {
  linksDock.value = document.getElementById('linksDock');
  linksDockItem.value = document.querySelectorAll('.linksDockItem');
});

const { state, style: elementStyle } = reactiveStyle({
  opacity: 0,
  backgroundColor: 'blue',
})

const isMouseIntoDock = ref(false)

const onMouseenter = (e) => {
  isMouseIntoDock.value = true;
  setTimeout(() => {
    isMouseIntoDock.value = false;
  }, 120);

  const x = e.clientX;
  const y = e.clientY;
  const dockRect = linksDock.value?.getBoundingClientRect(); // 获取 Dock 元素的位置
  const isMouseInDock = x > dockRect.x && x < dockRect.x + dockRect.width && y > dockRect.y && y < dockRect.y + dockRect.height; // 鼠标是否在 Dock 元素内

  linksDockItem.value.forEach((item, index) => {
    const itemRect = item.getBoundingClientRect(); // 获取图标元素的位置
    const isMouseInItem = x > itemRect.x && x < itemRect.x + itemRect.width && y > itemRect.y && y < itemRect.y + itemRect.height; // 鼠标是否在图标元素内

    const distance = Math.sqrt(Math.pow(x - itemRect.x - itemRect.width / 2, 2) + Math.pow(y - itemRect.y - itemRect.height / 2, 2)); // 计算鼠标与图标的距离
    const iconNewWidth = iconOriWidth + (iconBigWidth - iconOriWidth) * (1 - distance / 240); // 计算图标新的大小

    // 当前
    const currentWidth = parseInt(item.style.width);
    const currentHeight = parseInt(item.style.height);
    // 目标
    const targetWidth = iconNewWidth;
    const targetHeight = iconNewWidth;
    // 持续时间
    const duration = 160;

    const startTime = performance.now(); // 动画开始时间

    // 动画函数
    const animate = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1); // Calculate the progress of the animation

      const newWidth = currentWidth + (targetWidth - currentWidth) * progress;
      const newHeight = currentHeight + (targetHeight - currentHeight) * progress;

      if (isMouseInDock && distance < 240) {
        item.style.width = newWidth + 'px';
        item.style.height = newHeight + 'px';
      }

      if (progress < 1) {
        requestAnimationFrame(animate); // Continue the animation
      }
    };

    requestAnimationFrame(animate);
  });

}

// 鼠标移动事件
const onMousemove = (e) => {
  // 获取鼠标位置
  const x = e.clientX;
  const y = e.clientY;
  const dockRect = linksDock.value?.getBoundingClientRect(); // 获取 Dock 元素的位置
  const isMouseInDock = x > dockRect.x && x < dockRect.x + dockRect.width && y > dockRect.y && y < dockRect.y + dockRect.height; // 鼠标是否在 Dock 元素内

  // 每个图标大小不同
  linksDockItem.value.forEach((item, index) => {
    const itemRect = item.getBoundingClientRect(); // 获取图标元素的位置
    const isMouseInItem = x > itemRect.x && x < itemRect.x + itemRect.width && y > itemRect.y && y < itemRect.y + itemRect.height; // 鼠标是否在图标元素内
    const distance = Math.sqrt(Math.pow(x - itemRect.x - itemRect.width / 2, 2) + Math.pow(y - itemRect.y - itemRect.height / 2, 2)); // 计算鼠标与图标的距离
    const iconNewWidth = iconOriWidth + (iconBigWidth - iconOriWidth) * (1 - distance / 240); // 计算图标新的大小

    if (isMouseInDock && !isMouseIntoDock.value && distance < 240) {
      item.style.width = iconNewWidth + 'px';
      item.style.height = iconNewWidth + 'px';
    }
  });
}

// 鼠标离开事件
const onMouseleave = () => {
  linksDockItem.value.forEach((item, index) => {
    // 当前
    const currentWidth = parseInt(item.style.width);
    const currentHeight = parseInt(item.style.height);
    // 目标
    const targetWidth = iconOriWidth;
    const targetHeight = iconOriWidth;
    // 持续时间
    const duration = 160;

    const startTime = performance.now();// 动画开始时间

    // 动画函数
    const animate = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1); // Calculate the progress of the animation

      const newWidth = currentWidth + (targetWidth - currentWidth) * progress;
      const newHeight = currentHeight + (targetHeight - currentHeight) * progress;

      item.style.width = newWidth + 'px';
      item.style.height = newHeight + 'px';

      if (progress < 1) {
        requestAnimationFrame(animate); // Continue the animation
      }
    };

    requestAnimationFrame(animate);
  });
  isMouseIntoDock.value = true;
}




</script>

<style scoped>
.marked {
  background: linear-gradient(104deg, #71afdd00 0.9%, #71afdd7c 2.4%, #71afdd4d 5.8%, #71afdd1a 93%, #71afdd23 96%, #82ffff00 98%), linear-gradient(183deg, #71afdd00 0%, #71afdd3b 7.9%, #71afdd00 15%);
  border-radius: 16px;
}
</style>
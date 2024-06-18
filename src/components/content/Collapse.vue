<template>
  <button class="block text-left p-3 border rounded-xl"  @click="toggle">
    <div class="w-full collapseHeader">
      <slot name="collapseHeader" class="!font-bold !text-lg" />
    </div>
    <div class="collapseBody transition-[300]" style="overflow: hidden;"
      :style="isOpen ? 'max-height: 400px; mask-image: none;'
        : 'max-height: 24px; mask-image: linear-gradient(black 0%, rgb(0, 0, 0) 30%, rgba(0, 0, 0, 0.2) 80%, transparent 100%);'">
      <slot />
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
const toggle = () => {
  isOpen.value = !isOpen.value;
};

</script>

<style>
.collapseHeader p {
  @apply !font-bold !text-xl;
  margin: 0.2em 0 0.8em 0 !important;
}

.collapseBody {}
</style>
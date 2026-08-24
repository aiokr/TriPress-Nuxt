<template>
  <div class="block text-left border rounded-xl mb-5">
    <button v-if="$slots.collapseHeader" type="button"
      class="w-full collapseHeader text-left bg-[#71afdd] text-white rounded-t-lg px-3 py-2" @click="toggle">
      <slot name="collapseHeader" />
    </button>
    <button v-else type="button" class="w-full collapseHeader text-left bg-[#71afdd] text-white rounded-t-lg px-3 py-2"
      @click="toggle">
      Collapse
    </button>
    <div class="collapseBody transition-[300]" style="overflow: hidden;"
      :class="{ 'cursor-pointer': !$slots.collapseHeader }"
      :style="isOpen ? 'max-height: 400px; mask-image: none;'
        : 'max-height: 0px; mask-image: linear-gradient(black 0%, rgb(0, 0, 0) 30%, rgba(0, 0, 0, 0.6) 80%, transparent 100%);'">
      <slot />
    </div>
  </div>
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
  font-size: 1rem;
  line-height: 1rem;
  margin: 8px !important;
}

.collapseBody {
  padding-top: 0.4rem;
  margin: 8px 16px !important;
}
</style>
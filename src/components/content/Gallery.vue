<template>
  <div class="grid gap-1 pb-4" :style="'grid-template-columns: repeat(' + gridCols + ', minmax(0, 1fr));'">
    <div v-for="i in pic">
      <img :src="i" alt="gallery" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  pic: {
    type: Array,
    default: () => []
  }
})

const picNumber = props.pic.length;
const picMod2 = picNumber % 2;
const picMod3 = picNumber % 3;
let gridCols = 2;

if (picMod3 === 0) {
  gridCols = 3;
} else if (picMod2 === 0) {
  gridCols = 2;
} else {
  gridCols = 2;
}

</script>
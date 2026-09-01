<script setup>
defineProps({
  name: { type: String, required: true },
  hex: { type: String, required: true }
})

async function copyHex(hex) {
  try {
    await navigator.clipboard.writeText(hex)
  } catch (err) {
    console.error('Copy failed', err)
  }
}
</script>

<template>
  <div
    class="group flex-1 flex flex-col justify-between h-full text-xs p-2 cursor-pointer select-none active:scale-95 transition-transform duration-150"
    @click="copyHex(hex)">
    <div class="font-bold opacity-0 group-hover:opacity-100 transition-opacity">{{ name }}</div>
    <div class="uppercase">{{ hex }}</div>
  </div>
</template>

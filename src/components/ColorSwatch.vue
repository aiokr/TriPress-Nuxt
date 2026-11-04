<script setup>
const props = defineProps({
  name: { type: String, required: true },
  hex: { type: String, required: true },
  token: { type: String, default: '' },
})

const swatch = ref(null)
const displayHex = ref(props.hex)
const colorMode = useColorMode()

// 主题色块展示并复制当前实际颜色，避免暗色模式下仍显示亮色 HEX。
function updateHex() {
  displayHex.value = props.hex
  if (!props.token || !swatch.value) return
  const channels = getComputedStyle(swatch.value).getPropertyValue(`--${props.token}`).trim().split(/\s+/).map(Number)
  if (channels.length === 3 && channels.every((value) => Number.isInteger(value) && value >= 0 && value <= 255)) {
    displayHex.value = `#${channels.map((value) => value.toString(16).padStart(2, '0')).join('')}`
  }
}

onMounted(updateHex)
watch([() => props.hex, () => props.token, () => colorMode.value], () => nextTick(updateHex), { flush: 'post' })

const copied = ref(false)
let timer = null

async function copyHex(hex) {
  try {
    await navigator.clipboard.writeText(hex)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      copied.value = false
    }, 1500)
  } catch (err) {
    console.error('Copy failed', err)
  }
}
</script>

<template>
  <div
    ref="swatch"
    class="group flex-1 flex flex-col justify-between text-xs p-2 cursor-pointer select-none active:scale-95 transition-transform duration-150"
    @click="copyHex(displayHex)">
    <div class="font-bold opacity-0 group-hover:opacity-100 transition-opacity">{{ copied ? 'Copied!' : name }}</div>
    <div class="uppercase">{{ displayHex }}</div>
  </div>
</template>

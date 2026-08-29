<template>
  <span>{{ displayValue }}</span>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  value?: number | null
  duration?: number
  decimals?: number
}>(), {
  value: 0,
  duration: 800,
  decimals: 0,
})

const current = ref(0)
let rafId: number | null = null

const displayValue = computed(() => current.value.toFixed(props.decimals))

function animateTo(target: number) {
  if (rafId) cancelAnimationFrame(rafId)
  const start = current.value
  if (target === start) {
    current.value = target
    return
  }
  const startTime = performance.now()
  const step = (now: number) => {
    const progress = Math.min((now - startTime) / props.duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    current.value = start + (target - start) * eased
    if (progress < 1) {
      rafId = requestAnimationFrame(step)
    } else {
      current.value = target
    }
  }
  rafId = requestAnimationFrame(step)
}

watch(
  [() => props.value, () => props.decimals],
  ([v]) => {
    animateTo(v ?? 0)
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

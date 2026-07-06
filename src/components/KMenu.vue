<template>
  <Transition>
    <div v-if="kMenuVisiable"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      class="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen z-40">
      <button
        type="button"
        aria-label="Close search"
        class="background fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-black/20 z-40 cursor-default"
        @click="closekMenu"></button>
      <div
        class="fixed top-12 left-0 right-0 container max-w-xl mx-auto min-h-48 bg-white/80 dark:bg-dbg/80 backdrop-blur rounded-2xl shadow-xl p-3 flex z-50">
        <label for="kmenu-search-input" class="sr-only">Search</label>
        <input
          id="kmenu-search-input"
          ref="inputRef"
          v-model="kSearch"
          type="search"
          placeholder="Search (Esc to close)"
          class="w-full h-8 p-2 text-sm pring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-main shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700 transition" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useMagicKeys } from '@vueuse/core'

const kMenuVisiable = ref(false)
const kSearch = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
let lastFocused: HTMLElement | null = null

const { alt_k, ctrl_k, meta_k, escape } = useMagicKeys()

const openkMenu = async () => {
  lastFocused = (document.activeElement as HTMLElement) ?? null
  kMenuVisiable.value = true
  await nextTick()
  inputRef.value?.focus()
}

const closekMenu = () => {
  kMenuVisiable.value = false
  kSearch.value = ''
  // 恢复打开前焦点
  if (lastFocused && typeof lastFocused.focus === 'function') {
    lastFocused.focus()
  }
  lastFocused = null
}

const togglekMenu = () => {
  if (kMenuVisiable.value) closekMenu()
  else openkMenu()
}

// 快捷键监听：先声明函数再注册 watch，避免 TDZ
// ⌘+K (Mac) / Ctrl+K (Win/Linux) / Alt+K 都能打开
watchEffect(() => {
  if (ctrl_k.value || alt_k.value || meta_k.value) {
    togglekMenu()
  }
})

watch(escape, (pressed) => {
  if (pressed && kMenuVisiable.value) {
    closekMenu()
  }
})
</script>

<style>
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease-in-out;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

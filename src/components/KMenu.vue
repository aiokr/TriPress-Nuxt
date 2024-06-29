<template>
  <Transition>
    <main v-if="kMenuVisiable" class="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen z-40">
      <div class="background fixed top-0 bottom-0 left-0 right-0 w-screen h-screen bg-black/20 z-40"
        @click="closekMenu"></div>
      <div
        class="fixed top-12 left-0 right-0 container max-w-xl mx-auto min-h-48 bg-white/80 dark:bg-dbg/80 backdrop-blur rounded-2xl shadow-xl p-3 flex z-50">
        <input v-model="kSearch" placeholder="Search" v-focus
          class="w-full h-8 p-2 text-sm pring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-main shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700 transition" />
      </div>
    </main>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMagicKeys } from '@vueuse/core'

const kMenuVisiable = ref(false)
const kSearch = ref('')

const { alt_k, ctrl_k } = useMagicKeys()

watchEffect(() => {
  if (ctrl_k.value || alt_k.value) {
    kMenuVisiable.value = !kMenuVisiable.value
  }
})

const closekMenu = () => {
  kMenuVisiable.value = false
}

const vFocus = {
  mounted: (el: any) => el.focus()
}

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
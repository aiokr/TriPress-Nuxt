<template>
  <main class="container max-w-[1000px] mx-auto pt-20 px-4">
    <div class="pb-6">
      <div class="text-3xl font-bold text-text dark:text-dtext pb-2">My Kit</div>
      <div class="text-dtext pb-16">
        The equipment I using for creating and life.
      </div>
      <hr />
    </div>
    <div class="pt-4">
      <div class="text-2xl font-bold text-text dark:text-dtext pb-2">Carema</div>
      <div v-for="i in usesData.camera" :key="i.model">
        {{ i }}
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">

const appConfig = useAppConfig()

const usesData = appConfig.content.uses

</script>
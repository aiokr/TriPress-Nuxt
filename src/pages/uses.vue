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
      <div class="text-2xl font-bold text-text dark:text-dtext pb-4">Film</div>
      <div class="grid grid-cols-2 md:grid-cols-5 grid-4">
        <div v-for="i in usesData.film" :key="i.model">
          <NuxtImg v-if="i.image" :src="i.image" :alt="i.model" class="rounded-lg border" />
          <NuxtLink v-if="i.link" :to="i.link" class="text-lg font-bold text-text dark:text-dtext">{{ i.model }}
          </NuxtLink>
          <div class="text-sm py-2">{{ i.model }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const appConfig: any = useAppConfig()
const usesData: any = appConfig.content.uses

</script>
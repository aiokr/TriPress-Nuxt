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
      <div class="text-2xl font-bold text-text dark:text-dtext pb-4">Camera</div>
      <div class="grid grid-cols-2 gap-5 pb-8">
        <div v-for="i in usesData.camera" :key="i.model">
          <NuxtImg v-if="i.image" :src="i.image" :alt="i.model" class="rounded-lg border" />
          <div class="flex gap-2 items-center justify-between uppercase pt-1">
            <div class="text-sm py-2 inline-block">{{ i.model }}</div>
            <div v-if="i.status === 'plan' || 'using' || 'used'"
              class="py-1 px-2 text-xs border rounded-full inline-block">
              {{ i.status }}
            </div>
          </div>
        </div>
      </div>
      <div class="text-2xl font-bold text-text dark:text-dtext pb-4">Film</div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div v-for="i in usesData.film" :key="i.model">
          <NuxtImg v-if="i.image" :src="i.image" :alt="i.model" class="rounded-lg border" />
          <div class="flex gap-2 items-center justify-between uppercase pt-1">
            <div class="text-sm py-2 inline-block">{{ i.model }}</div>
            <div v-if="i.status === 'plan' || 'using' || 'used'"
              class="py-1 px-2 text-xs border rounded-full inline-block">
              {{ i.status }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const appConfig: any = useAppConfig()
const usesData: any = appConfig.content.uses

</script>
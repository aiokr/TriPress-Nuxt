<template>
  <main class="container max-w-[1000px] mx-auto pt-20 px-4 pb-20">
    <div class="pb-6">
      <div class="text-3xl font-bold text-text dark:text-dtext pb-2">运动热力图</div>
      <div class="text-dtext pb-16">
        基于 Mapbox MTS 的轨迹热力图，展示多年跑步与骑行足迹。
      </div>
      <hr />
    </div>

    <section class="mb-10">
      <h2 class="text-xl font-bold text-text dark:text-dtext pb-4">足迹概览</h2>
      <ClientOnly>
        <MapHeatmap />
        <template #fallback>
          <div class="w-full h-[480px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-sm text-zinc-500 dark:text-dtext/70">
            Loading heatmap…
          </div>
        </template>
      </ClientOnly>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-bold text-text dark:text-dtext pb-4">关于此图</h2>
      <div class="border rounded-xl p-5 bg-white/40 dark:bg-zinc-900/40 text-sm text-slate-600 dark:text-slate-400 space-y-2">
        <p>热力图数据源由本地脚本解析 GPX / TCX / FIT 文件后，经隐私裁剪上传至 Mapbox Tiling Service 生成。</p>
        <p>地图中低缩放层级展示热力分布，高缩放层级切换到散点轨迹。所有轨迹点已剔除家与公司附近 500 米范围，保护隐私。</p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: '运动热力图 - Lab - Tripper Press',
  meta: [
    { name: 'description', content: '基于 Mapbox MTS 的轨迹热力图，展示多年跑步与骑行足迹。' }
  ]
})

useSeoMeta({
  title: '运动热力图 - Lab - Tripper Press',
  ogTitle: '运动热力图 - Lab - Tripper Press',
  description: '基于 Mapbox MTS 的轨迹热力图，展示多年跑步与骑行足迹。',
  ogDescription: '基于 Mapbox MTS 的轨迹热力图，展示多年跑步与骑行足迹。'
})
</script>

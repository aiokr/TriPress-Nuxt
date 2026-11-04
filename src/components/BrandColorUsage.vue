<script setup lang="ts">
import { colorUsage } from '~/theme/color-usage.mjs'

const modes = [
  { id: 'light', title: 'Light · 日光', base: 'Neutral + Frost', description: '中性浅底，冷灰文字与结构。' },
  { id: 'dark', title: 'Dark · 夜色', base: 'Neutral + Stone', description: '中性深底，暖灰文字与结构。' },
]
const groups = [...new Set(colorUsage.map((color) => color.group))]
const currentGroup = ref('背景')
const visibleColors = computed(() => colorUsage.filter((color) => color.group === currentGroup.value))
const statuses = [
  { name: 'Success', text: '已保存更改', classes: 'bg-success-bg text-success-text' },
  { name: 'Warning', text: '请检查尚未完成的内容', classes: 'bg-warning-bg text-warning-text' },
  { name: 'Danger', text: '保存失败，请重试', classes: 'bg-danger-bg text-danger-text' },
  { name: 'Info', text: '有一条新的更新', classes: 'bg-info-bg text-info-text' },
]
const scaleName = (value: string) => value.replaceAll('.', '-')
</script>

<template>
  <section aria-labelledby="color-usage-title">
    <h2 id="color-usage-title" class="heading-2 text-fg pt-12 pb-6">Color Usage</h2>
    <p class="text-fg-muted leading-7 max-w-3xl">
      让内容占据视觉中心。页面、卡片和大面积分区使用 Neutral；亮色模式以 Frost
      承担文字、边框和悬停细节，暗色模式切换为 Stone。品牌蓝用于链接、选中和主要操作，橙与紫只作局部强调。
    </p>

    <ul class="grid gap-4 md:grid-cols-3 my-6 text-sm leading-6">
      <li class="rounded border border-line p-4">
        <span class="block font-semibold text-fg mb-1">中性色铺底</span>
        <span class="text-fg-muted">以约 85–90% 的中性面积承载内容，避免整页蓝底、黄底或大面积高饱和渐变。</span>
      </li>
      <li class="rounded border border-line p-4">
        <span class="block font-semibold text-fg mb-1">品牌色引导</span>
        <span class="text-fg-muted">天空蓝原色保留品牌识别；正文链接使用更深的亮色档或更浅的暗色档，按钮单独配置前景色。</span>
      </li>
      <li class="rounded border border-line p-4">
        <span class="block font-semibold text-fg mb-1">状态色反馈</span>
        <span class="text-fg-muted">绿、黄、红只表达对应状态，配合文字或图标；禁用灰不承载必要信息。</span>
      </li>
    </ul>

    <div class="grid md:grid-cols-2 gap-4">
      <section v-for="mode in modes" :key="mode.id" :class="`theme-${mode.id}`"
        :aria-label="`${mode.title} 配色预览`" class="bg-canvas text-fg border border-line rounded-lg p-4 sm:p-6 min-w-0">
        <div class="flex items-center justify-between gap-3 text-xs text-fg-muted mb-5">
          <span class="font-semibold">{{ mode.title }}</span>
          <span>{{ mode.base }}</span>
        </div>
        <div class="rounded-lg border border-line bg-surface p-4 sm:p-5">
          <span class="inline-block rounded bg-selected px-2 py-1 text-xs font-medium text-link mb-4">旅行笔记</span>
          <h3 class="text-xl font-semibold mb-2">在路上，看见日常。</h3>
          <p class="text-sm leading-6 text-fg-muted mb-4">{{ mode.description }}让照片、文字和每一次思考自然浮现。</p>
          <div class="flex gap-4 text-xs mb-5">
            <span class="text-warm-fg">日落时分</span>
            <span class="text-cold-fg">片刻思考</span>
          </div>
          <label :for="`color-preview-${mode.id}`" class="block text-sm font-medium mb-2">给笔记起个名字</label>
          <input :id="`color-preview-${mode.id}`" type="text" placeholder="例如：海边的一个下午"
            class="w-full min-w-0 rounded border border-line-control bg-sunken px-3 py-2 text-sm text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 focus:ring-offset-surface" />
          <div class="flex flex-wrap items-center gap-3 mt-4">
            <a href="#color-token-map" class="rounded bg-action px-4 py-2 text-sm font-medium text-on-action hover:bg-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface">查看配色配置</a>
            <a href="#color-status" class="rounded px-3 py-2 text-sm text-link hover:bg-hover hover:text-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus">状态色示例 →</a>
          </div>
          <div class="border-t border-line mt-5 pt-3 text-xs text-fg-muted">Neutral 负责面积 · {{ mode.id === 'light' ? 'Frost' : 'Stone' }} 负责细节</div>
        </div>
        <div class="bg-subtle rounded px-3 py-2 text-xs text-fg-muted mt-4">次级分区使用同一套中性色，靠明度建立层次。</div>
        <div class="grid grid-cols-2 gap-2 mt-4">
          <div v-for="status in statuses" :key="status.name" :class="status.classes" class="rounded px-3 py-2 text-xs leading-5">
            <span class="block font-semibold">{{ status.name }}</span>{{ status.text }}
          </div>
        </div>
      </section>
    </div>

    <h3 id="color-token-map" class="heading-3 text-fg pt-8 pb-4 scroll-mt-20">Token Mapping</h3>
    <p class="text-sm text-fg-muted leading-6 mb-4">组件按用途调用语义类，随模式自动换色。</p>
    <div class="flex flex-wrap gap-2 mb-4" role="group" aria-label="筛选颜色用途">
      <button v-for="group in groups" :key="group" type="button" :aria-pressed="currentGroup === group"
        :class="currentGroup === group ? 'bg-selected text-link' : 'text-fg-muted hover:bg-hover'"
        class="rounded px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        @click="currentGroup = group">{{ group }}</button>
    </div>
    <div class="relative overflow-x-auto rounded border border-line">
      <table class="w-full min-w-[680px] text-left text-sm">
        <caption class="sr-only">{{ currentGroup }}的亮色和暗色模式配置</caption>
        <thead class="bg-subtle text-fg-muted">
          <tr><th scope="col" class="p-3 font-medium">用途 / Tailwind 类</th><th scope="col" class="p-3 font-medium">Light</th><th scope="col" class="p-3 font-medium">Dark</th></tr>
        </thead>
        <tbody class="divide-y divide-line">
          <tr v-for="color in visibleColors" :key="color.token">
            <th scope="row" class="p-3 font-normal"><span class="block text-fg">{{ color.usage }}</span><code class="text-xs text-fg-muted">{{ color.utility }}</code></th>
            <td class="p-3 text-fg-muted font-mono text-xs">{{ scaleName(color.light) }}</td>
            <td class="p-3 text-fg-muted font-mono text-xs">{{ scaleName(color.dark) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 id="color-status" class="heading-3 text-fg pt-8 pb-4 scroll-mt-20">Semantic Color</h3>
    <p class="text-fg-muted text-sm leading-6 mb-4">Success 表示完成，Warning 表示需要注意，Danger 表示错误或危险，Info 复用品牌蓝表达中性信息。暗色模式使用深色衬底与浅色文字，保持局部反馈的清晰度。</p>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 pb-6">
      <div>
        <div class="bg-success-bg text-success-text rounded border-l-[16px] border-success p-2 pl-3 mb-4">Success
        </div>
        <div class="h-16 overflow-hidden rounded mb-4 grid grid-cols-3">
          <ColorSwatch name="success-bg" token="success-bg" hex="#e6f5ee" class="bg-success-bg text-success-text" />
          <ColorSwatch name="success" hex="#3fa97a" class="bg-success text-neutral-900" />
          <ColorSwatch name="success-text" token="success-text" hex="#1e6b4c" class="bg-success-text text-success-bg" />
        </div>
      </div>
      <div>
        <div class="bg-warning-bg text-warning-text rounded border-l-[16px] border-warning p-2 pl-3 mb-4">Warning
        </div>
        <div class="h-16 overflow-hidden rounded mb-4 grid grid-cols-3">
          <ColorSwatch name="warning-bg" token="warning-bg" hex="#fbf1de" class="bg-warning-bg text-warning-text" />
          <ColorSwatch name="warning" hex="#e0a23c" class="bg-warning text-neutral-900" />
          <ColorSwatch name="warning-text" token="warning-text" hex="#96620f" class="bg-warning-text text-warning-bg" />
        </div>
      </div>
      <div>
        <div class="bg-danger-bg text-danger-text rounded border-l-[16px] border-danger p-2 pl-3 mb-4">Danger</div>
        <div class="h-16 overflow-hidden rounded mb-4 grid grid-cols-3">
          <ColorSwatch name="danger-bg" token="danger-bg" hex="#faeaea" class="bg-danger-bg text-danger-text" />
          <ColorSwatch name="danger" hex="#d95d5d" class="bg-danger text-neutral-900" />
          <ColorSwatch name="danger-text" token="danger-text" hex="#a83232" class="bg-danger-text text-danger-bg" />
        </div>
      </div>
      <div>
        <div class="bg-info-bg text-info-text rounded border-l-[16px] border-info p-2 pl-3 mb-4">Info</div>
        <div class="h-16 overflow-hidden rounded mb-4 grid grid-cols-3">
          <ColorSwatch name="info-bg" token="info-bg" hex="#eaf3fa" class="bg-info-bg text-info-text" />
          <ColorSwatch name="info" hex="#71afdd" class="bg-info text-neutral-900" />
          <ColorSwatch name="info-text" token="info-text" hex="#236494" class="bg-info-text text-info-bg" />
        </div>
      </div>
    </div>
  </section>
</template>

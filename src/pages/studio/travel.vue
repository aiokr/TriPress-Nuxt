<template>
  <!-- 顶部总览地图（可折叠） -->
  <div class="shrink-0 border-b border-zinc-200 dark:border-zinc-800">
    <button type="button"
      class="w-full flex items-center justify-between px-4 py-2.5 text-sm text-zinc-600 dark:text-dtext/70 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition"
      @click="mapCollapsed = !mapCollapsed">
      <span class="flex items-center gap-2">
        <span class="text-base">🗺️</span>
        <span class="font-medium text-text dark:text-dtext">Travel 足迹</span>
        <span class="text-xs text-zinc-400">({{ overviewPoints.length }} 个点)</span>
      </span>
      <span class="text-zinc-400 transition-transform duration-300" :class="mapCollapsed ? '' : 'rotate-180'">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </span>
    </button>
    <div class="overflow-hidden transition-all duration-300 ease-in-out"
      :class="mapCollapsed ? 'max-h-0' : 'max-h-[320px]'">
      <div class="w-full h-[280px]">
        <TravelMap :footprints="overviewPoints" disable-popup @select="onMapSelect" />
      </div>
    </div>
  </div>

  <!-- 下方内容区 -->
  <div class="flex-1 flex overflow-hidden">
    <!-- 左侧：内容列表 -->
    <div class="w-[260px] shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dbg flex flex-col">
      <div class="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <span class="text-sm font-medium text-text dark:text-dtext">足迹点</span>
        <button type="button" class="px-2.5 py-1 rounded-full text-xs bg-main text-white hover:opacity-90 transition"
          @click="createNew">
          + 新建
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-2">
        <button v-for="fp in sortedFootprints" :key="fp._file" type="button"
          class="w-full text-left px-3 py-2.5 rounded-lg text-sm transition mb-1" :class="fp._file === selectedFile
              ? 'bg-main/10 text-main'
              : 'text-zinc-600 dark:text-dtext/70 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            " @click="select(fp)">
          <div class="font-medium truncate">{{ fp.name }}</div>
          <div class="text-xs text-zinc-400 mt-0.5 flex items-center gap-1.5">
            <span v-if="fp.color" class="inline-block w-2 h-2 rounded-full shrink-0"
              :style="{ background: fp.color }" />
            <span>{{ fp.date || '无日期' }}</span>
          </div>
        </button>
        <div v-if="!sortedFootprints.length" class="px-3 py-8 text-center text-sm text-zinc-400">
          暂无足迹，点击“新建”创建一个
        </div>
      </div>
    </div>

    <!-- 右侧：编辑器 -->
    <div class="flex-1 overflow-y-auto bg-white dark:bg-dbg">
      <div v-if="form" class="p-4 md:p-6 w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2 flex flex-col sm:flex-row gap-3 items-start sm:items-end">
            <div class="flex-1 min-w-0 w-full">
              <label class="block text-sm text-zinc-500 dark:text-dtext/60 mb-1">名称</label>
              <input v-model="form.name" type="text"
                class="w-full px-3 py-2 h-12 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-text dark:text-dtext focus:outline-none focus:border-main" />
            </div>
            <button type="button"
              class="px-5 py-2 h-12  rounded-lg text-sm bg-main text-white hover:opacity-90 transition disabled:opacity-50 shrink-0"
              :disabled="saving" @click="save">
              {{ saving ? '保存中…' : '保存' }}
            </button>
          </div>

          <div class="flex flex-col md:flex-row gap-4 md:col-span-2">
            <div class="w-full md:w-1/2 lg:w-[45%] shrink-0">
              <label class="block text-sm text-zinc-500 dark:text-dtext/60 mb-1">地图点选坐标</label>
              <StudioMapPicker :lat="Number(form.lat) || 0" :lng="Number(form.lng) || 0"
                class="h-[260px] md:h-full md:min-h-[360px]" @pick="onMapPick" />
            </div>

            <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-zinc-500 dark:text-dtext/60 mb-1">纬度 (lat)</label>
                <input v-model.number="form.lat" type="number" step="any"
                  class="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-text dark:text-dtext focus:outline-none focus:border-main" />
              </div>
              <div>
                <label class="block text-sm text-zinc-500 dark:text-dtext/60 mb-1">经度 (lng)</label>
                <input v-model.number="form.lng" type="number" step="any"
                  class="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-text dark:text-dtext focus:outline-none focus:border-main" />
              </div>

              <div>
                <label class="block text-sm text-zinc-500 dark:text-dtext/60 mb-1">日期</label>
                <input v-model="form.date" type="date"
                  class="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-text dark:text-dtext focus:outline-none focus:border-main" />
              </div>
              <div>
                <label class="block text-sm text-zinc-500 dark:text-dtext/60 mb-1">颜色</label>
                <div class="flex items-center gap-2">
                  <input v-model="form.color" type="color"
                    class="w-10 h-10 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent" />
                  <input v-model="form.color" type="text"
                    class="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-text dark:text-dtext focus:outline-none focus:border-main" />
                </div>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm text-zinc-500 dark:text-dtext/60 mb-1">分类（逗号分隔）</label>
                <input v-model="categoriesText" type="text" placeholder="旅行, 常驻"
                  class="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-text dark:text-dtext focus:outline-none focus:border-main" />
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm text-zinc-500 dark:text-dtext/60 mb-1">描述</label>
                <textarea v-model="form.description" rows="3"
                  class="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-text dark:text-dtext focus:outline-none focus:border-main" />
              </div>

              <div>
                <label class="block text-sm text-zinc-500 dark:text-dtext/60 mb-1">链接 URL</label>
                <input v-model="form.url" type="text"
                  class="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-text dark:text-dtext focus:outline-none focus:border-main" />
              </div>
              <div>
                <label class="block text-sm text-zinc-500 dark:text-dtext/60 mb-1">链接文字</label>
                <input v-model="form.urlLabel" type="text"
                  class="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-text dark:text-dtext focus:outline-none focus:border-main" />
              </div>

              <!-- 图片管理 -->
              <div class="md:col-span-2">
                <label class="block text-sm text-zinc-500 dark:text-dtext/60 mb-2">图片</label>
                <div class="flex flex-wrap gap-3">
                  <div v-for="(img, idx) in images" :key="img + idx"
                    class="relative w-28 h-28 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 group">
                    <img :src="img" class="w-full h-full object-cover" />
                    <button type="button"
                      class="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition"
                      @click="removeImage(idx)">
                      ×
                    </button>
                  </div>
                  <label
                    class="w-28 h-28 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-400 cursor-pointer hover:border-main hover:text-main transition">
                    <input type="file" accept="image/*" class="hidden" @change="onUpload" />
                    <span v-if="uploading">上传中…</span>
                    <span v-else class="text-2xl">+</span>
                  </label>
                </div>
                <p class="mt-2 text-xs text-zinc-400">支持点击上传本地图片，也可直接填写图片路径。</p>
                <div class="flex gap-2 mt-2">
                  <input v-model="imageInput" type="text" placeholder="/images/2025/xxx.jpeg"
                    class="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-text dark:text-dtext focus:outline-none focus:border-main" />
                  <button type="button"
                    class="px-4 py-2 rounded-lg text-sm border border-zinc-300 dark:border-zinc-700 hover:border-main hover:text-main transition"
                    @click="addImage">
                    添加
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-8 pb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <button v-if="selectedFile" type="button"
            class="px-5 py-2 rounded-full text-sm border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition disabled:opacity-50"
            :disabled="saving" @click="remove">
            删除
          </button>
          <span v-if="message" class="text-sm text-zinc-500 dark:text-dtext/60">{{ message }}</span>
        </div>
      </div>

      <div v-else
        class="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-10 text-center text-sm text-zinc-400 max-w-[720px] bg-white dark:bg-dbg m-4">
        从左侧选择一个足迹点，或新建一个
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStudioTravelStore } from '~/stores/studioTravel'

definePageMeta({ layout: 'studio' })
useHead({ title: 'Travel 足迹编辑 - Studio' })

interface FootprintFile {
  name: string
  lat: number
  lng: number
  date?: string
  description?: string
  categories?: string[]
  color?: string
  image?: string | string[]
  url?: string
  urlLabel?: string
  _file: string
}

const footprints = ref<FootprintFile[]>([])
const selectedFile = ref<string | null>(null)
const form = ref<FootprintFile | null>(null)
const categoriesText = ref('')
const imageInput = ref('')
const saving = ref(false)
const uploading = ref(false)
const message = ref('')
const studioTravelStore = useStudioTravelStore()
const { mapCollapsed } = storeToRefs(studioTravelStore)

// 总览地图数据
const overviewPoints = computed(() =>
  footprints.value
    .filter((fp) => typeof fp.lat === 'number' && typeof fp.lng === 'number')
    .map((fp) => ({
      name: fp.name,
      lat: fp.lat,
      lng: fp.lng,
      color: fp.color,
      file: fp._file,
    }))
)

// 左侧列表：按日期降序，新的在前、旧的在后
const sortedFootprints = computed<FootprintFile[]>(() => {
  return [...footprints.value].sort((a, b) => {
    const ta = a.date ? new Date(a.date).getTime() : 0
    const tb = b.date ? new Date(b.date).getTime() : 0
    return tb - ta
  })
})

function onMapSelect(identifier: string | null) {
  if (!identifier) return
  const fp = footprints.value.find((f) => f._file === identifier || f.name === identifier)
  if (fp) select(fp)
}

const images = computed<string[]>(() => {
  const raw = form.value?.image
  if (!raw) return []
  return Array.isArray(raw) ? raw.filter(Boolean) : [raw]
})

async function load() {
  footprints.value = await $fetch<FootprintFile[]>('/api/studio/travel')
}

function select(fp: FootprintFile) {
  selectedFile.value = fp._file
  form.value = {
    ...fp,
    date: fp.date ? fp.date.slice(0, 10) : fp.date,
  }
  categoriesText.value = (fp.categories ?? []).join(', ')
  imageInput.value = ''
  message.value = ''
}

function onMapPick(lat: number, lng: number) {
  if (!form.value) return
  form.value.lat = lat
  form.value.lng = lng
}

function createNew() {
  selectedFile.value = null
  form.value = {
    name: '',
    lat: 0,
    lng: 0,
    date: '',
    description: '',
    categories: [],
    color: '#71afdd',
    image: [],
    url: '',
    urlLabel: '',
    _file: '',
  }
  categoriesText.value = ''
  imageInput.value = ''
  message.value = ''
}

function removeImage(idx: number) {
  if (!form.value) return
  form.value.image = images.value.filter((_, i) => i !== idx)
}

function addImage() {
  const value = imageInput.value.trim()
  if (!value || !form.value) return
  const list = images.value
  list.push(value)
  form.value.image = list
  imageInput.value = ''
}

async function onUpload(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !form.value) return
  uploading.value = true
  try {
    const fd = new FormData()
    fd.append('file', file)
    const res = await $fetch<{ path: string }>('/api/studio/upload', { method: 'POST', body: fd })
    form.value.image = [...images.value, res.path]
  } catch (err: any) {
    message.value = err?.data?.message || err?.message || '上传失败'
  } finally {
    uploading.value = false
    input.value = ''
  }
}

function buildPayload() {
  if (!form.value) return null
  const categories = categoriesText.value
    .split(/[,，]/)
    .map((s) => s.trim())
    .filter(Boolean)
  return {
    name: form.value.name.trim(),
    lat: Number(form.value.lat),
    lng: Number(form.value.lng),
    date: form.value.date || undefined,
    description: form.value.description || undefined,
    categories: categories.length ? categories : undefined,
    color: form.value.color || undefined,
    image: images.value.length ? images.value : undefined,
    url: form.value.url || undefined,
    urlLabel: form.value.urlLabel || undefined,
  }
}

async function save() {
  const payload = buildPayload()
  if (!payload || !form.value) return
  if (!payload.name || Number.isNaN(payload.lat) || Number.isNaN(payload.lng)) {
    message.value = '请填写名称、纬度和经度'
    return
  }
  saving.value = true
  message.value = ''
  try {
    if (selectedFile.value) {
      await $fetch('/api/studio/travel', { method: 'PUT', query: { file: selectedFile.value }, body: payload })
      message.value = '已保存'
    } else {
      const res = await $fetch<{ file: string }>('/api/studio/travel', { method: 'POST', body: payload })
      selectedFile.value = res.file
      message.value = '已创建'
    }
    await load()
  } catch (err: any) {
    message.value = err?.data?.message || err?.message || '保存失败'
  } finally {
    saving.value = false
  }
}

async function remove() {
  if (!selectedFile.value || !form.value) return
  if (!confirm(`确定删除「${form.value.name}」吗？`)) return
  saving.value = true
  try {
    await $fetch('/api/studio/travel', { method: 'DELETE', query: { file: selectedFile.value } })
    message.value = '已删除'
    selectedFile.value = null
    form.value = null
    await load()
  } catch (err: any) {
    message.value = err?.data?.message || err?.message || '删除失败'
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>

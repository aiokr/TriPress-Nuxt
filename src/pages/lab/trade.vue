<template>
  <main class="container max-w-[1000px] mx-auto pt-20 px-4 pb-20">
    <div class="pb-6">
      <div class="text-3xl font-bold text-text dark:text-dtext pb-2">Trade Lab</div>
      <div class="text-dtext pb-16">
        投资研究工具集 — 跟踪市场、记录交易、分析收益。
      </div>
      <hr />
    </div>

    <!-- 市场概览 -->
    <section class="mb-10">
      <h2 class="text-xl font-bold text-text dark:text-dtext pb-4">市场概览</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="border rounded-xl p-5 bg-white/40 dark:bg-zinc-900/40">
          <div class="text-sm text-slate-500 dark:text-slate-400">上证指数</div>
          <div class="text-2xl font-bold text-text dark:text-dtext mt-1">{{ indices.shanghai }}</div>
          <div class="text-sm mt-2" :class="indices.shanghaiChange >= 0 ? 'text-red-500' : 'text-green-500'">
            {{ indices.shanghaiChange >= 0 ? '+' : '' }}{{ indices.shanghaiChange }}%
          </div>
        </div>
        <div class="border rounded-xl p-5 bg-white/40 dark:bg-zinc-900/40">
          <div class="text-sm text-slate-500 dark:text-slate-400">深证成指</div>
          <div class="text-2xl font-bold text-text dark:text-dtext mt-1">{{ indices.shenzhen }}</div>
          <div class="text-sm mt-2" :class="indices.shenzhenChange >= 0 ? 'text-red-500' : 'text-green-500'">
            {{ indices.shenzhenChange >= 0 ? '+' : '' }}{{ indices.shenzhenChange }}%
          </div>
        </div>
        <div class="border rounded-xl p-5 bg-white/40 dark:bg-zinc-900/40">
          <div class="text-sm text-slate-500 dark:text-slate-400">创业板指</div>
          <div class="text-2xl font-bold text-text dark:text-dtext mt-1">{{ indices.chinext }}</div>
          <div class="text-sm mt-2" :class="indices.chinextChange >= 0 ? 'text-red-500' : 'text-green-500'">
            {{ indices.chinextChange >= 0 ? '+' : '' }}{{ indices.chinextChange }}%
          </div>
        </div>
      </div>
    </section>

    <!-- 自选股 -->
    <section class="mb-10">
      <h2 class="text-xl font-bold text-text dark:text-dtext pb-4">自选股</h2>
      <div class="border rounded-xl overflow-hidden bg-white/40 dark:bg-zinc-900/40">
        <div class="grid grid-cols-4 gap-4 p-4 text-sm font-bold text-slate-500 dark:text-slate-400 border-b">
          <div>代码 / 名称</div>
          <div>最新价</div>
          <div>涨跌幅</div>
          <div>操作</div>
        </div>
        <div v-for="(stock, idx) in watchlist" :key="stock.code"
          class="grid grid-cols-4 gap-4 p-4 text-sm border-b last:border-0 items-center">
          <div>
            <div class="font-bold text-text dark:text-dtext">{{ stock.code }}</div>
            <div class="text-slate-500 dark:text-slate-400">{{ stock.name }}</div>
          </div>
          <div class="font-bold text-text dark:text-dtext">{{ stock.price.toFixed(2) }}</div>
          <div :class="stock.change >= 0 ? 'text-red-500' : 'text-green-500'">
            {{ stock.change >= 0 ? '+' : '' }}{{ stock.change.toFixed(2) }}%
          </div>
          <div>
            <button @click="removeStock(idx)"
              class="text-xs px-2 py-1 rounded border border-red-300 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              删除
            </button>
          </div>
        </div>
        <div class="p-4 border-t">
          <div class="flex gap-2">
            <input v-model="newStock.code" placeholder="代码"
              class="flex-1 px-3 py-2 rounded border bg-white/60 dark:bg-zinc-800/60 text-text dark:text-dtext text-sm outline-none focus:border-main" />
            <input v-model="newStock.name" placeholder="名称"
              class="flex-1 px-3 py-2 rounded border bg-white/60 dark:bg-zinc-800/60 text-text dark:text-dtext text-sm outline-none focus:border-main" />
            <input v-model.number="newStock.price" placeholder="价格" type="number"
              class="w-24 px-3 py-2 rounded border bg-white/60 dark:bg-zinc-800/60 text-text dark:text-dtext text-sm outline-none focus:border-main" />
            <input v-model.number="newStock.change" placeholder="涨跌%" type="number"
              class="w-24 px-3 py-2 rounded border bg-white/60 dark:bg-zinc-800/60 text-text dark:text-dtext text-sm outline-none focus:border-main" />
            <button @click="addStock"
              class="px-4 py-2 rounded bg-main text-white text-sm font-bold hover:bg-main/80 transition-colors">
              添加
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 交易记录 -->
    <section class="mb-10">
      <h2 class="text-xl font-bold text-text dark:text-dtext pb-4">交易记录</h2>
      <div class="border rounded-xl overflow-hidden bg-white/40 dark:bg-zinc-900/40">
        <div class="grid grid-cols-5 gap-4 p-4 text-sm font-bold text-slate-500 dark:text-slate-400 border-b">
          <div>日期</div>
          <div>代码</div>
          <div>方向</div>
          <div>数量 / 价格</div>
          <div>盈亏</div>
        </div>
        <div v-for="(trade, idx) in trades" :key="idx"
          class="grid grid-cols-5 gap-4 p-4 text-sm border-b last:border-0 items-center">
          <div class="text-text dark:text-dtext">{{ trade.date }}</div>
          <div class="font-bold text-text dark:text-dtext">{{ trade.code }}</div>
          <div>
            <span class="px-2 py-0.5 rounded text-xs font-bold"
              :class="trade.direction === '买入' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-green-100 text-green-600 dark:bg-green-900/30'">
              {{ trade.direction }}
            </span>
          </div>
          <div class="text-text dark:text-dtext">{{ trade.quantity }} @ {{ trade.price.toFixed(2) }}</div>
          <div v-if="trade.pnl !== undefined" :class="(trade.pnl || 0) >= 0 ? 'text-red-500' : 'text-green-500'">
            {{ (trade.pnl || 0) >= 0 ? '+' : '' }}{{ trade.pnl?.toFixed(2) }}
          </div>
          <div v-else class="text-slate-400">—</div>
        </div>
        <div class="p-4 border-t">
          <div class="grid grid-cols-5 gap-2">
            <input v-model="newTrade.date" type="date"
              class="px-2 py-2 rounded border bg-white/60 dark:bg-zinc-800/60 text-text dark:text-dtext text-sm outline-none focus:border-main" />
            <input v-model="newTrade.code" placeholder="代码"
              class="px-2 py-2 rounded border bg-white/60 dark:bg-zinc-800/60 text-text dark:text-dtext text-sm outline-none focus:border-main" />
            <select v-model="newTrade.direction"
              class="px-2 py-2 rounded border bg-white/60 dark:bg-zinc-800/60 text-text dark:text-dtext text-sm outline-none focus:border-main">
              <option>买入</option>
              <option>卖出</option>
            </select>
            <div class="flex gap-1">
              <input v-model.number="newTrade.quantity" placeholder="数量" type="number"
                class="w-1/2 px-2 py-2 rounded border bg-white/60 dark:bg-zinc-800/60 text-text dark:text-dtext text-sm outline-none focus:border-main" />
              <input v-model.number="newTrade.price" placeholder="价格" type="number"
                class="w-1/2 px-2 py-2 rounded border bg-white/60 dark:bg-zinc-800/60 text-text dark:text-dtext text-sm outline-none focus:border-main" />
            </div>
            <button @click="addTrade"
              class="px-3 py-2 rounded bg-main text-white text-sm font-bold hover:bg-main/80 transition-colors">
              记录
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 收益计算器 -->
    <section class="mb-10">
      <h2 class="text-xl font-bold text-text dark:text-dtext pb-4">收益计算器</h2>
      <div class="border rounded-xl p-5 bg-white/40 dark:bg-zinc-900/40">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label class="text-sm text-slate-500 dark:text-slate-400 block mb-1">成本价</label>
            <input v-model.number="calc.cost" type="number"
              class="w-full px-3 py-2 rounded border bg-white/60 dark:bg-zinc-800/60 text-text dark:text-dtext text-sm outline-none focus:border-main" />
          </div>
          <div>
            <label class="text-sm text-slate-500 dark:text-slate-400 block mb-1">卖出价</label>
            <input v-model.number="calc.sell" type="number"
              class="w-full px-3 py-2 rounded border bg-white/60 dark:bg-zinc-800/60 text-text dark:text-dtext text-sm outline-none focus:border-main" />
          </div>
          <div>
            <label class="text-sm text-slate-500 dark:text-slate-400 block mb-1">数量</label>
            <input v-model.number="calc.quantity" type="number"
              class="w-full px-3 py-2 rounded border bg-white/60 dark:bg-zinc-800/60 text-text dark:text-dtext text-sm outline-none focus:border-main" />
          </div>
        </div>
        <div class="flex gap-4 text-sm">
          <div>
            <span class="text-slate-500 dark:text-slate-400">盈亏金额:</span>
            <span class="font-bold ml-1" :class="calcProfit >= 0 ? 'text-red-500' : 'text-green-500'">
              {{ calcProfit >= 0 ? '+' : '' }}{{ calcProfit.toFixed(2) }}
            </span>
          </div>
          <div>
            <span class="text-slate-500 dark:text-slate-400">收益率:</span>
            <span class="font-bold ml-1" :class="calcReturn >= 0 ? 'text-red-500' : 'text-green-500'">
              {{ calcReturn >= 0 ? '+' : '' }}{{ calcReturn.toFixed(2) }}%
            </span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">

interface Stock {
  code: string
  name: string
  price: number
  change: number
}

interface Trade {
  date: string
  code: string
  direction: '买入' | '卖出'
  quantity: number
  price: number
  pnl?: number
}

const indices = ref({
  shanghai: 3280.34,
  shanghaiChange: 0.42,
  shenzhen: 10412.78,
  shenzhenChange: 0.85,
  chinext: 2156.12,
  chinextChange: 1.21,
})

const watchlist = ref<Stock[]>([
  { code: '000001.SH', name: '上证指数', price: 3280.34, change: 0.42 },
  { code: '600519', name: '贵州茅台', price: 1456.20, change: 1.35 },
  { code: '000858', name: '五粮液', price: 128.45, change: -0.82 },
])

const newStock = ref<Partial<Stock>>({ code: '', name: '', price: 0, change: 0 })

function addStock() {
  const s = newStock.value
  if (s.code && s.name && s.price !== undefined && s.change !== undefined) {
    watchlist.value.push({
      code: s.code,
      name: s.name,
      price: s.price,
      change: s.change,
    })
    newStock.value = { code: '', name: '', price: 0, change: 0 }
  }
}

function removeStock(idx: number) {
  watchlist.value.splice(idx, 1)
}

const trades = ref<Trade[]>([
  { date: '2025-01-15', code: '600519', direction: '买入', quantity: 100, price: 1420.50 },
  { date: '2025-03-20', code: '600519', direction: '卖出', quantity: 100, price: 1480.30, pnl: 5980.00 },
])

const today = new Date().toISOString().split('T')[0]
const newTrade = ref<Partial<Trade>>({ date: today, code: '', direction: '买入', quantity: 0, price: 0 })

function addTrade() {
  const t = newTrade.value
  if (t.date && t.code && t.direction && t.quantity && t.price) {
    let pnl: number | undefined
    if (t.direction === '卖出') {
      const buyTrade = [...trades.value].reverse().find(x => x.code === t.code && x.direction === '买入')
      if (buyTrade) {
        pnl = (t.price - buyTrade.price) * t.quantity
      }
    }
    trades.value.push({
      date: t.date,
      code: t.code,
      direction: t.direction as '买入' | '卖出',
      quantity: t.quantity,
      price: t.price,
      pnl,
    })
    newTrade.value = { date: today, code: '', direction: '买入', quantity: 0, price: 0 }
  }
}

const calc = ref({ cost: 100, sell: 120, quantity: 100 })

const calcProfit = computed(() => {
  return (calc.value.sell - calc.value.cost) * calc.value.quantity
})

const calcReturn = computed(() => {
  if (calc.value.cost === 0) return 0
  return ((calc.value.sell - calc.value.cost) / calc.value.cost) * 100
})

useHead({
  title: 'Trade Lab - Tripper Press',
  meta: [
    { name: 'description', content: '投资研究工具集 — 跟踪市场、记录交易、分析收益。' }
  ]
})

useSeoMeta({
  title: 'Trade Lab - Tripper Press',
  ogTitle: 'Trade Lab - Tripper Press',
  description: '投资研究工具集 — 跟踪市场、记录交易、分析收益。',
  ogDescription: '投资研究工具集 — 跟踪市场、记录交易、分析收益。'
})
</script>

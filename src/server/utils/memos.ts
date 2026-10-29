import type { Quote } from '~/types/quote'

/**
 * Tripper Index 的 Memos 公开 API 客户端。
 *
 * 该 API 返回结构：
 *   GET /public/api/memos            -> { memos: Memo[], nextCursor: string | null }
 *   GET /public/api/memos?cursor=... -> 同上（游标分页）
 *
 * 这里把 Memos 笔记转换成站内 Quote 结构，并缓存解析结果，避免每次请求都
 * 重新拉取和解析 Markdown。API 不可用时返回空列表，保证页面仍可正常构建/渲染。
 */

interface MemoApiItem {
  uid?: string
  content?: string
  state?: string
  visibility?: string
  pinned?: boolean
  tags?: string[]
  createdAt?: string
  updatedAt?: string
}

interface MemosPage {
  memos?: MemoApiItem[]
  nextCursor?: string | null
}

const DEFAULT_MEMOS_API = 'https://index.tripper.press/public/api/memos'
/** 站点展示时区（与用户偏好一致），用于把 Memos 的 UTC 时间转换为本地日期 */
const SITE_TIME_ZONE = 'Asia/Shanghai'
const SITE_UTC_OFFSET = '+08:00'
const MAX_PAGES = 20
/** 只由标签（#tag）组成的行 */
const TAG_ONLY_LINE = /^(?:\s*#[^\s#]+)+\s*$/

function getMemosApi(): string {
  const config = useRuntimeConfig()
  return (config.memosApiBase as string | undefined) || DEFAULT_MEMOS_API
}

function isVisibleMemo(memo: MemoApiItem): boolean {
  if (!memo.uid) return false
  if (memo.state && memo.state !== 'NORMAL') return false
  if (memo.visibility && memo.visibility !== 'PUBLIC') return false
  return true
}

/** 去掉正文末尾只由 #标签 组成的行（标签已单独展示，避免重复） */
function stripTrailingTags(markdown: string): string {
  const lines = markdown.split('\n')
  let end = lines.length
  while (end > 0 && (lines[end - 1].trim() === '' || TAG_ONLY_LINE.test(lines[end - 1]))) {
    end--
  }
  const stripped = lines.slice(0, end).join('\n').trim()
  return stripped || markdown.trim()
}

/** 把正文中的站内相对资源/链接（/file/xxx）补全为 Memos 站点绝对地址 */
function absolutizeNodes(node: any, origin: string) {
  if (!node || typeof node !== 'object') return
  if (node.type === 'element') {
    const props = node.props || {}
    for (const key of ['src', 'href', 'poster']) {
      const value = props[key]
      if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) {
        props[key] = origin + value
      }
    }
  }
  for (const child of node.children || []) {
    absolutizeNodes(child, origin)
  }
}

function nodeText(node: any): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (node.type === 'text') return node.value || ''
  return (node.children || []).map(nodeText).join('')
}

function truncate(value: string, max: number): string {
  const text = value.replace(/\s+/g, ' ').trim()
  return text.length > max ? text.slice(0, max) + '…' : text
}

/**
 * 把 Memos 返回的 UTC 时间转换成站点时区（Asia/Shanghai）的 ISO 字符串，
 * 这样 formatDate() 直接截取前 10 位得到的就是正确的本地日期，
 * 避免凌晨发布的 memo 显示成前一天。
 */
function toSiteIso(input?: string): string {
  const date = input ? new Date(input) : new Date()
  if (Number.isNaN(date.getTime())) return input || new Date().toISOString()

  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: SITE_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)

  return parts.replace(' ', 'T') + SITE_UTC_OFFSET
}

async function normalizeMemo(memo: MemoApiItem, origin: string): Promise<Quote> {
  const raw = (memo.content || '').replace(/\r\n/g, '\n').trim()
  const markdown = stripTrailingTags(raw)

  const parsed = await parseMarkdown(markdown, { highlight: false })
  const body = parsed.body
  absolutizeNodes(body, origin)

  const text = ((parsed.data as any)?.description || nodeText(body)).replace(/\s+/g, ' ').trim()
  const date = toSiteIso(memo.createdAt || memo.updatedAt)

  return {
    uid: memo.uid!,
    path: `/quote/${memo.uid}`,
    date,
    updatedAt: toSiteIso(memo.updatedAt || memo.createdAt),
    tags: Array.isArray(memo.tags) ? memo.tags : [],
    pinned: Boolean(memo.pinned),
    title: truncate(text, 40) || 'Quote',
    description: truncate(text, 140),
    content: raw,
    body,
  }
}

async function fetchMemos(): Promise<MemoApiItem[]> {
  const endpoint = getMemosApi()
  const memos: MemoApiItem[] = []
  let cursor: string | null = null

  for (let page = 0; page < MAX_PAGES; page++) {
    const url: string = cursor ? `${endpoint}?cursor=${encodeURIComponent(cursor)}` : endpoint
    const result: MemosPage = await $fetch<MemosPage>(url, {
      headers: {
        accept: 'application/json',
        'user-agent': 'TripperPress/1.0 (+https://tripper.press)',
      },
      retry: 1,
      timeout: 10000,
    })
    memos.push(...(result?.memos || []))
    cursor = result?.nextCursor || null
    if (!cursor) break
  }

  return memos
}

/** 拉取并解析全部公开 Memos */
async function loadQuotes(): Promise<Quote[]> {
  const origin = new URL(getMemosApi()).origin
  const memos = await fetchMemos()
  const quotes = await Promise.all(
    memos.filter(isVisibleMemo).map((memo) => normalizeMemo(memo, origin)),
  )

  return quotes.sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

/**
 * 带缓存的版本：开发环境不缓存便于调试，生产环境缓存 2 分钟（到期后台刷新）。
 */
const loadQuotesCached = defineCachedFunction(loadQuotes, {
  name: 'quotes',
  getKey: () => getMemosApi(),
  maxAge: process.env.NODE_ENV === 'production' ? 120 : 0,
  swr: true,
  staleMaxAge: 3600,
})

/** 获取全部 Quote；API 或缓存出错时回退到直连，仍失败则返回空数组，避免页面/构建失败 */
export async function getQuotes(): Promise<Quote[]> {
  try {
    return await loadQuotesCached()
  } catch (error) {
    console.error('[quotes] 缓存读取失败，尝试直连 Memos API：', error)
    try {
      return await loadQuotes()
    } catch (fallbackError) {
      console.error('[quotes] 无法从 Memos API 获取内容：', fallbackError)
      return []
    }
  }
}

/** 按 uid 获取单条 Quote */
export async function getQuote(uid: string): Promise<Quote | null> {
  const quotes = await getQuotes()
  return quotes.find((quote) => quote.uid === uid) || null
}

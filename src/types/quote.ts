/**
 * Quote 数据结构。
 *
 * 数据来源为 Tripper Index 的 Memos 公开 API（经 /api/quotes 代理），
 * 不再使用本地 content/quote 的 Markdown 文件。
 */
export interface Quote {
  /** Memos 中的唯一 id */
  uid: string
  /** 站内路径，形如 /quote/<uid> */
  path: string
  /** 创建时间（ISO 8601） */
  date: string
  /** 更新时间（ISO 8601） */
  updatedAt: string
  /** Memos 标签 */
  tags: string[]
  /** 是否置顶 */
  pinned: boolean
  /** 由正文首段生成的标题，用于 SEO */
  title: string
  /** 由正文首段生成的描述，用于 SEO */
  description: string
  /** 原始 Markdown 正文（保留 Memos 标签行） */
  content: string
  /** 由 Markdown 解析出的 MDC/HAST 正文，交给 ContentRenderer 渲染 */
  body: unknown
}

/** GET /api/quotes */
export interface QuotesResponse {
  quotes: Quote[]
}

/** GET /api/quotes/:uid */
export interface QuoteDetailResponse {
  quote: Quote | null
}

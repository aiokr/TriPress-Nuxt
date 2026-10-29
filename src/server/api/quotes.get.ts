import { getQuotes } from '../utils/memos'

/** GET /api/quotes：返回全部 Quote（数据来自 Tripper Index 的 Memos 公开 API） */
export default defineEventHandler(async () => {
  const quotes = await getQuotes()
  return { quotes }
})

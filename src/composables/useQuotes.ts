import type { Quote, QuoteDetailResponse, QuotesResponse } from '~/types/quote'

/** 获取全部 Quote（数据来自 /api/quotes，最终来源为 Tripper Index 的 Memos API） */
export function useQuotes() {
  return useAsyncData<QuotesResponse>('quotes', () => $fetch<QuotesResponse>('/api/quotes'), {
    default: () => ({ quotes: [] }),
  })
}

/** 获取单条 Quote；不存在或请求失败时返回 null */
export function useQuote(uid: MaybeRefOrGetter<string>) {
  const id = toValue(uid)

  return useAsyncData<QuoteDetailResponse>(`quote-${id}`, async () => {
    try {
      return await $fetch<QuoteDetailResponse>(`/api/quotes/${encodeURIComponent(toValue(uid))}`)
    } catch {
      return { quote: null }
    }
  }, {
    default: () => ({ quote: null as Quote | null }),
  })
}

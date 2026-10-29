import { getQuote } from '../../utils/memos'

/** GET /api/quotes/:uid：返回单条 Quote */
export default defineEventHandler(async (event) => {
  const uid = getRouterParam(event, 'uid')

  if (!uid) {
    setResponseStatus(event, 400)
    return { error: 'Missing quote id' }
  }

  const quote = await getQuote(uid)

  if (!quote) {
    setResponseStatus(event, 404)
    return { error: 'Quote not found' }
  }

  return { quote }
})

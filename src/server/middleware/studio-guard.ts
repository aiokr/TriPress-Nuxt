import { defineEventHandler, sendError, createError, getRequestHost, H3Event } from 'h3'

const STUDIO_PREFIX = '/studio'
const STUDIO_API_PREFIX = '/api/studio'

function isLocalDev(event: H3Event): boolean {
  if (import.meta.dev) return true
  const host = getRequestHost(event, { xForwardedHost: true }) || ''
  const isLocalhost = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host)
  return process.env.NODE_ENV !== 'production' && isLocalhost
}

export default defineEventHandler((event) => {
  const url = event.path || event.node?.req?.url || ''
  if (!url.startsWith(STUDIO_PREFIX) && !url.startsWith(STUDIO_API_PREFIX)) return

  if (!isLocalDev(event)) {
    return sendError(event, createError({ statusCode: 404, statusMessage: 'Not Found' }))
  }
})

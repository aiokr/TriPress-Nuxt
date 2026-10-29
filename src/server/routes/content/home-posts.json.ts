import { queryCollection } from '@nuxt/content/server'
import type { HomePostIndexItem } from '~/types/home-feed'

const SUMMARY_LIMIT = 140

function minimarkText(node: unknown): string {
  if (typeof node === 'string') return node
  if (!node) return ''

  if (Array.isArray(node)) {
    const children = typeof node[0] === 'string' && node.length > 1
      ? node.slice(2)
      : node
    return children.map(minimarkText).filter(Boolean).join(' ')
  }

  if (typeof node !== 'object') return ''

  const value = node as Record<string, unknown>
  if (value.type === 'text' && typeof value.value === 'string') {
    return value.value
  }
  if (value.type === 'minimark') {
    return minimarkText(value.value)
  }
  if (Array.isArray(value.children)) {
    return minimarkText(value.children)
  }

  return ''
}

function summarize(value: string): string {
  const normalized = value.replace(/\s+/g, ' ').trim()
  const characters = Array.from(normalized)
  if (characters.length <= SUMMARY_LIMIT) return normalized
  return `${characters.slice(0, SUMMARY_LIMIT - 1).join('')}…`
}

function baseTranslationPath(path: string): string {
  return path.replace(/\/$/, '').replace(/\.zh$/, '')
}

export default defineEventHandler(async (event): Promise<HomePostIndexItem[]> => {
  const [posts, translations] = await Promise.all([
    queryCollection(event, 'post')
      .where('lang', '=', 'en')
      .order('date', 'DESC')
      .select('title', 'date', 'description', 'excerpt', 'path', 'category', 'type', 'body')
      .all(),
    queryCollection(event, 'post')
      .where('lang', '=', 'zh')
      .select('path')
      .all(),
  ])

  const translatedPaths = new Set(translations.map(post => baseTranslationPath(post.path)))

  return posts
    .filter(post => ['post', 'rc'].includes((post.type || '').toLowerCase()))
    .map((post) => {
      const sourceText = post.description || post.excerpt || minimarkText(post.body)
      return {
        title: post.title,
        date: post.date,
        summary: summarize(sourceText),
        link: post.path,
        category: post.category || null,
        hasTranslation: translatedPaths.has(baseTranslationPath(post.path)),
      }
    })
})


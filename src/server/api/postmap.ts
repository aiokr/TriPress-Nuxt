/**
 * Sitemap 源：返回所有文章 URL（含中英文双语版）。
 *
 * 符合 @nuxtjs/sitemap v7 的 Source API：
 *   GET /api/postmap -> SitemapUrlInput[]
 *
 * 每个 url 项支持：
 *  - loc:         文章路径（含 site.url 拼接）
 *  - lastmod:     ISO 日期
 *  - changefreq:  更新频率
 *  - priority:    优先级 0-1
 *  - _i18nTransform: 内部字段，转换为 xhtml:link（hreflang）
 *
 * 我们直接输出 xhtml:link 以保证 hreflang 标注正确（不依赖 i18n 模块）。
 */
const SITE = 'https://tripper.press'

type Lang = 'en' | 'zh'

interface Post {
  path: string
  date?: string
  lang?: Lang
}

function getBaseSlug(path: string): string {
  return path.replace(/\/$/, '').replace(/\.zh$/, '')
}

function getLang(path: string): Lang {
  return path.replace(/\/$/, '').endsWith('.zh') ? 'zh' : 'en'
}

function toAbs(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${SITE}${p}`
}

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'post').all() as Post[]

  // 按 baseSlug 分组（同篇文章的不同语言版本）
  const groups = new Map<string, Post[]>()
  for (const p of posts) {
    if (!p.path) continue
    const base = getBaseSlug(p.path)
    if (!groups.has(base)) groups.set(base, [])
    groups.get(base)!.push(p)
  }

  const urls: Array<Record<string, unknown>> = []

  for (const [, items] of groups) {
    const enItem = items.find(i => getLang(i.path) === 'en')
    const zhItem = items.find(i => getLang(i.path) === 'zh')
    const defaultItem = enItem ?? items[0]
    if (!defaultItem) continue

    // 为每个语言版本生成 hreflang 标注
    const alternatives = items.map((item) => ({
      hreflang: getLang(item.path),
      href: toAbs(item.path),
    }))
    // x-default 指向默认语言（en）
    alternatives.push({
      hreflang: 'x-default',
      href: toAbs(defaultItem.path),
    })

    // 主 URL：默认语言（en）
    urls.push({
      loc: toAbs(defaultItem.path),
      lastmod: defaultItem.date,
      changefreq: 'monthly',
      priority: 0.7,
      alternatives,
    })

    // 中文版也独立收录
    if (zhItem && enItem) {
      urls.push({
        loc: toAbs(zhItem.path),
        lastmod: zhItem.date,
        changefreq: 'monthly',
        priority: 0.7,
        alternatives,
      })
    }
  }

  return urls
})

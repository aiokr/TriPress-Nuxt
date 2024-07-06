import { defineEventHandler } from 'h3'
import { serverQueryContent } from '#content/server'
import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (e) => {
  const contentList = (await serverQueryContent(e).where({ type: { $ne: 'draft' } }).find())
  return contentList
    .filter(c => c?._path?.startsWith('/post'))
    .map((c) => {
      return asSitemapUrl({
        loc: `${c?._path?.replace('_articles', '')}`,
        date: c?.date,
        title: c?.title,
        description: c?.description,
        image: c?.cover,
      })
    })
})
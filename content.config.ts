import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    post: defineCollection({
      type: 'page',
      source: [
        { include: 'post/**/*.md' },
        { include: 'page/**/*.md' },
      ],
      schema: z.object({
        title: z.string(),
        lang: z.enum(['en', 'zh']).default('en'),
        translationKey: z.string().optional(),
        date: z.string(),
        cover: z.string().optional(),
        tags: z.array(z.string()).optional(),
        category: z.string().optional(),
        type: z.string().optional(),
        excerpt: z.string().optional(),
        description: z.string().optional(),
      })
    }),
    travel: defineCollection({
      type: 'page',
      source: [{ include: 'travel/**/*.md' }],
      schema: z.object({
        title: z.string(),
        city: z.string(),
        country: z.string(),
        date: z.string(),
        days: z.number().optional(),
        lat: z.number(),
        lng: z.number(),
        gpx: z.string().optional(),
        cover: z.string().optional(),
        description: z.string().optional(),
      })
    })
  }
})
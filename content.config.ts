import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    post: defineCollection({
      type: 'page',
      source: [
        { include: 'post/**/*.md' },
        { include: 'page/**/*.md' },
        { include: 'heatmap/**/*.md' },
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
      type: 'data',
      source: [{ include: 'travel/**/*.yaml' }],
      schema: z.object({
        name: z.string(),
        lat: z.number(),
        lng: z.number(),
        date: z.string().optional(),
        description: z.string().optional(),
        categories: z.array(z.string()).optional(),
        color: z.string().optional(),
        image: z.string().optional(),
        url: z.string().optional(),
        urlLabel: z.string().optional(),
      })
    }),
    heatmap: defineCollection({
      type: 'data',
      source: 'heatmap/**/*.geojson',
      schema: z.object({
        type: z.string(),
        features: z.array(z.any()),
      }).passthrough()
    })
  }
})
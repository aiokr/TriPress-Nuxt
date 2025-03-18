import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    post: defineCollection({
      type: 'page',
      source: 'post/**/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        cover: z.string().optional(),
        tags: z.array(z.string()).optional(),
        category: z.string().optional(),
        type: z.string().optional(),
        excerpt: z.string().optional(),
        description: z.string().optional(),
      })
    })
  }
})
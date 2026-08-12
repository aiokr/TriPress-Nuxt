import { defineTransformer } from '@nuxt/content'

export default defineTransformer({
  name: 'geojson',
  extensions: ['.geojson'],
  parse(file) {
    const { id, body } = file
    const parsed = JSON.parse(body)
    return {
      ...parsed,
      id,
    }
  },
})

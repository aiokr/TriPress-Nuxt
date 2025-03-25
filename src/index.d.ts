declare module 'nuxt/schema' {
  interface AppConfigInput {
    content: {
      travel: { destination: string, already?: boolean }[]
      reading: {
        bookName: string
        link: string
        cover: string
      }
      uses: {
        camera: { model: string, status: 'using' | 'used' | 'sold' | 'broken' }[]
        lens: { model: string, status: 'using' | 'sold' | 'broken' }[]
        film: { model: string, status: 'using' | 'sold' | 'plan', image?: string }[]
        laptop: { model: string, status: 'using' | 'sold' | 'broken' }[]
        PC: {
          mouse: { model: string }
          keyboard: { model: string }
        }[]
      }
    }
  }
}

// It is always important to ensure you import/export something when augmenting a type
export { }
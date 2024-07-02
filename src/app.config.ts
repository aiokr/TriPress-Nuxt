export default defineAppConfig({
  url: 'https://tripper.press',
  title: 'Tripper Press - Take Photo, Think Seriously.',
  author: {
    name: 'aiokr',
    email: 'aiokr@tripper.press'
  },
  content: {
    travel: [
      { destination: 'Japan' },
      { destination: 'DeTian Waterfall - BaiSe' },
      { destination: 'Chongqing', already: true, },
      { destination: 'Haikou', already: true, },
      { destination: 'Beihai', already: true, },
      { destination: 'Chongzuo', already: true, },
      { destination: 'Chengdu', already: true, },
      { destination: 'Shanghai', already: true, }
    ],
    reading: {
      bookName: 'Glucose Revolution',
      link: 'https://book.douban.com/subject/36707112/',
      cover: 'https://s2.loli.net/2024/07/01/f7MhaXPpx1CjYWK.jpg',
    },
  },
})
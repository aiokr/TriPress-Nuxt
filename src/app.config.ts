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
    uses: {
      camera: [
        {
          model: 'SONY ICLE-6400',
          status: 'using' // used | sold | broken
        },
        { model: 'Phenix DC901', status: 'using' },
        { model: 'Panasonic', status: 'sold' }
      ],
      lens: [
        { model: 'SONY SELP1650', status: 'using' },
        { model: 'SONY SEL18135', status: 'using' },
        { model: 'OLYMPUS M.ZD 14-42/3.5-5.6 ED EZ', status: 'broken' },
        { model: '7Artisans 25mm F1.8', status: 'sold' }
      ],
      film: [
        { model: 'LUCKUFilm SHD400', status: 'using' }
      ],
      laptop: [
        { model: 'Macbook Air M1', status: 'using' }
      ],
      PC: [
        {
          mouse: { model: 'Logitech MX Master3s' },
          keyboard: { model: 'keychron K8 Pro' },
        }
      ]
    }
  },
})
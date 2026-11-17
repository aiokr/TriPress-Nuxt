import type { Ref } from 'vue'
import PhotoSwipeLightbox, { type Content } from 'photoswipe/lightbox'
import 'photoswipe/style.css'
import '~/assets/quote-lightbox.css'

const imageSelector = 'a[data-quote-image], img.mbe-image'

export function useQuoteLightbox(host: Ref<HTMLElement | null>) {
  let lightbox: PhotoSwipeLightbox | undefined
  let observer: MutationObserver | undefined
  let gallery: HTMLElement | null = null

  function images() {
    return Array.from(gallery?.querySelectorAll<HTMLAnchorElement | HTMLImageElement>(imageSelector) ?? [])
  }

  function open(event: MouseEvent | KeyboardEvent) {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    if (!(event.target instanceof Element)) return
    const trigger = event.target.closest<HTMLAnchorElement | HTMLImageElement>(imageSelector)
    if (!trigger || !gallery?.contains(trigger)) return
    if (event instanceof MouseEvent && event.button !== 0) return
    if (event instanceof KeyboardEvent && (!(trigger instanceof HTMLImageElement) || !['Enter', ' '].includes(event.key))) return

    event.preventDefault()
    event.stopPropagation()
    const elements = images()
    const slides = elements.map(element => {
      const image = element instanceof HTMLImageElement ? element : element.querySelector('img')
      const ratio = image?.naturalWidth && image.naturalHeight ? image.naturalWidth / image.naturalHeight : 1
      return {
        src: element instanceof HTMLAnchorElement ? element.href : element.src,
        msrc: image?.currentSrc || image?.src,
        alt: image?.alt,
        element,
        width: 1600,
        height: Math.round(1600 / ratio),
      }
    })
    lightbox?.loadAndOpen(elements.indexOf(trigger), slides)
  }

  // Public attachment URLs omit dimensions. Fit the slide again when the original decodes.
  function updateDimensions({ content }: { content: Content }) {
    if (!(content.element instanceof HTMLImageElement)) return
    const { naturalWidth: width, naturalHeight: height } = content.element
    if (!width || !height || (content.width === width && content.height === height)) return
    content.data.width = content.width = width
    content.data.height = content.height = height
    if (content.slide) {
      content.slide.width = width
      content.slide.height = height
      content.slide.resize()
    }
  }

  onMounted(() => {
    gallery = host.value
    if (!gallery) return

    // Match the PhotoSwipe configuration and control layout in Index.
    const viewer = new PhotoSwipeLightbox({
      pswpModule: () => import('photoswipe'),
      mainClass: 'memo-lightbox',
      closeTitle: '关闭',
      zoomTitle: '缩放',
      arrowPrevTitle: '上一张',
      arrowNextTitle: '下一张',
      errorMsg: '图片加载失败，请关闭后重试。',
      showHideAnimationType: 'fade',
    })
    lightbox = viewer
    viewer.on('contentLoadImage', ({ content }) => {
      if (!(content.element instanceof HTMLImageElement)) return
      content.element.referrerPolicy = 'no-referrer'
      content.element.addEventListener('load', () => updateDimensions({ content }), { once: true })
    })
    viewer.on('loadComplete', updateDimensions)
    viewer.on('slideInit', ({ slide }) => {
      queueMicrotask(() => {
        if (slide.content.hasSlide) updateDimensions({ content: slide.content })
      })
    })
    viewer.on('afterInit', () => {
      const bar = viewer.pswp?.element?.querySelector('.pswp__top-bar')
      if (!bar) return
      const group = document.createElement('div')
      group.className = 'memo-lightbox-actions'
      group.setAttribute('role', 'group')
      group.setAttribute('aria-label', '图片操作')
      bar.querySelectorAll('.pswp__button--zoom, .pswp__button--close').forEach(button => group.append(button))
      bar.append(group)
    })
    viewer.init()
    gallery.addEventListener('click', open, true)
    gallery.addEventListener('keydown', open, true)

    function decorateInlineImages() {
      gallery?.querySelectorAll<HTMLImageElement>('img.mbe-image').forEach(image => {
        image.tabIndex = 0
        image.setAttribute('role', 'button')
        image.setAttribute('aria-label', `查看大图：${image.alt || '图片'}`)
      })
    }
    observer = new MutationObserver(decorateInlineImages)
    observer.observe(gallery, { childList: true, subtree: true })
    decorateInlineImages()
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    gallery?.removeEventListener('click', open, true)
    gallery?.removeEventListener('keydown', open, true)
    lightbox?.destroy()
  })
}

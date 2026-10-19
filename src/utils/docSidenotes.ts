import type { MinimarkElement, MinimarkNode, MinimarkTree } from '@nuxt/content'

const isElement = (node: MinimarkNode): node is MinimarkElement => Array.isArray(node)
const children = (node: MinimarkElement) => node.slice(2) as MinimarkNode[]

/** Keep the original Markdown nodes and anchor IDs while pairing notes with their first reference. */
export function withDocSidenotes<T extends MinimarkTree>(body: T): T {
  const section = body.value.find((node) => isElement(node) && node[0] === 'section'
    && 'dataFootnotes' in node[1])
  if (!section || !isElement(section)) return body

  const list = children(section).find((node) => isElement(node) && node[0] === 'ol')
  if (!list || !isElement(list)) return body

  const notes = new Map<string, MinimarkElement>()
  children(list).forEach((node, index) => {
    if (isElement(node) && node[0] === 'li' && typeof node[1].id === 'string') {
      notes.set(node[1].id, [node[0], { ...node[1], value: index + 1 }, ...children(node)])
    }
  })
  if (!notes.size) return body

  const used = new Set<string>()
  const value: MinimarkNode[] = []
  // References use this label for their accessible description, even after moving the notes.
  value.push(...children(section).filter((node) => node !== list))

  for (const block of body.value) {
    if (block === section) continue
    const paired: MinimarkElement[] = []
    const collect = (node: MinimarkNode) => {
      if (!isElement(node)) return
      const href = node[1].href
      if ('dataFootnoteRef' in node[1] && typeof href === 'string' && href.startsWith('#')) {
        const id = href.slice(1)
        const note = notes.get(id)
        if (note && !used.has(id)) {
          paired.push(note)
          used.add(id)
        }
      }
      children(node).forEach(collect)
    }
    collect(block)
    value.push(['div', { className: ['doc-note-row'] },
      ['div', { className: ['doc-note-text'] }, block],
      ...(paired.length ? [['aside', { className: ['doc-sidenotes'], ariaLabelledBy: 'footnote-label' },
        ['ol', {}, ...paired]] as MinimarkElement] : []),
    ])
  }

  // Preserve any definitions that a custom Markdown component references indirectly.
  const remaining = [...notes].filter(([id]) => !used.has(id)).map(([, note]) => note)
  if (remaining.length) {
    value.push(['section', section[1], ['ol', {}, ...remaining]])
  }
  return { ...body, value }
}

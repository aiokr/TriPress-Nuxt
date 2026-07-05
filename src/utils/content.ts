export type Lang = 'en' | 'zh'

/** 判断路径是否以 .zh 结尾（去除尾部斜杠后） */
export function isZhPath(path: string): boolean {
  const p = path.replace(/\/$/, '')
  return p.endsWith('.zh')
}

/** 从路径推断语言：默认 en */
export function detectLangFromPath(path: string): Lang {
  return isZhPath(path) ? 'zh' : 'en'
}

/** 规范化路径：去掉尾部斜杠 */
export function normalizePath(path: string): string {
  return path.replace(/\/$/, '')
}

/**
 * 获取对应语言版本的候选路径。
 *  - /post/2024/foo       -> /post/2024/foo.zh
 *  - /post/2024/foo.zh    -> /post/2024/foo
 * 返回值仅为候选路径，是否存在需要另行查询。
 */
export function getOtherLangPath(path: string): string {
  const p = normalizePath(path)
  if (p.endsWith('.zh')) {
    return p.slice(0, -3)
  }
  return `${p}.zh`
}

/** 用于列表页：去掉 .zh 后缀得到原始 slug，便于配对 */
export function getBaseSlugFromPath(path: string): string {
  return normalizePath(path).replace(/\.zh$/, '')
}

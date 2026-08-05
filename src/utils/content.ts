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

/** GitHub 仓库编辑链接配置，对应 nuxt.config.ts 中的 studio.repository */
const GITHUB_REPO = {
  owner: 'aiokr',
  repo: 'TriPress-Nuxt',
  branch: 'studio',
}

/**
 * 根据内容路径生成 GitHub 编辑链接。
 * 内容根目录为仓库根目录下的 `content/`，文件扩展名固定为 `.md`。
 *  - /post/2024/foo       -> https://github.com/aiokr/TriPress-Nuxt/edit/studio/content/post/2024/foo.md
 *  - /post/2024/foo.zh    -> https://github.com/aiokr/TriPress-Nuxt/edit/studio/content/post/2024/foo.zh.md
 *  - /page/about          -> https://github.com/aiokr/TriPress-Nuxt/edit/studio/content/page/about.md
 */
export function getGitHubEditUrl(path: string): string {
  const p = normalizePath(path)
  const relativePath = p.replace(/^\//, '') + (p.endsWith('.zh') ? '.md' : '.md')
  const { owner, repo, branch } = GITHUB_REPO
  return `https://github.com/${owner}/${repo}/edit/${branch}/content/${relativePath}`
}

// 全局可复用的 KMenu 开关状态（基于 Nuxt useState，SSR 安全）
// 让 Header 上的命令按钮与 KMenu 共享同一份可见性状态
export const useKMenu = () => {
  const isOpen = useState<boolean>('kmenu:open', () => false)
  const open = () => {
    isOpen.value = true
  }
  const close = () => {
    isOpen.value = false
  }
  const toggle = () => {
    isOpen.value = !isOpen.value
  }
  return { isOpen, open, close, toggle }
}

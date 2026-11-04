// 色彩用途的唯一配置源：Tailwind 生成主题变量，品牌页展示同一份映射。
// 色阶名引用 tailwind.config.js 中已有的品牌色；仅状态色的暗色衍生值直接使用 HEX。
export const colorUsage = [
  { token: 'bg-canvas', utility: 'bg-canvas', usage: '页面底色 · 大面积', light: 'neutral.25', dark: 'neutral.900', group: '背景' },
  { token: 'bg-surface', utility: 'bg-surface', usage: '卡片、菜单、弹层 · 大面积', light: 'white', dark: 'neutral.800', group: '背景' },
  { token: 'bg-subtle', utility: 'bg-subtle', usage: '侧栏、代码块、次级分区', light: 'neutral.50', dark: 'neutral.800', group: '背景' },
  { token: 'bg-sunken', utility: 'bg-sunken', usage: '输入框、凹陷区域', light: 'neutral.100', dark: 'neutral.900', group: '背景' },
  { token: 'fg', utility: 'text-fg', usage: '标题、正文', light: 'frost.800', dark: 'stone.100', group: '文字' },
  { token: 'fg-muted', utility: 'text-fg-muted', usage: '说明、图注、占位提示', light: 'frost.600', dark: 'stone.400', group: '文字' },
  { token: 'fg-subtle', utility: 'text-fg-subtle', usage: '禁用、装饰文字 · 不承载必要信息', light: 'frost.400', dark: 'stone.500', group: '文字' },
  { token: 'line', utility: 'border-line', usage: '装饰性边框、分隔线', light: 'frost.200', dark: 'stone.700', group: '结构' },
  { token: 'line-strong', utility: 'border-line-strong', usage: '强调分隔、悬停边框', light: 'frost.300', dark: 'stone.600', group: '结构' },
  { token: 'line-control', utility: 'border-line-control', usage: '需要辨识轮廓的输入框、控件', light: 'frost.500', dark: 'stone.500', group: '结构' },
  { token: 'fill-hover', utility: 'bg-hover', usage: '普通列表、菜单悬停', light: 'frost.100', dark: 'stone.800', group: '交互' },
  { token: 'fill-selected', utility: 'bg-selected', usage: '选中项、当前导航 · 局部使用', light: 'primary.50', dark: 'primary.800', group: '交互' },
  { token: 'link', utility: 'text-link', usage: '链接、选中项文字', light: 'primary.600', dark: 'primary.200', group: '交互' },
  { token: 'link-hover', utility: 'hover:text-link-hover', usage: '链接悬停', light: 'primary.700', dark: 'primary.100', group: '交互' },
  { token: 'action', utility: 'bg-action', usage: '主要操作按钮', light: 'primary.600', dark: 'primary.300', group: '交互' },
  { token: 'action-hover', utility: 'hover:bg-action-hover', usage: '主要操作按钮悬停', light: 'primary.700', dark: 'primary.200', group: '交互' },
  { token: 'on-action', utility: 'text-on-action', usage: '主要操作按钮上的文字、图标', light: 'white', dark: 'primary.800', group: '交互' },
  { token: 'focus', utility: 'ring-focus', usage: '键盘焦点 · 与控件留出间距', light: 'primary.600', dark: 'primary.300', group: '交互' },
  { token: 'warm-fg', utility: 'text-warm-fg', usage: '橙色辅助强调 · 少量使用', light: 'accent.warm.600', dark: 'accent.warm.200', group: '品牌' },
  { token: 'cold-fg', utility: 'text-cold-fg', usage: '紫色辅助强调 · 少量使用', light: 'accent.cold.500', dark: 'accent.cold.200', group: '品牌' },
  { token: 'success-bg', utility: 'bg-success-bg', usage: '成功反馈背景', light: '#e6f5ee', dark: '#162e23', group: '状态' },
  { token: 'success-text', utility: 'text-success-text', usage: '成功反馈文字、图标', light: '#1e6b4c', dark: '#90d6b4', group: '状态' },
  { token: 'warning-bg', utility: 'bg-warning-bg', usage: '警告反馈背景', light: '#fbf1de', dark: '#332817', group: '状态' },
  { token: 'warning-text', utility: 'text-warning-text', usage: '警告反馈文字、图标', light: '#96620f', dark: '#efc778', group: '状态' },
  { token: 'danger-bg', utility: 'bg-danger-bg', usage: '错误、危险反馈背景', light: '#faeaea', dark: '#351d1d', group: '状态' },
  { token: 'danger-text', utility: 'text-danger-text', usage: '错误、危险反馈文字、图标', light: '#a83232', dark: '#f0aaaa', group: '状态' },
  { token: 'info-bg', utility: 'bg-info-bg', usage: '信息反馈背景', light: 'primary.50', dark: 'primary.800', group: '状态' },
  { token: 'info-text', utility: 'text-info-text', usage: '信息反馈文字、图标', light: 'primary.600', dark: 'primary.200', group: '状态' },
]

// RGB 通道让所有语义色同时支持 Tailwind 的 /80 等透明度修饰。
export const tokenColor = (token) => `rgb(var(--${token}) / <alpha-value>)`

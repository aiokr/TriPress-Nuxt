/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "*/components/**/*.{js,vue,ts}",
    "*/layouts/**/*.vue",
    "*/pages/**/*.vue",
    "*/views/**/*.vue",
    "*/plugins/**/*.{js,ts}",
    "*/app.vue",
    "*/error.vue",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 主色系
        'main': '#71afdd', // 主色
        'primary-50': '#eaf3fa', // 主色-50
        'primary-100': '#cae1f2', // 主色-100
        'primary-200': '#a0cae8', // 主色-200
        'primary-300': '#71afdd', // 主色-300
        'primary-400': '#4697d3', // 主色-400  
        'primary-500': '#2c7db9', // 主色-500
        'primary-600': '#236494', // 主色-600
        'primary-700': '#1c4e73', // 主色-700
        'primary-800': '#143852', // 主色-800

        // 配色系
        'accent-warm': '#e69d65', // 暖色配色
        'accent-warm-50': '#fbf1e9', // 暖色-50
        'accent-warm-100': '#f6dbc6', // 暖色-100
        'accent-warm-200': '#efbf9a', // 暖色-200
        'accent-warm-300': '#e69d65', // 暖色-300
        'accent-warm-400': '#df813a', // 暖色-400
        'accent-warm-500': '#c56820', // 暖色-500
        'accent-warm-600': '#9e531a', // 暖色-600
        'accent-warm-700': '#7b4114', // 暖色-700
        'accent-warm-800': '#582e0e', // 暖色-800

        'accent-cold': '#8279d2', // 冷色配色
        'accent-cold-50': '#edecf9', // 冷色-50
        'accent-cold-100': '#d1cdee', // 冷色-100
        'accent-cold-200': '#ada7e2', // 冷色-200
        'accent-cold-300': '#8279d2', // 冷色-300
        'accent-cold-400': '#5e53c6', // 冷色-400
        'accent-cold-500': '#4539ac', // 冷色-500
        'accent-cold-600': '#372e8a', // 冷色-600
        'accent-cold-700': '#2b246b', // 冷色-700
        'accent-cold-800': '#1f194d', // 冷色-800

        // 辅助色系
        'text': '#222831', // 浅色文字主色
        'dtext': '#eaedf0', // 暗色文字主色
        'sub-text': '#58677e', // 浅色辅助文字
        'dsub-text': '#99a5b8', // 暗色辅助文字
        'dbg': '#13161b', // 暗色模式背景
        'sub-bg': '#f3f4f7', // 辅助背景
        'dsub-bg': '#222831', // 暗色辅助背景

        // 中性色阶
        'neutral-25': '#f9fafb', // 浅色底色
        'neutral-50': '#f3f4f7', 
        'neutral-100': '#eaedf0', // 暗色文字主色 // 浅色悬停填充
        'neutral-200': '#d8dde4', // 浅色默认边框
        'neutral-300': '#bdc5d1', // 浅色强调边框
        'neutral-400': '#99a5b8', // 暗色辅助文字 // 浅色禁用标识
        'neutral-500': '#74859f',
        'neutral-600': '#58677e', // 浅色辅助文字 // 暗色禁用标识 // 暗色强调边框
        'neutral-700': '#3f4a5a', // 暗色卡片底色 // 暗色默认边框
        'neutral-800': '#222831', // 浅色文字主色 // 暗色悬停填充
        'neutral-900': '#13161b', // 暗色底色

        // 语义色系
        'success': '#3fa97a', // 成功色
        'success-bg': '#e6f5ee', // 成功色背景
        'success-text': '#1e6b4c', // 成功色文字

        'warning': '#e0a23c', // 警告色
        'warning-bg': '#fbf1de', // 警告色背景
        'warning-text': '#96620f', // 警告色文字

        'danger': '#d95d5d ', // 危险色
        'danger-bg': '#faeaea ', // 危险色背景
        'danger-text': '#a83232', // 危险色文字

        'info': '#71afdd ', // 信息色
        'info-bg': '#eaf3fa', // 信息色背景
        'info-text': '#236494', // 信息色文字
      },
      boxShadow: {
        'card': '0 -1px 3px 0 rgb(0 0 0 / 0.05)',
        'card-dark': '0 0 0 1px rgb(255 255 255 / 0.06), 0 -1px rgb(255 255 255 / 0.1)',
        'feature-card': '1px 1px 5px 0 rgb(0 0 0 / 0.02), 1px 1px 15px 0 rgb(0 0 0 / 0.03)',
        'feature-card-dark': '1px 1px 5px 0 rgb(0 0 0 / 0.15), 1px 1px 15px 0 rgb(0 0 0 / 0.2)'
      },
      borderRadius: {
        'feature-card': '5px'
      }
    },
  },
  plugins: [],
}


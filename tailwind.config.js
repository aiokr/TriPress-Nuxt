/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

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

        'main': '#71afdd', // 主色

        // 主色
        primary: {
          DEFAULT: '#71afdd',
          50: '#eaf3fa',
          100: '#cae1f2',
          200: '#a0cae8',
          300: '#71afdd',
          400: '#4697d3',
          500: '#2c7db9',
          600: '#236494',
          700: '#1c4e73',
          800: '#143852',
        },

        // 配色
        accent: {
          warm: {
            DEFAULT: '#e69d65',
            50: '#fbf1e9', 100: '#f6dbc6', 200: '#efbf9a', 300: '#e69d65',
            400: '#df813a', 500: '#c56820', 600: '#9e531a', // 600 = 白底文字安全档
            700: '#7b4114', 800: '#582e0e',
          },
          cold: {
            DEFAULT: '#8279d2',
            50: '#edecf9', 100: '#d1cdee', 200: '#ada7e2', 300: '#8279d2',
            400: '#5e53c6', // 400 = 白底文字安全档
            500: '#4539ac', 600: '#372e8a', 700: '#2b246b', 800: '#1f194d',
          },
        },

        // 中性色
        neutral: {
          25: '#f9fafb',
          50: '#f3f4f7',
          100: '#eaedf0',
          200: '#d8dde4',
          300: '#bdc5d1',
          400: '#99a5b8',
          500: '#74859f',
          600: '#58677e',
          700: '#3f4a5a',
          800: '#222831',
          900: '#13161b',
        },

        // 语义色
        success: { DEFAULT: '#3fa97a', bg: '#e6f5ee', text: '#1e6b4c' },
        warning: { DEFAULT: '#e0a23c', bg: '#fbf1de', text: '#96620f' },
        danger: { DEFAULT: '#d95d5d', bg: '#faeaea', text: '#a83232' },
        info: { DEFAULT: '#71afdd', bg: '#eaf3fa', text: '#236494' },

        // 辅助色
        canvas: 'var(--bg-canvas)',       // 主背景，绝大多数场景  
        subtle: 'var(--bg-subtle)',       // 淡灰分区（侧栏、代码块，少用）
        sunken: 'var(--bg-sunken)',       // 输入框、凹陷区
        fg: {
          DEFAULT: 'var(--fg)',           // 主要文字、标题
          muted: 'var(--fg-muted)',       // 次要文字、说明信息
          subtle: 'var(--fg-subtle)',     // 占位、禁用（不承担信息）
        },
        line: {
          DEFAULT: 'var(--line)',          // 默认边框、分隔线
          strong: 'var(--line-strong)',    // 强调边框、输入框 hover
        },
        hover: 'var(--fill-hover)',        // 列表项、菜单项悬停底色

        // 辅助色系 // 保留兼容性
        'text': 'var(--fg)',
        'dtext': 'var(--fg)',
        'sub-text': 'var(--fg-subtle)',
        'dsub-text': 'var(--fg-subtle)',
        'dbg': 'var(--bg-canvas)',
        'sub-bg': 'var(--bg-subtle)',
        'dsub-bg': 'var(--bg-subtle)',

      },
      borderColor: {
        DEFAULT: 'var(--border-color)',
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
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        // 页面标题
        '.heading-1': {
          fontSize: '36px',
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: '-0.035em',
          '@media (max-width: 640px)': { fontSize: '30px' },
        },
        // 章节标题
        '.heading-2': {
          fontSize: '28px',
          fontWeight: 600,
          lineHeight: 1.3,
          letterSpacing: '-0.028em',
          '@media (max-width: 640px)': { fontSize: '24px' },
        },
        // 小节标题
        '.heading-3': {
          fontSize: '22px',
          fontWeight: 600,
          lineHeight: 1.4,
          letterSpacing: '-0.02em',
          '@media (max-width: 640px)': { fontSize: '20px' },
        },
        // 段落标题
        '.heading-4': {
          fontSize: '18px',
          fontWeight: 600,
          lineHeight: 1.5,
          letterSpacing: '-0.012em',
          '@media (max-width: 640px)': { fontSize: '17px' },
        },
        // 强调小标题
        '.heading-5': {
          fontSize: '16px',
          fontWeight: 600,
          lineHeight: 1.5,
        },
        // 眉题
        '.heading-6': {
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: 1.5,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
        },
        // 正文段落
        '.article-body': {
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: 1.75,
          letterSpacing: '-0.003em',
          textAlign: 'justify',
          '@media (max-width: 640px)': { fontSize: '15.5px' },
        },
        // 图注与辅助说明
        '.caption': {
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: 1.5,
          color: 'var(--fg-muted)',
        },
      })
    }),
  ],
}


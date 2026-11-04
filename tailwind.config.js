/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'
import colors from 'tailwindcss/colors'
import { colorUsage, tokenColor } from './src/theme/color-usage.mjs'

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
        frost: {
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

        neutral: {
          25: '#fafafa',
          50: '#f4f4f4',
          100: '#ededed',
          200: '#dcdcdc',
          300: '#c4c4c4',
          400: '#a4a4a4',
          500: '#848484',
          600: '#666666',
          700: '#494949',
          800: '#282828',
          900: '#161616',
        },

        // 暖灰色
        stone: colors.stone,

        // 语义色
        success: { DEFAULT: '#3fa97a', bg: tokenColor('success-bg'), text: tokenColor('success-text') },
        warning: { DEFAULT: '#e0a23c', bg: tokenColor('warning-bg'), text: tokenColor('warning-text') },
        danger: { DEFAULT: '#d95d5d', bg: tokenColor('danger-bg'), text: tokenColor('danger-text') },
        info: { DEFAULT: '#71afdd', bg: tokenColor('info-bg'), text: tokenColor('info-text') },

        // 辅助色
        canvas: tokenColor('bg-canvas'),
        surface: tokenColor('bg-surface'),
        subtle: tokenColor('bg-subtle'),
        sunken: tokenColor('bg-sunken'),
        fg: {
          DEFAULT: tokenColor('fg'),
          muted: tokenColor('fg-muted'),
          subtle: tokenColor('fg-subtle'),
        },
        line: {
          DEFAULT: tokenColor('line'),
          strong: tokenColor('line-strong'),
          control: tokenColor('line-control'),
        },
        hover: tokenColor('fill-hover'),
        selected: tokenColor('fill-selected'),
        link: { DEFAULT: tokenColor('link'), hover: tokenColor('link-hover') },
        action: { DEFAULT: tokenColor('action'), hover: tokenColor('action-hover') },
        'on-action': tokenColor('on-action'),
        focus: tokenColor('focus'),
        'warm-fg': tokenColor('warm-fg'),
        'cold-fg': tokenColor('cold-fg'),

        // 辅助色系 // 保留兼容性
        'text': tokenColor('fg'),
        'dtext': tokenColor('fg'),
        'sub-text': tokenColor('fg-muted'),
        'dsub-text': tokenColor('fg-muted'),
        'dbg': tokenColor('bg-canvas'),
        'sub-bg': tokenColor('bg-subtle'),
        'dsub-bg': tokenColor('bg-subtle'),

      },
      borderColor: {
        DEFAULT: tokenColor('line'),
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
    plugin(function ({ addBase, theme }) {
      const variables = (mode) => Object.fromEntries(colorUsage.map(({ token, ...usage }) => {
        const reference = usage[mode]
        const value = reference.startsWith('#') ? reference : theme(`colors.${reference}`)
        if (typeof value !== 'string' || !/^#([\da-f]{3}|[\da-f]{6})$/i.test(value)) {
          throw new Error(`Invalid ${mode} color for ${token}: ${reference}`)
        }
        const hex = value.length === 4 ? `#${[...value.slice(1)].map((digit) => digit + digit).join('')}` : value
        return [`--${token}`, [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16)).join(' ')]
      }))
      addBase({
        ':root, .theme-light': { ...variables('light'), colorScheme: 'light' },
        '.dark, .theme-dark': { ...variables('dark'), colorScheme: 'dark' },
      })
    }),
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
          color: 'rgb(var(--fg-muted) / 1)',
        },
      })
    }),
  ],
}


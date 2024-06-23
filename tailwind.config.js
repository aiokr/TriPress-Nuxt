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
        'main': '#71afdd',
        'accent': '#e67e22',
        'text': '#222831',
        'dtext': '#E2E2E2',
        'dbg': '#18181B',
      },
      boxShadow: {
        'card': '0 -1px 3px 0 rgb(0 0 0 / 0.05)',
        'card-dark': '0 0 0 1px rgb(255 255 255 / 0.06), 0 -1px rgb(255 255 255 / 0.1)'
      }
    },
  },
  plugins: [],
}


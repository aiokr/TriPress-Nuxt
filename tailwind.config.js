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
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'main': '#71afdd',
        'accent': '#e67e22',
        'text': '#222831',
        'dtext': '#E2E2E2',
        'dbg': '#18181B',
      },
    },
  },
  plugins: [],
}


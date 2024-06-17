import { defineStore } from 'pinia'

export const useColorSchemeStore = defineStore('colorScheme', {
  state: () => ({
    mode: 'system', // system, light or dark
  }),
  actions: {
    initializeMode() {
      this.mode = localStorage.getItem('colorScheme') || 'system';
      if (this.mode === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.mode = isDark ? 'dark' : 'light';
      } else if (this.mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    toggleMode(value: string) {
      if (value === 'light') {
        document.documentElement.classList.remove('dark');
        this.mode = 'light';
      } else if (value === 'dark') {
        document.documentElement.classList.add('dark');
        this.mode = 'dark';
      }
      localStorage.setItem('colorScheme', value);
    }
  }
})
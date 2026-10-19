export const useDocPreferencesStore = defineStore('docPreferences', () => {
  const footnotePlacement = ref<'side' | 'bottom'>('side')

  function toggleFootnotePlacement() {
    footnotePlacement.value = footnotePlacement.value === 'side' ? 'bottom' : 'side'
  }

  return { footnotePlacement, toggleFootnotePlacement }
})

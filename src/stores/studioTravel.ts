export const useStudioTravelStore = defineStore('studioTravel', () => {
  const mapCollapsed = ref(false)

  function toggleMapCollapsed() {
    mapCollapsed.value = !mapCollapsed.value
  }

  return {
    mapCollapsed,
    toggleMapCollapsed,
  }
})

import { useLocalStorage } from '@vueuse/core'

export const useStudioTravelStore = defineStore('studioTravel', () => {
  const mapCollapsed = useLocalStorage('studio-travel-map-collapsed', false)

  return {
    mapCollapsed,
  }
})

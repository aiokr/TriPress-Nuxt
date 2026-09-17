import { listTravelFiles } from '../../utils/travelStore'

export default defineEventHandler(async () => {
  return await listTravelFiles()
})

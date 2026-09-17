import { getQuery, createError } from 'h3'
import { deleteTravelFile, readTravelFile } from '../../utils/travelStore'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const file = query.file as string | undefined
  if (!file) throw createError({ statusCode: 400, statusMessage: 'file is required' })

  await readTravelFile(file)
  await deleteTravelFile(file)
  return { ok: true }
})

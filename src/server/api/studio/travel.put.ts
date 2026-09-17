import { readBody, getQuery, createError } from 'h3'
import { readTravelFile, writeTravelFile, type TravelFootprint } from '../../utils/travelStore'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const file = query.file as string | undefined
  if (!file) throw createError({ statusCode: 400, statusMessage: 'file is required' })

  const body = await readBody<TravelFootprint>(event)
  if (!body?.name || typeof body.lat !== 'number' || typeof body.lng !== 'number') {
    throw createError({ statusCode: 400, statusMessage: 'name, lat, lng are required' })
  }

  // 确认文件存在
  await readTravelFile(file)
  await writeTravelFile(file, body)
  return { file, footprint: { ...body, _file: file } }
})

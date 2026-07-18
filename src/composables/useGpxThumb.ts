import type { FeatureCollection, Position } from 'geojson'
import { useGpx } from './useGpx'
import { encodePolyline, haversine, simplifyCoords } from '~/utils/geo'

function extractCoords(geojson: FeatureCollection): Position[] {
  const coords: Position[] = []
  for (const feature of geojson.features) {
    const geom = feature.geometry
    if (!geom) continue
    if (geom.type === 'LineString') {
      coords.push(...geom.coordinates)
    } else if (geom.type === 'MultiLineString') {
      for (const line of geom.coordinates) {
        coords.push(...line)
      }
    }
  }
  return coords
}

type Coord2D = [number, number, number?]

function buildOneKmSegments(coords: Coord2D[]): Coord2D[][] {
  const segments: Coord2D[][] = []
  let segment: Coord2D[] = []

  for (let i = 0; i < coords.length; i++) {
    if (i === 0) {
      segment.push(coords[i])
      continue
    }
    const [lng1, lat1] = coords[i - 1]
    const [lng2, lat2] = coords[i]
    const distance = haversine(lat1, lng1, lat2, lng2)
    if (distance <= 1) {
      segment.push(coords[i])
    } else {
      if (segment.length > 1) segments.push(segment)
      segment = [coords[i]]
    }
  }
  if (segment.length > 1) segments.push(segment)
  return segments
}

export async function useGpxThumb(gpxUrl: string, isDark = false): Promise<string> {
  const { geojson } = await useGpx(gpxUrl)
  const coords = extractCoords(geojson) as Coord2D[]
  const segments = buildOneKmSegments(coords)

  const style = isDark ? 'dark-v11' : 'light-v11'
  const token = useRuntimeConfig().public.mapboxToken

  if (segments.length === 0) {
    return `https://api.mapbox.com/styles/v1/mapbox/${style}/static/114.1694,22.3193,10/600x400@2x?access_token=${token}&logo=false`
  }

  let simplified = segments
    .map((seg) => simplifyCoords(seg, 12))
    .filter((seg) => seg.length > 1)

  // Keep URL length safe for Mapbox Static API by dropping the shortest fragments first.
  const MAX_OVERLAYS = 80
  if (simplified.length > MAX_OVERLAYS) {
    simplified = simplified
      .sort((a, b) => b.length - a.length)
      .slice(0, MAX_OVERLAYS)
  }

  const overlays = simplified
    .map((seg) => `path-2+71afdd(${encodeURIComponent(encodePolyline(seg))})`)
    .join(',')

  const url = `https://api.mapbox.com/styles/v1/mapbox/${style}/static/${overlays}/auto/600x400@2x?padding=40&access_token=${token}&logo=false`
  return url
}

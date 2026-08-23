import type { FeatureCollection, Position } from 'geojson'
import { encodePolyline, haversine, simplifyCoords } from '~/utils/geo'

function extractCoords(geojson: FeatureCollection): Position[] {
  const coords: Position[] = []
  for (const feature of geojson.features) {
    if (feature.properties?.activity !== 'running') continue
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

export async function useHeatmapThumb(
  geojson: FeatureCollection,
  isDark = false
): Promise<string> {
  const style = isDark ? 'dark-v11' : 'light-v11'
  const token = useRuntimeConfig().public.mapboxToken

  const coords = extractCoords(geojson) as Coord2D[]
  const segments = buildOneKmSegments(coords)

  if (segments.length === 0) {
    return `https://api.mapbox.com/styles/v1/mapbox/${style}/static/109.4157,24.36,11/800x300@2x?access_token=${token}&logo=false`
  }

  let simplified = segments
    .map((seg) => simplifyCoords(seg, 12))
    .filter((seg) => seg.length > 1)

  const MAX_OVERLAYS = 80
  if (simplified.length > MAX_OVERLAYS) {
    simplified = simplified
      .sort((a, b) => b.length - a.length)
      .slice(0, MAX_OVERLAYS)
  }

  const overlays = simplified
    .map((seg) => `path-2+ff5500(${encodeURIComponent(encodePolyline(seg))})`)
    .join(',')

  return `https://api.mapbox.com/styles/v1/mapbox/${style}/static/${overlays}/109.4157,24.36,10/800x300@2x?access_token=${token}&logo=false`
}

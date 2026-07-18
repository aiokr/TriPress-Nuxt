import { gpx } from '@tmcw/togeojson'
import type { FeatureCollection, LineString, Position } from 'geojson'
import { totalDistance, elevationGain, coordsBounds } from '~/utils/geo'

export interface GpxData {
  geojson: FeatureCollection<LineString>
  distance: number
  elevationGain: number
  bounds: [[number, number], [number, number]]
}

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

export async function useGpx(url: string): Promise<GpxData> {
  // $fetch returns a Blob for .gpx files by default, so we explicitly ask for text.
  const text = await $fetch<string>(url, { responseType: 'text' })
  const xml = new DOMParser().parseFromString(text, 'text/xml')
  const geojson = gpx(xml) as FeatureCollection<LineString>
  const coords = extractCoords(geojson)
  return {
    geojson,
    distance: totalDistance(coords as [number, number, number?][]),
    elevationGain: elevationGain(coords as [number, number, number?][]),
    bounds: coordsBounds(coords as [number, number, number?][]),
  }
}

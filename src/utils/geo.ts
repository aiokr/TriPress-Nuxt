export type Coord = [number, number, number?]

const EARTH_RADIUS_KM = 6371

function toRad(deg: number): number {
  return (deg * Math.PI) / 180
}

export function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return EARTH_RADIUS_KM * c
}

export function totalDistance(coords: Coord[]): number {
  let distance = 0
  for (let i = 1; i < coords.length; i++) {
    const [lng1, lat1] = coords[i - 1]
    const [lng2, lat2] = coords[i]
    distance += haversine(lat1, lng1, lat2, lng2)
  }
  return distance
}

export function elevationGain(coords: Coord[]): number {
  let gain = 0
  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1][2]
    const curr = coords[i][2]
    if (prev != null && curr != null && curr > prev) {
      gain += curr - prev
    }
  }
  return gain
}

export function coordsBounds(
  coords: Coord[]
): [[number, number], [number, number]] {
  let minLng = Infinity
  let minLat = Infinity
  let maxLng = -Infinity
  let maxLat = -Infinity

  for (const [lng, lat] of coords) {
    minLng = Math.min(minLng, lng)
    minLat = Math.min(minLat, lat)
    maxLng = Math.max(maxLng, lng)
    maxLat = Math.max(maxLat, lat)
  }

  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ]
}

/**
 * 对坐标序列进行间隔采样，控制静态图 URL 长度。
 * 保留首尾点，中间按 maxPoints 均匀抽稀。
 */
export function simplifyCoords(coords: Coord[], maxPoints = 200): Coord[] {
  if (coords.length <= maxPoints) return coords
  const result: Coord[] = [coords[0]]
  const step = (coords.length - 1) / (maxPoints - 1)
  for (let i = 1; i < maxPoints - 1; i++) {
    const idx = Math.round(i * step)
    result.push(coords[idx])
  }
  result.push(coords[coords.length - 1])
  return result
}

/** Google Encoded Polyline Algorithm（5 位精度） */
export function encodePolyline(coords: Coord[]): string {
  let encoded = ''
  let prevLat = 0
  let prevLng = 0

  for (const [lng, lat] of coords) {
    const vLat = Math.round(lat * 1e5)
    const vLng = Math.round(lng * 1e5)
    encoded += encodeSigned(vLat - prevLat)
    encoded += encodeSigned(vLng - prevLng)
    prevLat = vLat
    prevLng = vLng
  }

  return encoded
}

function encodeSigned(value: number): string {
  let v = value < 0 ? ~(value << 1) : value << 1
  let result = ''
  while (v >= 0x20) {
    result += String.fromCharCode((0x20 | (v & 0x1f)) + 63)
    v >>= 5
  }
  result += String.fromCharCode(v + 63)
  return result
}

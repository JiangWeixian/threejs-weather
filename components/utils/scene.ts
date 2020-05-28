/**
 * get Coordinate System
 */
export const getCoord = () => {
  const w = window.innerWidth
  const h = window.innerHeight
  let unit = 1
  if (w < h) {
    unit = w / 4
    return [4, h / unit, 4]
  }
  unit = h / 4
  return [w / unit, 4, 4]
}

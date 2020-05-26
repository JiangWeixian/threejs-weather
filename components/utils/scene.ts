/**
 * get Coordinate System
 */
export const getCoord = () => {
  const w = window.innerWidth
  const h = window.innerHeight
  const unit = w / 4
  return {
    x: 4,
    y: h / (unit * 2),
    unit,
  }
}

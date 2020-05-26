import { Vector3 } from 'three'
import { getCoord } from './scene'

export const computeBoundingbox = (pos?: Vector3) => {
  if (!pos) {
    return {
      offsetLeft: 0,
      offsetRight: 0,
      offsetTop: 0,
      offsetBottom: 0,
    }
  }
  const [coordx, coordy] = getCoord()
  const { x, y } = pos
  return {
    offsetLeft: x > 0 ? coordx + x : coordx - Math.abs(x),
    offsetRight: x > 0 ? coordx - x : coordx + Math.abs(x),
    offsetTop: y > 0 ? coordy - y : coordy + Math.abs(y),
    offsetBottom: y > 0 ? coordy + y : coordy - Math.abs(y),
  }
}

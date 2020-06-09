import { getCoord } from './scene'
import { atPoint } from './random'

const [axisx, axisy, axisz] = getCoord()
export const axisxy = {
  top: [0, axisy, 0],
  bottom: [0, -axisy, 0],
  left: [-axisx, 0, 0],
  right: [axisx, 0, 0],
}

export const fromAxisX = () => {
  return atPoint() * axisx
}
export const fromAxisY = () => {
  return atPoint() * axisy
}
export const fromAxisZ = () => {
  return atPoint() * axisz
}
export const fromAxis = (axis: 'x' | 'y' | 'z') => {
  switch (axis) {
    case 'x':
      return fromAxisX()
    case 'y':
      return fromAxisY()
    case 'z':
      return fromAxisZ()
    default:
      return fromAxisX()
  }
}

export default {
  fromAxisX,
  fromAxisY,
  fromAxisZ,
  fromAxis,
  axisxy,
}

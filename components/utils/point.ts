import { getCoord } from './scene'

const [axisx, axisy, axisz] = getCoord()
export const axis2 = {
  top: [0, axisy, 0],
  bottom: [0, -axisy, 0],
  left: [-axisx, 0, 0],
  right: [axisx, 0, 0],
}

const random = () => {
  // 1 - 2
  // -1 - 1
  return 1 - Math.random() * 2
}
export const inner = () => {
  return [random() * axisx, random() * axisy, random() * axisz]
}
export const outer = () => {
  return [random() * axisx, random() * axisy, random() * axisz]
}
export const randomAxisY = () => {
  return [0, axisy * random(), 0]
}
export const randAxisX = () => {
  return [axisx * random(), 0, 0]
}

import { Vector3 } from 'three'
import { getCoord } from './scene'

type Orientation = 'top' | 'right' | 'left' | 'bottom'

export const DIRS = [1, -1]

/**
 * 从range数组中随机一个元素
 * @param range any[]
 */
export const inRange = <T>(range: T[]) => {
  return range[Math.round(Math.random() * (range.length - 1))]
}

/**
 * scene内部随机点
 */
export const atPoint = () => {
  return 1 - Math.random() * 2
}

export default {
  atPoint,
  inRange,
}

/**
 * scene内部随机点
 */
export const getRandomPoint = (index: number = 0) => {
  const coord = getCoord()
  return (1 - Math.random() * 2) * coord[index]
}

/**
 * 得到一个随机的噪声向量, 和orientation有关。
 * - ori = top -> [a, b, 0] or [0, b, 0]
 * - ori = left -> [a, b, 0] or [a, 0, 0]
 * - ori = right -> [a, b, 0] or [a, 0, 0]
 * @param ori Orientation
 * @param props
 */
// Orientation to index
const ORI_TO_INDEX = {
  top: 0,
  right: 1,
  left: 1,
  bottom: 0,
}
// Orientation to directions
const ORI_TO_DIR = {
  top: 1,
  right: 1,
  left: -1,
  bottom: -1,
}
export const getRandomVertorByOri = (
  ori: Orientation,
  { noise }: { noise?: boolean } = { noise: false },
) => {
  const endpoint = [0, 0, 0]
  endpoint[ORI_TO_INDEX[ori]] = getRandomPoint(ORI_TO_INDEX[ori])
  if (noise) {
    endpoint[1 - ORI_TO_INDEX[ori]] = Math.abs(getRandomPoint() * 0.5) * ORI_TO_DIR[ori]
  }
  return new Vector3(endpoint[0], endpoint[1], endpoint[2])
}

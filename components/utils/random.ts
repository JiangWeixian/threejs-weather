import { Vector3 } from 'three'

type Orientation = 'top' | 'right' | 'left' | 'bottom'

// constants
const ORI_TO_INDEX = {
  top: 0,
  right: 1,
  left: 1,
  bottom: 0,
}
const ORI_TO_DIR = {
  top: 1,
  right: 1,
  left: -1,
  bottom: -1,
}
// const ORIENTATIONS: Orientation[] = ['bottom', 'left', 'right', 'top']
export const DIRS = [1, -1]

/**
 * 从range数组中随机一个元素
 * @param range any[]
 */
export const getRandomInRange = <T>(range: T[]) => {
  return range[Math.round(Math.random() * (range.length - 1))]
}

/**
 * scene内部随机点
 */
export const getRandomPoint = () => {
  return 4 - Math.random() * 8
}

/**
 * 得到一个随机的噪声向量, 和ori有关。
 * - ori = top - [a, b, 0] or [0, b, 0]
 * - ori = left - [a, b, 0] or [a, 0, 0]
 * - ori = right - [a, b, 0] or [a, 0, 0]
 * @param ori Orientation
 * @param props
 */
export const getRandomVertorByOri = (
  ori: Orientation,
  { noise }: { noise?: boolean } = { noise: false },
) => {
  const endpoint = [0, 0, 0]
  endpoint[ORI_TO_INDEX[ori]] = getRandomPoint()
  if (noise) {
    endpoint[1 - ORI_TO_INDEX[ori]] = Math.abs(getRandomPoint() * 0.5) * ORI_TO_DIR[ori]
  }
  return new Vector3(endpoint[0], endpoint[1], endpoint[2])
}

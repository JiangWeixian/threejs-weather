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

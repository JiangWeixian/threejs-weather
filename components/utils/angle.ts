/**
 * convert deg to rad
 * @param {number} deg
 */
export const deg2rad = (deg = 0) => {
  return (deg * Math.PI) / 180
}

/**
 * 角度正负数值
 * @param {number | undefined} angle
 */
export const angle2dir = (angle?: number) => {
  if (!angle || angle === 0) {
    return 0
  }
  return angle / Math.abs(angle)
}
export const computeBoundingbox = pos => {
  if (!pos) {
    return {
      offsetLeft: 0,
      offsetRight: 0,
      offsetTop: 0,
      offsetBottom: 0,
    }
  }
  const { x, y } = pos
  return {
    offsetLeft: x > 0 ? 4 + x : 4 - Math.abs(x),
    offsetRight: x > 0 ? 4 - x : 4 + Math.abs(x),
    offsetTop: y > 0 ? 4 - y : 4 + Math.abs(y),
    offsetBottom: y > 0 ? 4 + y : 4 - Math.abs(y),
  }
}

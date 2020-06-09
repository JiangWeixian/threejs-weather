import point from './point'
import { Orientation } from '../interface'

import { Vector3 } from 'three'

const PLACEMENT_TO_AXIS: { [key: string]: 'x' | 'y' | 'z' } = {
  fromTop: 'x',
  fromRight: 'y',
  fromLeft: 'y',
  fromBottom: 'x',
}
const PLACEMENT_TO_DIR = {
  fromTop: 1,
  fromRight: 1,
  fromLeft: -1,
  fromBottom: -1,
}

/**
 * 得到一个随机的噪声向量, 和orientation有关。
 * - placement = top -> [a, b, 0] or [0, b, 0]
 * - placement = left -> [a, b, 0] or [a, 0, 0]
 * - placement = right -> [a, b, 0] or [a, 0, 0]
 * @param {Orientation} placement
 * @param props
 */
const fromAxis = (placement: Orientation) => {
  const endpoint = { x: 0, y: 0, z: 0 }
  endpoint[PLACEMENT_TO_AXIS[placement]] = point.fromAxis(PLACEMENT_TO_AXIS[placement])
  return new Vector3(endpoint.x, endpoint.z, endpoint.z)
}

const fromPlacement = (placement: Orientation) => {
  const endpoint = { x: 0, y: 0, z: 0 }
  endpoint[PLACEMENT_TO_AXIS[placement]] = point.fromAxis(PLACEMENT_TO_AXIS[placement])
  if (PLACEMENT_TO_AXIS[placement] === 'x') {
    endpoint.y = Math.abs(point.fromAxisY() * 0.5) * PLACEMENT_TO_DIR[placement]
  }
  if (PLACEMENT_TO_AXIS[placement] === 'y') {
    endpoint.x = Math.abs(point.fromAxisY() * 0.5) * PLACEMENT_TO_DIR[placement]
  }
  return new Vector3(endpoint.x, endpoint.z, endpoint.z)
}

export default {
  fromAxis,
  fromPlacement,
}

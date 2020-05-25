import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'

export type Raindrop = {
  vertices: THREE.Vector3[] // rain-drop geom
  orientation: 'right' | 'top' | 'left' // rain-drop direction
  leg: number
  angle: number // unit=deg
  color: string
}

type Orientation = 'top' | 'right' | 'left' | 'bottom'
const RAIN_COLORS = ['#cdd1d3', '#fcd337']

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
const dirs = [1, -1]

// utils
/**
 * scene内部随机点
 */
const getRandomPoint = () => {
  return 4 - Math.random() * 8
}

/**
 * 从range数组中随机一个元素
 * @param range any[]
 */
const getRandomInRange = <T>(range: T[]) => {
  return range[Math.round(Math.random() * (range.length - 1))]
}

// const getRandomOri = () => {
//   return getRandomInRange(ORIENTATIONS)
// }

/**
 * 得到一个随机的噪声向量, 和ori有关。
 * - ori = top - [a, b, 0] or [0, b, 0]
 * - ori = left - [a, b, 0] or [a, 0, 0]
 * - ori = right - [a, b, 0] or [a, 0, 0]
 * @param ori Orientation
 * @param props
 */
const getRandomVertorByOri = (
  ori: Orientation,
  { noise }: { noise?: boolean } = { noise: false },
) => {
  const endpoint = new THREE.Vector3(0, 0, 0)
  endpoint[ORI_TO_INDEX[ori]] = getRandomPoint()
  if (noise) {
    endpoint[1 - ORI_TO_INDEX[ori]] = Math.abs(getRandomPoint() * 0.5) * ORI_TO_DIR[ori]
  }
  return new THREE.Vector3(endpoint[0], endpoint[1], endpoint[2])
}

/**
 * 角度正负数值
 * @param angle number
 */
const angle2dir = (angle?: number) => {
  if (!angle || angle === 0) {
    return 0
  }
  return angle / Math.abs(angle)
}

type UseRainProps = {
  count: number
  angle?: number
}

export const useRain = (
  { angle = (-45 * Math.PI) / 180, ...props }: UseRainProps = {
    count: 100,
    angle: (-45 * Math.PI) / 180,
  },
) => {
  // raindrop start position data
  const startpoints = useRef<{ [key: string]: THREE.Vector3 }>({
    top: new THREE.Vector3(0, 4, 0),
    right: new THREE.Vector3(4, 0, 0),
    left: new THREE.Vector3(-4, 0, 0),
  }).current
  // radindrop come from which orientation
  const comefrom = useRef<{ [key: string]: Orientation[] }>({
    left: ['top', 'right'],
    right: ['top', 'left'],
    top: ['top'],
  }).current
  const lines = useMemo(() => {
    return Array(props.count)
      .fill(0)
      .map(() => {
        // h / deltax = tan(ang)
        // 直角边
        const leg = Math.random() * 2
        const orientation = getRandomInRange<Orientation>(comefrom.right)
        // noise vertor for startpoint
        const vertor = getRandomVertorByOri(orientation, { noise: true })
        return {
          vertices: [
            // endpoint
            new THREE.Vector3()
              .copy(startpoints[orientation])
              .add(vertor)
              // distance vertor
              .add(new THREE.Vector3(leg / Math.tan(angle), leg, 0)),
            // startpoint
            new THREE.Vector3().copy(startpoints[orientation]).add(vertor),
          ],
          angle,
          leg,
          orientation: orientation,
          color: getRandomInRange(RAIN_COLORS),
        } as Raindrop
      })
  }, [angle, props.count])
  return {
    lines,
  }
}

export type UseRaindropProps = {
  value: Raindrop
}

const computeBoundingbox = (pos?: THREE.Vector3) => {
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

export const useRaindrop = (
  raindrop: React.MutableRefObject<THREE.Mesh | undefined>,
  props?: UseRaindropProps,
) => {
  // 摩擦系数, raindrop从负数开始运动, 更加随机的效果
  const friction = useRef(
    getRandomInRange(dirs) === 1 ? 0 : -1 * 0.01 * Math.round(Math.random() * 10),
  ).current
  const vy0 = useRef(0.0001 + friction)
  // vy0 / vx0 = tan(angle)
  const vx0 = useRef(0.0001 + friction)
  const a = useRef(0.0001)
  const { offsetTop } = computeBoundingbox(props?.value.vertices[0])
  useFrame(() => {
    if (raindrop.current?.position.y === undefined || !props?.value) {
      return
    }
    // raindrop加速下落
    raindrop.current.position.y -= vy0.current
    // left raindrop从左到右移动, right raindrop从右到左移动
    raindrop.current.position.x -= vx0.current * angle2dir(props.value.angle)
    vy0.current += a.current
    vx0.current += a.current
    // 判断raindrop是否出了边界
    if (offsetTop + Math.abs(raindrop.current.position.y) > 8 + props.value.leg) {
      const vertor = getRandomVertorByOri(props.value.orientation)
      // 随机raindrop初始位置, 避免loop重复
      raindrop.current.position.set(vertor.x, vertor.y, vertor.z)
      vy0.current = 0.0001
      vx0.current = 0.0001
    }
  })
}

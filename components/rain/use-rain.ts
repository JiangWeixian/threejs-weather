import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
import { Vector3 } from 'three'

import { computeBoundingbox } from '../utils/element'
import { getRandomInRange, getRandomVertorByOri, getRandomPoint } from '../utils/random'
import { DIRS } from '../utils/constants'
import { getCoord } from '../utils/scene'

export type Raindrop = {
  vertices: THREE.Vector3[] // rain-drop geom
  orientation: 'right' | 'top' | 'left' // rain-drop direction
  leg: number
  angle: number // unit=deg
  color: string
}

type Orientation = 'top' | 'right' | 'left' | 'bottom'
const RAIN_COLORS = ['#cdd1d3', '#fcd337']

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

export type UseRainProps = {
  count?: number
  angle?: number
}

export const DEFAULT_RAINPROPS = {
  count: 100,
  angle: (-45 * Math.PI) / 180,
}

export const useRain = ({
  angle = (-45 * Math.PI) / 180,
  count = 100,
  ...props
}: UseRainProps = DEFAULT_RAINPROPS) => {
  // raindrop start position data
  const coord = useRef(getCoord()).current
  const startpoints = useRef<{ [key: string]: THREE.Vector3 }>({
    top: new THREE.Vector3(0, coord[1], 0),
    right: new THREE.Vector3(coord[0], 0, 0),
    left: new THREE.Vector3(-coord[0], 0, 0),
  }).current
  // radindrop come from which orientation
  const comefrom = useRef<{ [key: string]: Orientation[] }>({
    left: ['top', 'right'],
    right: ['top', 'left'],
    top: ['top'],
  }).current
  const lines = useMemo(() => {
    return Array(count)
      .fill(0)
      .map(() => {
        // h / deltax = tan(ang)
        // 直角边
        const leg = Math.random() * 2
        const orientation = getRandomInRange<Orientation>(comefrom.right)
        // noise vertor for startpoint
        const vertor = getRandomVertorByOri(orientation, { noise: true }).add(
          new Vector3(0, 0, getRandomPoint(2)),
        )
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
  }, [angle, count])
  return {
    lines,
  }
}

export type UseRaindropProps = {
  value: Raindrop
}

export const useRaindrop = (
  raindrop: React.MutableRefObject<THREE.Mesh | undefined>,
  mat: React.MutableRefObject<any>,
  props?: UseRaindropProps,
) => {
  // 摩擦系数, raindrop从负数开始运动, 更加随机的效果
  const friction = useRef(
    getRandomInRange(DIRS) === 1 ? 0 : -1 * 0.01 * Math.round(Math.random() * 10),
  ).current
  const coord = useRef(getCoord()).current
  const vy0 = useRef(0.0001 + friction)
  // vy0 / vx0 = tan(angle)
  const vx0 = useRef(0.0001 + friction)
  const a = useRef(0.001)
  const { offsetTop } = computeBoundingbox(props?.value.vertices[0])
  useFrame(() => {
    if (raindrop.current?.position.y === undefined || !props?.value || !mat.current) {
      return
    }
    // raindrop加速下落
    raindrop.current.position.y -= vy0.current
    // left raindrop从左到右移动, right raindrop从右到左移动
    raindrop.current.position.x -= vx0.current * angle2dir(props.value.angle)
    // 从无到有比较真实
    mat.current.opacity += 0.01
    vy0.current += a.current
    vx0.current += a.current
    // 判断raindrop是否出了边界
    if (offsetTop + Math.abs(raindrop.current.position.y) > coord[1] * 2 + props.value.leg) {
      const vertor = getRandomVertorByOri(props.value.orientation, { noise: true })
      // 随机raindrop初始位置, 避免loop重复
      raindrop.current.position.set(vertor.x, vertor.y, vertor.z)
      mat.current.opacity = 0
      vy0.current = 0.0001
      vx0.current = 0.0001
    }
  })
}

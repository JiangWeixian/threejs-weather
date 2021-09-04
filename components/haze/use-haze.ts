import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import vertority from '../utils/vertority'
import { computeBoundingbox } from '../utils/element'
import random from '../utils/random'
import { getCoord } from '../utils/scene'
import { DIRS } from '../utils/constants'
import { useRain } from '../rain/use-rain'
import { angle2dir } from '../utils/angle'

export type Haze = {
  vertices: THREE.Vector3[] // rain-drop geom
  orientation: 'fromRight' | 'fromTop' | 'fromLeft' // rain-drop direction
  leg: number
  angle: number // unit=deg
  color: string
  dashArray: number
  opacity: number
}

const HAZE_COLORS = ['#fff', '#0F203B']

export type UseHazeProps = {
  count?: number
  angle?: number
}

export const DEFAULT_RAINPROPS = {
  count: 100,
  angle: -45,
}

export const useHaze = ({ angle = -45, count = 100 }: UseHazeProps = DEFAULT_RAINPROPS) => {
  const { lines } = useRain({
    angle,
    count,
    colors: HAZE_COLORS,
  })
  return {
    lines: lines.map((line) => ({
      ...line,
      opacity: Math.random() + 0.5,
      dashArray: Math.random() * 0.3,
    })),
  }
}

export type UseHazeDropProps = {
  value: Haze
}

export const useHazeDrop = (
  hazedrop: React.MutableRefObject<THREE.Mesh | undefined>,
  mat: React.MutableRefObject<any>,
  props?: UseHazeDropProps,
) => {
  const friction = useRef(
    random.inRange(DIRS) === 1 ? 0 : 1 * 0.01 * Math.round(Math.random() * 10),
  ).current
  const coord = useRef(getCoord()).current
  const vy0 = useRef(0.001 + friction)
  // vy0 / vx0 = tan(angle)
  const vx0 = useRef(0.001 + friction)
  const a = useRef(0.002)
  const { offsetTop } = computeBoundingbox(props?.value.vertices[0])
  useFrame(() => {
    if (hazedrop.current?.position.y === undefined || !props?.value || !mat.current) {
      return
    }
    // hazedrop加速下落
    hazedrop.current.position.y -= vy0.current
    // left hazedrop从左到右移动, right hazedrop从右到左移动
    hazedrop.current.position.x -= vx0.current * angle2dir(props.value.angle)
    // 从无到有比较真实
    vy0.current += a.current
    vx0.current += a.current
    // 判断hazedrop是否出了边界
    if (offsetTop + Math.abs(hazedrop.current.position.y) > coord[1] * 2 + props.value.leg) {
      const vertor = vertority.fromPlacement(props.value.orientation)
      // 随机hazedrop初始位置, 避免loop重复
      hazedrop.current.position.set(vertor.x, vertor.y, vertor.z)
      vy0.current = 0.0001
      vx0.current = 0.0001
    }
  })
}

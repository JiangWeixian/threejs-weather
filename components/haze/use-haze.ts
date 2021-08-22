import React, { useRef, useMemo } from 'react'
import { Vector3 } from 'three'
import { useFrame } from 'react-three-fiber'

import vertority from '../utils/vertority'
import { computeBoundingbox } from '../utils/element'
import random from '../utils/random'
import { deg2rad } from '../utils/angle'
import point from '../utils/point'
import { getCoord } from '../utils/scene'
import { DIRS } from '../utils/constants'
import { Orientation } from '../interface'

export type Haze = {
  vertices: THREE.Vector3[] // rain-drop geom
  orientation: 'fromRight' | 'fromTop' | 'fromLeft' // rain-drop direction
  leg: number
  angle: number // unit=deg
  color: string
  dashArray: number
  opacity: number
}

const RAIN_COLORS = ['#fff', '#0F203B']

/**
 * 角度正负数值
 * @param {number | undefined} angle
 */
const angle2dir = (angle?: number) => {
  if (!angle || angle === 0) {
    return 0
  }
  return angle / Math.abs(angle)
}

const angle2placement = (angle?: number) => {
  if (!angle || angle === 0) {
    return 'fromTop'
  }
  return angle < 0 ? 'fromRight' : 'fromLeft'
}

export type UseHazeProps = {
  count?: number
  angle?: number
}

export const DEFAULT_RAINPROPS = {
  count: 100,
  angle: -45,
}

export const useHaze = ({ angle = -45, count = 100 }: UseHazeProps = DEFAULT_RAINPROPS) => {
  // hazedrop start position data
  const _angle = deg2rad(angle)
  const startpoints = useRef<{ [key: string]: Vector3 }>({
    fromTop: new Vector3().fromArray(point.axisxy.top),
    fromRight: new Vector3().fromArray(point.axisxy.right),
    fromLeft: new Vector3().fromArray(point.axisxy.left),
  }).current
  // radindrop come from which orientation
  const comefrom = useRef<{ [key: string]: Orientation[] }>({
    fromLeft: ['fromTop', 'fromRight'],
    fromRight: ['fromTop', 'fromLeft'],
    fromTop: ['fromTop'],
  }).current
  const lines = useMemo(() => {
    return Array(count)
      .fill(0)
      .map(() => {
        // h / deltax = tan(ang)
        // 直角边
        const leg = 0.5 // Math.random() * 2
        // FIXME: should modify from angle
        const orientation = random.inRange<Orientation>(comefrom[angle2placement(_angle)])
        // noise vertor for startpoint
        const vertor = vertority
          .fromPlacement(orientation)
          .add(new Vector3(0, 0, point.fromAxisZ()))
        return {
          vertices: [
            // endpoint
            new Vector3()
              .copy(startpoints[orientation])
              .add(vertor)
              // distance vertor
              .add(new Vector3(leg / Math.tan(_angle), leg, 0)),
            // startpoint
            new Vector3().copy(startpoints[orientation]).add(vertor),
          ],
          angle: _angle,
          leg,
          opacity: Math.random() + 0.5,
          orientation,
          color: random.inRange(RAIN_COLORS),
          dashArray: Math.random() * 0.3,
        } as Haze
      })
  }, [_angle, count])
  return {
    lines,
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

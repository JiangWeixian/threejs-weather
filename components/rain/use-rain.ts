import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
import { Vector3 } from 'three'

import { computeBoundingbox } from '../utils/element'
import random from '../utils/random'
import vertority from '../utils/vertority'
import point from '../utils/point'
import { deg2rad, angle2dir } from '../utils/angle'
import { DIRS } from '../utils/constants'
import { getCoord } from '../utils/scene'
import { Orientation, Style } from '../interface'

export type Raindrop = {
  vertices: THREE.Vector3[] // rain-drop geom
  orientation: 'fromRight' | 'fromTop' | 'fromLeft' // rain-drop direction
  leg: number
  angle: number // unit=deg
  color: string
}

const RAIN_COLORS = ['#cdd1d3', '#fcd337']

const angle2placement = (angle?: number) => {
  if (!angle || angle === 0) {
    return 'fromTop'
  }
  return angle < 0 ? 'fromRight' : 'fromLeft'
}

export type UseRainProps = {
  count?: number
  angle?: number
  colors?: string[]
}

export const DEFAULT_RAINPROPS = {
  count: 100,
  angle: -45,
}

export const useRain = ({
  angle = -45,
  count = 100,
  colors = RAIN_COLORS,
}: UseRainProps = DEFAULT_RAINPROPS) => {
  // raindrop start position data
  const _angle = deg2rad(angle)
  const startpoints = useRef<{ [key: string]: THREE.Vector3 }>({
    fromTop: new THREE.Vector3().fromArray(point.axisxy.top),
    fromRight: new THREE.Vector3().fromArray(point.axisxy.right),
    fromLeft: new THREE.Vector3().fromArray(point.axisxy.left),
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
        const leg = Math.random() * 2
        // FIXME: should modify from angle
        const orientation = random.inRange<Orientation>(comefrom[angle2placement(_angle)])
        // noise vertor for startpoint
        const vertor = vertority
          .fromPlacement(orientation)
          .add(new Vector3(0, 0, point.fromAxisZ()))
        return {
          vertices: [
            // endpoint
            new THREE.Vector3()
              .copy(startpoints[orientation])
              .add(vertor)
              // distance vertor
              .add(new THREE.Vector3(leg / Math.tan(_angle), leg, 0)),
            // startpoint
            new THREE.Vector3().copy(startpoints[orientation]).add(vertor),
          ],
          angle: _angle,
          leg,
          orientation,
          color: random.inRange(colors),
        } as Raindrop
      })
  }, [_angle, comefrom, count, startpoints, colors])
  return {
    lines,
  }
}

export type UseRaindropProps = {
  value: Raindrop
  style?: Style
}

export const useRaindrop = (
  raindrop: React.MutableRefObject<THREE.Mesh | undefined>,
  mat: React.MutableRefObject<any>,
  props?: UseRaindropProps,
) => {
  // 摩擦系数, raindrop从负数开始运动, 更加随机的效果
  const friction = useRef(
    random.inRange(DIRS) === 1 ? 0 : -1 * 0.01 * Math.round(Math.random() * 10),
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
    mat.current.opacity *= props.style?.opacity.get() ?? 1
    vy0.current += a.current
    vx0.current += a.current
    // 判断raindrop是否出了边界
    if (offsetTop + Math.abs(raindrop.current.position.y) > coord[1] * 2 + props.value.leg) {
      const vertor = vertority.fromPlacement(props.value.orientation)
      // 随机raindrop初始位置, 避免loop重复
      raindrop.current.position.set(vertor.x, vertor.y, vertor.z)
      mat.current.opacity = 0
      vy0.current = 0.0001
      vx0.current = 0.0001
    }
  })
}

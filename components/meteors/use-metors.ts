import { useMemo, useRef } from 'react'
import { Vector3, Mesh } from 'three'
import { useFrame } from '@react-three/fiber'

import vertority from '../utils/vertority'
import { computeBoundingbox } from '../utils/element'
import { deg2rad } from '../utils/angle'
import { getCoord } from '../utils/scene'

export type UseMeteorsProps = {
  count?: number
  angle?: number
}

export type Meteor = {
  angle: number
  leg: number
  vertices: Vector3[]
  hypotenuse: number
  color: string
}

export const useMeteors = (
  { count = 5, angle = 30 }: UseMeteorsProps = { count: 10, angle: 30 },
) => {
  const meteors = useMemo(() => {
    const _angle = deg2rad(angle)
    const coord = getCoord()
    return new Array(count).fill(0).map(() => {
      const leg = Math.random() * coord[1]
      // noise vertor for startpoint
      const vertor = vertority.fromPlacement('fromRight')
      return {
        vertices: [
          // endpoint
          new Vector3()
            .copy(vertor)
            // distance vertor
            .add(new Vector3(leg / Math.tan(_angle), leg, 0)),
          // startpoint
          new Vector3().copy(vertor),
        ],
        angle: _angle,
        leg,
        hypotenuse: leg / Math.sin(_angle),
        color: 'white',
      } as Meteor
    })
  }, [count, angle])
  return {
    meteors,
  }
}

export type UseMeteorProps = {
  value: Meteor
}

export const useMeteor = (
  meteor: React.MutableRefObject<Mesh | undefined>,
  mat: React.MutableRefObject<any>,
  { value }: UseMeteorProps,
) => {
  const vopacity = useRef(0.01)
  const { offsetTop } = computeBoundingbox(value.vertices[0])
  const threshold = Math.random() * 8
  useFrame(() => {
    if (meteor.current?.position.y === undefined || !mat.current) {
      return
    }
    // 判断meteor是否出了边界
    if (offsetTop + Math.abs(meteor.current.position.y) > threshold) {
      mat.current.uniforms.dashOffset.value -= Math.abs(vopacity.current)
      mat.current.opacity -= vopacity.current
    } else {
      // meteor加速下落
      meteor.current.position.y -= Math.sin(value.angle) * Math.abs(vopacity.current) * 10
      meteor.current.position.x -= Math.cos(value.angle) * Math.abs(vopacity.current) * 10
    }
    if (Math.abs(mat.current.uniforms.dashOffset.value) >= 1.1) {
      mat.current.opacity = 1
      mat.current.uniforms.dashOffset.value = 0
      const vertor = vertority.fromAxis('fromRight')
      // 随机meteor初始位置, 避免loop重复
      meteor.current.position.set(vertor.x, vertor.y, vertor.z)
    }
  })
}

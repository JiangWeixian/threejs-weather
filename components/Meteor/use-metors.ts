import { useMemo, useRef } from 'react'
import { Vector3, Mesh } from 'three'

import { getRandomVertorByOri } from '../utils/random'
import { computeBoundingbox } from '../utils/element'
import { useFrame } from 'react-three-fiber'

type UseMeteorsProps = {
  count?: number
}

export type Meteor = {
  angle: number
  leg: number
  vertices: Vector3[]
  hypotenuse: number
  color: string
}

export const useMeteors = ({ count = 5 }: UseMeteorsProps = { count: 10 }) => {
  const meteors = useMemo(() => {
    const angle = useRef((30 * Math.PI) / 180).current
    return new Array(count).fill(0).map(() => {
      const leg = Math.random() * 4
      // noise vertor for startpoint
      const vertor = getRandomVertorByOri('right', { noise: true })
      return {
        vertices: [
          // endpoint
          new Vector3(4, 0, 0)
            .copy(vertor)
            // distance vertor
            .add(new Vector3(leg / Math.tan(angle), leg, 0)),
          // startpoint
          new Vector3(4, 0, 0).copy(vertor),
        ],
        angle,
        leg,
        hypotenuse: leg / Math.sin(angle),
        color: 'white',
      }
    })
  }, [count])
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
      const vertor = getRandomVertorByOri('right')
      // 随机meteor初始位置, 避免loop重复
      meteor.current.position.set(vertor.x, vertor.y, vertor.z)
    }
  })
}

import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { getRandomInRange, DIRS } from '../utils/random'
import { useFrame } from 'react-three-fiber'

type UseStarRings = {
  count?: number
}

export type Ring = {
  radius: number
  vertices: THREE.Vector3[]
  dashArray: number
  opacity: number
  color: string
  lineWidth: number
}

const RING_COLORS = ['#cdd1d3', '#fcd337', '#1677b3']

export const useStarRings = ({ count = 50 }: UseStarRings = { count: 50 }) => {
  const rings = useMemo(() => {
    return new Array(count).fill(0).map(() => {
      const radius = Math.random() * 10
      const vertices = new Array(180).fill(0).map((_v, i) => {
        return new THREE.Vector3(
          Math.cos((i * 2 * Math.PI) / 180) * radius - 6,
          Math.sin((i * 2 * Math.PI) / 180) * radius + 4,
          0,
        )
      })
      return {
        radius,
        vertices,
        dashArray: Math.random() + 0.1,
        opacity: Math.random() * 0.8,
        color: getRandomInRange(RING_COLORS),
        lineWidth: Math.random() * 0.05,
      } as Ring
    })
  }, [count])
  return {
    rings,
  }
}

export const useRing = (ring: React.MutableRefObject<any>) => {
  const dir = getRandomInRange(DIRS)
  const speed = useRef(Math.random() * 2 * 0.0001)
  useFrame(() => {
    if (!ring.current) {
      return
    }
    ring.current.uniforms.dashOffset.value -= speed.current * dir
  })
}

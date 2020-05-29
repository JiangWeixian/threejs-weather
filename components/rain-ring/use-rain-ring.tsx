import { Mesh, Material, Vector3 } from 'three'
import { useFrame, useThree } from 'react-three-fiber'
import React, { useMemo } from 'react'
import { getRandomPoint } from '../utils/random'

export type Ring = {
  radius: number
  startpoint: Vector3
}

export const useRainRing = (rainring: React.MutableRefObject<Mesh | undefined>) => {
  const { camera } = useThree()
  useFrame(() => {
    if (!rainring.current || !rainring.current.material) {
      return
    }
    const mat: Material = rainring.current.material as Material
    if (camera.rotation.z >= 0 || camera.rotation.y <= 0) {
      mat.opacity = 0
      return
    }
    mat.opacity -= 0.01
    rainring.current.scale.x += 0.1
    rainring.current.scale.y += 0.1
    if ((rainring.current.material as Material).opacity <= 0) {
      rainring.current.position.set(getRandomPoint(0), getRandomPoint(1), getRandomPoint(2))
      mat.opacity = 0.2
      rainring.current.scale.x = 0
      rainring.current.scale.y = 0
    }
    rainring.current.rotation.x = camera.rotation.x
    rainring.current.rotation.y = camera.rotation.y
    rainring.current.rotation.z = camera.rotation.z
  })
}

export type UseRainRingsProps = {
  count?: number
}

export const useRainRings = ({ count = 10 }: UseRainRingsProps = { count: 10 }) => {
  const rings = useMemo(() => {
    return new Array(count).fill(0).map(() => {
      return {
        radius: Math.random() * 0.1,
        startpoint: new Vector3(getRandomPoint(0), getRandomPoint(1), getRandomPoint(2)),
      } as Ring
    })
  }, [count])
  return {
    rings,
  }
}

import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from 'react-three-fiber'
import { Group } from 'three'

// constants
// radius
const R = 2
const HALO_COLORS = ['#faf3d2', '#fbebb3', '#fae09c', '#f9d67c', '#f6c451', '#c34e35']

type Sunshine = {
  vertices: THREE.Vector3[]
  angle: number
}

type Halo = {
  radius: number
  color: string
  startpoint: THREE.Vector3
}

export const useSun = () => {
  const angle = useRef(-(Math.random() * 90 + 90))

  const sunshines = useMemo(() => {
    return Array(3)
      .fill(0)
      .map((_v, i) => {
        angle.current += i * 20
        const startpoint = Math.random() * 4 + 4
        const length = Math.random() * 2
        return {
          vertices: [
            new THREE.Vector3(
              Math.cos((angle.current * Math.PI) / 180) * startpoint,
              Math.sin((angle.current * Math.PI) / 180) * startpoint,
              0,
            ),
            new THREE.Vector3(
              Math.cos((angle.current * Math.PI) / 180) * (startpoint + length),
              Math.sin((angle.current * Math.PI) / 180) * (startpoint + length),
              0,
            ),
          ],
          angle,
        }
      })
  }, [])
  const halos = useMemo(() => {
    return Array(HALO_COLORS.length)
      .fill(0)
      .map((_v, i) => {
        const startpoint = new THREE.Vector3(0.5 - Math.random() * 1, 0.5 - Math.random() * 1, 0)
        return {
          radius: R + 5 - i,
          color: HALO_COLORS[i],
          startpoint,
        }
      })
  }, [])
  return {
    sunshines,
    halos,
  }
}

export const useSunshine = (sunshine: React.MutableRefObject<Group | undefined>) => {
  useFrame(() => {
    if (!sunshine.current) {
      return
    }
    sunshine.current.rotation.z -= 0.001
    if (Math.abs(sunshine.current.rotation.z) > 2) {
      sunshine.current.rotation.z = 0
    }
  })
}

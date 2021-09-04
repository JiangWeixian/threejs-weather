import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Vector3 } from 'three'

import { getCoord } from '../utils/scene'

const R = 2
const HALO_COLORS = ['#faf3d2', '#fbebb3', '#fae09c', '#f9d67c', '#f6c451', '#c34e35']

type Sunshine = {
  vertices: Vector3[]
  angle: number
}

export type Halo = {
  radius: number
  color: string
  startpoint: Vector3
}

export type UseSunProps = {
  percentX?: number
  count?: number
}

export const useSun = (
  { percentX = 1, count = HALO_COLORS.length }: UseSunProps = {
    percentX: 1,
    count: HALO_COLORS.length,
  },
) => {
  const angle = useRef(-(Math.random() * 90 + 90))
  const coord = useRef(getCoord()).current
  const startpoint = useMemo(() => {
    return new Vector3(coord[0] * percentX, coord[1], 0)
  }, [coord, percentX])

  const sunshines = useMemo(() => {
    return Array(3)
      .fill(0)
      .map((_v, i) => {
        angle.current += i * 20
        const startpoint = Math.random() * coord[0] + coord[0] * percentX
        const length = Math.random() * 2
        return {
          vertices: [
            new Vector3(
              Math.cos((angle.current * Math.PI) / 180) * startpoint,
              Math.sin((angle.current * Math.PI) / 180) * startpoint,
              0,
            ),
            new Vector3(
              Math.cos((angle.current * Math.PI) / 180) * (startpoint + length),
              Math.sin((angle.current * Math.PI) / 180) * (startpoint + length),
              0,
            ),
          ],
          angle: angle.current,
        } as Sunshine
      })
  }, [coord, percentX])
  const halos = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_v, i) => {
        const startpoint = new Vector3(0.5 - Math.random() * 1, 0.5 - Math.random() * 1, 0)
        return {
          radius: R + 5 - i,
          color: HALO_COLORS[i],
          startpoint,
        } as Halo
      })
  }, [count])
  return {
    sunshines,
    halos,
    startpoint,
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

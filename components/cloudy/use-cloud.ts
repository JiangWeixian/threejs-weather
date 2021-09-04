import { useMemo, useRef } from 'react'
import { Vector3, Mesh } from 'three'
import { useFrame } from '@react-three/fiber'

import { DIRS } from '../utils/constants'
import random from '../utils/random'
import { getCoord } from '../utils/scene'
import vertority from '../utils/vertority'

const DARK_CLOUD_COLORS = ['#21373d', '#535657']

export const useCloud = (cloud: React.MutableRefObject<Mesh | undefined>) => {
  const dir = useRef(1)
  const speed = useRef(Math.random() * 0.001 * random.inRange(DIRS))
  const distance = useRef(0)
  useFrame(() => {
    if (!cloud.current) {
      return
    }
    distance.current += 0.001 * dir.current
    cloud.current.position.x += speed.current * dir.current
    cloud.current.position.y -= speed.current * dir.current
    if (distance.current <= 0) {
      dir.current = -dir.current
      speed.current = Math.random() * 0.001 * random.inRange(DIRS)
    } else if (distance.current >= 0.1) {
      dir.current = -dir.current
      speed.current = Math.random() * 0.001 * random.inRange(DIRS)
    }
  })
}

export type UseCloudsProps = {
  count?: number
  colors?: string[]
}

export type Cloud = {
  radius: number
  startpoint: Vector3
  opacity: number
  color: string
}

export const useClouds = (
  { count = 10, colors = DARK_CLOUD_COLORS }: UseCloudsProps = {
    count: 10,
    colors: DARK_CLOUD_COLORS,
  },
) => {
  const coord = useRef(getCoord()).current
  const clouds = useMemo(() => {
    return new Array(count).fill(0).map(() => {
      return {
        radius: (Math.random() * coord[0]) / 2,
        startpoint: vertority.fromAxis('fromTop').add(new Vector3(0, coord[1], 0)),
        opacity: Math.random(),
        color: random.inRange(colors),
      } as Cloud
    })
  }, [colors, coord, count])
  return {
    clouds,
    startpoint: new Vector3(0, coord[1], 0),
  }
}

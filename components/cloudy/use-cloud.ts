import { useMemo } from 'react'
import { Vector3 } from 'three'

import { getRandomInRange, getRandomVertorByOri } from '../utils/random'
import { getCoord } from '../utils/scene'

const CLOUD_COLORS = ['#21373d', '#535657']

export type UseCloudsProps = {
  count?: number
}

export type Cloud = {
  radius: number
  startpoint: Vector3
  opacity: number
  color: string
}

export const useClouds = ({ count = 10 }: UseCloudsProps = { count: 10 }) => {
  const clouds = useMemo(() => {
    const coord = getCoord()
    return new Array(count).fill(0).map(() => {
      return {
        radius: (Math.random() * coord[0]) / 2,
        startpoint: getRandomVertorByOri('top').add(new Vector3(0, coord[1], 0)),
        opacity: Math.random(),
        color: getRandomInRange(CLOUD_COLORS),
      } as Cloud
    })
  }, [count])
  return {
    clouds,
  }
}

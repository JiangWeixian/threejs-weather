import { useMemo } from 'react'
import { Vector3 } from 'three'

import { getRandomInRange, getRandomVertorByOri } from '../utils/random'

const CLOUD_COLORS = ['#21373d', '#535657']

export type UseCloudsProps = {
  count: number
}

export type Cloud = {
  radius: number
  startpoint: Vector3
  opacity: number
  color: string
}

export const useClouds = ({ count }: UseCloudsProps = { count: 10 }) => {
  const clouds = useMemo(() => {
    return new Array(count).fill(0).map(() => {
      return {
        radius: Math.random() * 3,
        startpoint: getRandomVertorByOri('top').add(new Vector3(0, 4, 0)),
        opacity: Math.random(),
        color: getRandomInRange(CLOUD_COLORS),
      } as Cloud
    })
  }, [count])
  return {
    clouds,
  }
}

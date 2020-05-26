import { useMemo, useRef } from 'react'
import { Vector3, CatmullRomCurve3, Mesh } from 'three'
import { useFrame } from 'react-three-fiber'

import { getRandomPoint } from '../utils/random'

const WIND_COLORS = ['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']

type UseWindsProps = {
  count: number
}

export type WindBlade = {
  color: string
  lineWidth: number
  speed: number
  opacity: number
  vertices: Vector3[]
}

export const useWinds = ({ count = 100 }: UseWindsProps = { count: 100 }) => {
  const lines = useMemo(
    () =>
      Array(count)
        .fill(0)
        .map(() => {
          const pos = new Vector3(
            10 - Math.random() * 20,
            10 - Math.random() * 20,
            10 - Math.random() * 20,
          )
          const points = new Array(30)
            .fill(0)
            .map(() =>
              pos.add(new Vector3(getRandomPoint(0), getRandomPoint(1), getRandomPoint(2))).clone(),
            )
          const vertices = new CatmullRomCurve3(points).getPoints(1000)
          return {
            color: WIND_COLORS[parseInt((WIND_COLORS.length * Math.random()).toString())],
            lineWidth: Math.max(0.1, 0.5 * Math.random()),
            speed: Math.max(0.001, 0.0005 * Math.random()),
            opacity: Math.random(),
            vertices,
          } as WindBlade
        }),
    [count],
  )
  return {
    lines,
  }
}

export type UseWindProps = {
  value: WindBlade
}

export const useWind = (
  wind: React.MutableRefObject<Mesh | undefined>,
  mat: React.MutableRefObject<any>,
  { value }: UseWindProps,
) => {
  const dir = useRef(-1)
  useFrame(() => {
    if (!mat.current) {
      return
    }
    mat.current.uniforms.dashOffset.value -= value.speed
    if (mat.current.uniforms.opacity.value <= 0) {
      wind.current?.position.set(getRandomPoint(0), getRandomPoint(1), getRandomPoint(2))
      mat.current.uniforms.opacity.value += value.speed * 10
      dir.current = 1
    } else if (mat.current.uniforms.opacity.value >= 1) {
      mat.current.uniforms.opacity.value -= value.speed * 10
      dir.current = -1
    } else {
      mat.current.uniforms.opacity.value += dir.current * value.speed * 10
    }
  })
}

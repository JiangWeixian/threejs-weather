import { useMemo, useRef } from 'react'
import { Vector3, Mesh } from 'three'
import { useFrame } from 'react-three-fiber'

import { getRandomVertorByOri, getRandomInRange, DIRS } from '../utils/random'
import { computeBoundingbox } from '../utils/element'
import { getCoord } from '../utils/scene'

export type Snowflake = {
  startpoint: Vector3
  radius: number
}

type UseSnowflakesProps = {
  count: number
}

export const useSnowflakes = ({ count = 100 }: UseSnowflakesProps = { count: 100 }) => {
  const snowflakes = useMemo(() => {
    const coord = getCoord()
    return new Array(4).fill(0).reduce((prev, _cur, i) => {
      return prev.concat(
        new Array(Math.round(count / 4)).fill(0).map(() => {
          const vertor = getRandomVertorByOri('top', { noise: true })
          return {
            startpoint: new Vector3().copy(new Vector3(0, coord[1] + i * 2, 0)).add(vertor),
            radius: Math.random() * 0.1,
          }
        }),
      )
    }, [])
  }, [])
  return {
    snowflakes: snowflakes as Snowflake[],
  }
}

type UseSnowflakeProps = {
  value: Snowflake
}

export const useSnowflake = (
  flake: React.MutableRefObject<Mesh | undefined>,
  { value }: UseSnowflakeProps,
) => {
  const vy0 = useRef(0.01)
  const coord = useRef(getCoord()).current
  // vy0 / vx0 = tan(angle)
  const vx0 = useRef(0.001 * Math.random() * getRandomInRange(DIRS))
  // const a = useRef(0.00001)
  const { offsetTop } = computeBoundingbox(value.startpoint)
  useFrame(() => {
    if (!flake.current) {
      return
    }
    // 雪花加速下落
    flake.current.position.y -= vy0.current
    flake.current.position.x -= vx0.current
    // 判断是否出了边界
    if (offsetTop + Math.abs(value.startpoint.y - flake.current.position.y) > coord[1] * 2) {
      const vertor = getRandomVertorByOri('top')
      // 随机raindrop初始位置, 避免loop重复
      flake.current.position.set(vertor.x, vertor.y + coord[1], vertor.z)
      vy0.current = 0.01
      vx0.current = 0.001 * Math.random() * getRandomInRange(DIRS)
    }
  })
}

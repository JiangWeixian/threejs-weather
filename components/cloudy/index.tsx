import React, { useRef } from 'react'

import { useClouds, UseCloudsProps, Cloud } from './use-cloud'
import { useFrame } from 'react-three-fiber'
import { Mesh } from 'three'
import { getRandomInRange, DIRS } from '../utils/random'

type CloudyProps = UseCloudsProps

export const DarkCloud = ({ value }: { value: Cloud }) => {
  const cloud = useRef<Mesh>()
  const dir = useRef(1)
  const speed = useRef(Math.random() * 0.001 * getRandomInRange(DIRS))
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
      speed.current = Math.random() * 0.001 * getRandomInRange(DIRS)
    } else if (distance.current >= 0.1) {
      dir.current = -dir.current
      speed.current = Math.random() * 0.001 * getRandomInRange(DIRS)
    }
  })
  return (
    <mesh ref={cloud} position={value.startpoint}>
      <circleBufferGeometry attach="geometry" args={[value.radius, 128]} />
      <meshBasicMaterial
        attach="material"
        transparent={true}
        opacity={value.opacity}
        color={value.color}
      />
    </mesh>
  )
}

const Cloudy = (props: CloudyProps) => {
  const { clouds } = useClouds(props)
  return (
    <>
      {clouds.map((cloud, index) => {
        return <DarkCloud key={index} value={cloud} />
      })}
    </>
  )
}

export default Cloudy

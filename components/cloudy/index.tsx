import React, { useRef, useState } from 'react'

import { useClouds, UseCloudsProps, Cloud } from './use-cloud'
import { useFrame } from 'react-three-fiber'
import { Mesh } from 'three'
import { getRandomInRange, DIRS } from '../utils/random'

type CloudyProps = UseCloudsProps

export const DarkCloud = ({ value }: { value: Cloud }) => {
  const cloud = useRef<Mesh>()
  const [dir, setDir] = useState(1)
  const speed = useRef(Math.random() * 0.001 * getRandomInRange(DIRS))
  const distance = useRef(0)
  useFrame(() => {
    if (!cloud.current) {
      return
    }
    distance.current += 0.001 * dir
    cloud.current.position.x += speed.current * dir
    cloud.current.position.y -= speed.current * dir
    if (distance.current <= 0) {
      setDir(1)
    } else if (distance.current >= 0.1) {
      setDir(-1)
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
      {clouds.map((cloud) => {
        return <DarkCloud value={cloud} />
      })}
    </>
  )
}

export default Cloudy

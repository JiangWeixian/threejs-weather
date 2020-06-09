import React, { useRef } from 'react'
import { Group, Mesh } from 'three'
import { useFrame } from 'react-three-fiber'

import { useSun, UseSunProps, Halo } from './use-sun'
import { inRange, DIRS } from '../utils/random'

export const SKY_COLOR = '#faf4e8'

type SunProps = UseSunProps

const SunHalo = ({ value }: { value: Halo }) => {
  const dir = useRef(1)
  const speed = useRef(Math.random() * 0.0001 * inRange(DIRS))
  const halo = useRef<Mesh>()
  useFrame(() => {
    if (!halo.current) {
      return
    }
    if (halo.current.scale.x <= 0.9) {
      dir.current = -dir.current
    } else if (halo.current.scale.x >= 1.1) {
      dir.current = -dir.current
    }
    halo.current.scale.x += speed.current * dir.current
    halo.current.scale.y += speed.current * dir.current
  })
  return (
    <mesh ref={halo} position={value.startpoint}>
      <circleGeometry attach="geometry" args={[value.radius, 128]} />
      <meshBasicMaterial attach="material" color={value.color} />
    </mesh>
  )
}

const Sun = (props: SunProps) => {
  const sun = useRef<Group>()
  const { halos, startpoint } = useSun(props)
  return (
    <group ref={sun} position={startpoint}>
      {halos.map((halo, index) => {
        return <SunHalo key={index} value={halo} />
      })}
    </group>
  )
}

export default Sun

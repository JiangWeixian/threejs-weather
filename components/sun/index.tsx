import React, { useRef } from 'react'
import { Group, Mesh } from 'three'
import { useFrame } from '@react-three/fiber'
import { a } from '@react-spring/three'

import { useSun, UseSunProps, Halo } from './use-sun'
import { inRange } from '../utils/random'
import { DIRS } from '../utils/constants'
import { Style } from '../interface'

type SunProps = UseSunProps & {
  style?: Style
}

type HaloProps = {
  value: Halo
  style?: Style
}

const SunHalo = ({ value, style }: HaloProps) => {
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
    <a.mesh ref={halo} material-opacity={style?.opacity} position={value.startpoint}>
      <circleGeometry attach="geometry" args={[value.radius, 128]} />
      <meshBasicMaterial attach="material" transparent={true} color={value.color} />
    </a.mesh>
  )
}

const Sun = (props: SunProps) => {
  const sun = useRef<Group>()
  const { halos, startpoint } = useSun(props)
  return (
    <a.group scale={props.style?.scale as any} ref={sun} position={startpoint}>
      {halos.map((halo, index) => {
        return <SunHalo key={index} value={halo} style={props.style} />
      })}
    </a.group>
  )
}

export default Sun

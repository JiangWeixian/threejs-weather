import { Mesh } from 'three'
import React, { useRef } from 'react'

import { useRainRing, useRainRings, UseRainRingsProps, Ring } from './use-rain-ring'
import { Style } from '../interface'

type RainRingProps = {
  value: Ring
  style?: Style
}

export const RainRing = ({ value, style }: RainRingProps) => {
  const mesh = useRef<Mesh>()
  useRainRing(mesh, { style })
  return (
    <mesh ref={mesh} scale={[0, 0, 0]} position={value.startpoint}>
      <circleGeometry attach="geometry" args={[value.radius, 128]} />
      <meshBasicMaterial attach="material" opacity={0.2} transparent={true} color="white" />
    </mesh>
  )
}

type RainRingsProps = UseRainRingsProps & {
  style?: Style
}

const RainRings = (props: RainRingsProps) => {
  const { rings } = useRainRings(props)
  return (
    <>
      {rings.map((ring, index) => {
        return <RainRing key={index} value={ring} style={props.style} />
      })}
    </>
  )
}

export default RainRings

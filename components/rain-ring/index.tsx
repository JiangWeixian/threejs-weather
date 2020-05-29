import { Mesh } from 'three'
import React, { useRef } from 'react'
import { useRainRing, useRainRings, UseRainRingsProps, Ring } from './use-rain-ring'

export const RainRing = ({ value }: { value: Ring }) => {
  const mesh = useRef<Mesh>()
  useRainRing(mesh)
  return (
    <mesh ref={mesh} scale={[0, 0, 0]} position={value.startpoint}>
      <circleGeometry attach="geometry" args={[value.radius, 128]} />
      <meshBasicMaterial attach="material" opacity={0.2} transparent={true} color="white" />
    </mesh>
  )
}

type RainRingsProps = UseRainRingsProps

const RainRings = (props: RainRingsProps) => {
  const { rings } = useRainRings(props)
  return (
    <>
      {rings.map((r) => {
        return <RainRing value={r} />
      })}
    </>
  )
}

export default RainRings

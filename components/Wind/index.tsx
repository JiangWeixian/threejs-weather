import React, { useRef } from 'react'
import { Mesh } from 'three'

import { useWinds, useWind, WindBlade } from './use-wind'

const WindBlade = ({ value }: { value: WindBlade }) => {
  const material = useRef<any>()
  const wind = useRef<Mesh>()
  useWind(wind, material, { value })
  return (
    <mesh ref={wind}>
      <meshLine attach="geometry" vertices={value.vertices} />
      <meshLineMaterial
        attach="material"
        ref={material}
        transparent={true}
        depthTest={false}
        dashArray={0.1}
        lineWidth={value.lineWidth}
        color={value.color}
        dashRatio={0.9}
        opacity={value.opacity}
      />
    </mesh>
  )
}

const Wind = () => {
  const { lines } = useWinds()
  return (
    <>
      {lines.map((wind, index) => (
        <WindBlade key={index} value={wind} />
      ))}
    </>
  )
}

export default Wind

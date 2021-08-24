import { useRain, useRaindrop, UseRaindropProps, UseRainProps } from './use-rain'

import React, { useRef } from 'react'
import { Mesh } from 'three'
import { extend } from '@react-three/fiber'
import * as meshline from 'threejs-meshline'
extend(meshline)

export const Raindrop = (props: UseRaindropProps) => {
  const raindrop = useRef<Mesh>()
  const mat = useRef<any>()
  useRaindrop(raindrop, mat, { value: props.value })
  return (
    <>
      <mesh ref={raindrop}>
        <meshLine attach="geometry" vertices={props.value.vertices} />
        <meshLineMaterial
          attach="material"
          ref={mat}
          transparent={true}
          depthTest={false}
          sizeAttenuation={true}
          lineWidth={0.01}
          opacity={0}
          color={props.value.color}
        />
      </mesh>
    </>
  )
}

type RainProps = UseRainProps & {}

const Rain = (props: RainProps) => {
  const { lines } = useRain(props)
  return (
    <>
      {lines.map((raindrop, index) => {
        return <Raindrop key={index} value={raindrop} />
      })}
    </>
  )
}

export default Rain

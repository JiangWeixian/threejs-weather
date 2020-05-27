import React, { useRef } from 'react'
import { useRain, useRaindrop, UseRaindropProps } from './use-rain'
import { Mesh } from 'three'

export const SKY_COLOR = '#1677b3'

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

const Rain = () => {
  const { lines } = useRain({ count: 200 })
  return (
    <>
      {lines.map((v) => {
        return <Raindrop value={v} />
      })}
    </>
  )
}

export default Rain

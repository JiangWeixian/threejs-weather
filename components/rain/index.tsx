import { useRain, useRaindrop, UseRaindropProps, UseRainProps } from './use-rain'
import { Style } from '../interface'

import React, { useRef } from 'react'
import { a } from '@react-spring/three'
import { Mesh } from 'three'
import { extend } from '@react-three/fiber'
import { MeshLine, MeshLineMaterial } from 'three.meshline'

extend({ MeshLine, MeshLineMaterial })

export const Raindrop = (props: UseRaindropProps) => {
  const raindrop = useRef<Mesh>()
  const mat = useRef<any>()
  useRaindrop(raindrop, mat, { value: props.value, style: props.style })
  return (
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
  )
}

type RainProps = UseRainProps & {
  style?: Style
}

const Rain = (props: RainProps) => {
  const { lines } = useRain(props)
  return (
    <a.group>
      {lines.map((raindrop, index) => {
        return <Raindrop key={index} value={raindrop} style={props.style} />
      })}
    </a.group>
  )
}

export default Rain

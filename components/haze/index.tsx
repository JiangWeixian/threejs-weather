import React, { useRef } from 'react'
import { extend } from '@react-three/fiber'
import { Mesh } from 'three'
import * as meshline from 'threejs-meshline'
import { a } from '@react-spring/three'

import { useHazeDrop, UseHazeDropProps, UseHazeProps, useHaze } from './use-haze'
import { Style } from '../interface'
extend(meshline)

export const Haze = (
  props: UseHazeDropProps & {
    style?: Style
  },
) => {
  const haze = useRef<Mesh>()
  const mat = useRef<any>()
  useHazeDrop(haze, mat, { value: props.value })
  return (
    <a.mesh ref={haze} material-opacity={props.style?.opacity.to((x) => x * props.value.opacity)}>
      <meshLine attach="geometry" vertices={props.value.vertices} />
      <meshLineMaterial
        attach="material"
        ref={mat}
        transparent={true}
        depthTest={false}
        sizeAttenuation={true}
        lineWidth={0.01}
        dashArray={props.value.dashArray}
        dashRatio={0.8}
        color={props.value.color}
      />
    </a.mesh>
  )
}

type HazeProps = UseHazeProps & {
  style?: Style
}

const Hazes = (props: HazeProps) => {
  const { lines } = useHaze(props)
  return (
    <a.group>
      {lines.map((haze, index) => {
        return <Haze key={index} value={haze} style={props.style} />
      })}
    </a.group>
  )
}

export default Hazes

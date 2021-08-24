import React, { useRef } from 'react'
import { extend } from '@react-three/fiber'
import { Mesh } from 'three'
import * as meshline from 'threejs-meshline'

import { useHazeDrop, UseHazeDropProps, UseHazeProps, useHaze } from './use-haze'
extend(meshline)

export const Haze = (props: UseHazeDropProps) => {
  const haze = useRef<Mesh>()
  const mat = useRef<any>()
  useHazeDrop(haze, mat, { value: props.value })
  return (
    <>
      <mesh ref={haze}>
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
          opacity={props.value.opacity}
          color={props.value.color}
        />
      </mesh>
    </>
  )
}

type HazeProps = UseHazeProps & {}

const Hazes = (props: HazeProps) => {
  const { lines } = useHaze(props)
  return (
    <>
      {lines.map((haze, index) => {
        return <Haze key={index} value={haze} />
      })}
    </>
  )
}

export default Hazes

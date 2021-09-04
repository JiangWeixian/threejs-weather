import { useStarRings, Ring, useRing, UseStarRingsProps } from './use-starrings'
import React, { useRef } from 'react'
import { extend } from '@react-three/fiber'
import { a } from '@react-spring/three'

import * as meshline from 'threejs-meshline'
import { Style } from '../interface'

extend(meshline)

type RingProps = {
  value: Ring
  style?: Style
}

const Ring = ({ value, style }: RingProps) => {
  const ring = useRef<any>()
  useRing(ring)
  return (
    <a.mesh material-opacity={style?.opacity.to((x) => x * value.opacity)}>
      <meshLine attach="geometry" vertices={value.vertices} />
      <meshLineMaterial
        ref={ring}
        attach="material"
        transparent={true}
        depthTest={false}
        sizeAttenuation={true}
        dashArray={value.dashArray}
        dashRatio={0.2}
        lineWidth={value.lineWidth}
        color={value.color}
      />
    </a.mesh>
  )
}

type StarRingsProps = UseStarRingsProps & {
  style?: Style
}

const StarRings = (props: StarRingsProps) => {
  const { rings, startpoint } = useStarRings(props)
  return (
    <a.group position={startpoint}>
      {rings.map((ring, index) => {
        return <Ring key={index} value={ring} style={props.style} />
      })}
    </a.group>
  )
}

export default StarRings

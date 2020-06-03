import React, { useRef } from 'react'

import { useStarRings, Ring, useRing, UseStarRingsProps } from './use-starrings'

const Ring = ({ value }: { value: Ring }) => {
  const ring = useRef<any>()
  useRing(ring)
  return (
    <mesh>
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
        opacity={value.opacity}
        color={value.color}
      />
    </mesh>
  )
}

type StarRingsProps = UseStarRingsProps & {}

const StarRings = (props: StarRingsProps) => {
  const { rings } = useStarRings(props)
  return (
    <>
      {rings.map((ring, index) => {
        return <Ring key={index} value={ring} />
      })}
    </>
  )
}

export default StarRings

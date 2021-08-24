import React, { useRef } from 'react'
import { Mesh } from 'three'
import { extend } from '@react-three/fiber'
import * as meshline from 'threejs-meshline'

import { useMeteors, Meteor, useMeteor, UseMeteorsProps } from './use-meteors'
extend(meshline)

const Meteor = ({ value }: { value: Meteor }) => {
  const meteor = useRef<Mesh>()
  const mat = useRef<any>()
  useMeteor(meteor, mat, { value })
  return (
    <mesh ref={meteor}>
      <meshLine attach="geometry" vertices={value.vertices} />
      <meshLineMaterial
        attach="material"
        ref={mat}
        transparent={true}
        depthTest={false}
        sizeAttenuation={true}
        lineWidth={0.02}
        dashArray={0.5}
        dashRatio={0.7}
        opacity={0.75}
        color={value.color}
      />
    </mesh>
  )
}

type MeteorsProps = UseMeteorsProps & {}

const Meteors = (props: MeteorsProps) => {
  const { meteors } = useMeteors(props)
  return (
    <>
      {meteors.map((meteor, index) => {
        return <Meteor key={index} value={meteor} />
      })}
    </>
  )
}

export default Meteors

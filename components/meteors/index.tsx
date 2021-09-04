import React, { useRef } from 'react'
import { Mesh } from 'three'
import { extend } from '@react-three/fiber'
import { a } from '@react-spring/three'
import * as meshline from 'threejs-meshline'

import { useMeteors, Meteor, useMeteor, UseMeteorsProps } from './use-meteors'
import { Style } from '../interface'
extend(meshline)

type MeteorProps = {
  value: Meteor
  style?: Style
}

const Meteor = ({ value, style }: MeteorProps) => {
  const meteor = useRef<Mesh>()
  const mat = useRef<any>()
  useMeteor(meteor, mat, { value })
  return (
    <a.mesh ref={meteor} material-opacity={style?.opacity.to((x) => x * 0.75)}>
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
        color={value.color}
      />
    </a.mesh>
  )
}

type MeteorsProps = UseMeteorsProps & {
  style?: Style
}

const Meteors = (props: MeteorsProps) => {
  const { meteors } = useMeteors(props)
  return (
    <>
      {meteors.map((meteor, index) => {
        return <Meteor key={index} value={meteor} style={props.style} />
      })}
    </>
  )
}

export default Meteors

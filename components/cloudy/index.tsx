import React, { useRef } from 'react'
import { a } from '@react-spring/three'
import { Mesh } from 'three'

import { useClouds, UseCloudsProps, Cloud, useCloud } from './use-cloud'
import { Style } from '../interface'

type CloudyProps = UseCloudsProps & {
  style?: Style
}

type DarkCloudProps = {
  value: Cloud
  style?: Style
}

export const DarkCloud = ({ value, style }: DarkCloudProps) => {
  const cloud = useRef<Mesh>()
  useCloud(cloud)
  return (
    <a.mesh
      ref={cloud}
      material-opacity={style?.opacity.to((x) => x * value.opacity)}
      position={value.startpoint}
    >
      <circleBufferGeometry attach="geometry" args={[value.radius, 128]} />
      <meshBasicMaterial attach="material" transparent={true} color={value.color} />
    </a.mesh>
  )
}

const Cloudy = (props: CloudyProps) => {
  const { clouds } = useClouds(props)
  const pY = props.style?.opacity.to([0, 1], [2, 0])
  return (
    <a.group position-y={pY}>
      {clouds.map((cloud, index) => {
        return <DarkCloud key={index} value={cloud} style={props.style} />
      })}
    </a.group>
  )
}

export default Cloudy

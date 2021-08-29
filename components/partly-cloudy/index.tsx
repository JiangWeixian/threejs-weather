import React, { useRef } from 'react'
import { Mesh } from 'three'
import { a } from '@react-spring/three'

import { usePartlyClouds, UsePartlyCloudProps, Cloud, usePartlyCloud } from './use-partly-cloud'
import { Style } from '../interface'

type CloudyProps = UsePartlyCloudProps
type WhiteCloudProps = {
  value: Cloud
  style?: Style
}

export const WhiteCloud = ({ value, style }: WhiteCloudProps) => {
  const cloud = useRef<Mesh>()
  usePartlyCloud(cloud)
  return (
    <a.mesh
      material-opacity={style?.opacity.to((x) => x * value.opacity)}
      ref={cloud}
      position={value.startpoint}
    >
      <circleBufferGeometry attach="geometry" args={[value.radius, 128]} />
      <meshBasicMaterial attach="material" transparent={true} color={value.color} />
    </a.mesh>
  )
}

const PartlyCloudy = (props: CloudyProps & Pick<WhiteCloudProps, 'style'>) => {
  const { clouds } = usePartlyClouds(props)
  const pY = props.style?.opacity.to([0, 1], [2, 0])
  return (
    <a.group position-y={pY}>
      {clouds.map((cloud, index) => {
        return <WhiteCloud key={index} value={cloud} style={props.style} />
      })}
    </a.group>
  )
}

export default PartlyCloudy

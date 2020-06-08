import React, { useRef } from 'react'

import { usePartlyClouds, UsePartlyCloudProps, Cloud, usePartlyCloud } from './use-partly-cloud'
import { Mesh } from 'three'

type CloudyProps = UsePartlyCloudProps

export const WhiteCloud = ({ value }: { value: Cloud }) => {
  const cloud = useRef<Mesh>()
  usePartlyCloud(cloud)
  return (
    <mesh ref={cloud} position={value.startpoint}>
      <circleBufferGeometry attach="geometry" args={[value.radius, 128]} />
      <meshBasicMaterial
        attach="material"
        transparent={true}
        opacity={value.opacity}
        color={value.color}
      />
    </mesh>
  )
}

const PartlyCloudy = (props: CloudyProps) => {
  const { clouds } = usePartlyClouds(props)
  return (
    <>
      {clouds.map((cloud, index) => {
        return <WhiteCloud key={index} value={cloud} />
      })}
    </>
  )
}

export default PartlyCloudy

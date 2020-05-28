import React from 'react'

import { useClouds, UseCloudsProps } from './use-cloud'

type CloudyProps = UseCloudsProps

const Cloudy = (props: CloudyProps) => {
  const { clouds } = useClouds(props)
  return (
    <>
      {clouds.map((cloud) => {
        return (
          <mesh position={cloud.startpoint}>
            <circleBufferGeometry attach="geometry" args={[cloud.radius, 128]} />
            <meshBasicMaterial
              attach="material"
              transparent={true}
              opacity={cloud.opacity}
              color={cloud.color}
            />
          </mesh>
        )
      })}
    </>
  )
}

export default Cloudy

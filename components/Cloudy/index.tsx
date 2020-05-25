import React from 'react'

import { useClouds } from './use-cloud'

const Cloudy = () => {
  const { clouds } = useClouds()
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

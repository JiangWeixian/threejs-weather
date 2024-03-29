import React, { Suspense } from 'react'
import { Stats } from '@react-three/drei'
import { Vector3 } from 'three'

import { Fog } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

const position = [127.45293777867074, 62.11080512264083, 137.6247069251716]

const FogPage = (props) => {
  return (
    <>
      <Suspense fallback="loading...">
        <WeatherText
          position={new Vector3(...position).multiplyScalar(0.9)}
          color="#f1f0ed"
          style={props.style}
        >
          {PATHS.fog.name}
        </WeatherText>
      </Suspense>
      <Stats />
      <Fog style={props.style} p={props.p} />
    </>
  )
}

export default FogPage

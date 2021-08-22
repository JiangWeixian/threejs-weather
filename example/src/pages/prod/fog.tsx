import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Vector3 } from 'three'

import { Fog } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

const position = [127.45293777867074, 62.11080512264083, 137.6247069251716]

const FogPage = () => {
  return (
    <>
      <Canvas shadows={true} dpr={window.devicePixelRatio} style={{ background: '#000' }}>
        <Suspense fallback="loading...">
          <WeatherText position={new Vector3(...position).multiplyScalar(0.9)} color="#f1f0ed">
            {PATHS.fog.name}
          </WeatherText>
        </Suspense>
        <Stats />
        <Fog />
      </Canvas>
    </>
  )
}

export default FogPage

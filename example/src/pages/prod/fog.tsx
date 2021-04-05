import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { Stats } from 'drei'
import { Controls } from 'react-three-gui'
import { Vector3, PCFSoftShadowMap } from 'three'

import { Fog } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

const position = [127.45293777867074, 62.11080512264083, 137.6247069251716]

const FogPage = () => {
  return (
    <>
      <Canvas
        pixelRatio={window.devicePixelRatio}
        style={{ background: '#000' }}
        shadowMap={{ enabled: true, type: PCFSoftShadowMap }}
      >
        <Suspense fallback="loading...">
          <WeatherText position={new Vector3(...position).multiplyScalar(0.9)} color="#f1f0ed">
            {PATHS.fog.name}
          </WeatherText>
        </Suspense>
        <Stats />
        <Fog />
      </Canvas>
      <Controls />
    </>
  )
}

export default FogPage

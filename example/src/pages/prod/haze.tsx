import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { Stats } from 'drei'
import { Controls, useControl } from 'react-three-gui'
import { Vector3, PCFSoftShadowMap } from 'three'

import { WeatherText } from '@/components/WeatherText'
import Hazes from '../../../../components/haze'
import { PATHS } from '@/constants'

const position = [127.45293777867074, 62.11080512264083, 137.6247069251716]

const HazePage = () => {
  const count = useControl('count', { type: 'number', max: 100, min: 10, value: 10 })
  const angle = useControl('angle', { type: 'number', max: 45, min: -45, value: 30 })
  return (
    <>
      <Canvas
        pixelRatio={window.devicePixelRatio}
        style={{ background: '#000' }}
        shadowMap={{ enabled: true, type: PCFSoftShadowMap }}
      >
        <Suspense fallback="loading...">
          <WeatherText position={new Vector3(...position).multiplyScalar(0.9)} color="#f1f0ed">
            {PATHS.haze.name}
          </WeatherText>
        </Suspense>
        <Stats />
        <Hazes count={Math.floor(count)} angle={angle} />
      </Canvas>
      <Controls />
    </>
  )
}

export default HazePage

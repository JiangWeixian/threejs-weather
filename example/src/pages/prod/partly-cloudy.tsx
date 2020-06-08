import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { PartlyCloudy } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'

extend(meshline)

const CloudyPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#1677b3' }}>
      <PartlyCloudy />
      <Suspense fallback="loading...">
        <WeatherText color="#f1f0ed">多云</WeatherText>
      </Suspense>
    </Canvas>
  )
}

export default CloudyPage

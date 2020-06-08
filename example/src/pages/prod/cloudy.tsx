import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import { Stats } from 'drei'
import * as meshline from 'threejs-meshline'

import { Cloudy } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'

extend(meshline)

const CloudyPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#3C4245' }}>
      <Stats />
      <Cloudy />
      <Stats />
      <Suspense fallback="loading...">
        <WeatherText color="#f1f0ed">阴</WeatherText>
      </Suspense>
    </Canvas>
  )
}

export default CloudyPage

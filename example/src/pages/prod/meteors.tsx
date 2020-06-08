import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import { Stats } from 'drei'
import * as meshline from 'threejs-meshline'

import { Meteors } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'

extend(meshline)

const SnowPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#0F203B' }}>
      <Stats />
      <Meteors />
      <Suspense fallback="loading...">
        <WeatherText color="#f1f0ed">流星</WeatherText>
      </Suspense>
    </Canvas>
  )
}

export default SnowPage

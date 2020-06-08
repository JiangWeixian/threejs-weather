import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import { Stats } from 'drei'
import * as meshline from 'threejs-meshline'

import { Sun } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'

extend(meshline)

const SunPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#faf4e8' }}>
      <Sun />
      <Suspense fallback="loading...">
        <WeatherText>晴</WeatherText>
      </Suspense>
    </Canvas>
  )
}

export default SunPage

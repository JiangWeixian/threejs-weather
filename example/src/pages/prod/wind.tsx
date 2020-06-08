import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import { Stats } from 'drei'
import * as meshline from 'threejs-meshline'

import { Wind } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'

extend(meshline)

const WindPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: 'white' }}>
      <Wind />
      <Suspense fallback="loading...">
        <WeatherText>风</WeatherText>
      </Suspense>
    </Canvas>
  )
}

export default WindPage

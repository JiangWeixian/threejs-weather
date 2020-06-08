import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import { Stats } from 'drei'
import * as meshline from 'threejs-meshline'

import { StarRings } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'

extend(meshline)

const StarRingsPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#0F203B' }}>
      <Stats />
      <StarRings />
      <Suspense fallback="loading...">
        <WeatherText color="#f1f0ed">星夜</WeatherText>
      </Suspense>
    </Canvas>
  )
}

export default StarRingsPage

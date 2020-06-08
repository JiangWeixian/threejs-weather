import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import { Stats } from 'drei'
import * as meshline from 'threejs-meshline'

import { OrbitControls } from 'drei'
import { Rain, RainRing } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'

extend(meshline)

const RainPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#1677b3' }}>
      <OrbitControls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <Stats />
      <Rain count={300} />
      <RainRing />
      <Suspense fallback="loading...">
        <WeatherText color="#f1f0ed">雨</WeatherText>
      </Suspense>
    </Canvas>
  )
}

export default RainPage

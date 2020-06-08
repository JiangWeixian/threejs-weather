import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import { Stats } from 'drei'
import * as meshline from 'threejs-meshline'
import { Controls, useControl } from 'react-three-gui'

import { StarRings } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'

extend(meshline)

const StarRingsPage = () => {
  const count = useControl('count', { type: 'number', max: 30, min: 10, value: 10 })
  return (
    <>
      <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#0F203B' }}>
        <Stats />
        <StarRings count={Math.floor(count)} />
        <Suspense fallback="loading...">
          <WeatherText color="#f1f0ed">星夜</WeatherText>
        </Suspense>
      </Canvas>
      <Controls />
    </>
  )
}

export default StarRingsPage

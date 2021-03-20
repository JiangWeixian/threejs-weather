import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import { Stats } from 'drei'
import { Controls, useControl } from 'react-three-gui'
import * as meshline from 'threejs-meshline'

import { Meteors } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

extend(meshline)

const MeteorsPage = () => {
  const count = useControl('count', { type: 'number', max: 100, min: 10, value: 10 })
  const angle = useControl('angle', { type: 'number', max: 45, min: -45, value: 30 })
  return (
    <>
      <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#0F203B' }}>
        <Stats />
        <Meteors count={Math.floor(count)} angle={angle} />
        <Suspense fallback="loading...">
          <WeatherText color="#f1f0ed">{PATHS.metetors.name}</WeatherText>
        </Suspense>
      </Canvas>
      <Controls />
    </>
  )
}

export default MeteorsPage

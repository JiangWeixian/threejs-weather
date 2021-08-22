import React, { Suspense } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Controls, useControl } from 'react-three-gui'
import * as meshline from 'threejs-meshline'

import { Snow } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

extend(meshline)

const SnowPage = () => {
  const count = useControl('count', { type: 'number', max: 100, min: 10, value: 10 })
  return (
    <>
      <Canvas style={{ backgroundColor: '#1677b3' }}>
        <Stats />
        <Snow count={Math.floor(count)} />
        <Suspense fallback="loading...">
          <WeatherText color="#f1f0ed">{PATHS.snow.name}</WeatherText>
        </Suspense>
      </Canvas>
      <Controls />
    </>
  )
}

export default SnowPage

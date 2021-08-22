import React, { Suspense } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import * as meshline from 'threejs-meshline'
import { Controls, useControl } from 'react-three-gui'

import { Sun } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

extend(meshline)

const SunPage = () => {
  const count = useControl('count', { type: 'number', max: 6, min: 1, value: 6 })
  return (
    <>
      <Canvas style={{ backgroundColor: '#faf4e8' }}>
        <Stats />
        <Sun count={Math.floor(count)} />
        <Suspense fallback="loading...">
          <WeatherText>{PATHS.sun.name}</WeatherText>
        </Suspense>
      </Canvas>
      <Controls />
    </>
  )
}

export default SunPage

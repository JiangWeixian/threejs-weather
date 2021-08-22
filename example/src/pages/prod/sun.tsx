import React, { Suspense } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import * as meshline from 'threejs-meshline'
import { useControls, Leva } from 'leva'

import { Sun } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

extend(meshline)

const SunPage = () => {
  const { count } = useControls({
    count: {
      value: 6,
      max: 6,
      min: 1,
    },
  })
  return (
    <>
      <Canvas dpr={window.devicePixelRatio} style={{ backgroundColor: '#faf4e8' }}>
        <Stats />
        <Sun count={Math.floor(count)} />
        <Suspense fallback="loading...">
          <WeatherText>{PATHS.sun.name}</WeatherText>
        </Suspense>
      </Canvas>
      <Leva />
    </>
  )
}

export default SunPage

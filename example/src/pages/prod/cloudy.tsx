import React, { Suspense } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { useControls, Leva } from 'leva'
import * as meshline from 'threejs-meshline'

import { Cloudy } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

extend(meshline)

const CloudyPage = () => {
  const { count } = useControls({
    count: {
      value: 100,
      max: 300,
      min: 10,
    },
  })
  return (
    <>
      <Canvas dpr={window.devicePixelRatio} style={{ backgroundColor: '#3C4245' }}>
        <Stats />
        <Cloudy count={Math.floor(count)} />
        <Stats />
        <Suspense fallback="loading...">
          <WeatherText color="#f1f0ed">{PATHS.cloudy.name}</WeatherText>
        </Suspense>
      </Canvas>
      <Leva />
    </>
  )
}

export default CloudyPage

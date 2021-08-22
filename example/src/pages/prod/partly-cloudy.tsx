import React, { Suspense } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { useControls, Leva } from 'leva'

import * as meshline from 'threejs-meshline'

import { PartlyCloudy } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

extend(meshline)

const PartlyCloudyPage = () => {
  const { count } = useControls({
    count: {
      value: 10,
      max: 300,
      min: 10,
    },
  })
  return (
    <>
      <Canvas dpr={window.devicePixelRatio} style={{ backgroundColor: '#1677b3' }}>
        <Stats />
        <PartlyCloudy count={Math.floor(count)} />
        <Stats />
        <Suspense fallback="loading...">
          <WeatherText color="#f1f0ed">{PATHS.partlyCloudy.name}</WeatherText>
        </Suspense>
      </Canvas>
      <Leva />
    </>
  )
}

export default PartlyCloudyPage

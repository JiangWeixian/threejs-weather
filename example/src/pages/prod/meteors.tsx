import React, { Suspense } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { useControls, Leva } from 'leva'
import * as meshline from 'threejs-meshline'

import { Meteors } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

extend(meshline)

const MeteorsPage = () => {
  const { count, angle } = useControls({
    count: {
      value: 10,
      max: 300,
      min: 10,
    },
    angle: {
      value: 30,
      max: 45,
      min: -45,
    },
  })
  return (
    <>
      <Canvas dpr={window.devicePixelRatio} style={{ backgroundColor: '#0F203B' }}>
        <Stats />
        <Meteors count={Math.floor(count)} angle={angle} />
        <Suspense fallback="loading...">
          <WeatherText color="#f1f0ed">{PATHS.metetors.name}</WeatherText>
        </Suspense>
      </Canvas>
      <Leva />
    </>
  )
}

export default MeteorsPage

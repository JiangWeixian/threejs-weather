import React, { Suspense } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import { useControls, Leva } from 'leva'
import * as meshline from 'threejs-meshline'

import { Rain, RainRing, useTheme } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

extend(meshline)

const RainPage = () => {
  const { count } = useControls({
    count: {
      value: 100,
      max: 300,
      min: 10,
    },
  })
  const { bind } = useTheme({ type: 'rain', mode: 'day' })
  return (
    <>
      <Canvas {...bind()}>
        <OrbitControls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
        <Stats />
        <Rain />
        <RainRing count={Math.floor(count)} />
        <Suspense fallback="loading...">
          <WeatherText color="#f1f0ed">{PATHS.rain.name}</WeatherText>
        </Suspense>
      </Canvas>
      <Leva />
    </>
  )
}

export default RainPage

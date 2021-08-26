import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { useControls, Leva } from 'leva'

import { Meteors, useTheme } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

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
  const { bind } = useTheme({ type: 'meteors', mode: 'day' })
  return (
    <>
      <Canvas {...bind()}>
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

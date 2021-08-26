import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { useControls, Leva } from 'leva'
import { PartlyCloudy, useTheme } from 'threejs-weather'

import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

const PartlyCloudyPage = () => {
  const { count } = useControls({
    count: {
      value: 10,
      max: 300,
      min: 10,
    },
  })
  const { bind } = useTheme({ type: 'partly-cloudy', mode: 'day' })
  return (
    <>
      <Canvas {...bind()}>
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

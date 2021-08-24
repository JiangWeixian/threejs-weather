import React, { Suspense } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import { useControls, Leva } from 'leva'
import * as meshline from 'threejs-meshline'
import { Haze, useTheme } from 'threejs-weather'

import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

extend(meshline)

const HazePage = () => {
  const { count, angle } = useControls({
    count: {
      value: 100,
      max: 300,
      min: 10,
    },
    angle: {
      value: -45,
      max: 45,
      min: -45,
    },
  })
  const { bind } = useTheme({ type: 'haze', mode: 'day' })
  return (
    <>
      <Canvas {...bind()}>
        <OrbitControls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
        <Suspense fallback="loading...">
          <WeatherText color="#f1f0ed">{PATHS.haze.name}</WeatherText>
        </Suspense>
        <Stats />
        <Haze count={Math.floor(count)} angle={angle} />
      </Canvas>
      <Leva />
    </>
  )
}

export default HazePage

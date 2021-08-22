import React, { Suspense } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { useControls, Leva } from 'leva'

import * as meshline from 'threejs-meshline'

import { Snow } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

extend(meshline)

const SnowPage = () => {
  const { count } = useControls({
    count: {
      value: 100,
      max: 300,
      min: 10,
    },
  })
  return (
    <>
      <Canvas style={{ backgroundColor: '#1677b3' }}>
        <Stats />
        <Snow count={Math.floor(count)} />
        <Suspense fallback="loading...">
          <WeatherText color="#f1f0ed">{PATHS.snow.name}</WeatherText>
        </Suspense>
      </Canvas>
      <Leva />
    </>
  )
}

export default SnowPage

import React, { Suspense } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import * as meshline from 'threejs-meshline'
import { useControls, Leva } from 'leva'

import { StarRings } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

extend(meshline)

const StarRingsPage = () => {
  const { count } = useControls({
    count: {
      value: 100,
      max: 300,
      min: 10,
    }
  })
  return (
    <>
      <Canvas style={{ backgroundColor: '#0F203B' }}>
        <Stats />
        <StarRings count={Math.floor(count)} />
        <Suspense fallback="loading...">
          <WeatherText color="#f1f0ed">{PATHS.starRing.name}</WeatherText>
        </Suspense>
      </Canvas>
      <Leva />
    </>
  )
}

export default StarRingsPage

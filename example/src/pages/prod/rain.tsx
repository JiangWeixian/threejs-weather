import React, { Suspense } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'
// import { Controls, useControl } from 'react-three-gui'
import * as meshline from 'threejs-meshline'

import { Rain, RainRing } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

extend(meshline)

const RainPage = () => {
  // const count = useControl('count', { type: 'number', max: 300, min: 10, value: 100 })
  return (
    <>
      <Canvas style={{ backgroundColor: '#1677b3' }}>
        <OrbitControls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
        <Stats />
        <Rain />
        <RainRing />
        <Suspense fallback="loading...">
          <WeatherText color="#f1f0ed">{PATHS.rain.name}</WeatherText>
        </Suspense>
      </Canvas>
      {/* <Controls /> */}
    </>
  )
}

export default RainPage

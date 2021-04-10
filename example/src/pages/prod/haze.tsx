import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import { Stats, OrbitControls } from 'drei'
import { Controls, useControl } from 'react-three-gui'
import { PCFSoftShadowMap } from 'three'
import * as meshline from 'threejs-meshline'
import { Haze } from 'threejs-weather'

import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

extend(meshline)
export const SKY_COLOR = '#A2915E'

const HazePage = () => {
  const count = useControl('count', { type: 'number', max: 100, min: 10, value: 200 })
  const angle = useControl('angle', { type: 'number', max: 45, min: -45, value: -45 })
  return (
    <>
      <Canvas
        pixelRatio={window.devicePixelRatio}
        style={{ background: SKY_COLOR }}
        shadowMap={{ enabled: true, type: PCFSoftShadowMap }}
      >
        <OrbitControls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
        <Suspense fallback="loading...">
          <WeatherText color="#f1f0ed">{PATHS.haze.name}</WeatherText>
        </Suspense>
        <Stats />
        <Haze count={Math.floor(count)} angle={angle} />
      </Canvas>
      <Controls />
    </>
  )
}

export default HazePage

import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import { Stats } from 'drei'
import { Controls, useControl } from 'react-three-gui'
import * as meshline from 'threejs-meshline'

import Rain from '../../../components/rain'
import Meteors from '../../../components/meteors'
import { WeatherText } from '@/components/WeatherText'

extend(meshline)

const CloudyPage = () => {
  const count = useControl('count', { type: 'number', max: 100, min: 10, value: 100 })
  return (
    <>
      <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#3C4245' }}>
        <Stats />
        <Rain count={Math.floor(count)} />
        {/* <Meteors count={30} /> */}
        <Stats />
        <Suspense fallback="loading...">
          <WeatherText color="#f1f0ed">阴</WeatherText>
        </Suspense>
      </Canvas>
      <Controls />
    </>
  )
}

export default CloudyPage

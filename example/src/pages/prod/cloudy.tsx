import React from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Controls } from '@/components/Controls'
import { Cloudy } from 'threejs-weather'

const CloudyPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#3C4245' }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <Cloudy />
    </Canvas>
  )
}

export default CloudyPage

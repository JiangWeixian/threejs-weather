import React from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Controls } from '@/components/Controls'
import { Wind } from 'threejs-weather'

extend(meshline)

const WindPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: 'white' }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <Wind />
    </Canvas>
  )
}

export default WindPage

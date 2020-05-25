import React from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Controls } from '@/components/Controls'
import { Snow } from 'threejs-weather'

extend(meshline)

const SnowPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#1677b3' }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <Snow />
    </Canvas>
  )
}

export default SnowPage

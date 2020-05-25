import React from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Controls } from '@/components/Controls'
import { Sun } from 'threejs-weather'

extend(meshline)

const SunPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#faf4e8' }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <Sun />
    </Canvas>
  )
}

export default SunPage

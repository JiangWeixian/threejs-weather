import React from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Controls } from '@/components/Controls'
import { Rain } from 'threejs-weather'

extend(meshline)

const RainPage = () => {
  return (
    <Canvas
      pixelRatio={window.devicePixelRatio}
      style={{ backgroundColor: '#1677b3' }} // rain: #1677b3; sun: #faf4e8
    >
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <fog attach="fog" args={[0xffffff, 100, 100]} />
      <Rain />
    </Canvas>
  )
}

export default RainPage

import React, { Suspense } from 'react'
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Controls } from '@/components/Controls'
import { Text } from '@/components/Text'
import Rain from '../../../../components/rain'
import RainRings from '../../../../components/rain-ring'

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
      <Suspense fallback="loading...">
        <Text color="#f1f0ed">雨</Text>
      </Suspense>
      <RainRings />
    </Canvas>
  )
}

export default RainPage

import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Controls } from '@/components/Controls'
import { Rain, RainRing } from 'threejs-weather'
import { Text } from '@/components/Text'

extend(meshline)

const RainPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#1677b3' }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <Rain />
      <RainRing />
      <Suspense fallback="loading...">
        <Text color="#f1f0ed">雨</Text>
      </Suspense>
    </Canvas>
  )
}

export default RainPage

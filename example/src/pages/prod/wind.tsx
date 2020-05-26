import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Controls } from '@/components/Controls'
import { Wind } from 'threejs-weather'
import { Text } from '@/components/Text'

extend(meshline)

const WindPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: 'white' }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <Wind />
      <Suspense fallback="loading...">
        <Text>风</Text>
      </Suspense>
    </Canvas>
  )
}

export default WindPage

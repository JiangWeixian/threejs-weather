import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Wind } from 'threejs-weather'
import { Text } from '@/components/Text'

extend(meshline)

const WindPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: 'white' }}>
      <Wind />
      <Suspense fallback="loading...">
        <Text>风</Text>
      </Suspense>
    </Canvas>
  )
}

export default WindPage

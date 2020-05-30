import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { StarRings } from 'threejs-weather'
import { Text } from '@/components/Text'

extend(meshline)

const StarRingsPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#0F203B' }}>
      <StarRings />
      <Suspense fallback="loading...">
        <Text color="#f1f0ed">星夜</Text>
      </Suspense>
    </Canvas>
  )
}

export default StarRingsPage

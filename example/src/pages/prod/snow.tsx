import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Snow } from 'threejs-weather'
import { Text } from '@/components/Text'

extend(meshline)

const SnowPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#1677b3' }}>
      <Snow />
      <Suspense fallback="loading...">
        <Text color="#f1f0ed">雪</Text>
      </Suspense>
    </Canvas>
  )
}

export default SnowPage

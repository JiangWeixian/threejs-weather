import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Meteors } from 'threejs-weather'
import { Text } from '@/components/Text'

extend(meshline)

const SnowPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#0F203B' }}>
      <Meteors />
      <Suspense fallback="loading...">
        <Text color="#f1f0ed">流星</Text>
      </Suspense>
    </Canvas>
  )
}

export default SnowPage

import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Sun } from 'threejs-weather'
import { Text } from '@/components/Text'

extend(meshline)

const SunPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#faf4e8' }}>
      <Sun />
      <Suspense fallback="loading...">
        <Text>晴</Text>
      </Suspense>
    </Canvas>
  )
}

export default SunPage

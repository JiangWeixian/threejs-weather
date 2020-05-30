import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Cloudy } from 'threejs-weather'
import { Text } from '@/components/Text'

extend(meshline)

const CloudyPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#3C4245' }}>
      <Cloudy />
      <Suspense fallback="loading...">
        <Text color="#f1f0ed">阴</Text>
      </Suspense>
    </Canvas>
  )
}

export default CloudyPage

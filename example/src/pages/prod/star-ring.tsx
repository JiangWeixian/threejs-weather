import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Controls } from '@/components/Controls'
import { StarRings } from 'threejs-weather'
import { Text } from '@/components/Text'

extend(meshline)

const StarRingsPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#0F203B' }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <StarRings />
      <Suspense fallback="loading...">
        <Text color="#f1f0ed">星夜</Text>
      </Suspense>
    </Canvas>
  )
}

export default StarRingsPage

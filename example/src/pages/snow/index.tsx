import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Controls } from '@/components/Controls'
import { Text } from '@/components/Text'
import Snow from '../../../../components/snow'

extend(meshline)

const SnowPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#1677b3' }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <Snow />
      <Suspense fallback="loading...">
        <Text color="#f1f0ed">雪</Text>
      </Suspense>
    </Canvas>
  )
}

export default SnowPage

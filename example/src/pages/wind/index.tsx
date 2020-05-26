import React, { Suspense } from 'react'
import * as meshline from 'threejs-meshline'
import { Canvas, extend } from 'react-three-fiber'

import { Controls } from '@/components/Controls'
import { Text } from '@/components/Text'
import Wind from '../../../../components/wind'

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

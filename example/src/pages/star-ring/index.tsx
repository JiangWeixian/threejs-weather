import React, { Suspense } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Controls } from '@/components/Controls'
import { Text } from '@/components/Text'
import StarRings from '../../../../components/star-rings'

const RING_COLORS = ['#cdd1d3', '#fcd337', '#1677b3']

extend(meshline)

const StarRingPage = () => {
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

export default StarRingPage

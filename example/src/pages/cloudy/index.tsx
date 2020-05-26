import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'

import { Controls } from '@/components/Controls'
import { Text } from '@/components/Text'
import Cloudy from '../../../../components/cloudy'

const CloudyPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#3C4245' }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <Cloudy />
      <Suspense fallback="loading...">
        <Text color="#f1f0ed">阴</Text>
      </Suspense>
    </Canvas>
  )
}

export default CloudyPage

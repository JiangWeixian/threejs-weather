import React, { Suspense } from 'react'
import { Canvas, extend, useLoader } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'
import { FontLoader } from 'three'

import { Controls } from '@/components/Controls'
import { Sun } from 'threejs-weather'

extend(meshline)

const Text = () => {
  const font = useLoader(FontLoader, 'static/FZJinLS.json')
  return (
    // <Sun />
    <mesh>
      <textGeometry
        attach="geometry"
        args={[
          '你好',
          {
            font: font,
            size: 80,
            height: 5,
          },
        ]}
      />
      <meshBasicMaterial color="black" attach="material" />
    </mesh>
  )
}

const SunPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#faf4e8' }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <Suspense fallback="loading...">
        <Text />
      </Suspense>
    </Canvas>
  )
}

export default SunPage

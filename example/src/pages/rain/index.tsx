import React, { Suspense } from 'react'
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Controls } from '@/components/Controls'
import { Text } from '@/components/Text'
import Rain from '../../../../components/rain'
import { useRef } from 'react'
import { Mesh, Geometry, Object3D, Vector3 } from 'three'

extend(meshline)

const Inter = () => {
  const mesh = useRef<Mesh>()
  const { camera, raycaster } = useThree()
  raycaster.setFromCamera({ x: 0, y: 0 }, camera)
  useFrame(() => {
    if (!mesh.current) {
      return
    }
  })
  return (
    <mesh ref={mesh}>
      <meshLine attach="geometry" vertices={[new Vector3(0, 1, 0), new Vector3(0, 0, 0)]} />
      <meshLineMaterial
        attach="material"
        transparent={true}
        depthTest={false}
        sizeAttenuation={true}
        lineWidth={1}
        opacity={0.75}
      />
    </mesh>
  )
}

const RainPage = () => {
  return (
    <Canvas
      pixelRatio={window.devicePixelRatio}
      style={{ backgroundColor: '#1677b3' }} // rain: #1677b3; sun: #faf4e8
    >
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <fog attach="fog" args={[0xffffff, 100, 100]} />
      <Rain />
      <Suspense fallback="loading...">
        <Text color="#f1f0ed">雨</Text>
      </Suspense>
    </Canvas>
  )
}

export default RainPage

import React, { useMemo } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'
import * as THREE from 'three'

import { Controls } from '@/components/Controls'

extend(meshline)

const Snow = () => {
  const flakes = useMemo(() => {
    return new Array(100).fill(0).map(() => {
      return {
        startpoint: new THREE.Vector3(4 - Math.random() * 8, 4 - Math.random() * 8, 0),
        radius: Math.random() * 0.1,
      }
    })
  }, [])
  return (
    <>
      {flakes.map((flake) => {
        return (
          <mesh position={flake.startpoint}>
            <circleBufferGeometry attach="geometry" args={[flake.radius, 128]} />
            <meshBasicMaterial color="white" attach="material" />
          </mesh>
        )
      })}
    </>
  )
}

const SunPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#1677b3' }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <Snow />
    </Canvas>
  )
}

export default SunPage

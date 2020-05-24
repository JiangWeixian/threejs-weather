import React, { useMemo } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'
import * as THREE from 'three'

import { Controls } from '@/components/Controls'

const StarRings = () => {
  const rings = useMemo(() => {
    return new Array(1).fill(0).map(() => {
      const vertices = new Array(36).fill(0).map((_v, i) => {
        return new THREE.Vector3(
          Math.cos((i * 10 * Math.PI) / 180) * 4,
          Math.sin((i * 10 * Math.PI) / 180) * 4,
          0,
        )
      })
      return {
        radius: Math.random() * 4,
        color: 'white',
        vertices,
      }
    })
  }, [])
  return (
    <>
      {rings.map((ring) => {
        return (
          <mesh>
            <meshLine attach="geometry" vertices={ring.vertices} />
            <meshLineMaterial
              attach="material"
              transparent={true}
              depthTest={false}
              sizeAttenuation={true}
              lineWidth={0.01}
              opacity={0.75}
              color={ring.color}
            />
          </mesh>
        )
      })}
    </>
  )
}

extend(meshline)

const StarRingPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: 'black' }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <StarRings />
    </Canvas>
  )
}

export default StarRingPage

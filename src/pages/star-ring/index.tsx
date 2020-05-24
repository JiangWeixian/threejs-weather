import React, { useMemo, useRef } from 'react'
import { Canvas, extend, useFrame } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'
import { Mesh } from 'three'
import * as THREE from 'three'

import { Controls } from '@/components/Controls'
import { getRandomInRange, dirs } from '@/utils/random'

const RING_COLORS = ['#cdd1d3', '#fcd337', '#1677b3']

const Ring = ({ vertices, color, dashArray, opacity, lineWidth }) => {
  const ring = useRef<any>()
  const dir = getRandomInRange(dirs)
  const speed = useRef(Math.random() * 2 * 0.0001)
  useFrame(() => {
    if (!ring.current) {
      return
    }
    ring.current.uniforms.dashOffset.value -= speed.current * dir
  })
  return (
    <mesh>
      <meshLine attach="geometry" vertices={vertices} />
      <meshLineMaterial
        ref={ring}
        attach="material"
        transparent={true}
        depthTest={false}
        sizeAttenuation={true}
        dashArray={dashArray}
        dashRatio={0.2}
        lineWidth={lineWidth}
        opacity={opacity}
        color={color}
      />
    </mesh>
  )
}

const StarRings = () => {
  const rings = useMemo(() => {
    return new Array(50).fill(0).map(() => {
      const radius = Math.random() * 10
      const vertices = new Array(180).fill(0).map((_v, i) => {
        return new THREE.Vector3(
          Math.cos((i * 2 * Math.PI) / 180) * radius - 6,
          Math.sin((i * 2 * Math.PI) / 180) * radius + 4,
          0,
        )
      })
      return {
        radius,
        vertices,
        dashArray: Math.random() + 0.1,
        opacity: Math.random() * 0.8,
        color: getRandomInRange(RING_COLORS),
        lineWidth: Math.random() * 0.1,
      }
    })
  }, [])
  return (
    <>
      {rings.map((ring) => {
        return (
          <Ring
            vertices={ring.vertices}
            dashArray={ring.dashArray}
            color={ring.color}
            opacity={ring.opacity}
            lineWidth={ring.lineWidth}
          />
        )
      })}
    </>
  )
}

extend(meshline)

const StarRingPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#0F203B' }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <StarRings />
    </Canvas>
  )
}

export default StarRingPage

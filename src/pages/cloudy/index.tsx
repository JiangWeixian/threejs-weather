import React, { useMemo } from 'react'
import { Canvas } from 'react-three-fiber'
import * as THREE from 'three'

import { Controls } from '@/components/Controls'
import { getRandomVertorByOri } from '@/utils/random'

const Cloudy = () => {
  const clouds = useMemo(() => {
    return new Array(10).fill(0).map(() => {
      return {
        radius: Math.random() * 4,
        startpoint: getRandomVertorByOri('top').add(new THREE.Vector3(0, 4, 0)),
      }
    })
  }, [])
  return (
    <>
      {clouds.map((cloud) => {
        return (
          <mesh>
            <circleBufferGeometry attach="geometry" args={[cloud.radius, 128]} />
            <meshBasicMaterial attach="material" transparent={true} opacity={0.5} color="black" />
          </mesh>
        )
      })}
    </>
  )
}

const CloudyPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#0F203B' }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <Cloudy />
    </Canvas>
  )
}

export default CloudyPage

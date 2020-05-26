import React, { useMemo, Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import * as THREE from 'three'

import { Controls } from '@/components/Controls'
import { getRandomVertorByOri, getRandomInRange } from '@/utils/random'
import { Text } from '@/components/Text'

const CLOUD_COLORS = ['#21373d', '#535657']

const Cloudy = () => {
  const clouds = useMemo(() => {
    return new Array(10).fill(0).map(() => {
      return {
        radius: Math.random() * 3,
        startpoint: getRandomVertorByOri('top').add(new THREE.Vector3(0, 4, 0)),
        opacity: Math.random(),
        color: getRandomInRange(CLOUD_COLORS),
      }
    })
  }, [])
  return (
    <>
      {clouds.map((cloud) => {
        return (
          <mesh position={cloud.startpoint}>
            <circleBufferGeometry attach="geometry" args={[cloud.radius, 128]} />
            <meshBasicMaterial
              attach="material"
              transparent={true}
              opacity={cloud.opacity}
              color={cloud.color}
            />
          </mesh>
        )
      })}
    </>
  )
}

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

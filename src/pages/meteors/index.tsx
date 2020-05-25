import React, { useMemo, useRef } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'
import * as THREE from 'three'
import { Mesh } from 'three'

import { Controls } from '@/components/Controls'
import { getRandomVertorByOri } from '@/utils/random'

extend(meshline)

const Meteor = ({ vertices, color }) => {
  const meteor = useRef<Mesh>()
  return (
    <mesh ref={meteor}>
      <meshLine attach="geometry" vertices={vertices} />
      <meshLineMaterial
        attach="material"
        transparent={true}
        depthTest={false}
        sizeAttenuation={true}
        lineWidth={0.01}
        opacity={0.75}
        color={color}
      />
    </mesh>
  )
}

const Meteors = () => {
  const angle = useRef((-45 * Math.PI) / 180).current
  const meteors = useMemo(() => {
    return new Array(10).fill(0).map(() => {
      const leg = Math.random() * 2
      // noise vertor for startpoint
      const vertor = getRandomVertorByOri('right', { noise: true })
      return {
        vertices: [
          // endpoint
          new THREE.Vector3()
            .add(vertor)
            // distance vertor
            .add(new THREE.Vector3(leg / Math.tan(angle), leg, 0)),
          // startpoint
          new THREE.Vector3().add(vertor),
        ],
        angle,
        leg,
        color: 'white',
      }
    })
  }, [])
  return (
    <>
      {meteors.map((meteor) => {
        return <Meteor vertices={meteor.vertices} color={meteor.color} />
      })}
    </>
  )
}

const MeteorPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#0F203B' }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
    </Canvas>
  )
}

export default MeteorPage

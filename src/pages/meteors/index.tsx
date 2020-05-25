import React, { useMemo, useRef } from 'react'
import { Canvas, extend, useFrame } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'
import * as THREE from 'three'
import { Mesh, Vector3 } from 'three'

import { Controls } from '@/components/Controls'
import { getRandomVertorByOri, getRandomPoint } from '@/utils/random'
import { computeBoundingbox } from '@/utils/element'

extend(meshline)

const Meteor = ({ vertices, color, angle }) => {
  const meteor = useRef<Mesh>()
  const mat = useRef<any>()
  const vopacity = useRef(0.01)
  const { offsetTop } = computeBoundingbox(vertices[0])
  const threshold = Math.random() * 8
  useFrame(() => {
    if (meteor.current?.position.y === undefined || !mat.current) {
      return
    }
    // 判断meteor是否出了边界
    if (offsetTop + Math.abs(meteor.current.position.y) > threshold) {
      mat.current.uniforms.dashOffset.value -= Math.abs(vopacity.current)
      mat.current.opacity -= vopacity.current
    } else {
      // meteor加速下落
      meteor.current.position.y -= Math.sin(angle) * Math.abs(vopacity.current) * 10
      meteor.current.position.x -= Math.cos(angle) * Math.abs(vopacity.current) * 10
    }
    if (Math.abs(mat.current.uniforms.dashOffset.value) >= 1.1) {
      mat.current.opacity = 1
      mat.current.uniforms.dashOffset.value = 0
      const vertor = getRandomVertorByOri('right')
      // 随机meteor初始位置, 避免loop重复
      meteor.current.position.set(vertor.x, vertor.y, vertor.z)
    }
  })
  return (
    <mesh ref={meteor}>
      <meshLine attach="geometry" vertices={vertices} />
      <meshLineMaterial
        attach="material"
        ref={mat}
        transparent={true}
        depthTest={false}
        sizeAttenuation={true}
        lineWidth={0.02}
        dashArray={0.5}
        dashRatio={0.7}
        opacity={0.75}
        color={color}
      />
    </mesh>
  )
}

const Meteors = () => {
  const angle = useRef((30 * Math.PI) / 180).current
  const meteors = useMemo(() => {
    return new Array(10).fill(0).map(() => {
      const leg = Math.random() * 4
      // noise vertor for startpoint
      const vertor = getRandomVertorByOri('right', { noise: true })
      return {
        vertices: [
          // endpoint
          new THREE.Vector3(4, 0, 0)
            .copy(vertor)
            // distance vertor
            .add(new THREE.Vector3(leg / Math.tan(angle), leg, 0)),
          // startpoint
          new THREE.Vector3(4, 0, 0).copy(vertor),
        ],
        angle,
        leg,
        hypotenuse: leg / Math.sin(angle),
        color: 'white',
      }
    })
  }, [])
  return (
    <>
      {meteors.map((meteor) => {
        return (
          <Meteor
            vertices={meteor.vertices}
            color={meteor.color}
            length={meteor.hypotenuse}
            leg={meteor.leg}
            angle={meteor.angle}
          />
        )
      })}
    </>
  )
}

const MeteorPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#0F203B' }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <Meteors />
    </Canvas>
  )
}

export default MeteorPage

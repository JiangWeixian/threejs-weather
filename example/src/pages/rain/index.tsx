import React, { Suspense } from 'react'
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'

import { Controls } from '@/components/Controls'
import { Text } from '@/components/Text'
import Rain from '../../../../components/rain'
import { useRef } from 'react'
import { Mesh, Geometry, Object3D, Vector3 } from 'three'
import { useMemo } from 'react'

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

const length = 0.1

const Slash = ({ vertices }) => {
  const mat = useRef<any>()
  useFrame(() => {
    if (!mat.current) {
      return
    }
    mat.current.uniforms.dashOffset.value += 0.01
    mat.current.opacity -= 0.001
  })
  return (
    <mesh>
      <meshLine attach="geometry" vertices={vertices} />
      <meshLineMaterial
        attach="material"
        ref={mat}
        transparent={true}
        depthTest={false}
        sizeAttenuation={true}
        lineWidth={0.01}
        dashArray={0.5}
        dashRatio={0.9}
        opacity={0.75}
      />
    </mesh>
  )
}

const Slashes = () => {
  const lines = useMemo(() => {
    return new Array(5).fill(0).map((_v, i) => {
      const unit = 45
      return [
        new Vector3(
          length * Math.cos((unit * i * Math.PI) / 180),
          length * Math.sin((unit * i * Math.PI) / 180),
          0,
        ),
        new Vector3(0, 0, 0),
      ]
    })
  }, [])
  return (
    <>
      {lines.map((l) => {
        return <Slash vertices={l} />
      })}
    </>
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
      {/* <Suspense fallback="loading...">
        <Text color="#f1f0ed">雨</Text>
      </Suspense> */}
      <Slashes />
    </Canvas>
  )
}

export default RainPage

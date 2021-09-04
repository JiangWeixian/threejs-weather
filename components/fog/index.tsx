import React, { useEffect, useState, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Object3D, MeshPhysicalMaterial, Vector3, Fog as _Fog, Euler } from 'three'
import { a, TransitionState } from '@react-spring/three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

import { Style } from '../interface'

const url = 'https://raw.githubusercontent.com/iondrimba/images/master/buildings.obj'
const loader = new OBJLoader()

type FogProps = {
  style?: Style
  p?: TransitionState
  url?: string
}

const color = '#353c3c'

const CityFog = (props: FogProps) => {
  const [group, setGroup] = useState<Object3D>()
  const buildingRef = useRef<any[]>([])
  const { scene } = useThree()
  useEffect(() => {
    loader.load(props.url || url, (obj) => {
      obj.castShadow = true
      obj.receiveShadow = true
      const models = [...obj.children].map((model) => {
        const scale = 0.01

        model.scale.set(scale, scale, scale)
        model.receiveShadow = true
        model.castShadow = true

        return model
      })

      const boxSize = 3
      const meshParams = {
        metalness: 0,
        roughness: 0.77,
      }
      const max = 0.009
      const min = 0.001
      const material = new MeshPhysicalMaterial({ ...meshParams, transparent: true })

      const buildings = new Object3D()
      const gridSize = 40

      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const model = models[Math.floor(Math.random() * Math.floor(models.length))].clone()
          ;(model as any).material = material
          model.scale.y = Math.random() * (max - min + 0.01)
          model.position.x = i * boxSize
          model.position.z = j * boxSize

          buildingRef.current.push(model)
          buildings.add(model)
        }
      }
      buildings.castShadow = true
      buildings.receiveShadow = true
      setGroup(buildings)
    })
  }, [])
  useFrame(() => {
    const near = 1
    const far = 208 * (props.style?.opacity.get() ?? 0)
    scene.fog = new _Fog(color, near, far)
    if (buildingRef.current) {
      buildingRef.current.forEach((building) => {
        building.material.opacity = props.p?.phase === 'leave' ? 0 : props.style?.opacity.get() ?? 1
      })
    }
  })
  const scale = props.style?.scale.to([0, 1], [0.8, 1])
  return (
    <a.group scale={scale as any}>
      <a.mesh material-opacity={props.style?.opacity}>
        {group ? (
          <primitive castShadow={true} receiveShadow={true} object={group} dispose={null} />
        ) : null}
      </a.mesh>
    </a.group>
  )
}

const rotation = [-0.4239391588266323, 0.7010640463834621, 0.2832774959276831]
const position = [127.45293777867074, 62.11080512264083, 137.6247069251716]

export const FogCamera = () => {
  return (
    <PerspectiveCamera
      rotation={new Euler(...rotation)}
      position={new Vector3(...position)}
      makeDefault={true}
      args={[20, 2, 1, 1000]}
    />
  )
}

const Fog = (props: FogProps) => {
  return (
    <a.group>
      <CityFog style={props.style} p={props.p} url={props.url} />
      <directionalLight position={[-8, 12, 0]} castShadow={true} color="#272727" />
      <directionalLight position={[8, 1200, 8]} color="#d3263a" castShadow={true} />
      {/* sky */}
      <a.mesh
        material-opacity={props.style?.opacity}
        rotation={[0, 0, -Math.PI / 2]}
        position={[0, 0, 0]}
      >
        <planeBufferGeometry attach="geometry" args={[400, 400]} />
        <meshPhysicalMaterial transparent={true} attach="material" color={color} />
      </a.mesh>
      {/* land */}
      <a.mesh
        material-opacity={props.style?.opacity}
        castShadow
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[50, 0, 50]}
      >
        <planeBufferGeometry attach="geometry" args={[100, 100, 10, 10]} />
        <meshPhysicalMaterial transparent={true} attach="material" color={color} />
      </a.mesh>
    </a.group>
  )
}

export default Fog

import React, { useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Color, Object3D, MeshPhysicalMaterial, Vector3, Fog as _Fog, Euler } from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const url = 'https://raw.githubusercontent.com/iondrimba/images/master/buildings.obj'
const loader = new OBJLoader()

const CityFog = () => {
  const [buildings, setBuildings] = useState<Object3D>()
  const { scene } = useThree()
  useEffect(() => {
    loader.load(url, (obj) => {
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

          buildings.add(model)
        }
      }
      buildings.castShadow = true
      buildings.receiveShadow = true
      setBuildings(buildings)
      const near = 1
      const far = 208
      const color = '#353c3c'
      scene.fog = new _Fog(color, near, far)
      scene.background = new Color(color)
    })
  }, [scene])
  return (
    <mesh>
      {buildings ? (
        <primitive castShadow={true} receiveShadow={true} object={buildings} dispose={null} />
      ) : null}
    </mesh>
  )
}

const rotation = [-0.4239391588266323, 0.7010640463834621, 0.2832774959276831]
const position = [127.45293777867074, 62.11080512264083, 137.6247069251716]

const Camera = () => {
  return (
    <PerspectiveCamera
      rotation={new Euler(...rotation)}
      position={new Vector3(...position)}
      makeDefault={true}
      args={[20, 2, 1, 1000]}
    />
  )
}

const Fog = () => {
  return (
    <>
      <Camera />
      <CityFog />
      <directionalLight position={[-8, 12, 0]} castShadow={true} color="#272727" />
      <directionalLight position={[8, 1200, 8]} color="#d3263a" castShadow={true} />
      <mesh rotation={[0, 0, -Math.PI / 2]} position={[0, 10, -150]}>
        <planeBufferGeometry attach="geometry" args={[400, 100]} />
        <meshPhysicalMaterial attach="material" color="#fff" />
      </mesh>
      <mesh castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[50, 0, 50]}>
        <planeBufferGeometry attach="geometry" args={[100, 100, 10, 10]} />
        <meshPhysicalMaterial attach="material" color="#353c3c" />
      </mesh>
    </>
  )
}

export default Fog

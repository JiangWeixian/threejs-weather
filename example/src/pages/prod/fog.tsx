import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber'
import { Stats } from 'drei'
import { Controls, useControl } from 'react-three-gui'

import { WeatherText } from '@/components/WeatherText'
import { OrbitControls } from 'drei'
import { PATHS } from '@/constants'

import THREE, {
  Color,
  Object3D,
  MeshPhysicalMaterial,
  Mesh,
  Vector3,
  PlaneBufferGeometry,
  PCFSoftShadowMap,
  Fog,
} from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const url = 'https://raw.githubusercontent.com/iondrimba/images/master/buildings.obj'
const loader = new OBJLoader()

const PerspectiveCamera = (props) => {
  const cam = useRef()
  const { setDefaultCamera } = useThree()
  useFrame(() => cam.current.updateMatrixWorld())

  return <perspectiveCamera args={[20, 1, 1, 1000]} position={[3, 50, 155]} ref={cam} {...props} />
}

const Lights = () => {
  const refLight1 = useRef()
  const refLight2 = useRef()
  const refLight3 = useRef()

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        ref={refLight3}
        castShadow
        position={[50, 20, 80]}
        intensity={0.5}
        shadow-mapSize-shadowMapWidth={2048}
        shadow-mapSize-shadowMapHeight={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={-50}
        shadow-camera-bottom={10}
      />
      {/* <pointLight ref={refLight1} color="#d3263a" position={[10, -10, -20]} intensity={0.3} /> */}
      {/* <pointLight ref={refLight2} position={[0, 10, 5]} intensity={0.3} /> */}
      <spotLight intensity={1} position={[0, 1000, 0]} />
    </>
  )
}

function Buildings({ url }) {
  const [obj, setObj] = useState()
  useMemo(() => new OBJLoader().load(url, setObj), [url])
  const meshParams = {
    color: '#000',
    metalness: 0,
    emissive: '#000',
    roughness: 0.77,
  }

  const max = 0.009
  const min = 0.001
  const material = new MeshPhysicalMaterial(meshParams)
  if (obj) {
    obj.castShadow = true
    obj.receiveShadow = true
    obj.traverse((children) => {
      if (children instanceof Mesh) {
        const scale = 0.01

        children.material = material
        children.scale.set(scale, scale, scale)
        children.castShadow = true
        children.receiveShadow = true
      }
    })
  }
  return (
    <mesh castShadow receiveShadow>
      <meshPhysicalMaterial
        attach="material"
        metalness={0}
        roughness={0.77}
        emissive="#000000"
        color="#000"
      />
      {obj ? <primitive object={obj} attach="geometry" /> : null}
    </mesh>
  )
}

const Fogx = () => {
  const [buildings, setBuildings] = useState<Object3D>()
  const [loadobj, setLoadedObj] = useState()
  console.log('loading fog')
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
      const color = 'lightblue'
      scene.fog = new Fog(color, near, far)
      scene.background = new Color(color)
    })
  }, [scene])
  console.log(buildings)
  return (
    <mesh>
      {buildings ? (
        <primitive castShadow={true} receiveShadow={true} object={buildings} dispose={null} />
      ) : null}
      {/* <Buildings url={url} /> */}
    </mesh>
  )
}

const FogPage = () => {
  const d = 8.25
  return (
    <>
      <Canvas
        // pixelRatio={window.devicePixelRatio}
        style={{ background: 'lightblue' }}
        // shadowMap={{ enabled: true, type: PCFSoftShadowMap }}
        // camera={{ position: [0, 0, 15] }}
      >
        {/* <PerspectiveCamera /> */}
        {/* <fog color={new Color("lightblue")} near={1} far={2} /> */}
        <perspectiveCamera args={[75, 2, 0.5, 5]} />
        {/* <directionalLight
          position={[-1, 2, 4]}
          castShadow={true}
          color={0xFFFFFF}
          intensity={1}
        /> */}
        {/* <mesh>
          <boxGeometry attach="geometry" args={[1, 1, 1]} />
          <meshPhongMaterial attach="material" color={0x44aa88} />
        </mesh> */}
        <OrbitControls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
        <Fogx />
        {/* <Lights /> */}
        {/* <hemisphereLight
          skyColor={'black'}
          groundColor={0xffffff}
          intensity={0.68}
          position={[0, 50, 0]}
        /> */}
        <directionalLight position={[-8, 12, 0]} castShadow={true} color="#272727" />
        <directionalLight position={[8, 1200, 8]} color="#d3263a" castShadow={true} />
        {/* <ambientLight />
        <spotLight
          position={[641, -462, 509]}
          castShadow={true}
        /> */}
        {/* <pointLight intensity={8.2} position={[16, 100, -68]} /> */}
        {/* <spotLight args={["#ff0000", 1]} rotation={[-Math.PI/2, 0, 0]} intensity={0.6} position={[100, 150, 100]} angle={0.2} penumbra={1} castShadow /> */}
        <mesh rotation={[0, 0, -Math.PI / 2]} position={[0, 10, -150]}>
          <planeBufferGeometry attach="geometry" args={[400, 100]} />
          <meshPhysicalMaterial attach="material" color="#fff" />
        </mesh>
        <mesh castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[50, 0, 50]}>
          <planeBufferGeometry attach="geometry" args={[100, 100, 10, 10]} />
          <meshPhysicalMaterial attach="material" color="#ff0000" />
        </mesh>
      </Canvas>
      <Controls />
    </>
  )
}

export default FogPage

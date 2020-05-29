import React, { useState } from 'react'
import { useLoader, useFrame, useThree } from 'react-three-fiber'
import { useRef } from 'react'
import {
  Mesh,
  FontLoader,
  Vector3,
  ShapeBufferGeometry,
  MeshBasicMaterial,
  Color,
  DoubleSide,
  Vector2,
  Group,
} from 'three'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { getRandomVertorByOri } from '../../../components/utils/random'
import { useCallback } from 'react'

type TextProps = {
  children: string
  color?: string
}

const length = 0.1

const Slash = ({ vertices }) => {
  const mat = useRef<any>()
  const a = useRef(-0.0001)
  const speed = useRef(0.01)
  useFrame(() => {
    if (!mat.current) {
      return
    }
    mat.current.uniforms.dashOffset.value += speed.current
    speed.current = Math.max(0.001, speed.current + a.current)
    mat.current.opacity -= 0.01
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

const Slashes = ({ allpoints }) => {
  const slash = useRef<Group>()
  const [inited, setInited] = useState(false)
  const [startpoint, setStartpoint] = useState<[number, number, number]>([0, 0, 0])
  const randomSetPoint = useCallback(() => {
    const point = allpoints[Math.floor(Math.random() * allpoints.length)]
    setStartpoint([point.x, point.y, 0])
  }, [allpoints])
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
  const [dashOffset, setDashOffset] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const { camera } = useThree()
  const a = useRef(-0.001)
  const speed = useRef(Math.random() * 0.01)
  const vopacity = useRef(0.04 + Math.random() * 0.01)
  useFrame(() => {
    setDashOffset((prev) => prev + speed.current)
    // speed.current = Math.max(0.0001, speed.current + a.current)
    setOpacity((prev) => {
      if (prev <= 0) {
        randomSetPoint()
        speed.current = Math.random() * 0.01
        vopacity.current = 0.04 + Math.random() * 0.01
        return 1
      } else {
        return prev - vopacity.current
      }
    })
    if (!slash.current) {
      return
    }
    slash.current.rotation.x = camera.rotation.x
    slash.current.rotation.y = camera.rotation.y
    slash.current.rotation.z = camera.rotation.z
  })
  useEffect(() => {
    if (!inited && allpoints.length !== 0) {
      randomSetPoint()
      setInited(true)
    }
  }, [randomSetPoint, inited])
  return (
    <group ref={slash}>
      {lines.map((l) => {
        return (
          <mesh>
            <meshLine attach="geometry" vertices={l} />
            <meshLineMaterial
              attach="material"
              transparent={true}
              depthTest={false}
              sizeAttenuation={true}
              lineWidth={0.01}
              dashArray={0.5}
              dashOffset={dashOffset}
              dashRatio={0.9}
              opacity={opacity}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export const Text = ({ color = '#310f1b', ...props }: TextProps) => {
  const font = useLoader(FontLoader, 'static/FZJinLS.json')
  const text = useRef<Mesh>()
  const [vertex, setVertex] = useState<Vector2[]>([])
  const { camera, scene } = useThree()
  // useEffect(() => {
  //   console.log(text.current?.geometry.computeBoundingSphere())
  //   console.log(text.current?.geometry.boundingSphere)
  // }, [text])
  useEffect(() => {
    const shapes = font.generateShapes('雨', 0.5)
    // const textMaterial = new MeshBasicMaterial({
    //   color: new Color(0, 0, 1),
    //   side: DoubleSide,
    //   wireframe: false,
    // })
    const sliceshape = shapes[0]
      .getPoints()
      .sort((p1, p2) => p2.y - p1.y)
      .slice(0, 100)
    setVertex(sliceshape)
    // const geometry = new ShapeBufferGeometry([shapes[0]])
    // const text = new Mesh(geometry, textMaterial)
    // scene.add(text)
  }, [font])
  useFrame(() => {
    if (!text.current || !camera) {
      return
    }
    const rotation = camera.rotation
    text.current.scale.z = 0.001
    text.current.rotation.x = rotation.x
    text.current.rotation.y = rotation.y
    text.current.rotation.z = rotation.z
  })
  const len = useMemo(() => {
    return props.children.length
  }, [props.children])
  return (
    <>
      {/* position={new Vector3(-0.4 * len, -0.25 * len, 0)} */}
      <mesh ref={text}>
        <textGeometry
          attach="geometry"
          args={[
            props.children,
            {
              font: font,
              size: 0.5,
              height: 0.5,
            },
          ]}
        />
        <meshBasicMaterial color={color} attach="material" />
      </mesh>
      {/* <mesh>
        <meshLine attach="geometry" vertices={vertex.map((v) => new Vector3(v.x, v.y, 0))} />
        <meshLineMaterial
          attach="material"
          transparent={true}
          depthTest={false}
          sizeAttenuation={true}
          lineWidth={0.01}
          opacity={1}
        />
      </mesh> */}
      {/* {new Array(5).fill(0).map((v) => (
        <Slashes allpoints={vertex} />
      ))} */}
    </>
  )
}

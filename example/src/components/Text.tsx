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
} from 'three'
import { useMemo } from 'react'
import { useEffect } from 'react'

type TextProps = {
  children: string
  color?: string
}

export const Text = ({ color = '#310f1b', ...props }: TextProps) => {
  const font = useLoader(FontLoader, 'static/FZJinLS.json')
  const text = useRef<Mesh>()
  const [vertex, setVertex] = useState<Vector2[]>([])
  const { camera, scene } = useThree()
  useEffect(() => {
    console.log(text.current?.geometry.computeBoundingSphere())
    console.log(text.current?.geometry.boundingSphere)
  }, [text])
  useEffect(() => {
    const shapes = font.generateShapes('雨', 0.5)
    const textMaterial = new MeshBasicMaterial({
      color: new Color(0, 0, 1),
      side: DoubleSide,
      wireframe: false,
    })
    const sliceshape = shapes[0]
      .getPoints()
      .sort((p1, p2) => p2.y - p1.y)
      .slice(0, 100)
    setVertex(sliceshape)
    const geometry = new ShapeBufferGeometry([shapes[0]])
    const text = new Mesh(geometry, textMaterial)
    scene.add(text)
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
      <mesh ref={text} position={new Vector3(-0.4 * len, -0.25 * len, 0)}>
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
      <mesh>
        <meshLine attach="geometry" vertices={vertex.map((v) => new Vector3(v.x, v.y, 0))} />
        <meshLineMaterial
          attach="material"
          transparent={true}
          depthTest={false}
          sizeAttenuation={true}
          lineWidth={0.01}
          opacity={1}
        />
      </mesh>
    </>
  )
}

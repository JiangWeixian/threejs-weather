import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Mesh, Vector3, Color } from 'three'
import { Text } from '@react-three/drei'

type TextProps = {
  children: string
  color?: string
  position?: Vector3
  style?: any
}

const InnerText = Text as any

export const WeatherText = ({ color = '#310f1b', ...props }: TextProps) => {
  const text = useRef<Mesh>()
  const { camera } = useThree()
  useFrame(() => {
    if (!text.current || !camera) {
      return
    }
    const rotation = camera.rotation
    text.current.rotation.x = rotation.x
    text.current.rotation.y = rotation.y
    text.current.rotation.z = rotation.z
    if (Array.isArray(text.current.material)) {
      text.current.material.forEach((v) => {
        v.opacity = props.style?.opacity.get() ?? 1
        ;(v as any).color = new Color(color)
      })
    } else {
      text.current.material.opacity = props.style?.opacity.get() ?? 1
      ;(text.current.material as any).color = new Color(color)
    }
  })
  return (
    <InnerText
      fontSize={0.5}
      ref={text}
      anchorX="center"
      anchorY="middle"
      font="static/font.ttf"
      position={props.position}
    >
      <meshBasicMaterial transparent={true} attach="material" />
      {props.children}
    </InnerText>
  )
}

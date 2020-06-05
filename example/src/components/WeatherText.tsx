import React from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
import { Text } from 'drei'

type TextProps = {
  children: string
  color?: string
}

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
  })
  return (
    <Text
      fontSize={0.5}
      ref={text}
      anchorX="center"
      anchorY="middle"
      font="static/font.ttf"
      color={color}
    >
      {props.children}
    </Text>
  )
}

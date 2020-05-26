import React from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { useRef } from 'react'
import { Mesh, FontLoader, Vector3 } from 'three'
import { useMemo } from 'react'

type TextProps = {
  children: string
  color?: string
}

export const Text = ({ color = '#310f1b', ...props }: TextProps) => {
  const font = useLoader(FontLoader, 'static/FZJinLS.json')
  const text = useRef<Mesh>()
  useFrame(() => {
    if (!text.current) {
      return
    }
    text.current.scale.z = 0.001
  })
  const len = useMemo(() => {
    return props.children.length
  }, [props.children])
  return (
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
  )
}

import React, { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useFrame, useThree, extend } from 'react-three-fiber'

extend({ OrbitControls })

export const Controls = (props) => {
  const {
    camera,
    scene,
    gl: { domElement },
  } = useThree()
  const controls = useRef<OrbitControls>()
  useFrame(() => {
    controls.current?.update()
  })
  return <orbitControls ref={controls} args={[camera, domElement]} {...props} />
}

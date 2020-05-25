import React, { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useFrame, useThree, extend } from 'react-three-fiber'
extend({ OrbitControls })
export const Controls = props => {
  const {
    camera,
    gl: { domElement },
  } = useThree()
  const controls = useRef()
  useFrame(() => {
    var _a
    return (_a = controls.current) === null || _a === void 0 ? void 0 : _a.update()
  })
  return React.createElement(
    'orbitControls',
    Object.assign({ ref: controls, args: [camera, domElement] }, props),
  )
}

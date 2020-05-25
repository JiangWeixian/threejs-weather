import React from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'
import { Controls } from '@/components/Controls'
import { Sun } from './Sun'
extend(meshline)
const SunPage = () => {
  return React.createElement(
    Canvas,
    { pixelRatio: window.devicePixelRatio, style: { backgroundColor: '#faf4e8' } },
    React.createElement(Controls, { enableDamping: true, rotateSpeed: 0.3, dampingFactor: 1 }),
    React.createElement(Sun, null),
  )
}
export default SunPage

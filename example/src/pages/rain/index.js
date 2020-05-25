import React from 'react'
import { Canvas, extend } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'
import { Controls } from '@/components/Controls'
import { Rain } from './Rain'
extend(meshline)
const RainPage = () => {
  return React.createElement(
    Canvas,
    { pixelRatio: window.devicePixelRatio, style: { backgroundColor: '#1677b3' } },
    React.createElement(Controls, { enableDamping: true, rotateSpeed: 0.3, dampingFactor: 1 }),
    React.createElement('fog', { attach: 'fog', args: [0xffffff, 100, 100] }),
    React.createElement(Rain, null),
  )
}
export default RainPage

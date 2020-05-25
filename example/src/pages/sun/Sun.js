import React, { useRef } from 'react'
import * as THREE from 'three'
import { useSunshine, useSun } from './use-sun'
const SKY_COLOR = '#faf4e8'
export const Sun = () => {
  const sun = useRef()
  const sunshine = useRef()
  const { sunshines, halos } = useSun()
  useSunshine(sunshine)
  return React.createElement(
    'group',
    { ref: sun, position: new THREE.Vector3(4, 4, 0) },
    React.createElement(
      'group',
      { ref: sunshine },
      sunshines.map(v => {
        return React.createElement(
          'mesh',
          null,
          React.createElement('meshLine', { attach: 'geometry', vertices: v.vertices }),
          React.createElement('meshLineMaterial', {
            attach: 'material',
            transparent: true,
            depthTest: false,
            sizeAttenuation: true,
            lineWidth: 0.05,
            opacity: 0.15,
            color: 'white',
          }),
        )
      }),
    ),
    halos.map(halo => {
      return React.createElement(
        'mesh',
        { position: halo.startpoint },
        React.createElement('circleGeometry', { attach: 'geometry', args: [halo.radius, 128] }),
        React.createElement('meshBasicMaterial', { attach: 'material', color: halo.color }),
      )
    }),
  )
}

import React, { useRef } from 'react'
import { useRain, useRaindrop } from './use-rain'
export const SKY_COLOR = '#1677b3'
export const Raindrop = props => {
  const fatline = useRef()
  useRaindrop(fatline, { value: props.value })
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'mesh',
      { ref: fatline },
      React.createElement('meshLine', { attach: 'geometry', vertices: props.value.vertices }),
      React.createElement('meshLineMaterial', {
        attach: 'material',
        transparent: true,
        depthTest: false,
        sizeAttenuation: true,
        lineWidth: 0.01,
        opacity: 0.75,
        color: props.value.color,
      }),
    ),
  )
}
export const Rain = () => {
  const { lines } = useRain({ count: 200 })
  return React.createElement(
    React.Fragment,
    null,
    lines.map(v => {
      return React.createElement(Raindrop, { value: v })
    }),
  )
}

import React, { useRef, useMemo } from 'react'
import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import * as meshline from 'threejs-meshline'
import { Canvas, extend } from 'react-three-fiber'
import { Controls } from '@/components/Controls'
const WindBlade = ({ curve, width, color, speed, opacity }) => {
  const material = useRef()
  const wind = useRef()
  const dir = useRef(-1)
  const radio = 0.9
  useFrame(() => {
    var _a
    if (!material.current) {
      return
    }
    material.current.uniforms.dashOffset.value -= speed
    if (material.current.uniforms.opacity.value <= 0) {
      ;(_a = wind.current) === null || _a === void 0
        ? void 0
        : _a.position.set(4 - Math.random() * 8, 4 - Math.random() * 8, 4 - Math.random() * 8)
      material.current.uniforms.opacity.value += speed * 10
      dir.current = 1
    } else if (material.current.uniforms.opacity.value >= 1) {
      material.current.uniforms.opacity.value -= speed * 10
      dir.current = -1
    } else {
      material.current.uniforms.opacity.value += dir.current * speed * 10
    }
  })
  return React.createElement(
    'mesh',
    { ref: wind },
    React.createElement('meshLine', { attach: 'geometry', vertices: curve }),
    React.createElement('meshLineMaterial', {
      attach: 'material',
      ref: material,
      transparent: true,
      depthTest: false,
      dashArray: 0.1,
      lineWidth: width,
      color: color,
      dashRatio: radio,
      opacity: opacity,
    }),
  )
}
const colors = ['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']
const useWind = ({ count }) => {
  const lines = useMemo(
    () =>
      Array(count)
        .fill(0)
        .map(() => {
          const pos = new THREE.Vector3(
            10 - Math.random() * 20,
            10 - Math.random() * 20,
            10 - Math.random() * 20,
          )
          const points = new Array(30)
            .fill(0)
            .map(() =>
              pos
                .add(
                  new THREE.Vector3(
                    4 - Math.random() * 8,
                    4 - Math.random() * 8,
                    2 - Math.random() * 4,
                  ),
                )
                .clone(),
            )
          const curve = new THREE.CatmullRomCurve3(points).getPoints(1000)
          return {
            color: colors[parseInt((colors.length * Math.random()).toString())],
            width: Math.max(0.1, 0.5 * Math.random()),
            speed: Math.max(0.001, 0.0005 * Math.random()),
            opacity: Math.random() * 4,
            curve,
          }
        }),
    [colors, count],
  )
  return {
    lines,
  }
}
const Wind = ({ count }) => {
  const { lines } = useWind({ count })
  return React.createElement(
    React.Fragment,
    null,
    lines.map((props, index) =>
      React.createElement(WindBlade, Object.assign({ key: index }, props)),
    ),
  )
}
extend(meshline)
const WindPage = () => {
  return React.createElement(
    Canvas,
    { pixelRatio: window.devicePixelRatio, style: { backgroundColor: 'white' } },
    React.createElement(Controls, { enableDamping: true, rotateSpeed: 0.3, dampingFactor: 1 }),
    React.createElement(Wind, { count: 40 }),
  )
}
export default WindPage

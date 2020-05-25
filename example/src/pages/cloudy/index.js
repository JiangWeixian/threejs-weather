import React, { useMemo } from 'react'
import { Canvas } from 'react-three-fiber'
import * as THREE from 'three'
import { Controls } from '@/components/Controls'
import { getRandomVertorByOri, getRandomInRange } from '@/utils/random'
const CLOUD_COLORS = ['#21373d', '#535657']
const Cloudy = () => {
  const clouds = useMemo(() => {
    return new Array(10).fill(0).map(() => {
      return {
        radius: Math.random() * 3,
        startpoint: getRandomVertorByOri('top').add(new THREE.Vector3(0, 4, 0)),
        opacity: Math.random(),
        color: getRandomInRange(CLOUD_COLORS),
      }
    })
  }, [])
  return React.createElement(
    React.Fragment,
    null,
    clouds.map(cloud => {
      return React.createElement(
        'mesh',
        { position: cloud.startpoint },
        React.createElement('circleBufferGeometry', {
          attach: 'geometry',
          args: [cloud.radius, 128],
        }),
        React.createElement('meshBasicMaterial', {
          attach: 'material',
          transparent: true,
          opacity: cloud.opacity,
          color: cloud.color,
        }),
      )
    }),
  )
}
const CloudyPage = () => {
  return React.createElement(
    Canvas,
    { pixelRatio: window.devicePixelRatio, style: { backgroundColor: '#3C4245' } },
    React.createElement(Controls, { enableDamping: true, rotateSpeed: 0.3, dampingFactor: 1 }),
    React.createElement(Cloudy, null),
  )
}
export default CloudyPage

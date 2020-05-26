import React, { useMemo, useRef, Suspense } from 'react'
import { Canvas, extend, useFrame } from 'react-three-fiber'
import * as meshline from 'threejs-meshline'
import * as THREE from 'three'
import { Mesh } from 'three'

import { Controls } from '@/components/Controls'
import { getRandomVertorByOri, getRandomInRange, dirs } from '@/utils/random'
import { computeBoundingbox } from '@/utils/element'
import { Text } from '@/components/Text'

extend(meshline)

const SnowFlake = ({ position, radius }) => {
  const flake = useRef<Mesh>()
  const friction = useRef(
    getRandomInRange(dirs) === 1 ? 0 : -1 * 0.01 * Math.round(Math.random() * 10),
  ).current
  const vy0 = useRef(0.01 + friction)
  // vy0 / vx0 = tan(angle)
  const vx0 = useRef(0.001 + friction - Math.random() * 0.002)
  // const a = useRef(0.00001)
  const { offsetTop } = computeBoundingbox(position)
  useFrame(() => {
    if (!flake.current) {
      return
    }
    // 雪花加速下落
    flake.current.position.y -= vy0.current
    flake.current.position.x -= vx0.current
    // console.log(vx0.current)
    // vy0.current += a.current
    // vx0.current += a.current
    // 判断raindrop是否出了边界
    if (offsetTop + Math.abs(position.y - flake.current.position.y) > 8) {
      const vertor = getRandomVertorByOri('top')
      // 随机raindrop初始位置, 避免loop重复
      flake.current.position.set(vertor.x, vertor.y + 4, vertor.z)
      vy0.current = 0.01 + friction
      vx0.current = 0.001 + friction - Math.random() * 0.002
    }
  })
  return (
    <mesh position={position} ref={flake}>
      <circleBufferGeometry attach="geometry" args={[radius, 128]} />
      <meshBasicMaterial color="white" attach="material" />
    </mesh>
  )
}

const Snow = () => {
  const flakes = useMemo(() => {
    return new Array(4).fill(0).reduce((prev, _cur, i) => {
      return prev.concat(
        new Array(20).fill(0).map(() => {
          const vertor = getRandomVertorByOri('top', { noise: true })
          return {
            startpoint: new THREE.Vector3().copy(new THREE.Vector3(0, 4 + i * 2, 0)).add(vertor),
            radius: Math.random() * 0.1,
          }
        }),
      )
    }, [])
  }, [])
  return (
    <>
      {flakes.map((flake) => {
        return <SnowFlake position={flake.startpoint} radius={flake.radius} />
      })}
    </>
  )
}

const SnowPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#1677b3' }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <Snow />
      <Suspense fallback="loading...">
        <Text color="#f1f0ed">雪</Text>
      </Suspense>
    </Canvas>
  )
}

export default SnowPage

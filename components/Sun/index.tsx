import React, { useRef } from 'react'
import { Group } from 'three'
import * as THREE from 'three'

import { useSunshine, useSun } from './use-sun'

export const SKY_COLOR = '#faf4e8'

const Sun = () => {
  const sun = useRef<Group>()
  const sunshine = useRef<Group>()
  const { sunshines, halos } = useSun()
  useSunshine(sunshine)
  return (
    <group ref={sun} position={new THREE.Vector3(4, 4, 0)}>
      <group ref={sunshine}>
        {sunshines.map((v) => {
          return (
            <mesh>
              <meshLine attach="geometry" vertices={v.vertices} />
              <meshLineMaterial
                attach="material"
                transparent={true}
                depthTest={false}
                sizeAttenuation={true}
                lineWidth={0.05}
                opacity={0.15}
                color="white"
              />
            </mesh>
          )
        })}
      </group>
      {halos.map((halo) => {
        return (
          <mesh position={halo.startpoint}>
            <circleGeometry attach="geometry" args={[halo.radius, 128]} />
            <meshBasicMaterial attach="material" color={halo.color} />
          </mesh>
        )
      })}
    </group>
  )
}

export default Sun

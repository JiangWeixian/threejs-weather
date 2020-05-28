import React, { useRef } from 'react'
import { Group } from 'three'

import { useSunshine, useSun, UseSunProps } from './use-sun'

export const SKY_COLOR = '#faf4e8'

type SunProps = UseSunProps

const Sun = ({ percentX = 1 }: SunProps = { percentX: 1 }) => {
  const sun = useRef<Group>()
  const sunshine = useRef<Group>()
  const { sunshines, halos, startpoint } = useSun({ percentX })
  useSunshine(sunshine)
  return (
    <group ref={sun} position={startpoint}>
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
                color="#c34e35"
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

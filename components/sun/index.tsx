import React, { useRef } from 'react'
import { Group, Mesh } from 'three'
import { useFrame } from 'react-three-fiber'

import { useSunshine, useSun, UseSunProps, Halo } from './use-sun'
import { getRandomInRange, DIRS } from '../utils/random'

export const SKY_COLOR = '#faf4e8'

type SunProps = UseSunProps

const SunHalo = ({ value }: { value: Halo }) => {
  const dir = useRef(1)
  const speed = useRef(Math.random() * 0.0001 * getRandomInRange(DIRS))
  const halo = useRef<Mesh>()
  useFrame(() => {
    if (!halo.current) {
      return
    }
    if (halo.current.scale.x <= 0.9) {
      dir.current = -dir.current
    } else if (halo.current.scale.x >= 1.1) {
      dir.current = -dir.current
    }
    halo.current.scale.x += speed.current * dir.current
    halo.current.scale.y += speed.current * dir.current
  })
  return (
    <mesh ref={halo} position={value.startpoint}>
      <circleGeometry attach="geometry" args={[value.radius, 128]} />
      <meshBasicMaterial attach="material" color={value.color} />
    </mesh>
  )
}

const Sun = (props: SunProps) => {
  const sun = useRef<Group>()
  const sunshine = useRef<Group>()
  const { sunshines, halos, startpoint } = useSun(props)
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
        return <SunHalo value={halo} />
      })}
    </group>
  )
}

export default Sun

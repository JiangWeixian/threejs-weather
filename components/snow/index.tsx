import React, { useRef } from 'react'
import { Mesh } from 'three'

import { useSnowflakes, useSnowflake, Snowflake, UseSnowflakesProps } from './use-snowflake'

const SnowFlake = ({ value }: { value: Snowflake }) => {
  const flake = useRef<Mesh>()
  useSnowflake(flake, { value })
  return (
    <mesh position={value.startpoint} ref={flake}>
      <circleGeometry attach="geometry" args={[value.radius, 128]} />
      <meshBasicMaterial color="white" attach="material" />
    </mesh>
  )
}

type SnowProps = UseSnowflakesProps & {}

const Snow = (props: SnowProps) => {
  const { snowflakes } = useSnowflakes(props)
  return (
    <>
      {snowflakes.map((snowflake) => {
        return <SnowFlake value={snowflake} />
      })}
    </>
  )
}

export default Snow

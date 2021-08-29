import React, { useRef } from 'react'
import { Mesh } from 'three'
import { Style } from '../interface'
import { a } from '@react-spring/three'

import { useSnowflakes, useSnowflake, Snowflake, UseSnowflakesProps } from './use-snowflake'

type SnowFlakeProps = {
  value: Snowflake
  style?: Style
}

const SnowFlake = ({ value, style }: SnowFlakeProps) => {
  const flake = useRef<Mesh>()
  useSnowflake(flake, { value })
  return (
    <a.mesh position={value.startpoint} ref={flake} material-opacity={style?.opacity}>
      <circleGeometry attach="geometry" args={[value.radius, 128]} />
      <meshBasicMaterial color="white" transparent={true} attach="material" />
    </a.mesh>
  )
}

type SnowProps = UseSnowflakesProps & {
  style?: Style
}

const Snow = (props: SnowProps) => {
  const { snowflakes } = useSnowflakes(props)
  console.log(snowflakes)
  return (
    <a.group>
      {snowflakes.map((snowflake, index) => {
        return <SnowFlake key={index} value={snowflake} style={props.style} />
      })}
    </a.group>
  )
}

export default Snow

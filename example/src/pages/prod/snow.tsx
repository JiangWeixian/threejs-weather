import React, { Suspense } from 'react'
import { Stats } from '@react-three/drei'
import { Snow } from 'threejs-weather'

import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

const SnowPage = (props) => {
  return (
    <>
      <Stats />
      <Snow count={Math.floor(props.count)} style={props.style} />
      <Suspense fallback="loading...">
        <WeatherText color="#f1f0ed">{PATHS.snow.name}</WeatherText>
      </Suspense>
    </>
  )
}

export default SnowPage

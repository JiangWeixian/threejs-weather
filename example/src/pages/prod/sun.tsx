import React, { Suspense } from 'react'
import { Stats } from '@react-three/drei'

import { Sun } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

const SunPage = (props) => {
  return (
    <>
      <Stats />
      <Sun style={props.style} count={Math.floor(props.count)} />
      <Suspense fallback="loading...">
        <WeatherText style={props.style}>{PATHS.sun.name}</WeatherText>
      </Suspense>
    </>
  )
}

export default SunPage

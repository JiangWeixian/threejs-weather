import React, { Suspense } from 'react'
import { Stats } from '@react-three/drei'

import { Cloudy } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

const CloudyPage = (props) => {
  return (
    <>
      <Stats />
      <Cloudy style={props.style} count={Math.floor(props.count)} />
      <Stats />
      <Suspense fallback="loading...">
        <WeatherText color="#f1f0ed">{PATHS.cloudy.name}</WeatherText>
      </Suspense>
    </>
  )
}

export default CloudyPage

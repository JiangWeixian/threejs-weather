import React, { Suspense } from 'react'
import { Stats } from '@react-three/drei'

import { Meteors } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

const MeteorsPage = (props) => {

  return (
    <>
      <Stats />
      <Meteors style={props.style} count={Math.floor(props.count)} />
      <Suspense fallback="loading...">
        <WeatherText color="#f1f0ed">{PATHS.meteors.name}</WeatherText>
      </Suspense>
    </>
  )
}

export default MeteorsPage

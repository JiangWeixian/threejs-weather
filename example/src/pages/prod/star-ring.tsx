import React, { Suspense } from 'react'
import { Stats } from '@react-three/drei'

import { StarRings } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

const StarRingsPage = (props) => {
  return (
    <>
      <Stats />
      <StarRings style={props.style} count={Math.floor(props.count)} />
      <Suspense fallback="loading...">
        <WeatherText color="#f1f0ed">{PATHS.starRings.name}</WeatherText>
      </Suspense>
    </>
  )
}

export default StarRingsPage

import React, { Suspense } from 'react'
import { Stats } from '@react-three/drei'
import { PartlyCloudy } from 'threejs-weather'

import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

const PartlyCloudyPage = (props) => {
  return (
    <>
      <Stats />
      <PartlyCloudy style={props.style} count={Math.floor(props.count)} />
      <Suspense fallback="loading...">
        <WeatherText color="#f1f0ed">{PATHS.partlyCloudy.name}</WeatherText>
      </Suspense>
      {/* <Leva /> */}
    </>
  )
}

export default PartlyCloudyPage

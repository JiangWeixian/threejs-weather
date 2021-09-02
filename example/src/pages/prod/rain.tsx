import React, { Suspense } from 'react'
import { Stats, OrbitControls } from '@react-three/drei'

import { Rain, RainRing } from 'threejs-weather'
import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

const RainPage = (props) => {
  return (
    <>
      <OrbitControls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <Stats />
      <Rain count={Math.floor(props.count)} style={props.style} />
      <RainRing style={props.style} />
      <Suspense fallback="loading...">
        <WeatherText style={props.style} color="#f1f0ed">
          {PATHS.rain.name}
        </WeatherText>
      </Suspense>
    </>
  )
}

export default RainPage

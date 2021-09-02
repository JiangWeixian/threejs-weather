import React, { Suspense } from 'react'
import { Stats, OrbitControls } from '@react-three/drei'
import { Haze } from 'threejs-weather'

import { WeatherText } from '@/components/WeatherText'
import { PATHS } from '@/constants'

const HazePage = (props) => {
  return (
    <>
      <OrbitControls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <Suspense fallback="loading...">
        <WeatherText style={props.style} color="#f1f0ed">
          {PATHS.haze.name}
        </WeatherText>
      </Suspense>
      <Stats />
      <Haze count={Math.floor(props.count)} style={props.style} />
    </>
  )
}

export default HazePage

import React, { useMemo, useEffect } from 'react'
import { useLocation, Switch, Route } from 'wouter'
import { useTransition, WeatherProvider, types } from 'threejs-weather'
import { a } from '@react-spring/three'
import { Leva, useControls } from 'leva'
import Sun from '@/pages/prod/sun'
import Cloudy from '@/pages/prod/cloudy'
import StarRing from '@/pages/prod/star-ring'
import Snow from '@/pages/prod/snow'
import Rain from '@/pages/prod/rain'
import Meteors from '@/pages/prod/meteors'
import Haze from '@/pages/prod/haze'
import Fog from '@/pages/prod/fog'
import PartlyCloudy from '@/pages/prod/partly-cloudy'

import { PATHS } from '@/constants'
import { WeatherSwitcher } from '@/components/WeatherSwitcher'

const Transition = () => {
  const [location] = useLocation()
  const defaultCount = useMemo(() => {
    const path = Object.values(PATHS).find((item) => item.path === location)
    return path?.count || 6
  }, [location])
  const [{ count }, set] = useControls(() => ({
    count: {
      value: defaultCount,
      max: 100,
      min: 1,
    },
  }))
  useEffect(() => {
    set({ count: defaultCount })
  }, [defaultCount, set])
  const { transition } = useTransition({ location })
  return transition((style, _location) => {
    return (
      <a.group>
        <Switch location={_location}>
          <Route path={PATHS.partlyCloudy.path}>
            <PartlyCloudy style={style} count={count} />
          </Route>
          <Route path={PATHS.cloudy.path}>
            <Cloudy style={style} count={count} />
          </Route>
          <Route path={PATHS.sun.path}>
            <Sun style={style} count={count} />
          </Route>
          <Route path={PATHS.starRings.path}>
            <StarRing style={style} count={count} />
          </Route>
          <Route path={PATHS.snow.path}>
            <Snow style={style} count={count} />
          </Route>
          <Route path={PATHS.rain.path}>
            <Rain style={style} count={count} />
          </Route>
          <Route path={PATHS.meteors.path}>
            <Meteors style={style} count={count} />
          </Route>
          <Route path={PATHS.haze.path}>
            <Haze style={style} count={count} />
          </Route>
          <Route path={PATHS.fog.path}>
            <Fog style={style} count={count} />
          </Route>
        </Switch>
      </a.group>
    )
  })
}

const RouterViewer = () => {
  const [location] = useLocation()
  return (
    <>
      <WeatherProvider
        defaultType={location.replace('/prod/', '') as types.Weather}
        extra={<WeatherSwitcher />}
      >
        <Transition />
      </WeatherProvider>
      <Leva />
    </>
  )
}

export default RouterViewer

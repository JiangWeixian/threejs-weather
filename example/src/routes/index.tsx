import React, { useMemo, useEffect, useState, useCallback } from 'react'
import { useLocation, Switch, Route, Router } from 'wouter'
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
import { getWeatherType } from '@/utils/weather'

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
  console.log(location)
  const { transition } = useTransition({ location })
  const type = location === '/' ? 'rain' : getWeatherType(location) || 'rain'
  return (
    <WeatherProvider defaultType={type as types.Weather} extra={<WeatherSwitcher />}>
      {transition((style, _location) => {
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
      })}
    </WeatherProvider>
  )
}

const currentLoc = () => window.location.hash.replace('#', '') || '/'

const useHashLocation = () => {
  const [loc, setLoc] = useState(currentLoc())

  useEffect(() => {
    const handler = () => setLoc(currentLoc())

    // subscribe on hash changes
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const navigate = useCallback((to) => (window.location.hash = to), [])

  useEffect(() => {
    if (loc === '/') {
      navigate(PATHS.rain.path)
    }
  }, [loc, navigate])
  return [loc, navigate]
}

const HashRouter = (props) => {
  return <Router hook={useHashLocation as any}>{props.children}</Router>
}

const RouterViewer = () => {
  return (
    <HashRouter>
      <Transition />
      <Leva />
    </HashRouter>
  )
}

export default RouterViewer

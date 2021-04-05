import React from 'react'
import { Switch, HashRouter, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'

import { PATHS } from '@/constants'
import { WeatherSwitcher } from '@/components/WeatherSwitcher'

const ProdSun = Loadable({
  loader: () => import(/* webpackChunkName: "ProdSun" */ '@/pages/prod/sun'),
  loading: () => <div>loading</div>,
})

const PordSnow = Loadable({
  loader: () => import(/* webpackChunkName: "PordSnow" */ '@/pages/prod/snow'),
  loading: () => <div>loading</div>,
})

const ProdStarRings = Loadable({
  loader: () => import(/* webpackChunkName: "ProdStarRings" */ '@/pages/prod/star-ring'),
  loading: () => <div>loading</div>,
})

const ProdCloudy = Loadable({
  loader: () => import(/* webpackChunkName: "ProdCloudy" */ '@/pages/prod/cloudy'),
  loading: () => <div>loading</div>,
})

const ProdMeteors = Loadable({
  loader: () => import(/* webpackChunkName: "ProdMeteors" */ '@/pages/prod/meteors'),
  loading: () => <div>loading</div>,
})

const ProdRain = Loadable({
  loader: () => import(/* webpackChunkName: "ProdRain" */ '@/pages/prod/rain'),
  loading: () => <div>loading</div>,
})

const ProdPartlyCloud = Loadable({
  loader: () => import(/* webpackChunkName: "ProdPartlyCloud" */ '@/pages/prod/partly-cloudy'),
  loading: () => <div>loading</div>,
})

const ProdFog = Loadable({
  loader: () => import(/* webpackChunkName: "ProdFog" */ '@/pages/prod/fog'),
  loading: () => <div>loading</div>,
})

const entry = '/prod/rain'

const RouterViewer = () => {
  return (
    <HashRouter>
      <WeatherSwitcher />
      <Switch>
        <Redirect to={entry} exact={true} from="/" />
        {/* dev */}
        {/* prod */}
        <Route path={PATHS.rain.path}>
          <ProdRain />
        </Route>
        <Route path={PATHS.cloudy.path}>
          <ProdCloudy />
        </Route>
        <Route path={PATHS.partlyCloudy.path}>
          <ProdPartlyCloud />
        </Route>
        <Route path={PATHS.sun.path}>
          <ProdSun />
        </Route>
        <Route path={PATHS.snow.path}>
          <PordSnow />
        </Route>
        <Route path={PATHS.metetors.path}>
          <ProdMeteors />
        </Route>
        <Route path={PATHS.starRing.path}>
          <ProdStarRings />
        </Route>
        <Route path={PATHS.fog.path}>
          <ProdFog />
        </Route>
        {/* not found */}
        <Route path="/">
          <Redirect to={entry} />
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default RouterViewer

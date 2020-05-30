import React from 'react'
import { Switch, HashRouter, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'

// import { DevRoutes } from './dev'

const ProdSun = Loadable({
  loader: () => import(/* webpackChunkName: "ProdSun" */ '@/pages/prod/sun'),
  loading: () => <div>loading</div>,
})

const ProdWind = Loadable({
  loader: () => import(/* webpackChunkName: "ProdWind" */ '@/pages/prod/wind'),
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

const entry = process.env.NODE_ENV === 'development' ? '/rain' : '/prod/rain'

const RouterViewer = () => {
  return (
    <HashRouter>
      <Switch>
        <Redirect to={entry} exact={true} from="/" />
        {/* prod */}
        <Route path="/prod/rain">
          <ProdRain />
        </Route>
        <Route path="/prod/cloudy">
          <ProdCloudy />
        </Route>
        <Route path="/prod/sun">
          <ProdSun />
        </Route>
        <Route path="/prod/snow">
          <PordSnow />
        </Route>
        <Route path="/prod/wind">
          <ProdWind />
        </Route>
        <Route path="/prod/meteors">
          <ProdMeteors />
        </Route>
        <Route path="/prod/star-ring">
          <ProdStarRings />
        </Route>
        {/* dev */}
        {/* <DevRoutes /> */}
        {/* not found */}
        <Route path="/">
          <Redirect to={entry} />
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default RouterViewer

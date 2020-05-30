import React from 'react'
import { Switch, HashRouter, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'

const Rain = Loadable({
  loader: () => import(/* webpackChunkName: "Rain" */ '@/pages/rain'),
  loading: () => <div>loading</div>,
})

const ProdRain = Loadable({
  loader: () => import(/* webpackChunkName: "ProdRain" */ '@/pages/prod/rain'),
  loading: () => <div>loading</div>,
})

const Sun = Loadable({
  loader: () => import(/* webpackChunkName: "Sun" */ '@/pages/sun'),
  loading: () => <div>loading</div>,
})

const ProdSun = Loadable({
  loader: () => import(/* webpackChunkName: "ProdSun" */ '@/pages/prod/sun'),
  loading: () => <div>loading</div>,
})

const Wind = Loadable({
  loader: () => import(/* webpackChunkName: "Wind" */ '@/pages/wind'),
  loading: () => <div>loading</div>,
})

const ProdWind = Loadable({
  loader: () => import(/* webpackChunkName: "ProdWind" */ '@/pages/prod/wind'),
  loading: () => <div>loading</div>,
})

const Snow = Loadable({
  loader: () => import(/* webpackChunkName: "Snow" */ '@/pages/snow'),
  loading: () => <div>loading</div>,
})

const PordSnow = Loadable({
  loader: () => import(/* webpackChunkName: "PordSnow" */ '@/pages/prod/snow'),
  loading: () => <div>loading</div>,
})

const StarRings = Loadable({
  loader: () => import(/* webpackChunkName: "StarRings" */ '@/pages/star-ring'),
  loading: () => <div>loading</div>,
})

const ProdStarRings = Loadable({
  loader: () => import(/* webpackChunkName: "ProdStarRings" */ '@/pages/prod/star-ring'),
  loading: () => <div>loading</div>,
})

const Cloudy = Loadable({
  loader: () => import(/* webpackChunkName: "Cloudy" */ '@/pages/cloudy'),
  loading: () => <div>loading</div>,
})

const ProdCloudy = Loadable({
  loader: () => import(/* webpackChunkName: "ProdCloudy" */ '@/pages/prod/cloudy'),
  loading: () => <div>loading</div>,
})

const Meteors = Loadable({
  loader: () => import(/* webpackChunkName: "Meteors" */ '@/pages/meteors'),
  loading: () => <div>loading</div>,
})

const ProdMeteors = Loadable({
  loader: () => import(/* webpackChunkName: "ProdMeteors" */ '@/pages/prod/meteors'),
  loading: () => <div>loading</div>,
})

const RouterViewer = () => {
  return (
    <HashRouter>
      <Switch>
        <Redirect to="/rain" exact={true} from="/" />
        {process.env.NODE_ENV === 'development' ? (
          <>
            <Route path="/rain">
              <Rain />
            </Route>
            <Route path="/sun">
              <Sun />
            </Route>
            <Route path="/wind">
              <Wind />
            </Route>
            <Route path="/snow">
              <Snow />
            </Route>
            <Route path="/star-rings">
              <StarRings />
            </Route>
            <Route path="/cloudy">
              <Cloudy />
            </Route>
            <Route path="/meteors">
              <Meteors />
            </Route>
          </>
        ) : null}
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
      </Switch>
    </HashRouter>
  )
}

export default RouterViewer

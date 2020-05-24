import React from 'react'
import { Switch, HashRouter, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'

const Rain = Loadable({
  loader: () => import(/* webpackChunkName: "Rain" */ '@/pages/rain'),
  loading: () => <div>loading</div>,
})

const Sun = Loadable({
  loader: () => import(/* webpackChunkName: "Sun" */ '@/pages/sun'),
  loading: () => <div>loading</div>,
})

const Wind = Loadable({
  loader: () => import(/* webpackChunkName: "Wind" */ '@/pages/wind'),
  loading: () => <div>loading</div>,
})

const Snow = Loadable({
  loader: () => import(/* webpackChunkName: "Snow" */ '@/pages/snow'),
  loading: () => <div>loading</div>,
})

const RouterViewer = () => {
  return (
    <HashRouter>
      <Switch>
        <Redirect to="/rain" exact={true} from="/" />
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
      </Switch>
    </HashRouter>
  )
}

export default RouterViewer

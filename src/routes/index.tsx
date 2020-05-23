import React from 'react'
import { Switch, HashRouter, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'

const Rain = Loadable({
  loader: () => import(/* webpackChunkName: "Rain" */ '@/pages/rain'),
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
      </Switch>
    </HashRouter>
  )
}

export default RouterViewer

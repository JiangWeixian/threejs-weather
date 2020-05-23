import React from 'react'
import { Switch, HashRouter, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ '@/pages/Home'),
  loading: () => <div>loading</div>,
})

const In = Loadable({
  loader: () => import(/* webpackChunkName: "In" */ '@/pages/Home/In'),
  loading: () => <div>loading</div>,
})

const RouterViewer = () => {
  return (
    <HashRouter>
      <Switch>
        <Redirect to="/home" exact={true} from="/" />
        <Route path="/home">
          <Home>
            <Switch>
              <Route path="/home/in">
                <In />
              </Route>
            </Switch>
          </Home>
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default RouterViewer

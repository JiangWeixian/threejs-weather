import React from 'react'
import { Switch, HashRouter, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
const Rain = Loadable({
  loader: () => import(/* webpackChunkName: "Rain" */ '@/pages/rain'),
  loading: () => React.createElement('div', null, 'loading'),
})
const Sun = Loadable({
  loader: () => import(/* webpackChunkName: "Sun" */ '@/pages/sun'),
  loading: () => React.createElement('div', null, 'loading'),
})
const Wind = Loadable({
  loader: () => import(/* webpackChunkName: "Wind" */ '@/pages/wind'),
  loading: () => React.createElement('div', null, 'loading'),
})
const Snow = Loadable({
  loader: () => import(/* webpackChunkName: "Snow" */ '@/pages/snow'),
  loading: () => React.createElement('div', null, 'loading'),
})
const StarRings = Loadable({
  loader: () => import(/* webpackChunkName: "StarRings" */ '@/pages/star-ring'),
  loading: () => React.createElement('div', null, 'loading'),
})
const Cloudy = Loadable({
  loader: () => import(/* webpackChunkName: "Cloudy" */ '@/pages/cloudy'),
  loading: () => React.createElement('div', null, 'loading'),
})
const Meteors = Loadable({
  loader: () => import(/* webpackChunkName: "Meteors" */ '@/pages/meteors'),
  loading: () => React.createElement('div', null, 'loading'),
})
const RouterViewer = () => {
  return React.createElement(
    HashRouter,
    null,
    React.createElement(
      Switch,
      null,
      React.createElement(Redirect, { to: '/rain', exact: true, from: '/' }),
      React.createElement(Route, { path: '/rain' }, React.createElement(Rain, null)),
      React.createElement(Route, { path: '/sun' }, React.createElement(Sun, null)),
      React.createElement(Route, { path: '/wind' }, React.createElement(Wind, null)),
      React.createElement(Route, { path: '/snow' }, React.createElement(Snow, null)),
      React.createElement(Route, { path: '/star-rings' }, React.createElement(StarRings, null)),
      React.createElement(Route, { path: '/cloudy' }, React.createElement(Cloudy, null)),
      React.createElement(Route, { path: '/meteors' }, React.createElement(Meteors, null)),
    ),
  )
}
export default RouterViewer

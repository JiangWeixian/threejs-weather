import React from 'react'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

const $ROOT = document.querySelector('#app')

const renderApp = (Component: any) => {
  render(
    <Provider store={store}>
      <Component />
    </Provider>,
    $ROOT,
  )
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp(App)
})

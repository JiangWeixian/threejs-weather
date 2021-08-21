import React from 'react'
import App from './App'
import { render } from 'react-dom'

const $ROOT = document.querySelector('#app')

const renderApp = (Component: any) => {
  render(
    <Component />,
    $ROOT,
  )
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp(App)
})

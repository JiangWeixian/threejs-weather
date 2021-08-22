import App from './App'
import React from 'react'
import { render } from 'react-dom'

const $ROOT = document.querySelector('#app')

const renderApp = (Component: any) => {
  render(<Component />, $ROOT)
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp(App)
})

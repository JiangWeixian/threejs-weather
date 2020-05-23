import React from 'react'
import { hot } from 'react-hot-loader/root'
import RouterViewer from '@/routes'
import './App.styl'

const App = () => {
  return (
    <div className="app">
      this is react-simple webpack template
      <RouterViewer />
    </div>
  )
}

export default hot(App)

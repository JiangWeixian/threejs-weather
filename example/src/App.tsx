import React from 'react'
import { hot } from 'react-hot-loader/root'
import RouterViewer from '@/routes'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0px;
    margin: 0px;
  }
  #app {
    width: 100vw;
    height: 100vh;
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <RouterViewer />
    </>
  )
}

export default hot(App)
import React, { createContext, useState, useCallback, useContext, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Color } from 'three'
import { useSpring, SpringValue } from '@react-spring/three'

import { useTheme, UseThemeProps } from '../hooks/use-theme'

type Config = {
  type?: UseThemeProps['type']
  mode?: UseThemeProps['mode']
  handleChangeType?: (type: UseThemeProps['type']) => void
  handleChangeMode?: (mode?: UseThemeProps['mode']) => void
}

const WeatherContext = createContext<Config>({})

type WeatherProps = {
  children?: React.ReactNode
  defaultType?: UseThemeProps['type']
  defaultMode?: UseThemeProps['mode']
  extra?: React.ReactNode
}

const Container = (props: {
  children?: React.ReactNode
  style: {
    backgroundColor?: SpringValue<any>
  }
}) => {
  const { scene } = useThree()
  useFrame(() => {
    scene.background = new Color(props.style.backgroundColor?.get())
  })
  return <>{props.children}</>
}

export const WeatherProvider = ({
  defaultMode = 'day',
  defaultType = 'sun',
  ...props
}: WeatherProps) => {
  const [type, setType] = useState(defaultType)
  const [mode, setMode] = useState(defaultMode)
  const { bind } = useTheme({ type, mode })
  const { style: _style, ...config } = bind()
  const [style, api] = useSpring(() => ({
    backgroundColor: _style.backgroundColor,
  }))
  useEffect(() => {
    api.start({
      backgroundColor: _style.backgroundColor,
    })
  }, [_style.backgroundColor, api])
  const handleChangeType = useCallback((type: UseThemeProps['type']) => {
    setType(type)
  }, [])
  const handleChangeMode = useCallback((mode: UseThemeProps['mode']) => {
    setMode(mode)
  }, [])
  return (
    <WeatherContext.Provider value={{ type, mode, handleChangeType, handleChangeMode }}>
      {props.extra}
      <Canvas {...config}>
        <Container style={style}>{props.children}</Container>
      </Canvas>
    </WeatherContext.Provider>
  )
}

export const useWeather = () => useContext(WeatherContext)
export const WeatherConsumer = WeatherContext.Consumer

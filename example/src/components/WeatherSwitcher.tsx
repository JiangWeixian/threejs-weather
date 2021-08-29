import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'wouter'
import { useWeather } from 'threejs-weather'
import { useSprings, animated, useSpring } from '@react-spring/web'

import { PATHS } from '@/constants'

const StyledWeatherSwitcher = styled(animated.ul)`
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 1000;
  padding: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  padding: 16px;
  text-align: center;
  font-family: font;
  font-size: 24px;

  li {
    list-style-type: none;
    padding: 0px 4px;
    cursor: pointer;
  }
`

export const WeatherSwitcher = () => {
  const [location, setLocation] = useLocation()
  const values = Object.values(PATHS)
  const index = values.findIndex((v) => v.path === location)
  const [activeIndex, setActiveIndex] = useState<number>(index < 0 ? 0 : index)
  const [springs, set] = useSprings(values.length, (index) => ({
    opacity: 0.2,
  }))
  const color = useSpring({
    color: PATHS[location.replace('/prod/', '')]?.mode === 'light' ? '#000' : '#fff',
  })
  const { handleChangeType } = useWeather()
  useEffect(() => {
    set(((index: number) => {
      if (index !== activeIndex) {
        return { opacity: 0.2 }
      }
      return { opacity: 1 }
    }) as any)
  }, [activeIndex])
  return (
    <StyledWeatherSwitcher style={color}>
      {springs.map((props, i) => {
        return (
          <animated.li
            key={i}
            style={props}
            onClick={() => {
              setActiveIndex(i)
              handleChangeType(values[i].path.replace('/prod/', ''))
              setLocation(values[i].path)
            }}
            onMouseEnter={() => {
              set(((index: number) => {
                if (index !== i && index !== activeIndex) {
                  return { opacity: 0.2 }
                }
                return { opacity: 1 }
              }) as any)
            }}
            onMouseLeave={() => {
              set(((index: number) => {
                if (index === i && index !== activeIndex) {
                  return { opacity: 0.2 }
                }
              }) as any)
            }}
          >
            {values[i].name}
          </animated.li>
        )
      })}
    </StyledWeatherSwitcher>
  )
}

import { CSSProperties } from 'react'
import { Weather } from './interface'

export const dayTheme: Record<
  Weather,
  {
    style: CSSProperties
    shadows?: boolean
  }
> = {
  cloudy: {
    style: {
      backgroundColor: '#3C4245',
    },
  },
  fog: {
    style: {
      backgroundColor: '#000',
    },
    shadows: true,
  },
  haze: {
    style: {
      backgroundColor: '#A2915E',
    },
    shadows: true,
  },
  meteors: {
    style: {
      backgroundColor: '#0F203B',
    },
  },
  'partly-cloudy': {
    style: {
      backgroundColor: '#1677b3',
    },
  },
  rain: {
    style: {
      backgroundColor: '#1677b3',
    },
  },
  snow: {
    style: {
      backgroundColor: '#1677b3',
    },
  },
  'star-rings': {
    style: {
      backgroundColor: '#0F203B',
    },
  },
  sun: {
    style: {
      backgroundColor: '#faf4e8',
    },
  },
}

export const nightTheme = dayTheme

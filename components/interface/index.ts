import type { SpringValue } from '@react-spring/core'

export type Orientation = 'fromTop' | 'fromRight' | 'fromLeft' | 'fromBottom'
export type Weather =
  | 'cloudy'
  | 'fog'
  | 'haze'
  | 'meteors'
  | 'partly-cloudy'
  | 'rain'
  | 'snow'
  | 'sun'
  | 'star-rings'

export type Style = {
  opacity: SpringValue<number>
  scale: SpringValue<number[]>
}

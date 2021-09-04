import { useCallback, useMemo } from 'react'

import { Weather } from '../interface'
import { dayTheme, nightTheme } from '../theme'

export type UseThemeProps = {
  type: Weather
  mode: 'day' | 'night'
}

const theme: Record<UseThemeProps['mode'], typeof dayTheme> = {
  day: dayTheme,
  night: nightTheme,
}

export const useTheme = ({ mode = 'day', type }: UseThemeProps) => {
  const config = useMemo(() => {
    return theme[mode][type]
  }, [mode, type])
  const bind = useCallback(() => {
    return {
      ...config,
      dpr: window.devicePixelRatio,
    }
  }, [config])
  return {
    bind,
  }
}

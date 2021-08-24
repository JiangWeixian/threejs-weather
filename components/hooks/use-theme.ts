import { useCallback, CSSProperties, useMemo } from 'react'

export type UseThemeProps = {
  type:
    | 'cloudy'
    | 'fog'
    | 'haze'
    | 'meteors'
    | 'partly-cloudy'
    | 'rain'
    | 'snow'
    | 'sun'
    | 'star-rings'
  mode: 'day' | 'night'
}

const dayTheme: Record<
  UseThemeProps['type'],
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

const nightTheme = dayTheme

const theme: Record<UseThemeProps['mode'], typeof dayTheme> = {
  day: dayTheme,
  night: nightTheme,
}

export const useTheme = (props: UseThemeProps) => {
  const config = useMemo(() => {
    return theme[props.mode][props.type]
  }, [props.mode, props.type])
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

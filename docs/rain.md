![rain](https://user-images.githubusercontent.com/6839576/83318117-40741480-a264-11ea-9f28-e4e4b55326dd.gif)

## usage

```tsx
import { Rain, useTheme } from 'threejs-weather'
import { Canvas } from 'react-three/fiber'

const RainPage = () => {
  const { bind } = useTheme({ type: 'rain', mode: 'day' })
  return (
    <Canvas
      {...bind()}
    >
      <Rain />
    </Canvas>
  )
}
```

## props

| name  |          description          |  type  | default |
| :---: | :---------------------------: | :----: | :-----: |
| count |  num of raindrop(雨点的数目)  | number |   100   |
| angle | angle of raindrop(下雨的角度) |  deg   |   -45   |
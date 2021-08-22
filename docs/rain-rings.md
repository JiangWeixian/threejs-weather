![rain](https://user-images.githubusercontent.com/6839576/83318117-40741480-a264-11ea-9f28-e4e4b55326dd.gif)

## usage
> 只会在特定角度出现

```tsx
import { Rain, RainRings } from 'threejs-weather'
import { Canvas } from 'react-three/fiber'

const RainPage = () => {
  return (
    <Canvas
      pixelRatio={window.devicePixelRatio}
      style={{ backgroundColor: '#1677b3' }}
    >
      <Rain />
      <RainRings />
    </Canvas>
  )
}
```

可配合[rain-ring](/docs/rain-rings.md)使用

## props

| name  |          description          |  type  | default |
| :---: | :---------------------------: | :----: | :-----: |
| count |  num of rainring(雨斑的数目)  | number |   10   |
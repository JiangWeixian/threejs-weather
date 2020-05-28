![rain](https://user-images.githubusercontent.com/6839576/82968930-f5a69280-a000-11ea-8511-c52dee1c8606.gif)

## usage

```tsx
import { Rain } from 'threejs-weather'

const RainPage = () => {
  return (
    <Canvas
      pixelRatio={window.devicePixelRatio}
      style={{ backgroundColor: '#1677b3' }}
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
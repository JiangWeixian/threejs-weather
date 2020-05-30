## usage
> 只会在特定角度出现

```tsx
import { Rain, RainRings } from 'threejs-weather'

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

## props

| name  |          description          |  type  | default |
| :---: | :---------------------------: | :----: | :-----: |
| count |  num of rainring(雨斑的数目)  | number |   10   |
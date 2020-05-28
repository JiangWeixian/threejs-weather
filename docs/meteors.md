![meteors](https://user-images.githubusercontent.com/6839576/82881928-ed077b00-9f72-11ea-80c8-788bdbe7d38c.gif)

## usage

```tsx
import { Meteors } from 'threejs-weather'

const RainPage = () => {
  return (
    <Canvas
      pixelRatio={window.devicePixelRatio}
      style={{ backgroundColor: '#0F203B' }}
    >
      <Meteors />
    </Canvas>
  )
}
```

## props

| name  |       description        |  type  | default |
| :---: | :----------------------: | :----: | :-----: |
| count | num of meteors(流星数目) | number |   30    |
![snow](https://user-images.githubusercontent.com/6839576/82968936-f7705600-a000-11ea-89ba-b33ed5d7bc77.gif)

## usage

```tsx
import { Snow } from 'threejs-weather'

const CloudyPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#1677b3' }}>
      <Snow />
    </Canvas>
  )
}
```

## props

| name  |          description          |  type  | default |
| :---: | :---------------------------: | :----: | :-----: |
| count |  num of snowflakes(雪花的数目)  | number |   100   |
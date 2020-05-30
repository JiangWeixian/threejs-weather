![cloudy](https://user-images.githubusercontent.com/6839576/83318092-191d4780-a264-11ea-9095-29d5ff180247.gif)

## usage

```tsx
import { Cloudy } from 'threejs-weather'

const CloudyPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: '#3C4245' }}>
      <Cloudy />
    </Canvas>
  )
}
```

## props

| name  |          description          |  type  | default |
| :---: | :---------------------------: | :----: | :-----: |
| count |  num of clouds(云的数目)  | number |   10   |
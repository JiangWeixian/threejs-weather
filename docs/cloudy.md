![cloudy](https://user-images.githubusercontent.com/6839576/82968941-fa6b4680-a000-11ea-8422-77a016cc445e.gif)

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
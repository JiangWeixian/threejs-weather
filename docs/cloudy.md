![cloudy](https://user-images.githubusercontent.com/6839576/83318092-191d4780-a264-11ea-9095-29d5ff180247.gif)

## usage

```tsx
import { Cloudy, useTheme } from 'threejs-weather'
import { Canvas } from '@react-three/fiber'

const CloudyPage = () => {
  const { bind } = useTheme({ type: 'cloudy', mode: 'day' })
  return (
    <Canvas {...bind()}>
      <Cloudy />
    </Canvas>
  )
}
```

## props

| name  |          description          |  type  | default |
| :---: | :---------------------------: | :----: | :-----: |
| count |  num of clouds(云的数目)  | number |   10   |
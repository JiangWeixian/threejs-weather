![snow](https://user-images.githubusercontent.com/6839576/82968936-f7705600-a000-11ea-89ba-b33ed5d7bc77.gif)

## usage

```tsx
import { Snow, useTheme } from 'threejs-weather'
import { Canvas } from 'react-three/fiber'

const CloudyPage = () => {
  const { bind } = useTheme({ type: 'snow', mode: 'day' })
  return (
    <Canvas {...bind()}>
      <Snow />
    </Canvas>
  )
}
```

## props

| name  |          description          |  type  | default |
| :---: | :---------------------------: | :----: | :-----: |
| count |  num of snowflakes(雪花的数目)  | number |   100   |
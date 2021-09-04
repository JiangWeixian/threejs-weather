![meteors](https://user-images.githubusercontent.com/6839576/82881928-ed077b00-9f72-11ea-80c8-788bdbe7d38c.gif)

## usage

```tsx
import { Meteors, useTheme } from 'threejs-weather'
import { Canvas } from 'react-three/fiber'

const Page = () => {
  const { bind } = useTheme({ type: 'meteors', mode: 'day' })
  return (
    <Canvas
      {...bind()}
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
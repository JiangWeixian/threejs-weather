![star-rings](https://user-images.githubusercontent.com/6839576/82881937-f0026b80-9f72-11ea-9cf2-fe2dd3f06937.gif)

## usage

```tsx
import { StarRings, useTheme } from 'threejs-weather'
import { Canvas } from 'react-three/fiber'

const RainPage = () => {
  const { bind } = useTheme({ type: 'snow', mode: 'day' })
  return (
    <Canvas
      {...bind()}
    >
      <StarRings />
    </Canvas>
  )
}
```

## props

| name  |      description       |  type  | default |
| :---: | :--------------------: | :----: | :-----: |
| count | num of rings(星环数目) | number |   50    |
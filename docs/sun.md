![sun](https://user-images.githubusercontent.com/6839576/82881946-f2fd5c00-9f72-11ea-8083-69b4dabd71d5.gif)

## usage

```tsx
import { Sun, useTheme } from 'threejs-weather'
import { Canvas } from 'react-three/fiber'

const RainPage = () => {
  const { bind } = useTheme({ type: 'sun', mode: 'day' })
  return (
    <Canvas
      {...bind()}
    >
      <Sun />
    </Canvas>
  )
}
```

## props

|   name   |              description               |    type     | default |
| :------: | :------------------------------------: | :---------: | :-----: |
| percentX | startpoint offset(太阳初始位置百分比)) | number(0-1) |    1    |
|  count   |     sum of halo(光晕数目)｜number      |      6     |
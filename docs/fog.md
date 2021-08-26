![meteors](https://user-images.githubusercontent.com/6839576/130325909-4cc4b47c-7eb3-4b3a-b643-ded36d627a9c.png)

## usage

```tsx
import { Fog, useTheme } from 'threejs-weather'
import { Canvas } from '@react-three/fiber'

const Page = () => {
  const { bind } = useTheme({ type: 'fog', mode: 'day' })
  return (
    <Canvas
      {...bind()}
    >
      <Fog />
    </Canvas>
  )
}
```
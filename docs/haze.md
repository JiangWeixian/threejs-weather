![meteors](https://user-images.githubusercontent.com/6839576/130325909-4cc4b47c-7eb3-4b3a-b643-ded36d627a9c.png)

## usage

```tsx
import { Haze } from 'threejs-weather'
import { Canvas, extend } from 'react-three-fiber'
import meshline from 'threejs-meshline'

extend(meshline)

const Page = () => {
  return (
    <Canvas
      pixelRatio={window.devicePixelRatio}
      style={{ backgroundColor: '#A2915E' }}
    >
      <Haze />
    </Canvas>
  )
}
```

## props

| name  |          description          |  type  | default |
| :---: | :---------------------------: | :----: | :-----: |
| count |  num of line  | number |   100   |
| angle | angle of line |  deg   |   -45   |
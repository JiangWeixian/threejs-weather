![star-rings](https://user-images.githubusercontent.com/6839576/82881937-f0026b80-9f72-11ea-9cf2-fe2dd3f06937.gif)

## usage

```tsx
import { StarRings } from 'threejs-weather'
import { Canvas, extend } from 'react-three/fiber'
import meshline from 'threejs-meshline'

extend(meshline)

const RainPage = () => {
  return (
    <Canvas
      pixelRatio={window.devicePixelRatio}
      style={{ backgroundColor: '#0F203B' }}
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
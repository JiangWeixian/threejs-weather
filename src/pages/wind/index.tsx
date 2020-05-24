import React, { useRef, useMemo } from "react"
import { useFrame } from "react-three-fiber"
import { Mesh } from "three"
import { Canvas, extend } from "react-three-fiber"

import { Controls } from "@/components/Controls"

const WindBlade = ({ curve, width, color, speed }) => {
  const material = useRef<any>()
  const wind = useRef<Mesh>()
  const dir = useRef(-1)
  const radio = 0.9
  useFrame(() => {
    if (!material.current) {
      return
    }
    material.current.uniforms.dashOffset.value -= speed
    if (material.current.uniforms.opacity.value <= 0) {
      wind.current?.position.set(
        4 - Math.random() * 8,
        4 - Math.random() * 8,
        4 - Math.random() * 8,
      )
      material.current.uniforms.opacity.value += speed * 10
      dir.current = 1
    } else if (material.current.uniforms.opacity.value >= 1) {
      material.current.uniforms.opacity.value -= speed * 10
      dir.current = -1
    } else {
      material.current.uniforms.opacity.value += dir.current * speed * 10
    }
  })
  return (
    <mesh ref={wind}>
      <meshLine attach="geometry" vertices={curve} />
      <meshLineMaterial
        attach="material"
        ref={material}
        transparent={true}
        depthTest={false}
        dashArray={0.1}
        lineWidth={width}
        color={color}
        dashRatio={radio}
      />
    </mesh>
  )
}

const colors = ["#A2CCB6", "#FCEEB5", "#EE786E", "#e0feff", "lightpink", "lightblue"]
const useWind = ({ count }) => {
  const lines = useMemo(
    () =>
      Array(count)
        .fill(0)
        .map(() => {
          const pos = new THREE.Vector3(
            10 - Math.random() * 20,
            10 - Math.random() * 20,
            10 - Math.random() * 20,
          )
          const points = new Array(30)
            .fill(0)
            .map(() =>
              pos
                .add(
                  new THREE.Vector3(
                    4 - Math.random() * 8,
                    4 - Math.random() * 8,
                    2 - Math.random() * 4,
                  ),
                )
                .clone(),
            )
          const curve = new THREE.CatmullRomCurve3(points).getPoints(1000)
          return {
            color: colors[parseInt((colors.length * Math.random()).toString())],
            width: Math.max(0.1, 0.5 * Math.random()),
            speed: Math.max(0.001, 0.0005 * Math.random()),
            curve,
          }
        }),
    [colors, count],
  )
  return {
    lines,
  }
}

const Wind = ({ count }) => {
  const { lines } = useWind({ count })
  return (
    <>
      {lines.map((props, index) => (
        <WindBlade key={index} {...props} />
      ))}
    </>
  )
}

extend(meshline)
const WindPage = () => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} style={{ backgroundColor: "#faf4e8" }}>
      <Controls enableDamping={true} rotateSpeed={0.3} dampingFactor={1} />
      <Wind count={20} />
    </Canvas>
  )
}

export default WindPage

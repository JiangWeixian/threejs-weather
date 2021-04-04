import React, { useEffect, useState } from 'react'

import THREE, { Color } from 'three'

const url = 'https://raw.githubusercontent.com/iondrimba/images/master/buildings.obj'
const loader = new THREE.ObjectLoader()

const Fog = () => {
  const [buildings, setBuildings] = useState(new THREE.Object3D())
  console.log('loading fog')
  useEffect(() => {
    loader.load(url, (obj) => {
      const models = [...obj.children].map((model) => {
        const scale = 0.01

        model.scale.set(scale, scale, scale)
        model.position.set(0, -14, 0)
        model.receiveShadow = true
        model.castShadow = true

        return model
      })

      const boxSize = 3
      const meshParams = {
        color: '#000',
        metalness: 0,
        emissive: '#000',
        roughness: 0.77,
      }
      const max = 0.009
      const min = 0.001
      const material = new THREE.MeshPhysicalMaterial(meshParams)

      for (let i = 0; i < 10; i++) {
        const model = models[Math.floor(Math.random() * Math.floor(models.length))].clone()
        ;(model as any).material = material
        model.scale.y = Math.random() * (max - min + 0.01)
        model.position.x = i * boxSize
        model.position.z = 0 * boxSize

        buildings.add(model)
      }
      setBuildings(buildings)
    })
  }, [])
  return (
    <>
      <fog color="#353c3c" near={1} far={128} />
    </>
  )
}

export default Fog

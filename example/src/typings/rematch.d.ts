import models from '@/store/models'
import { RematchStore, RematchDispatch, RematchRootState } from '@rematch/core'
import { ReactThreeFiber } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type Models = typeof models

export type Store = RematchStore<Models>
export type Dispatch = RematchDispatch<Models>
export type RootState = RematchRootState<Models>

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
      meshLine: any
      meshLineMaterial: any
    }
  }
}

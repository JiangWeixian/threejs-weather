declare namespace JSX {
  interface IntrinsicElements {
    orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
    meshLine: any
    meshLineMaterial: any
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
      meshLine: any
      meshLineMaterial: any
    }
  }
}

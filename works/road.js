import * as THREE from '../build/three.module.js'

export default class road extends THREE.Mesh {
  constructor(x, y, start = false, shape = 1) {
    let geometry = new THREE.BoxGeometry(9.85, 9.85, 0.3)
    if (shape == 2) geometry = THREE.CylinderGeometry(0.125, 0.125, 2.5)
    let material
    if (start) material = new THREE.MeshPhongMaterial({ color: 0xfd8612 })
    else material = new THREE.MeshPhongMaterial({ color: 0xffffff })
    const cube = new THREE.Mesh(geometry, material)
    if (start) cube.name = 'InitialPosition'
    else cube.name = 'street'
    cube.position.set(x, y)
    return cube
  }
}

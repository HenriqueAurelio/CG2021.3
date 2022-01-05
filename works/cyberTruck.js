import * as THREE from '../build/three.module.js'
import { ConvexGeometry } from '../build/jsm/geometries/ConvexGeometry.js'
export default class Cybertruck extends THREE.Mesh {
  constructor() {
    super()
    return this.createCar()
  }

  createCar() {
    var car = new THREE.Group()

    var block = this.createBlock()
    car.add(block)

    this.createTires().forEach((element) => car.add(element))
    car.position.set(0, 20, 0)
    return car
  }

  createBlock() {
    const geometry = new ConvexGeometry([
      new THREE.Vector3(-0.45, 0.26, -0.5).addScaledVector(
        new THREE.Vector3(-0.45, 0.26, -0.5),
        20
      ),
      new THREE.Vector3(0.45, 0.26, -0.5),
      new THREE.Vector3(-0.45, -0.1, -0.48),
      new THREE.Vector3(0.45, -0.1, -0.48),
      // top (4–5)
      new THREE.Vector3(-0.326, 0.5, 0.08),
      new THREE.Vector3(0.326, 0.5, 0.08),
      // middle (6–19)
      new THREE.Vector3(-0.45, -0.1, -0.38),
      new THREE.Vector3(0.45, -0.1, -0.38),
      new THREE.Vector3(-0.45, 0.06, -0.36),
      new THREE.Vector3(0.45, 0.06, -0.36),
      new THREE.Vector3(-0.45, 0.06, -0.24),
      new THREE.Vector3(0.45, 0.06, -0.24),
      new THREE.Vector3(-0.45, -0.15, -0.18),
      new THREE.Vector3(0.45, -0.15, -0.18),
      new THREE.Vector3(-0.45, -0.17, 0.255),
      new THREE.Vector3(0.45, -0.17, 0.255),
      new THREE.Vector3(-0.45, 0.06, 0.303),
      new THREE.Vector3(0.45, 0.06, 0.303),
      new THREE.Vector3(-0.45, 0.06, 0.42),
      new THREE.Vector3(0.45, 0.06, 0.42),
      // upper front (20–23)
      new THREE.Vector3(-0.45, 0.08, 0.47),
      new THREE.Vector3(0.45, 0.08, 0.47),
      new THREE.Vector3(-0.33, 0.045, 0.5),
      new THREE.Vector3(0.33, 0.045, 0.5),
      // lower front (24–27)
      new THREE.Vector3(-0.45, -0.13, 0.46),
      new THREE.Vector3(0.45, -0.13, 0.46),
      new THREE.Vector3(-0.343, -0.13, 0.488),
      new THREE.Vector3(0.343, -0.13, 0.488),
      // bottom flaps (28–31)
      new THREE.Vector3(-0.41, -0.21, -0.173),
      new THREE.Vector3(0.41, -0.21, -0.173),
      new THREE.Vector3(-0.41, -0.23, 0.25),
      new THREE.Vector3(0.41, -0.23, 0.25),
      // windows (32–39)
      new THREE.Vector3(-0.4225, 0.27, -0.14),
      new THREE.Vector3(0.4225, 0.27, -0.14),
      new THREE.Vector3(-0.379, 0.39, -0.13),
      new THREE.Vector3(0.379, 0.39, -0.13),
      new THREE.Vector3(-0.337, 0.47, 0.08),
      new THREE.Vector3(0.337, 0.47, 0.08),
      new THREE.Vector3(-0.425, 0.17, 0.36),
      new THREE.Vector3(0.425, 0.17, 0.36),
    ])
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const mesh = new THREE.Mesh(geometry, material)
    return mesh
  }

  createBodywork() {}

  createHeadlights() {}

  createWindows() {
    //THREE.MeshLambertMaterial
  }

  createTires() {
    var tires = []
    for (let index = 0; index < 4; index++) {
      const geometry = new THREE.TorusGeometry(0.3, 0.1, 8, 100)
      const material = new THREE.MeshPhongMaterial({ color: '#000000' })
      let torus = new THREE.Mesh(geometry, material)
      torus.rotateX(Math.PI / 2)
      tires.push(torus)
    }

    tires[0].position.set(0, 2, 0)
    tires[1].position.set(0, -2, 0)
    tires[2].position.set(4, 2, 0)
    tires[3].position.set(4, -2, 0)

    return tires
  }
}

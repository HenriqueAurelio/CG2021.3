import * as THREE from '../build/three.module.js'

export default class car {
  constructor(scene) {
    this.scene = scene
    this.createCar()
  }

  createTire() {
    const geometry = new THREE.TorusGeometry(0.3, 0.1, 8, 100)
    const material = new THREE.MeshPhongMaterial({ color: 'rgb(0, 0, 213)' })
    const torus = new THREE.Mesh(geometry, material)
    return torus
  }

  createAxis() {
    const CylinderGeometry = new THREE.CylinderGeometry(0.125, 0.125, 3)
    const cylinderMaterial = new THREE.MeshPhongMaterial({
      color: 'rgb(255, 0, 0)',
    })
    const cylinder = new THREE.Mesh(CylinderGeometry, cylinderMaterial)
    return cylinder
  }
  
  createCube(x, y, z) {
    const geometry = new THREE.BoxGeometry(x, y, z)
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    return cube
  }

  createCar() {
    //Adding car to the scene
    var tire1 = this.createTire()
    this.scene.add(tire1)
    var tire2 = this.createTire()
    this.scene.add(tire2)
    var tire3 = this.createTire()
    this.scene.add(tire3)
    var tire4 = this.createTire()
    this.scene.add(tire4)
    var frontAxis = this.createAxis()
    this.scene.add(frontAxis)
    var backAxis = this.createAxis()
    this.scene.add(backAxis)

    var front = this.createCube(1, 2, 2.5)
    front.add(frontAxis)
    front.position.set(0, 0, 1.5)
    frontAxis.position.set(0, 0, -1.126)
    this.scene.add(front)

    var back = this.createCube(4, 2, 4)
    back.add(backAxis)
    back.position.set(2.5, 0, 2.24)
    backAxis.position.set(1, 0, -1.865)
    this.scene.add(back)

    //Grouping tires with axis
    frontAxis.add(tire1)
    frontAxis.add(tire2)
    backAxis.add(tire3)
    backAxis.add(tire4)

    //Setting position to the axis and tire
    tire1.position.set(0, 1.5, 0)
    tire1.rotateX(Math.PI / 2)
    tire2.position.set(0, -1.5, 0)
    tire2.rotateX(Math.PI / 2)

    tire3.position.set(0, 1.5, 0)
    tire3.rotateX(Math.PI / 2)
    tire4.position.set(0, -1.5, 0)
    tire4.rotateX(Math.PI / 2)
  }
}

import * as THREE from '../build/three.module.js'

export default class carGroup {
  constructor() {
    return this.createCar()
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
    var tire2 = this.createTire()
    var tire3 = this.createTire()
    var tire4 = this.createTire()
    var frontAxis = this.createAxis()
    var backAxis = this.createAxis()
    var front = this.createCube(1, 2, 2.4)
    front.position.set(0, 0, 1.55)
    frontAxis.position.set(0, 0, 0.6)

    var back = this.createCube(4, 2, 4)
    back.position.set(2.5, 0, 2.339)
    backAxis.position.set(4, 0, 0.6)

    //Grouping tires with axis

    //Setting position to the axis and tire
    tire1.position.set(0, 1.5, 0.6)
    tire1.rotateX(Math.PI / 2)
    tire2.position.set(0, -1.5, 0.6)
    tire2.rotateX(Math.PI / 2)

    tire3.position.set(4, 1.5, 0.6)
    tire3.rotateX(Math.PI / 2)
    tire4.position.set(4, -1.5, 0.6)
    tire4.rotateX(Math.PI / 2)


    tire1.name = 'tire1';
    tire2.name = 'tire2';

    var carGroup = new THREE.Group()
    carGroup.add(tire1, tire2, tire3, tire4, front, frontAxis, back, backAxis)
    return carGroup
  }
}

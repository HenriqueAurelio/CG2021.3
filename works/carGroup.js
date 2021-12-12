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
    const CylinderGeometry = new THREE.CylinderGeometry(0.125, 0.125, 2.5)
    const cylinderMaterial = new THREE.MeshPhongMaterial({
      color: 'rgb(255, 0, 0)',
    })
    const cylinder = new THREE.Mesh(CylinderGeometry, cylinderMaterial)
    return cylinder
  }

  createCube(x, y, z, color) {
    const geometry = new THREE.BoxGeometry(x, y, z)
    const material = new THREE.MeshPhongMaterial({ color: color })
    const cube = new THREE.Mesh(geometry, material)
    return cube
  }

  createHeadlight(x, y, z, color) {
    const geometry = new THREE.SphereGeometry(x, y, z)
    const material = new THREE.MeshBasicMaterial({ color: color })
    const sphere = new THREE.Mesh(geometry, material)
    return sphere
  }

  createTeste() {
    const geometry = new THREE.TorusGeometry(0.3, 0.1, 8, 100)
    const material = new THREE.MeshPhongMaterial({ color: 'FF0000' })
    const torus = new THREE.Mesh(geometry, material)
    return torus
  }
  createCar() {
    //Adding car to the scene
    var tire1 = this.createTire()
    var tire2 = this.createTire()
    var tire3 = this.createTire()
    var tire4 = this.createTire()
    var frontAxis = this.createAxis()
    var backAxis = this.createAxis()
    var frontColor = '#FF0000'
    var frontHeadColor = '#FFE800'
    var front = this.createCube(1, 2, 2.0, frontColor)
    front.position.set(0, 0, 1.35)
    frontAxis.position.set(0, 0, 0.6)
    var backColor = '#808080'
    var back = this.createCube(3, 2, 3.0, backColor)
    var backHeadLight = this.createHeadlight(0.2, 32, 32, frontColor)
    var backHeadLight2 = this.createHeadlight(0.2, 32, 32, frontColor)
    var frontHeadLight = this.createHeadlight(0.2, 32, 32, frontHeadColor)
    var frontHeadLight2 = this.createHeadlight(0.2, 32, 32, frontHeadColor)
    back.position.set(2.0, 0, 1.85)
    backAxis.position.set(3, 0, 0.6)
    //Grouping tires with axis
    frontHeadLight.position.set(-0.4, 0.5, 1.1)
    frontHeadLight2.position.set(-0.4, -0.5, 1.1)
    backHeadLight.position.set(3.4, 0.7, 1.3)
    backHeadLight2.position.set(3.4, -0.7, 1.3)
    //Setting position to the axis and tire
    tire1.position.set(0, 1.25, 0.6)
    tire1.rotateX(Math.PI / 2)
    tire2.position.set(0, -1.25, 0.6)
    tire2.rotateX(Math.PI / 2)

    tire3.position.set(3, 1.25, 0.6)
    tire3.rotateX(Math.PI / 2)
    tire4.position.set(3, -1.25, 0.6)
    tire4.rotateX(Math.PI / 2)

    tire1.name = 'tire1'
    tire2.name = 'tire2'

    var carGroup = new THREE.Group()
    carGroup.position.set(1, 10, 1.5)
    carGroup.add(
      tire1,
      tire2,
      tire3,
      tire4,
      front,
      frontAxis,
      back,
      backAxis,
      backHeadLight,
      backHeadLight2,
      frontHeadLight,
      frontHeadLight2
    )
    carGroup.rotateZ(11)
    carGroup.name = 'Carro'
    return carGroup
  }
}

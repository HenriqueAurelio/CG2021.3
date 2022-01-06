import * as THREE from '../build/three.module.js'
import { ConvexGeometry } from '../build/jsm/geometries/ConvexGeometry.js'
export default class Cybertruck extends THREE.Object3D {
  constructor() {
    super()
    this.mesh = new THREE.Object3D()
    this.width = 8 * 0.3 //8
    this.height = 7.5 * 0.3 //7.5
    this.depth = 23 * 0.3 //23

    this.createCar()
    this.mesh.name = 'Cybertruck'
    return this.mesh
  }

  createCar() {
    let W = this.width,
      H = this.height,
      D = this.depth,
      flipXVertices = (a) => [-a[0], a[1], a[2]],
      toVectors = (a) => new THREE.Vector3(W * a[0], H * a[1], D * a[2])

    this.createBlock()
    this.createTires()
    this.createWindows()
    this.createDoors()
    this.createCameraPoint()
    this.createHoleForTires()

    //----------------- APAGAR -----------------

    // X. Front Cylinders
    let cylinderGeo = new THREE.CylinderBufferGeometry(
        W * 0.025,
        W * 0.025,
        H * 0.32,
        32
      ),
      cylinderMat = new THREE.MeshStandardMaterial({
        color: 0x969696,
      }),
      leftCylinder = new THREE.Mesh(cylinderGeo, cylinderMat)

    // left
    leftCylinder.position.set(W * 0.33, H * -0.09, D * 0.355)
    leftCylinder.rotation.x = (-5 * Math.PI) / 180
    this.mesh.add(leftCylinder)

    // right
    let rightCylinder = leftCylinder.clone()
    rightCylinder.position.x *= -1
    this.mesh.add(rightCylinder)

    this.mesh.rotateX(Math.PI / 2)

    this.mesh.position.set(0, 20, 0)
  }

  createCameraPoint() {
    const geometry = new THREE.SphereGeometry(0.2, 32, 32)
    const material = new THREE.MeshBasicMaterial({ color: '#FFE800' })
    const sphere = new THREE.Mesh(geometry, material)
    sphere.position.set(0.0, 0.9, 4.5)
    sphere.visible = false
    sphere.name = 'cameraPoint'
    this.mesh.add(sphere)
  }

  createBlock() {
    let W = this.width,
      H = this.height,
      D = this.depth,
      toVectors = (a) => new THREE.Vector3(W * a[0], H * a[1], D * a[2])

    var pontos = [
      // back (0–3)
      [-0.45, 0.26, -0.5],
      [0.45, 0.26, -0.5],
      [-0.45, -0.1, -0.48],
      [0.45, -0.1, -0.48],
      // top (4–5)
      [-0.326, 0.5, 0.08],
      [0.326, 0.5, 0.08],
      // middle (6–19)
      [-0.45, -0.1, -0.38],
      [0.45, -0.1, -0.38],
      [-0.45, 0.06, -0.36],
      [0.45, 0.06, -0.36],
      [-0.45, 0.06, -0.24],
      [0.45, 0.06, -0.24],
      [-0.45, -0.15, -0.18],
      [0.45, -0.15, -0.18],
      [-0.45, -0.17, 0.255],
      [0.45, -0.17, 0.255],
      [-0.45, 0.06, 0.303],
      [0.45, 0.06, 0.303],
      [-0.45, 0.06, 0.42],
      [0.45, 0.06, 0.42],
      // upper front (20–23)
      [-0.45, 0.08, 0.47],
      [0.45, 0.08, 0.47],
      [-0.33, 0.045, 0.5],
      [0.33, 0.045, 0.5],
      // lower front (24–27)
      [-0.45, -0.13, 0.46],
      [0.45, -0.13, 0.46],
      [-0.343, -0.13, 0.488],
      [0.343, -0.13, 0.488],
      // bottom flaps (28–31)
      [-0.41, -0.21, -0.173],
      [0.41, -0.21, -0.173],
      [-0.41, -0.23, 0.25],
      [0.41, -0.23, 0.25],
      // windows (32–39)
      [-0.4225, 0.27, -0.14],
      [0.4225, 0.27, -0.14],
      [-0.379, 0.39, -0.13],
      [0.379, 0.39, -0.13],
      [-0.337, 0.47, 0.08],
      [0.337, 0.47, 0.08],
      [-0.425, 0.17, 0.36],
      [0.425, 0.17, 0.36],
    ]
    const geometry = new ConvexGeometry(pontos.map(toVectors))
    const material = new THREE.MeshPhongMaterial({ color: 0xbac3c8 })
    this.mesh.add(new THREE.Mesh(geometry, material))

    // D. Fuel Cap
    let fuelMat = new THREE.LineBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.25,
    })
    let fuelCapVerticesArr = [
        [0.4502, -0.014, -0.378],
        [0.4502, -0.014, -0.4],
        [0.4502, 0.06, -0.4],
        [0.4502, 0.06, -0.36],
      ],
      fuelCapGeo = new ConvexGeometry(fuelCapVerticesArr.map(toVectors))
    let fuelCap = new THREE.Line(fuelCapGeo, fuelMat)
    this.mesh.add(fuelCap)
  }

  createBodywork() {}

  createLights() {
    lightMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    })

    // XIV. Light Effects
    this.headlight = new THREE.SpotLight(0x30d2d5, 0)
    this.headlight.position.set(0, 0, this.depth * 0.48)
    this.headlight.target.position.set(0, 0, this.depth / 2 + 0.1)
    this.headlight.angle = (75 * Math.PI) / 180
    this.headlight.penumbra = 0.2
    this.headlight.distance = -10
    this.headlight.castShadow = true
    this.headlight.shadow.mapSize = new THREE.Vector2(512, 512)
    this.mesh.add(this.headlight)
    this.mesh.add(this.headlight.target)

    this.rearlight = new THREE.SpotLight(0xd65a65, 0)
    this.rearlight.position.set(0, 0, -this.depth * 0.42)
    this.rearlight.target.position.set(0, 0, -this.depth / 2 - 0.1)
    this.rearlight.angle = (60 * Math.PI) / 180
    this.rearlight.penumbra = 0.2
    this.rearlight.distance = 10
    this.rearlight.castShadow = true
    this.rearlight.shadow.mapSize = new THREE.Vector2(512, 512)
    this.mesh.add(this.rearlight)
    this.mesh.add(this.rearlight.target)
  }

  createWindows() {
    let W = this.width,
      H = this.height,
      D = this.depth,
      toVectors = (a) => new THREE.Vector3(W * a[0], H * a[1], D * a[2])

    let windowMat = new THREE.MeshStandardMaterial({
      color: 0x101010,
    })

    var topWindowVerticesArr = [
      [-0.371, 0.415, -0.13],
      [0.371, 0.415, -0.13],
      [-0.326, 0.5, 0.08],
      [0.326, 0.5, 0.08],
      [-0.4145, 0.2, 0.36],
      [0.4145, 0.2, 0.36],
    ]

    const topWindowGeo = new ConvexGeometry(topWindowVerticesArr.map(toVectors))
    this.mesh.add(new THREE.Mesh(topWindowGeo, windowMat))

    // Side Windows
    let sideWindowsVerticesArr = [
      [-0.4, 0.27, -0.14],
      [0.4, 0.27, -0.14],
      [-0.351, 0.39, -0.13],
      [0.351, 0.39, -0.13],
      [-0.315, 0.47, 0.08],
      [0.315, 0.47, 0.08],
      [-0.43, 0.17, 0.36],
      [0.43, 0.17, 0.36],
    ]
    const sideWindowsGeo = new ConvexGeometry(
      sideWindowsVerticesArr.map(toVectors)
    )
    let sideWindows = new THREE.Mesh(sideWindowsGeo, windowMat)
    this.mesh.add(sideWindows)
  }

  createDoors() {
    let W = this.width,
      H = this.height,
      D = this.depth,
      flipXVertices = (a) => [-a[0], a[1], a[2]],
      toVectors = (a) => new THREE.Vector3(W * a[0], H * a[1], D * a[2])

    // B. Door Handles
    let doorHandleGeo = new THREE.BoxGeometry(W * 0.01, W * 0.024, D * 0.0375),
      doorHandleFR = new THREE.Mesh(
        doorHandleGeo,
        new THREE.MeshPhongMaterial({ color: 0x000000 })
      )

    // front right
    doorHandleFR.position.set(W * -0.45, H * 0.13, D * 0.0844)
    doorHandleFR.rotation.x = (4 * Math.PI) / 180

    // front left
    let doorHandleFL = doorHandleFR.clone()
    doorHandleFL.position.x *= -1

    // back right
    let doorHandleBR = doorHandleFR.clone()
    doorHandleBR.position.y = H * 0.165
    doorHandleBR.position.z = D * -0.1094

    // back left
    let doorHandleBL = doorHandleBR.clone()
    doorHandleBL.position.x *= -1

    this.mesh.add(doorHandleFR, doorHandleFL, doorHandleBR, doorHandleBL)
  }

  createTires() {
    let W = this.width,
      H = this.height,
      D = this.depth,
      flipXVertices = (a) => [-a[0], a[1], a[2]],
      toVectors = (a) => new THREE.Vector3(W * a[0], H * a[1], D * a[2])

    let wheelGeo = new THREE.CylinderBufferGeometry(
        H * 0.23,
        H * 0.23,
        W * 0.14,
        32
      ),
      wheelMat = new THREE.MeshLambertMaterial({
        color: 0x1c1c1c,
      })

    this.wheels = [new THREE.Mesh(wheelGeo, wheelMat)]

    this.wheels[0].position.set(W * 0.43, H * -0.27, D * 0.36)
    this.wheels[0].rotation.z = -Math.PI / 2
    this.wheels[0].castShadow = true
    this.wheels[0].receiveShadow = true
    this.wheels[0].name = 'tire1'
    this.mesh.add(this.wheels[0])

    var clone = this.wheels[0].clone()
    clone.name = 'tire2'

    this.wheels.push(clone)
    this.wheels[1].position.set(W * -0.43, H * -0.27, D * 0.36)
    this.wheels[1].rotation.z = Math.PI / 2
    this.mesh.add(this.wheels[1])

    clone = this.wheels[0].clone()
    clone.name = 'tire3'

    this.wheels.push(clone)
    this.wheels[2].position.set(W * 0.43, H * -0.27, D * -0.3)
    this.wheels[2].rotation.z = -Math.PI / 2
    this.mesh.add(this.wheels[2])

    clone = this.wheels[0].clone()
    clone.name = 'tire4'

    this.wheels.push(clone)
    this.wheels[3].position.set(W * -0.43, H * -0.27, D * -0.3)
    this.wheels[3].rotation.z = Math.PI / 2
    this.mesh.add(this.wheels[3])

    // VI. Left Side Part Above Wheels
    let sideMat = new THREE.MeshStandardMaterial({
        color: 0x2b2b2b,
      }),
      leftSideVerticesArr = [
        // top (0–19)
        [0.45, -0.1, -0.4],
        [0.5, -0.1, -0.3825],
        [0.45, 0.06, -0.36],
        [0.5, 0.03, -0.35],
        [0.45, 0.06, -0.236],
        [0.5, 0.03, -0.24],
        [0.45, -0.15, -0.18],
        [0.5, -0.15, -0.192],
        [0.41, -0.21, -0.173],
        [0.48, -0.21, -0.19],
        [0.41, -0.23, 0.2498],
        [0.48, -0.23, 0.261],
        [0.45, -0.17, 0.255],
        [0.5, -0.17, 0.263],
        [0.45, 0.06, 0.3015],
        [0.5, 0.03, 0.3035],
        [0.45, 0.06, 0.42],
        [0.5, 0.03, 0.4165],
        [0.45, -0.13, 0.46],
        [0.5, -0.13, 0.45],
        // bottom (20–41)
        [0.45, -0.074, -0.379],
        [0.5, -0.1, -0.3775],
        [0.45, 0.04, -0.35],
        [0.5, 0.015, -0.348],
        [0.45, 0.04, -0.2505],
        [0.5, 0.015, -0.2435],
        [0.45, -0.15, -0.197],
        [0.5, -0.15, -0.197],
        [0.355, -0.29, -0.19],
        [0.4, -0.29, -0.19],
        [0.355, -0.31, 0.2582],
        [0.4, -0.31, 0.26],
        [0.45, -0.17, 0.265],
        [0.5, -0.17, 0.267],
        [0.45, 0.04, 0.3099],
        [0.5, 0.015, 0.3065],
        [0.45, 0.04, 0.418],
        [0.5, 0.015, 0.4135],
        [0.45, -0.13, 0.455],
        [0.5, -0.13, 0.445],
        [0.48, -0.21, -0.194],
        [0.48, -0.23, 0.265],
      ],
      leftSideGeo = new ConvexGeometry(leftSideVerticesArr.map(toVectors))
    let leftSide = new THREE.Mesh(leftSideGeo, sideMat)
    leftSide.castShadow = true
    this.mesh.add(leftSide)

    // VII. Right Side Part Above Wheels
    let rightSideVerticesArr = leftSideVerticesArr.map(flipXVertices),
      rightSideGeo = new ConvexGeometry(rightSideVerticesArr.map(toVectors))

    let rightSide = new THREE.Mesh(rightSideGeo, sideMat)
    rightSide.castShadow = true
    this.mesh.add(rightSide)
  }

  createHoleForTires() {
    var smileyShape = new THREE.Shape()
    smileyShape.absarc(0.0, 0.0, 4.0, 0, Math.PI * 2, false)

    var smileyEye1Path = new THREE.Path()
    smileyEye1Path.absellipse(-1.5, -2.0, 1.0, 1.0, 0, Math.PI * 2, true)

    var smileyEye2Path = new THREE.Path()
    smileyEye2Path.absarc(1.5, -2.0, 1.0, 0, Math.PI * 2, true)

    smileyShape.holes.push(smileyEye1Path)
    smileyShape.holes.push(smileyEye2Path)

    var extrudeSettings = {
      depth: 5,
      bevelEnabled: false,
    }

    var extrudeGeometry = new THREE.ExtrudeGeometry(
      smileyShape,
      extrudeSettings
    )
    var object = new THREE.Mesh(
      extrudeGeometry,
      new THREE.MeshStandardMaterial({
        color: 0x2b2b2b,
      })
    )
    object.position.set(0, 3, 10)
    this.mesh.add(object)
  }
}

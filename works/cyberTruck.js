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
    return this.mesh
  }

  createCar() {
    this.createBlock()
    this.createTires()
    this.createLights()
    this.createWindows()
    this.createDoors()
    this.createCameraPoint()
    // this.createBodywork()
    // this.createSupportParts()
    // this.createTiresDetails()

    this.mesh.position.set(4, 8, 1.5)
    this.mesh.rotateX(Math.PI / 2)
    this.mesh.name = 'Cybertruck'
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

    // D. Fuel C
    for (let i = 0; i < pontos.length; i++) {
      let actualVet = pontos[i]
      actualVet[0] = W * actualVet[0]
      actualVet[1] = H * actualVet[1]
      actualVet[2] = D * actualVet[2]
      pontos[i] = actualVet
    }
    let bodyFacesArr = [
      [pontos[0], pontos[1], pontos[3]],
      [pontos[3], pontos[2], pontos[0]],
      [pontos[0], pontos[4], pontos[5]],
      [pontos[5], pontos[1], pontos[0]],
      [pontos[5], pontos[37], pontos[35]],
      [pontos[1], pontos[5], pontos[35]],
      [pontos[1], pontos[35], pontos[33]],
      [pontos[33], pontos[21], pontos[1]],
      [pontos[39], pontos[21], pontos[33]],
      [pontos[5], pontos[21], pontos[37]],
      [pontos[21], pontos[39], pontos[37]],
      [pontos[4], pontos[34], pontos[36]],
      [pontos[0], pontos[34], pontos[4]],
      [pontos[0], pontos[32], pontos[34]],
      [pontos[32], pontos[0], pontos[20]],
      [pontos[38], pontos[32], pontos[20]],
      [pontos[4], pontos[36], pontos[20]],
      [pontos[20], pontos[36], pontos[38]],
      [pontos[20], pontos[18], pontos[24]],
      [pontos[20], pontos[0], pontos[18]],
      [pontos[18], pontos[0], pontos[16]],
      [pontos[16], pontos[0], pontos[10]],
      [pontos[10], pontos[0], pontos[8]],
      [pontos[8], pontos[0], pontos[2]],
      [pontos[2], pontos[6], pontos[8]],
      [pontos[16], pontos[10], pontos[14]],
      [pontos[12], pontos[14], pontos[10]],
      [pontos[14], pontos[12], pontos[28]],
      [pontos[28], pontos[30], pontos[14]],
      [pontos[21], pontos[25], pontos[19]],
      [pontos[21], pontos[19], pontos[1]],
      [pontos[19], pontos[17], pontos[1]],
      [pontos[17], pontos[11], pontos[1]],
      [pontos[11], pontos[9], pontos[1]],
      [pontos[1], pontos[9], pontos[7]],
      [pontos[7], pontos[3], pontos[1]],
      [pontos[11], pontos[17], pontos[15]],
      [pontos[15], pontos[13], pontos[11]],
      [pontos[15], pontos[31], pontos[29]],
      [pontos[29], pontos[13], pontos[15]],
      [pontos[5], pontos[4], pontos[20]],
      [pontos[20], pontos[21], pontos[5]],
      [pontos[21], pontos[20], pontos[22]],
      [pontos[22], pontos[23], pontos[21]],
      [pontos[22], pontos[20], pontos[24]],
      [pontos[24], pontos[26], pontos[22]],
      [pontos[23], pontos[22], pontos[26]],
      [pontos[26], pontos[27], pontos[23]],
      [pontos[23], pontos[27], pontos[25]],
      [pontos[25], pontos[21], pontos[23]],
      [pontos[2], pontos[3], pontos[7]],
      [pontos[7], pontos[6], pontos[2]],
      [pontos[6], pontos[7], pontos[9]],
      [pontos[9], pontos[8], pontos[6]],
      [pontos[8], pontos[9], pontos[11]],
      [pontos[11], pontos[10], pontos[8]],
      [pontos[10], pontos[11], pontos[13]],
      [pontos[13], pontos[12], pontos[10]],
      [pontos[12], pontos[13], pontos[29]],
      [pontos[29], pontos[28], pontos[12]],
      [pontos[28], pontos[29], pontos[31]],
      [pontos[31], pontos[30], pontos[28]],
      [pontos[30], pontos[31], pontos[15]],
      [pontos[15], pontos[14], pontos[30]],
      [pontos[14], pontos[15], pontos[17]],
      [pontos[17], pontos[16], pontos[14]],
      [pontos[16], pontos[17], pontos[19]],
      [pontos[19], pontos[18], pontos[16]],
      [pontos[18], pontos[19], pontos[25]],
      [pontos[25], pontos[24], pontos[18]],
      [pontos[24], pontos[25], pontos[26]],
      [pontos[25], pontos[27], pontos[26]],
      [pontos[34], pontos[32], pontos[33]],
      [pontos[33], pontos[35], pontos[34]],
      [pontos[34], pontos[35], pontos[37]],
      [pontos[37], pontos[36], pontos[34]],
      [pontos[36], pontos[37], pontos[39]],
      [pontos[39], pontos[38], pontos[36]],
      [pontos[33], pontos[32], pontos[38]],
      [pontos[38], pontos[39], pontos[33]],
    ]
    var geometry = new THREE.BufferGeometry()
    const numberOfFaces = bodyFacesArr.length
    const vertexPerFace = bodyFacesArr[0].length // 3
    const vertexComponents = pontos[0].length // 3
    const size = numberOfFaces * vertexPerFace * vertexComponents
    const buffer = new Float32Array(size)

    let b = 0
    for (let i = 0; i < numberOfFaces; i++) {
      // check all vertices per face
      for (let j = 0; j < vertexPerFace; j++) {
        // check all components per vertex
        for (let k = 0; k < vertexComponents; k++) {
          buffer[b] = bodyFacesArr[i][j][k]
          b++
        }
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(buffer, 3))
    geometry.computeVertexNormals() // to avoid a flat surface
    const material = new THREE.MeshPhongMaterial({ color: 0xbac3c8 })
    material.side = THREE.DoubleSide // Show front and back polygons
    const teacherMesh = new THREE.Mesh(geometry, material)

    this.mesh.add(teacherMesh)
    // let fuelMat = new THREE.LineBasicMaterial({
    //   color: 0x000000,
    //   transparent: true,
    //   opacity: 0.25,
    // })
    // let fuelCapVerticesArr = [
    //     [0.4502, -0.014, -0.378],
    //     [0.4502, -0.014, -0.4],
    //     [0.4502, 0.06, -0.4],
    //     [0.4502, 0.06, -0.36],
    //   ],
    //   fuelCapGeo = new ConvexGeometry(fuelCapVerticesArr.map(toVectors))
    // let fuelCap = new THREE.Line(fuelCapGeo, fuelMat)
    //this.mesh.add(fuelCap)
  }

  createBodywork() {
    let W = this.width,
      H = this.height,
      D = this.depth,
      flipXVertices = (a) => [-a[0], a[1], a[2]],
      toVectors = (a) => new THREE.Vector3(W * a[0], H * a[1], D * a[2])

    // Back
    // A. Connecting Bumper
    let backVerticesArr = [
        [-0.423, -0.1, -0.47],
        [0.423, -0.1, -0.47],
        [-0.423, -0.222, -0.47],
        [0.423, -0.222, -0.47],
        [-0.423, -0.1, -0.38],
        [0.423, -0.1, -0.38],
        [-0.423, -0.285, -0.4],
        [0.423, -0.285, -0.4],
      ],
      backGeo = new ConvexGeometry(backVerticesArr.map(toVectors))
    let backMat = new THREE.MeshStandardMaterial({
      color: 0x101010,
    })
    let back = new THREE.Mesh(backGeo, backMat)
    this.mesh.add(back)

    // B. Red Lines
    let backLightInnerMat = new THREE.MeshBasicMaterial({
      color: 0xd65a65,
    })
    let redLinesMat = new THREE.MeshStandardMaterial({
        color: 0xd81937,
      }),
      leftRedLinesVerticesArr = [
        [0.356, -0.115, -0.4701],
        [0.4231, -0.115, -0.4701],
        [0.4231, -0.115, -0.385],
        [0.356, -0.135, -0.4701],
        [0.4231, -0.135, -0.4701],
        [0.4231, -0.135, -0.387],
      ],
      leftRedLinesGeo = new ConvexGeometry(
        leftRedLinesVerticesArr.map(toVectors)
      )

    // left
    let leftRedLines = new THREE.Mesh(leftRedLinesGeo, redLinesMat)
    this.mesh.add(leftRedLines)

    let leftSmallBackLightVerticesArr = [
        [0.4, -0.135, -0.4702],
        [0.4231, -0.135, -0.4702],
        [0.4, -0.115, -0.4702],
        [0.4231, -0.115, -0.4702],
      ],
      leftSmallBackLightGeo = new ConvexGeometry(
        leftSmallBackLightVerticesArr.map(toVectors)
      )

    let leftSmallBackLight = new THREE.Mesh(
      leftSmallBackLightGeo,
      backLightInnerMat
    )
    this.mesh.add(leftSmallBackLight)

    // right
    let rightRedLinesVerticesArr = leftRedLinesVerticesArr.map(flipXVertices),
      rightRedLinesGeo = new ConvexGeometry(
        rightRedLinesVerticesArr.map(toVectors)
      )

    let rightRedLines = new THREE.Mesh(rightRedLinesGeo, redLinesMat)
    this.mesh.add(rightRedLines)

    let rightSmallBackLightVerticesArr =
        leftSmallBackLightVerticesArr.map(flipXVertices),
      rightSmallBackLightGeo = new ConvexGeometry(
        rightSmallBackLightVerticesArr.map(toVectors)
      )

    let rightSmallBackLight = new THREE.Mesh(
      rightSmallBackLightGeo,
      backLightInnerMat
    )
    this.mesh.add(rightSmallBackLight)

    //------------------------- C. Bumper------------------------------

    let backBumperVerticesArr = [
        [-0.452, -0.15, -0.49],
        [-0.143, -0.15, -0.49],
        [-0.415, -0.223, -0.49],
        [-0.128, -0.223, -0.49],
        [0.143, -0.15, -0.49],
        [0.452, -0.15, -0.49],
        [0.128, -0.223, -0.49],
        [0.415, -0.223, -0.49],
        [-0.208, -0.25, -0.49],
        [0.208, -0.25, -0.49],
        [-0.423, -0.286, -0.4],
        [-0.226, -0.311, -0.4],
        [0.226, -0.311, -0.4],
        [0.423, -0.286, -0.4],
        [-0.424, -0.15, -0.47],
        [-0.143, -0.15, -0.47],
        [0.143, -0.15, -0.47],
        [0.424, -0.15, -0.47],
        [-0.128, -0.223, -0.47],
        [0.128, -0.223, -0.47],
        [-0.5, -0.15, -0.385],
        [-0.424, -0.15, -0.385],
        [0.424, -0.15, -0.385],
        [0.5, -0.15, -0.385],
        [-0.424, -0.223, -0.47],
        [0.424, -0.223, -0.47],
        [-0.226, -0.286, -0.4],
        [0.226, -0.286, -0.4],
      ],
      backBumperGeo = new ConvexGeometry(backBumperVerticesArr.map(toVectors))
    let sideMat = new THREE.MeshStandardMaterial({
      color: 0x2b2b2b,
    })

    let backBumper = new THREE.Mesh(backBumperGeo, sideMat)
    backBumper.castShadow = true
    this.mesh.add(backBumper)

    //------------------- Front Bumper --------------------

    let frontBumperVerticesArr = [
        [-0.5, -0.13, 0.4501],
        [0.5, -0.13, 0.4501],
        [-0.346, -0.13, 0.495],
        [0.346, -0.13, 0.495],
        [-0.5, -0.194, 0.4501],
        [0.5, -0.194, 0.4501],
        [-0.346, -0.194, 0.495],
        [0.346, -0.194, 0.495],
        [-0.466, -0.242, 0.4501],
        [0.466, -0.242, 0.4501],
        [-0.346, -0.242, 0.485],
        [0.346, -0.242, 0.485],
        [-0.346, -0.31, 0.4501],
        [0.346, -0.31, 0.4501],
        [-0.346, -0.194, 0.47],
        [0.346, -0.194, 0.47],
        [-0.346, -0.242, 0.47],
        [0.346, -0.242, 0.47],
      ],
      frontBumperGeo = new ConvexGeometry(frontBumperVerticesArr.map(toVectors))

    let frontBumper = new THREE.Mesh(frontBumperGeo, sideMat)
    frontBumper.castShadow = true
    this.mesh.add(frontBumper)
  }

  createLights() {
    let W = this.width,
      H = this.height,
      D = this.depth,
      flipXVertices = (a) => [-a[0], a[1], a[2]],
      toVectors = (a) => new THREE.Vector3(W * a[0], H * a[1], D * a[2])

    let lightMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    })

    //-------------------- Front Lights ----------------------
    // A. Upper
    let frontLightVerticesArr = [
        [-0.45, 0.075, 0.4701],
        [-0.33, 0.04, 0.4999],
        [0.33, 0.04, 0.4999],
        [0.45, 0.075, 0.4701],

        [-0.45, 0.043, 0.4685],
        [-0.3315, 0.02, 0.4985],
        [0.3315, 0.02, 0.4985],
        [0.45, 0.043, 0.4685],
      ],
      frontLightGeo = new ConvexGeometry(frontLightVerticesArr.map(toVectors))

    let frontLight = new THREE.Mesh(frontLightGeo, lightMat)
    this.mesh.add(frontLight)

    // B. Lower
    let lowerLightMat = new THREE.MeshBasicMaterial({
        color: 0xff9e59,
      }),
      lowerLFrontLightVerticesArr = [
        [0.343, -0.13, 0.4881],
        [0.45, -0.13, 0.4601],
        [0.343, -0.12, 0.4885],
        [0.45, -0.12, 0.4605],
      ],
      lowerLFrontLightGeo = new ConvexGeometry(
        lowerLFrontLightVerticesArr.map(toVectors)
      )

    // left
    let lowerLFrontLight = new THREE.Mesh(lowerLFrontLightGeo, lowerLightMat)
    this.mesh.add(lowerLFrontLight)

    // right
    let lowerRFrontLightVerticesArr =
        lowerLFrontLightVerticesArr.map(flipXVertices),
      lowerRFrontLightGeo = new ConvexGeometry(
        lowerRFrontLightVerticesArr.map(toVectors)
      )

    let lowerRFrontLight = new THREE.Mesh(lowerRFrontLightGeo, lowerLightMat)
    this.mesh.add(lowerRFrontLight)

    // Back Light
    let backLightGeo = new THREE.PlaneGeometry(W * 0.9, H * 0.06),
      backLightMat = new THREE.MeshStandardMaterial({
        color: 0x101010,
      }),
      backLight = new THREE.Mesh(backLightGeo, backLightMat)

    backLightGeo.translate(0, H * 0.03, 0)
    backLight.position.set(0, H * 0.26, D * -0.5)
    backLight.rotation.set((171 * Math.PI) / 180, 0, 0)

    // red part
    let backLightInnerGeo = new THREE.PlaneGeometry(
        W * 0.9 - H * 0.04,
        H * 0.02
      ),
      backLightInnerMat = new THREE.MeshBasicMaterial({
        color: 0xd65a65,
      }),
      backLightInner = new THREE.Mesh(backLightInnerGeo, backLightInnerMat)

    backLightInnerGeo.translate(0, H * 0.03, 0)
    backLightInner.position.set(0, 0, 0.01)
    backLight.add(backLightInner)
    this.mesh.add(backLight)

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

    var windowsPoints = [
      [-0.371, 0.415, -0.13],
      [0.371, 0.415, -0.13],
      [-0.326, 0.5, 0.08],
      [0.326, 0.5, 0.08],
      [-0.4145, 0.2, 0.36],
      [0.4145, 0.2, 0.36],
    ]

    for (let i = 0; i < windowsPoints.length; i++) {
      let actualVet = windowsPoints[i]
      actualVet[0] = W * actualVet[0]
      actualVet[1] = H * actualVet[1]
      actualVet[2] = D * actualVet[2]
      windowsPoints[i] = actualVet
    }
    let windowsFaces = [
      [windowsPoints[1], windowsPoints[0], windowsPoints[2]],
      [windowsPoints[2], windowsPoints[3], windowsPoints[1]],
      [windowsPoints[3], windowsPoints[2], windowsPoints[4]],
      [windowsPoints[4], windowsPoints[5], windowsPoints[3]],
    ]

    let buffer = this.forFunction(windowsFaces, windowsPoints)
    let geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(buffer, 3))
    geometry.computeVertexNormals() // to avoid a flat surface
    const material = windowMat
    material.side = THREE.DoubleSide // Show front and back polygons
    const windowMesh = new THREE.Mesh(geometry, material)
    this.mesh.add(windowMesh)

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

    //DoorOutLine
    let doorOutlineMat = new THREE.LineBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.25,
      }),
      doorOutlineFLVerticesArr = [
        [0.451, -0.17, 0.255],
        [0.451, 0.12, 0.255],
        [0.425, 0.192, 0.255],
        [0.424, 0.192, 0.255],
      ],
      doorOutlineFLGeo = new ConvexGeometry(
        doorOutlineFLVerticesArr.map(toVectors)
      )

    let doorOutlineFL = new THREE.Line(doorOutlineFLGeo, doorOutlineMat)
    this.mesh.add(doorOutlineFL)

    // front right
    let doorOutlineFRVerticesArr = doorOutlineFLVerticesArr.map(flipXVertices),
      doorOutlineFRGeo = new ConvexGeometry(
        doorOutlineFRVerticesArr.map(toVectors)
      )

    let doorOutlineFR = new THREE.Line(doorOutlineFRGeo, doorOutlineMat)
    this.mesh.add(doorOutlineFR)

    // middle left
    let doorOutlineMLVerticesArr = [
        [0.41, -0.23, 0.0594],
        [0.4505, -0.16, 0.0594],
        [0.4505, 0.156, 0.0531],
        [0.424, 0.233, 0.05],
        [0.41, 0.233, 0.048],
      ],
      doorOutlineMLGeo = new ConvexGeometry(
        doorOutlineMLVerticesArr.map(toVectors)
      )

    let doorOutlineML = new THREE.Line(doorOutlineMLGeo, doorOutlineMat)
    this.mesh.add(doorOutlineML)

    // middle right
    let doorOutlineMRVerticesArr = doorOutlineMLVerticesArr.map(flipXVertices),
      doorOutlineMRGeo = new ConvexGeometry(
        doorOutlineMRVerticesArr.map(toVectors)
      )

    let doorOutlineMR = new THREE.Line(doorOutlineMRGeo, doorOutlineMat)
    this.mesh.add(doorOutlineMR)

    // back left
    let doorOutlineBLVerticesArr = [
        [0.399, -0.23, -0.1313],
        [0.45, -0.152, -0.1359],
        [0.4505, 0.195, -0.1406],
        [0.424, 0.2705, -0.1396],
        [0.4, 0.2705, -0.1396],
      ],
      doorOutlineBLGeo = new ConvexGeometry(
        doorOutlineBLVerticesArr.map(toVectors)
      )

    let doorOutlineBL = new THREE.Line(doorOutlineBLGeo, doorOutlineMat)
    this.mesh.add(doorOutlineBL)

    // back right
    let doorOutlineBRVerticesArr = doorOutlineBLVerticesArr.map(flipXVertices),
      doorOutlineBRGeo = new ConvexGeometry(
        doorOutlineBRVerticesArr.map(toVectors)
      )

    let doorOutlineBR = new THREE.Line(doorOutlineBRGeo, doorOutlineMat)
    this.mesh.add(doorOutlineBR)

    // C. Sliding Door
    let slidingDoorMat = new THREE.MeshStandardMaterial({
        color: 0x767c7f,
      }),
      slidingDoorPoints = [
        [-0.35, 0.274, -0.472],
        [0.35, 0.274, -0.472],
        [-0.35, 0.407, -0.145],
        [0.35, 0.407, -0.145],
      ]

    for (let i = 0; i < slidingDoorPoints.length; i++) {
      let actualVet = slidingDoorPoints[i]
      actualVet[0] = W * actualVet[0]
      actualVet[1] = H * actualVet[1]
      actualVet[2] = D * actualVet[2]
      slidingDoorPoints[i] = actualVet
    }

    let geometry = new THREE.BufferGeometry()
    let slidingDoorFacesArr = [
      [slidingDoorPoints[1], slidingDoorPoints[0], slidingDoorPoints[2]],
      [slidingDoorPoints[2], slidingDoorPoints[3], slidingDoorPoints[[1]]],
    ]

    let buffer = this.forFunction(slidingDoorFacesArr, slidingDoorPoints)
    geometry.setAttribute('position', new THREE.BufferAttribute(buffer, 3))
    geometry.computeVertexNormals() // to avoid a flat surface
    const material = slidingDoorMat
    material.side = THREE.DoubleSide // Show front and back polygons
    const slidingDoorMesh = new THREE.Mesh(geometry, material)
    this.mesh.add(slidingDoorMesh)
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

    //-------------------- Hub --------------------

    let wheelHub = new THREE.Object3D()
    wheelHub.position.y = W * 0.075
    this.wheels[0].add(wheelHub)

    let hubBaseGeo = new THREE.CylinderBufferGeometry(
        H * 0.16,
        H * 0.17,
        W * 0.01,
        7
      ),
      hubBaseMat = new THREE.MeshStandardMaterial({
        //color: 0x1a1a1a,
        color: 0xb0b0b0,
      }),
      hubBase = new THREE.Mesh(hubBaseGeo, hubBaseMat)
    wheelHub.add(hubBase)

    let hubCenterGeo = new THREE.TorusBufferGeometry(H * 0.03, H * 0.03, 4, 7),
      hubCenter = new THREE.Mesh(hubCenterGeo, hubBaseMat)
    hubCenter.position.y = W * 0.005
    hubCenter.rotation.x = -Math.PI / 2
    hubCenter.rotation.z = (3 / 28) * Math.PI * 2
    hubBase.add(hubCenter)

    let hubCenterPlateGeo = new THREE.CircleBufferGeometry(H * 0.03, 7),
      hubCenterPlate = new THREE.Mesh(hubCenterPlateGeo, hubBaseMat)
    hubCenterPlate.position.z = W * 0.025
    hubCenter.add(hubCenterPlate)

    let spokeVerticesArr = [
        // back (0–5)
        [-0.02, -0.063, -0.003],
        [0.02, -0.063, -0.003],
        [-0.02, 0.03, -0.003],
        [0.02, 0.03, -0.003],
        [-0.02, 0.063, -0.003],
        [0.02, 0.063, -0.003],
        // front (6–9)
        [-0.015, -0.063, 0.003],
        [0.015, -0.063, 0.003],
        [-0.015, 0.03, 0.003],
        [0.015, 0.03, 0.003],
      ],
      spokeGeo = new ConvexGeometry(spokeVerticesArr.map(toVectors))
    spokeGeo.translate(0, H * 0.1135, 0)

    let spoke = new THREE.Mesh(spokeGeo, hubBaseMat)
    spoke.rotation.z = (3 / 28) * Math.PI * 2
    hubCenter.add(spoke)

    for (let s = 1; s < 7; ++s) {
      let spokeClone = spoke.clone()
      spokeClone.rotation.z += ((Math.PI * 2) / 7) * s
      hubCenter.add(spokeClone)
    }

    //---------------- clone wheels ----------------

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
  }

  createTiresDetails() {
    let W = this.width,
      H = this.height,
      D = this.depth,
      flipXVertices = (a) => [-a[0], a[1], a[2]],
      toVectors = (a) => new THREE.Vector3(W * a[0], H * a[1], D * a[2])

    // AQUI SUA ANTA
    //----------- Left Side Part Above Wheels ---------------
    let paralamasDoSucesso = new THREE.Object3D()

    let sideMat = new THREE.MeshStandardMaterial({
        color: 0x2b2b2b,
      }),
      leftSideVerticesArr = [
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
      ],
      leftSideGeo = new ConvexGeometry(leftSideVerticesArr.map(toVectors))
    let leftSide = new THREE.Mesh(leftSideGeo, sideMat)
    leftSide.castShadow = true
    paralamasDoSucesso.add(leftSide)

    let frontLeftSide = [
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
      ],
      frontLeftSideGeo = new ConvexGeometry(frontLeftSide.map(toVectors))
    let frontLeftSideSide = new THREE.Mesh(frontLeftSideGeo, sideMat)
    frontLeftSideSide.castShadow = true
    paralamasDoSucesso.add(frontLeftSideSide)

    // frontRightSide
    let frontRightSideArr = frontLeftSide.map(flipXVertices),
      frontRightSideGeo = new ConvexGeometry(frontRightSideArr.map(toVectors))

    let frontRightSide = new THREE.Mesh(frontRightSideGeo, sideMat)
    frontRightSide.castShadow = true
    paralamasDoSucesso.add(frontRightSide)

    //--------------------- bottomLeftSide ------------------------

    let bottomLeftSideArr = [
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
    ]
    let bottomLeftSideGeo = new ConvexGeometry(bottomLeftSideArr.map(toVectors))
    let bottomLeftSideSide = new THREE.Mesh(bottomLeftSideGeo, sideMat)
    bottomLeftSideSide.castShadow = true
    // paralamasDoSucesso.add(bottomLeftSideSide)

    // bottomRightSide
    let bottomRightSideArr = bottomLeftSideArr.map(flipXVertices),
      bottomRightSideGeo = new ConvexGeometry(bottomRightSideArr.map(toVectors))

    let bottomRightSide = new THREE.Mesh(bottomRightSideGeo, sideMat)
    bottomRightSide.castShadow = true
    //paralamasDoSucesso.add(bottomRightSide);

    //---------------- Right Side Part Above Wheels ------------------
    let rightSideVerticesArr = leftSideVerticesArr.map(flipXVertices),
      rightSideGeo = new ConvexGeometry(rightSideVerticesArr.map(toVectors))

    let rightSide = new THREE.Mesh(rightSideGeo, sideMat)
    rightSide.castShadow = true
    paralamasDoSucesso.add(rightSide)

    this.mesh.add(paralamasDoSucesso)
  }

  createSupportParts() {
    let W = this.width,
      H = this.height,
      D = this.depth,
      flipXVertices = (a) => [-a[0], a[1], a[2]],
      toVectors = (a) => new THREE.Vector3(W * a[0], H * a[1], D * a[2])

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

    // XI. Axles
    // A. Axels Themselves
    let axleGeo = new THREE.CylinderBufferGeometry(
        W * 0.02,
        W * 0.02,
        W * 0.72,
        32
      ),
      axleMat = new THREE.MeshStandardMaterial({
        color: 0x7f7f7f,
      }),
      frontAxle = new THREE.Mesh(axleGeo, axleMat)

    // front
    frontAxle.position.set(0, H * -0.27, D * 0.36)
    frontAxle.rotation.z = -Math.PI / 2
    this.mesh.add(frontAxle)

    // back
    let backAxle = frontAxle.clone()
    backAxle.position.z = D * -0.3
    this.mesh.add(backAxle)

    //------------- Support Parts -------------------
    let supportMat = new THREE.MeshStandardMaterial({
        color: 0x595959,
      }),
      frontAxleSupportVerticesArr = [
        // back (0–7)
        [-0.3, -0.31, 0.2582],
        [0.3, -0.31, 0.2582],
        [-0.3, -0.17, 0.265],
        [0.3, -0.17, 0.265],
        [-0.3, -0.31, 0.31],
        [0.3, -0.31, 0.31],
        [-0.3, 0.04, 0.31],
        [0.3, 0.04, 0.31],
        // front (8–15)
        [-0.3, -0.31, 0.42],
        [0.3, -0.31, 0.42],
        [-0.3, 0.04, 0.42],
        [0.3, 0.04, 0.42],
        [-0.3, -0.31, 0.45],
        [0.3, -0.31, 0.45],
        [-0.3, -0.13, 0.45],
        [0.3, -0.13, 0.45],
        // right side (16–22)
        [-0.355, -0.31, 0.2582],
        [-0.45, -0.17, 0.265],
        [-0.45, 0.04, 0.3099],
        [-0.45, 0.04, 0.42],
        [-0.45, -0.13, 0.45],
        [-0.45, -0.13, 0.455],
        [-0.346, -0.31, 0.45],
        // left side (23-29)
        [0.355, -0.31, 0.2582],
        [0.45, -0.17, 0.265],
        [0.45, 0.04, 0.3099],
        [0.45, 0.04, 0.42],
        [0.45, -0.13, 0.45],
        [0.45, -0.13, 0.455],
        [0.346, -0.31, 0.45],
      ],
      frontAxleSupportGeo = new ConvexGeometry(
        frontAxleSupportVerticesArr.map(toVectors)
      )

    let frontAxleSupport = new THREE.Mesh(frontAxleSupportGeo, supportMat)
    frontAxleSupport.castShadow = true
    this.mesh.add(frontAxleSupport)

    let backAxleSupportVerticesArr = [
        // back (0–7)
        [-0.3, -0.29, -0.3999],
        [0.3, -0.29, -0.3999],
        [-0.3, -0.1, -0.38],
        [0.3, -0.1, -0.38],
        [-0.3, -0.31, -0.35],
        [0.3, -0.31, -0.35],
        [-0.3, 0.04, -0.35],
        [0.3, 0.04, -0.35],
        // front (8–15)
        [-0.3, -0.31, -0.24],
        [0.3, -0.31, -0.24],
        [-0.3, 0.04, -0.24],
        [0.3, 0.04, -0.24],
        [-0.3, -0.29, -0.19],
        [0.3, -0.29, -0.19],
        [-0.3, -0.15, -0.19],
        [0.3, -0.15, -0.19],
        // right side (16–22)
        [-0.423, -0.285, -0.3999],
        [-0.423, -0.1, -0.3799],
        [-0.45, 0.04, -0.3501],
        [-0.45, 0.04, -0.24],
        [-0.45, -0.15, -0.19],
        [-0.45, -0.15, -0.197],
        [-0.355, -0.29, -0.19],
        // left side (23-29)
        [0.423, -0.285, -0.3999],
        [0.423, -0.1, -0.3799],
        [0.45, 0.04, -0.3501],
        [0.45, 0.04, -0.24],
        [0.45, -0.15, -0.19],
        [0.45, -0.15, -0.197],
        [0.355, -0.29, -0.19],
      ],
      backAxleSupportGeo = new ConvexGeometry(
        backAxleSupportVerticesArr.map(toVectors)
      )

    let backAxleSupport = new THREE.Mesh(backAxleSupportGeo, supportMat)
    backAxleSupport.castShadow = true
    this.mesh.add(backAxleSupport)

    // C. Bottom Plane Between
    let bottomVerticesArr = [
        [-0.355, -0.29, -0.19],
        [-0.3, -0.29, -0.19],
        [0.3, -0.29, -0.19],
        [0.355, -0.29, -0.19],
        [-0.355, -0.31, 0.2582],
        [-0.3, -0.31, 0.2582],
        [0.3, -0.31, 0.2582],
        [0.355, -0.31, 0.2582],
      ],
      bottomGeo = new ConvexGeometry(bottomVerticesArr.map(toVectors))

    let bottom = new THREE.Mesh(bottomGeo, supportMat)
    bottom.castShadow = true
    //this.mesh.add(bottom);
  }

  forFunction(faces, vertices) {
    const numberOfFaces = faces.length
    const vertexPerFace = faces[0].length // 3
    const vertexComponents = vertices[0].length
    const size = numberOfFaces * vertexPerFace * vertexComponents
    let b = 0
    const buffer = new Float32Array(size)
    for (let i = 0; i < numberOfFaces; i++) {
      // check all vertices per face
      for (let j = 0; j < vertexPerFace; j++) {
        // check all components per vertex
        for (let k = 0; k < vertexComponents; k++) {
          buffer[b] = faces[i][j][k]
          b++
        }
      }
    }
    return buffer
  }
}

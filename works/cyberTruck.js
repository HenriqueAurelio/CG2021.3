import * as THREE from '../build/three.module.js'
import { ConvexGeometry } from '../build/jsm/geometries/ConvexGeometry.js'
export default class Cybertruck extends THREE.Object3D {
  constructor() {
    super()
    this.mesh = new THREE.Object3D()
    this.width = 8 * 0.2 //8
    this.height = 7.5 * 0.2 //7.5
    this.depth = 20 * 0.2 //23

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
    this.createBodywork()
    this.createSupportParts()
    this.createTiresDetails()

    this.mesh.position.set(4, 8, 1.5) // 1.5
    this.mesh.rotateX(Math.PI / 2)
    this.mesh.name = 'Cybertruck'
  }

  createCameraPoint() {
    const geometry = new THREE.SphereGeometry(0.2, 32, 32)
    const material = new THREE.MeshPhongMaterial({ color: '#FFE800' })
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
    let backMat = new THREE.MeshPhongMaterial({
      color: 0x101010,
    })
    let back = new THREE.Mesh(backGeo, backMat)
    this.mesh.add(back)

    // B. Red Lines
    let backLightInnerMat = new THREE.MeshLambertMaterial({
      color: 0xd65a65,
    })
    let redLinesMat = new THREE.MeshLambertMaterial({
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
    let sideMat = new THREE.MeshPhongMaterial({
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

    let lightMat = new THREE.MeshLambertMaterial({
      color: 0xffffff,
    })

    /* B. TOP Light
		let topLightVerticesArr = [
      [-0.26,0.49,0.09],
      [0.26, 0.49,0.09],
      [-0.26,0.48,0.1],
      [0.26, 0.48,0.1]
    ],
    topLightGeo = new ConvexGeometry(topLightVerticesArr.map(toVectors));
    let topLight = new THREE.Mesh(topLightGeo,lightMat);
    this.mesh.add(topLight);*/

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
    let lowerLightMat = new THREE.MeshLambertMaterial({
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
      backLightMat = new THREE.MeshLambertMaterial({
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
      backLightInnerMat = new THREE.MeshLambertMaterial({
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

    let windowMat = new THREE.MeshPhongMaterial({
      color: 0x101010,
    })
    windowMat.transparent = true
    windowMat.opacity = 0.96

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
    let slidingDoorMat = new THREE.MeshPhongMaterial({
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
    wheelHub.name = 'calota'

    let hubBaseGeo = new THREE.CylinderBufferGeometry(
        H * 0.16,
        H * 0.17,
        W * 0.01,
        7
      ),
      hubBaseMat = new THREE.MeshLambertMaterial({
        color: 0x2b2b2b,
        //color: 0xb0b0b0,
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

    // X. Front Cylinders
    let cylinderGeo = new THREE.CylinderBufferGeometry(
        W * 0.025,
        W * 0.025,
        H * 0.32,
        32
      ),
      cylinderMat = new THREE.MeshPhongMaterial({
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
      axleMat = new THREE.MeshPhongMaterial({
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
  }

  createTiresDetails() {
    let W = this.width,
      H = this.height,
      D = this.depth,
      flipXVertices = (a) => [-a[0], a[1], a[2]],
      toVectors = (a) => new THREE.Vector3(W * a[0], H * a[1], D * a[2])

    let sideMat = new THREE.MeshPhongMaterial({
        color: 0x2b2b2b,
      }),
      leftPointsDetails = [
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
      ]
    for (let i = 0; i < leftPointsDetails.length; i++) {
      let actualVet = leftPointsDetails[i]
      actualVet[0] = W * actualVet[0]
      actualVet[1] = H * actualVet[1]
      actualVet[2] = D * actualVet[2]
      leftPointsDetails[i] = actualVet
    }

    let leftSideFacesArr = [
      [leftPointsDetails[0], leftPointsDetails[2], leftPointsDetails[3]],
      [leftPointsDetails[3], leftPointsDetails[1], leftPointsDetails[0]],
      [leftPointsDetails[2], leftPointsDetails[4], leftPointsDetails[5]],
      [leftPointsDetails[5], leftPointsDetails[3], leftPointsDetails[2]],
      [leftPointsDetails[4], leftPointsDetails[6], leftPointsDetails[7]],
      [leftPointsDetails[7], leftPointsDetails[5], leftPointsDetails[4]],
      [leftPointsDetails[6], leftPointsDetails[8], leftPointsDetails[9]],
      [leftPointsDetails[9], leftPointsDetails[7], leftPointsDetails[6]],
      [leftPointsDetails[8], leftPointsDetails[10], leftPointsDetails[11]],
      [leftPointsDetails[11], leftPointsDetails[9], leftPointsDetails[8]],
      [leftPointsDetails[10], leftPointsDetails[12], leftPointsDetails[13]],
      [leftPointsDetails[13], leftPointsDetails[11], leftPointsDetails[10]],
      [leftPointsDetails[12], leftPointsDetails[14], leftPointsDetails[15]],
      [leftPointsDetails[15], leftPointsDetails[13], leftPointsDetails[12]],
      [leftPointsDetails[14], leftPointsDetails[16], leftPointsDetails[17]],
      [leftPointsDetails[17], leftPointsDetails[15], leftPointsDetails[14]],
      [leftPointsDetails[16], leftPointsDetails[18], leftPointsDetails[19]],
      [leftPointsDetails[19], leftPointsDetails[17], leftPointsDetails[16]],
      [leftPointsDetails[23], leftPointsDetails[22], leftPointsDetails[20]],
      [leftPointsDetails[20], leftPointsDetails[21], leftPointsDetails[23]],
      [leftPointsDetails[25], leftPointsDetails[24], leftPointsDetails[22]],
      [leftPointsDetails[22], leftPointsDetails[23], leftPointsDetails[25]],
      [leftPointsDetails[27], leftPointsDetails[26], leftPointsDetails[24]],
      [leftPointsDetails[24], leftPointsDetails[25], leftPointsDetails[27]],
      [leftPointsDetails[31], leftPointsDetails[30], leftPointsDetails[28]],
      [leftPointsDetails[28], leftPointsDetails[29], leftPointsDetails[31]],
      [leftPointsDetails[35], leftPointsDetails[34], leftPointsDetails[32]],
      [leftPointsDetails[32], leftPointsDetails[33], leftPointsDetails[35]],
      [leftPointsDetails[37], leftPointsDetails[36], leftPointsDetails[34]],
      [leftPointsDetails[34], leftPointsDetails[35], leftPointsDetails[37]],
      [leftPointsDetails[39], leftPointsDetails[38], leftPointsDetails[36]],
      [leftPointsDetails[36], leftPointsDetails[37], leftPointsDetails[39]],
      [leftPointsDetails[0], leftPointsDetails[1], leftPointsDetails[21]],
      [leftPointsDetails[21], leftPointsDetails[20], leftPointsDetails[0]],
      [leftPointsDetails[20], leftPointsDetails[22], leftPointsDetails[2]],
      [leftPointsDetails[2], leftPointsDetails[0], leftPointsDetails[20]],
      [leftPointsDetails[22], leftPointsDetails[24], leftPointsDetails[4]],
      [leftPointsDetails[4], leftPointsDetails[2], leftPointsDetails[22]],
      [leftPointsDetails[24], leftPointsDetails[26], leftPointsDetails[6]],
      [leftPointsDetails[6], leftPointsDetails[4], leftPointsDetails[24]],
      [leftPointsDetails[26], leftPointsDetails[28], leftPointsDetails[8]],
      [leftPointsDetails[8], leftPointsDetails[6], leftPointsDetails[26]],
      [leftPointsDetails[28], leftPointsDetails[30], leftPointsDetails[10]],
      [leftPointsDetails[10], leftPointsDetails[8], leftPointsDetails[28]],
      [leftPointsDetails[30], leftPointsDetails[32], leftPointsDetails[12]],
      [leftPointsDetails[12], leftPointsDetails[10], leftPointsDetails[30]],
      [leftPointsDetails[32], leftPointsDetails[34], leftPointsDetails[14]],
      [leftPointsDetails[14], leftPointsDetails[12], leftPointsDetails[32]],
      [leftPointsDetails[34], leftPointsDetails[36], leftPointsDetails[16]],
      [leftPointsDetails[16], leftPointsDetails[14], leftPointsDetails[34]],
      [leftPointsDetails[36], leftPointsDetails[38], leftPointsDetails[18]],
      [leftPointsDetails[18], leftPointsDetails[16], leftPointsDetails[36]],
      [leftPointsDetails[3], leftPointsDetails[23], leftPointsDetails[21]],
      [leftPointsDetails[21], leftPointsDetails[1], leftPointsDetails[3]],
      [leftPointsDetails[5], leftPointsDetails[25], leftPointsDetails[23]],
      [leftPointsDetails[23], leftPointsDetails[3], leftPointsDetails[5]],
      [leftPointsDetails[7], leftPointsDetails[27], leftPointsDetails[25]],
      [leftPointsDetails[25], leftPointsDetails[5], leftPointsDetails[7]],
      [leftPointsDetails[27], leftPointsDetails[7], leftPointsDetails[9]],
      [leftPointsDetails[9], leftPointsDetails[40], leftPointsDetails[27]],
      [leftPointsDetails[40], leftPointsDetails[9], leftPointsDetails[29]],
      [leftPointsDetails[26], leftPointsDetails[27], leftPointsDetails[40]],
      [leftPointsDetails[40], leftPointsDetails[29], leftPointsDetails[26]],
      [leftPointsDetails[26], leftPointsDetails[29], leftPointsDetails[28]],
      [leftPointsDetails[11], leftPointsDetails[31], leftPointsDetails[29]],
      [leftPointsDetails[29], leftPointsDetails[9], leftPointsDetails[11]],
      [leftPointsDetails[11], leftPointsDetails[41], leftPointsDetails[31]],
      [leftPointsDetails[13], leftPointsDetails[33], leftPointsDetails[41]],
      [leftPointsDetails[41], leftPointsDetails[11], leftPointsDetails[13]],
      [leftPointsDetails[33], leftPointsDetails[32], leftPointsDetails[30]],
      [leftPointsDetails[30], leftPointsDetails[41], leftPointsDetails[33]],
      [leftPointsDetails[41], leftPointsDetails[10], leftPointsDetails[30]],
      [leftPointsDetails[30], leftPointsDetails[31], leftPointsDetails[41]],
      [leftPointsDetails[15], leftPointsDetails[35], leftPointsDetails[33]],
      [leftPointsDetails[33], leftPointsDetails[13], leftPointsDetails[15]],
      [leftPointsDetails[17], leftPointsDetails[37], leftPointsDetails[35]],
      [leftPointsDetails[35], leftPointsDetails[15], leftPointsDetails[17]],
      [leftPointsDetails[19], leftPointsDetails[39], leftPointsDetails[37]],
      [leftPointsDetails[37], leftPointsDetails[17], leftPointsDetails[19]],
      [leftPointsDetails[38], leftPointsDetails[39], leftPointsDetails[19]],
      [leftPointsDetails[19], leftPointsDetails[18], leftPointsDetails[38]],
    ]
    let geometry = new THREE.BufferGeometry()
    let buffer = this.forFunction(leftSideFacesArr, leftPointsDetails)
    geometry.setAttribute('position', new THREE.BufferAttribute(buffer, 3))
    geometry.computeVertexNormals() // to avoid a flat surface
    const material = sideMat
    material.side = THREE.DoubleSide // Show front and back polygons
    const leftTireDetailsMesh = new THREE.Mesh(geometry, material)
    this.mesh.add(leftTireDetailsMesh)

    //Flipping

    let rightPointDetails = [
      // top (0–19)
      [-0.45, -0.1, -0.4],
      [-0.5, -0.1, -0.3825],
      [-0.45, 0.06, -0.36],
      [-0.5, 0.03, -0.35],
      [-0.45, 0.06, -0.236],
      [-0.5, 0.03, -0.24],
      [-0.45, -0.15, -0.18],
      [-0.5, -0.15, -0.192],
      [-0.41, -0.21, -0.173],
      [-0.48, -0.21, -0.19],
      [-0.41, -0.23, 0.2498],
      [-0.48, -0.23, 0.261],
      [-0.45, -0.17, 0.255],
      [-0.5, -0.17, 0.263],
      [-0.45, 0.06, 0.3015],
      [-0.5, 0.03, 0.3035],
      [-0.45, 0.06, 0.42],
      [-0.5, 0.03, 0.4165],
      [-0.45, -0.13, 0.46],
      [-0.5, -0.13, 0.45],
      // bottom (20–41)
      [-0.45, -0.074, -0.379],
      [-0.5, -0.1, -0.3775],
      [-0.45, 0.04, -0.35],
      [-0.5, 0.015, -0.348],
      [-0.45, 0.04, -0.2505],
      [-0.5, 0.015, -0.2435],
      [-0.45, -0.15, -0.197],
      [-0.5, -0.15, -0.197],
      [-0.355, -0.29, -0.19],
      [-0.4, -0.29, -0.19],
      [-0.355, -0.31, 0.2582],
      [-0.4, -0.31, 0.26],
      [-0.45, -0.17, 0.265],
      [-0.5, -0.17, 0.267],
      [-0.45, 0.04, 0.3099],
      [-0.5, 0.015, 0.3065],
      [-0.45, 0.04, 0.418],
      [-0.5, 0.015, 0.4135],
      [-0.45, -0.13, 0.455],
      [-0.5, -0.13, 0.445],
      [-0.48, -0.21, -0.194],
      [-0.48, -0.23, 0.265],
    ]
    for (let i = 0; i < rightPointDetails.length; i++) {
      let actualVet = rightPointDetails[i]
      actualVet[0] = W * actualVet[0]
      actualVet[1] = H * actualVet[1]
      actualVet[2] = D * actualVet[2]
      rightPointDetails[i] = actualVet
    }

    let rightSideFacesArr = [
      [rightPointDetails[0], rightPointDetails[2], rightPointDetails[3]],
      [rightPointDetails[3], rightPointDetails[1], rightPointDetails[0]],
      [rightPointDetails[2], rightPointDetails[4], rightPointDetails[5]],
      [rightPointDetails[5], rightPointDetails[3], rightPointDetails[2]],
      [rightPointDetails[4], rightPointDetails[6], rightPointDetails[7]],
      [rightPointDetails[7], rightPointDetails[5], rightPointDetails[4]],
      [rightPointDetails[6], rightPointDetails[8], rightPointDetails[9]],
      [rightPointDetails[9], rightPointDetails[7], rightPointDetails[6]],
      [rightPointDetails[8], rightPointDetails[10], rightPointDetails[11]],
      [rightPointDetails[11], rightPointDetails[9], rightPointDetails[8]],
      [rightPointDetails[10], rightPointDetails[12], rightPointDetails[13]],
      [rightPointDetails[13], rightPointDetails[11], rightPointDetails[10]],
      [rightPointDetails[12], rightPointDetails[14], rightPointDetails[15]],
      [rightPointDetails[15], rightPointDetails[13], rightPointDetails[12]],
      [rightPointDetails[14], rightPointDetails[16], rightPointDetails[17]],
      [rightPointDetails[17], rightPointDetails[15], rightPointDetails[14]],
      [rightPointDetails[16], rightPointDetails[18], rightPointDetails[19]],
      [rightPointDetails[19], rightPointDetails[17], rightPointDetails[16]],
      [rightPointDetails[23], rightPointDetails[22], rightPointDetails[20]],
      [rightPointDetails[20], rightPointDetails[21], rightPointDetails[23]],
      [rightPointDetails[25], rightPointDetails[24], rightPointDetails[22]],
      [rightPointDetails[22], rightPointDetails[23], rightPointDetails[25]],
      [rightPointDetails[27], rightPointDetails[26], rightPointDetails[24]],
      [rightPointDetails[24], rightPointDetails[25], rightPointDetails[27]],
      [rightPointDetails[31], rightPointDetails[30], rightPointDetails[28]],
      [rightPointDetails[28], rightPointDetails[29], rightPointDetails[31]],
      [rightPointDetails[35], rightPointDetails[34], rightPointDetails[32]],
      [rightPointDetails[32], rightPointDetails[33], rightPointDetails[35]],
      [rightPointDetails[37], rightPointDetails[36], rightPointDetails[34]],
      [rightPointDetails[34], rightPointDetails[35], rightPointDetails[37]],
      [rightPointDetails[39], rightPointDetails[38], rightPointDetails[36]],
      [rightPointDetails[36], rightPointDetails[37], rightPointDetails[39]],
      [rightPointDetails[0], rightPointDetails[1], rightPointDetails[21]],
      [rightPointDetails[21], rightPointDetails[20], rightPointDetails[0]],
      [rightPointDetails[20], rightPointDetails[22], rightPointDetails[2]],
      [rightPointDetails[2], rightPointDetails[0], rightPointDetails[20]],
      [rightPointDetails[22], rightPointDetails[24], rightPointDetails[4]],
      [rightPointDetails[4], rightPointDetails[2], rightPointDetails[22]],
      [rightPointDetails[24], rightPointDetails[26], rightPointDetails[6]],
      [rightPointDetails[6], rightPointDetails[4], rightPointDetails[24]],
      [rightPointDetails[26], rightPointDetails[28], rightPointDetails[8]],
      [rightPointDetails[8], rightPointDetails[6], rightPointDetails[26]],
      [rightPointDetails[28], rightPointDetails[30], rightPointDetails[10]],
      [rightPointDetails[10], rightPointDetails[8], rightPointDetails[28]],
      [rightPointDetails[30], rightPointDetails[32], rightPointDetails[12]],
      [rightPointDetails[12], rightPointDetails[10], rightPointDetails[30]],
      [rightPointDetails[32], rightPointDetails[34], rightPointDetails[14]],
      [rightPointDetails[14], rightPointDetails[12], rightPointDetails[32]],
      [rightPointDetails[34], rightPointDetails[36], rightPointDetails[16]],
      [rightPointDetails[16], rightPointDetails[14], rightPointDetails[34]],
      [rightPointDetails[36], rightPointDetails[38], rightPointDetails[18]],
      [rightPointDetails[18], rightPointDetails[16], rightPointDetails[36]],
      [rightPointDetails[3], rightPointDetails[23], rightPointDetails[21]],
      [rightPointDetails[21], rightPointDetails[1], rightPointDetails[3]],
      [rightPointDetails[5], rightPointDetails[25], rightPointDetails[23]],
      [rightPointDetails[23], rightPointDetails[3], rightPointDetails[5]],
      [rightPointDetails[7], rightPointDetails[27], rightPointDetails[25]],
      [rightPointDetails[25], rightPointDetails[5], rightPointDetails[7]],
      [rightPointDetails[27], rightPointDetails[7], rightPointDetails[9]],
      [rightPointDetails[9], rightPointDetails[40], rightPointDetails[27]],
      [rightPointDetails[40], rightPointDetails[9], rightPointDetails[29]],
      [rightPointDetails[26], rightPointDetails[27], rightPointDetails[40]],
      [rightPointDetails[40], rightPointDetails[29], rightPointDetails[26]],
      [rightPointDetails[26], rightPointDetails[29], rightPointDetails[28]],
      [rightPointDetails[11], rightPointDetails[31], rightPointDetails[29]],
      [rightPointDetails[29], rightPointDetails[9], rightPointDetails[11]],
      [rightPointDetails[11], rightPointDetails[41], rightPointDetails[31]],
      [rightPointDetails[13], rightPointDetails[33], rightPointDetails[41]],
      [rightPointDetails[41], rightPointDetails[11], rightPointDetails[13]],
      [rightPointDetails[33], rightPointDetails[32], rightPointDetails[30]],
      [rightPointDetails[30], rightPointDetails[41], rightPointDetails[33]],
      [rightPointDetails[41], rightPointDetails[10], rightPointDetails[30]],
      [rightPointDetails[30], rightPointDetails[31], rightPointDetails[41]],
      [rightPointDetails[15], rightPointDetails[35], rightPointDetails[33]],
      [rightPointDetails[33], rightPointDetails[13], rightPointDetails[15]],
      [rightPointDetails[17], rightPointDetails[37], rightPointDetails[35]],
      [rightPointDetails[35], rightPointDetails[15], rightPointDetails[17]],
      [rightPointDetails[19], rightPointDetails[39], rightPointDetails[37]],
      [rightPointDetails[37], rightPointDetails[17], rightPointDetails[19]],
      [rightPointDetails[38], rightPointDetails[39], rightPointDetails[19]],
      [rightPointDetails[19], rightPointDetails[18], rightPointDetails[38]],
    ]
    let geometry2 = new THREE.BufferGeometry()
    let buffer2 = this.forFunction(rightSideFacesArr, rightPointDetails)
    geometry2.setAttribute('position', new THREE.BufferAttribute(buffer2, 3))
    geometry2.computeVertexNormals() // to avoid a flat surface
    // Show front and back polygons
    const rightTireDetailsMesh = new THREE.Mesh(geometry2, material)
    this.mesh.add(rightTireDetailsMesh)
  }

  createSupportParts() {
    let W = this.width,
      H = this.height,
      D = this.depth,
      flipXVertices = (a) => [-a[0], a[1], a[2]],
      toVectors = (a) => new THREE.Vector3(W * a[0], H * a[1], D * a[2])

    //------------- Support Parts -------------------
    let supportMat = new THREE.MeshLambertMaterial({
        color: 0x595959,
      }),
      frontSupportPoints = [
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
        frontSupportPoints.map(toVectors)
      )
    let frontSupportFaces = [
      [frontSupportPoints[2], frontSupportPoints[3], frontSupportPoints[1]],
      [frontSupportPoints[1], frontSupportPoints[0], frontSupportPoints[2]],
      [frontSupportPoints[6], frontSupportPoints[7], frontSupportPoints[3]],
      [frontSupportPoints[3], frontSupportPoints[2], frontSupportPoints[6]],
      [frontSupportPoints[7], frontSupportPoints[6], frontSupportPoints[10]],
      [frontSupportPoints[10], frontSupportPoints[11], frontSupportPoints[7]],
      [frontSupportPoints[11], frontSupportPoints[10], frontSupportPoints[14]],
      [frontSupportPoints[14], frontSupportPoints[15], frontSupportPoints[11]],
      [frontSupportPoints[15], frontSupportPoints[14], frontSupportPoints[12]],
      [frontSupportPoints[12], frontSupportPoints[13], frontSupportPoints[15]],
      [frontSupportPoints[6], frontSupportPoints[2], frontSupportPoints[0]],
      [frontSupportPoints[0], frontSupportPoints[4], frontSupportPoints[6]],
      [frontSupportPoints[10], frontSupportPoints[6], frontSupportPoints[4]],
      [frontSupportPoints[4], frontSupportPoints[8], frontSupportPoints[10]],
      [frontSupportPoints[14], frontSupportPoints[10], frontSupportPoints[8]],
      [frontSupportPoints[8], frontSupportPoints[12], frontSupportPoints[14]],
      [frontSupportPoints[3], frontSupportPoints[7], frontSupportPoints[5]],
      [frontSupportPoints[5], frontSupportPoints[1], frontSupportPoints[3]],
      [frontSupportPoints[7], frontSupportPoints[11], frontSupportPoints[9]],
      [frontSupportPoints[9], frontSupportPoints[5], frontSupportPoints[7]],
      [frontSupportPoints[11], frontSupportPoints[15], frontSupportPoints[13]],
      [frontSupportPoints[13], frontSupportPoints[9], frontSupportPoints[11]],
      [frontSupportPoints[0], frontSupportPoints[1], frontSupportPoints[5]],
      [frontSupportPoints[5], frontSupportPoints[4], frontSupportPoints[0]],
      [frontSupportPoints[4], frontSupportPoints[5], frontSupportPoints[9]],
      [frontSupportPoints[9], frontSupportPoints[8], frontSupportPoints[4]],
      [frontSupportPoints[8], frontSupportPoints[9], frontSupportPoints[13]],
      [frontSupportPoints[13], frontSupportPoints[12], frontSupportPoints[8]],
      [frontSupportPoints[0], frontSupportPoints[2], frontSupportPoints[17]],
      [frontSupportPoints[17], frontSupportPoints[16], frontSupportPoints[0]],
      [frontSupportPoints[6], frontSupportPoints[18], frontSupportPoints[2]],
      [frontSupportPoints[2], frontSupportPoints[18], frontSupportPoints[17]],
      [frontSupportPoints[18], frontSupportPoints[6], frontSupportPoints[10]],
      [frontSupportPoints[10], frontSupportPoints[19], frontSupportPoints[18]],
      [frontSupportPoints[19], frontSupportPoints[10], frontSupportPoints[14]],
      [frontSupportPoints[14], frontSupportPoints[20], frontSupportPoints[19]],
      [frontSupportPoints[19], frontSupportPoints[20], frontSupportPoints[21]],
      [frontSupportPoints[20], frontSupportPoints[14], frontSupportPoints[12]],
      [frontSupportPoints[12], frontSupportPoints[22], frontSupportPoints[20]],
      [frontSupportPoints[3], frontSupportPoints[1], frontSupportPoints[23]],
      [frontSupportPoints[23], frontSupportPoints[24], frontSupportPoints[3]],
      [frontSupportPoints[7], frontSupportPoints[3], frontSupportPoints[24]],
      [frontSupportPoints[24], frontSupportPoints[25], frontSupportPoints[7]],
      [frontSupportPoints[7], frontSupportPoints[25], frontSupportPoints[26]],
      [frontSupportPoints[26], frontSupportPoints[11], frontSupportPoints[7]],
      [frontSupportPoints[11], frontSupportPoints[26], frontSupportPoints[27]],
      [frontSupportPoints[27], frontSupportPoints[15], frontSupportPoints[11]],
      [frontSupportPoints[28], frontSupportPoints[27], frontSupportPoints[26]],
      [frontSupportPoints[15], frontSupportPoints[27], frontSupportPoints[29]],
      [frontSupportPoints[29], frontSupportPoints[13], frontSupportPoints[15]],
    ]

    for (let i = 0; i < frontSupportPoints.length; i++) {
      let actualVet = frontSupportPoints[i]
      actualVet[0] = W * actualVet[0]
      actualVet[1] = H * actualVet[1]
      actualVet[2] = D * actualVet[2]
      frontSupportPoints[i] = actualVet
    }
    let geometry = new THREE.BufferGeometry()
    let buffer = this.forFunction(frontSupportFaces, frontSupportPoints)
    geometry.setAttribute('position', new THREE.BufferAttribute(buffer, 3))
    geometry.computeVertexNormals() // to avoid a flat surface
    const material = supportMat
    material.side = THREE.DoubleSide // Show front and back polygons
    const frontSupportMesh = new THREE.Mesh(geometry, material)
    this.mesh.add(frontSupportMesh)

    let backSupportPoints = [
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
    ]

    let backSupportFaces = [
      [backSupportPoints[2], backSupportPoints[3], backSupportPoints[1]],
      [backSupportPoints[1], backSupportPoints[0], backSupportPoints[2]],
      [backSupportPoints[6], backSupportPoints[7], backSupportPoints[3]],
      [backSupportPoints[3], backSupportPoints[2], backSupportPoints[6]],
      [backSupportPoints[7], backSupportPoints[6], backSupportPoints[10]],
      [backSupportPoints[10], backSupportPoints[11], backSupportPoints[7]],
      [backSupportPoints[11], backSupportPoints[10], backSupportPoints[14]],
      [backSupportPoints[14], backSupportPoints[15], backSupportPoints[11]],
      [backSupportPoints[15], backSupportPoints[14], backSupportPoints[12]],
      [backSupportPoints[12], backSupportPoints[13], backSupportPoints[15]],
      [backSupportPoints[6], backSupportPoints[2], backSupportPoints[0]],
      [backSupportPoints[0], backSupportPoints[4], backSupportPoints[6]],
      [backSupportPoints[10], backSupportPoints[6], backSupportPoints[4]],
      [backSupportPoints[4], backSupportPoints[8], backSupportPoints[10]],
      [backSupportPoints[14], backSupportPoints[10], backSupportPoints[8]],
      [backSupportPoints[8], backSupportPoints[12], backSupportPoints[14]],
      [backSupportPoints[3], backSupportPoints[7], backSupportPoints[5]],
      [backSupportPoints[5], backSupportPoints[1], backSupportPoints[3]],
      [backSupportPoints[7], backSupportPoints[11], backSupportPoints[9]],
      [backSupportPoints[9], backSupportPoints[5], backSupportPoints[7]],
      [backSupportPoints[11], backSupportPoints[15], backSupportPoints[13]],
      [backSupportPoints[13], backSupportPoints[9], backSupportPoints[11]],
      [backSupportPoints[0], backSupportPoints[1], backSupportPoints[5]],
      [backSupportPoints[5], backSupportPoints[4], backSupportPoints[0]],
      [backSupportPoints[4], backSupportPoints[5], backSupportPoints[9]],
      [backSupportPoints[9], backSupportPoints[8], backSupportPoints[4]],
      [backSupportPoints[8], backSupportPoints[9], backSupportPoints[13]],
      [backSupportPoints[13], backSupportPoints[12], backSupportPoints[8]],
      [backSupportPoints[0], backSupportPoints[2], backSupportPoints[17]],
      [backSupportPoints[17], backSupportPoints[16], backSupportPoints[0]],
      [backSupportPoints[6], backSupportPoints[18], backSupportPoints[2]],
      [backSupportPoints[2], backSupportPoints[18], backSupportPoints[17]],
      [backSupportPoints[18], backSupportPoints[6], backSupportPoints[10]],
      [backSupportPoints[10], backSupportPoints[19], backSupportPoints[18]],
      [backSupportPoints[19], backSupportPoints[10], backSupportPoints[14]],
      [backSupportPoints[14], backSupportPoints[20], backSupportPoints[19]],
      [backSupportPoints[20], backSupportPoints[14], backSupportPoints[12]],
      [backSupportPoints[12], backSupportPoints[22], backSupportPoints[20]],
      [backSupportPoints[3], backSupportPoints[1], backSupportPoints[23]],
      [backSupportPoints[23], backSupportPoints[24], backSupportPoints[3]],
      [backSupportPoints[7], backSupportPoints[3], backSupportPoints[24]],
      [backSupportPoints[24], backSupportPoints[25], backSupportPoints[7]],
      [backSupportPoints[7], backSupportPoints[25], backSupportPoints[26]],
      [backSupportPoints[26], backSupportPoints[11], backSupportPoints[7]],
      [backSupportPoints[11], backSupportPoints[26], backSupportPoints[27]],
      [backSupportPoints[27], backSupportPoints[15], backSupportPoints[11]],
      [backSupportPoints[15], backSupportPoints[27], backSupportPoints[29]],
      [backSupportPoints[29], backSupportPoints[13], backSupportPoints[15]],
    ]

    for (let i = 0; i < backSupportPoints.length; i++) {
      let actualVet = backSupportPoints[i]
      actualVet[0] = W * actualVet[0]
      actualVet[1] = H * actualVet[1]
      actualVet[2] = D * actualVet[2]
      backSupportPoints[i] = actualVet
    }
    geometry = new THREE.BufferGeometry()
    buffer = this.forFunction(backSupportFaces, backSupportPoints)
    geometry.setAttribute('position', new THREE.BufferAttribute(buffer, 3))
    geometry.computeVertexNormals() // to avoid a flat surface
    const backSupportMesh = new THREE.Mesh(geometry, material)
    this.mesh.add(backSupportMesh)

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
  flipFunction(vertices) {
    for (let k = 0; k < vertices.length; k++) {
      let actualVet = vertices[k]
      actualVet[0] = -1 * actualVet[0]
      actualVet[1] = actualVet[1]
      actualVet[2] = actualVet[2]
      vertices[k] = actualVet
    }
    return vertices
  }

  reverseFunction(arrayToReverse) {
    let teste2 = arrayToReverse
    let teste = []
    let j = 0
    for (let i = teste2.length - 1; i >= 0; i--, j++) teste[j] = teste2[i]
    return teste
  }
}

/*
// ----------------------------------- physics ------------------------------------

function createFloor() {
  let pos = { x: 0, y: 0, z: -0.5 };
  let scale = { x: 400, y: 0.5, z: 400 };
  let quat = { x: 0, y: 0, z: 0, w: 1 };
  let mass = 0;

  let blockPlane = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({ color: 0xf9c834 }));
  blockPlane.position.set(pos.x, pos.y, pos.z);
  blockPlane.scale.set(scale.x, scale.y, scale.z);
  blockPlane.rotateX(Math.PI / 2)
  blockPlane.castShadow = true;
  blockPlane.receiveShadow = true;
  scene.add(blockPlane);

  // AMMO
   let transform = new Ammo.btTransform();
   transform.setIdentity();
   transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
   transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
   let motionState = new Ammo.btDefaultMotionState(transform);
 
   let colShape = new Ammo.btBoxShape(new Ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5));
   colShape.setMargin(0.05);
 
   let localInertia = new Ammo.btVector3(0, 0, 0);
   colShape.calculateLocalInertia(mass, localInertia);
 
   let rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, colShape, localInertia);
   let body = new Ammo.btRigidBody(rbInfo);
 
   body.setFriction(1);
   body.setRollingFriction(1);
   body.setActivationState(4);
   body.setRestitution(1)
 
   physicsWorld.addRigidBody(body);
}

function createBox() {
  let pos = { x: -10, y: 6, z: 0 }
  let scale = { x: 6, y: 6, z: 6 }
  let quat = { x: 0, y: 0, z: 0, w: 1 };
  let mass = 1;

  let box = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({ color: 0xDC143C }));
  box.position.set(pos.x, pos.y, pos.z);
  box.scale.set(scale.x, scale.y, scale.z);
  box.castShadow = true;
  box.receiveShadow = true;
  scene.add(box);

  // AMMO.js
  let transform = new Ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
  transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
  let motionState = new Ammo.btDefaultMotionState(transform);

  let colShape = new Ammo.btBoxShape(new Ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5));
  colShape.setMargin(0.05);

  let localInertia = new Ammo.btVector3(0, 0, 0);
  colShape.calculateLocalInertia(mass, localInertia);

  let rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, colShape, localInertia);
  let body = new Ammo.btRigidBody(rbInfo);
  body.setActivationState(4);

  physicsWorld.addRigidBody(body);
  rigidBodies.push(box)

  box.userData.physicsBody = body;
  box.userData.draggable = true;
}

var tmpTrans// Ammo.btTransform;
var physicsWorld// Ammo.btDiscreteDynamicsWorld;
var rigidBodies = [];
var resultantImpulse// Ammo.btVector3;

Ammo().then(function (AmmoLib) {

  tmpTrans = new Ammo.btTransform();
  resultantImpulse = new Ammo.btVector3(0, 0, 0);

  setupPhysicsWorld();

  createFloor();
  createBox();
})

function setupPhysicsWorld() {

  let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration(),
    dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration),
    overlappingPairCache = new Ammo.btDbvtBroadphase(),
    solver = new Ammo.btSequentialImpulseConstraintSolver();

  physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
  physicsWorld.setGravity(new Ammo.btVector3(0, 0,-10));

}

function updatePhysics(deltaTime) {

  // Step world
  physicsWorld.stepSimulation(deltaTime, 10);

    // Update rigid bodies
    for (let i = 0; i < rigidBodies.length; i++) {
      let objThree = rigidBodies[i];
      let objAmmo = objThree.userData.physicsBody;
      let ms = objAmmo.getMotionState();
      if (ms) {
        ms.getWorldTransform(tmpTrans);
        let p = tmpTrans.getOrigin();
        let q = tmpTrans.getRotation();
        objThree.position.set(p.x(), p.y(), p.z());
        objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());
      }
    }
}
*/

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

    // XI. Axles
		// A. Axels Themselves
		let axleGeo = new THREE.CylinderBufferGeometry(W*0.02,W*0.02,W*0.72,32),
    axleMat = new THREE.MeshStandardMaterial({
      color: 0x7f7f7f,
    }),
    frontAxle = new THREE.Mesh(axleGeo,axleMat);

    // front
    frontAxle.position.set(0,H*-0.27,D*0.36);
    frontAxle.rotation.z = -Math.PI/2;
    this.mesh.add(frontAxle);

    // back
    let backAxle = frontAxle.clone();
    backAxle.position.z = D*-0.3;
    this.mesh.add(backAxle);

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
    let doorHandleBL = doorHandleBR.clone();
    doorHandleBL.position.x *= -1;
    
    this.mesh.add(
      doorHandleFR,
      doorHandleFL,
      doorHandleBR,
      doorHandleBL
    )

    //DoorOutLine 
    let doorOutlineMat = new THREE.LineBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.25
    }),
    doorOutlineFLVerticesArr = [
      [0.451,-0.17,0.255],
      [0.451,0.12, 0.255],
      [0.425,0.192,0.255],
      [0.424,0.192,0.255]
    ],
    doorOutlineFLGeo = new ConvexGeometry(doorOutlineFLVerticesArr.map(toVectors))

    let doorOutlineFL = new THREE.Line(doorOutlineFLGeo,doorOutlineMat);
    this.mesh.add(doorOutlineFL);

    // front right
    let doorOutlineFRVerticesArr = doorOutlineFLVerticesArr.map(flipXVertices),
    doorOutlineFRGeo = new ConvexGeometry(doorOutlineFRVerticesArr.map(toVectors))

    let doorOutlineFR = new THREE.Line(doorOutlineFRGeo,doorOutlineMat);
    this.mesh.add(doorOutlineFR);

    // middle left
    let doorOutlineMLVerticesArr = [
      [0.41,  -0.23,0.0594],
      [0.4505,-0.16,0.0594],
      [0.4505,0.156,0.0531],
      [0.424, 0.233,0.05],
      [0.41,  0.233,0.048]
    ],
    doorOutlineMLGeo = new ConvexGeometry(doorOutlineMLVerticesArr.map(toVectors))

    let doorOutlineML = new THREE.Line(doorOutlineMLGeo,doorOutlineMat);
    this.mesh.add(doorOutlineML);

    // middle right
    let doorOutlineMRVerticesArr = doorOutlineMLVerticesArr.map(flipXVertices),
      doorOutlineMRGeo = new ConvexGeometry(doorOutlineMRVerticesArr.map(toVectors));

    let doorOutlineMR = new THREE.Line(doorOutlineMRGeo,doorOutlineMat);
    this.mesh.add(doorOutlineMR);

    // back left
    let doorOutlineBLVerticesArr = [
        [0.399, -0.23, -0.1313],
        [0.45,  -0.152,-0.1359],
        [0.4505,0.195, -0.1406],
        [0.424, 0.2705,-0.1396],
        [0.4,   0.2705,-0.1396]
      ],
      doorOutlineBLGeo = new ConvexGeometry(doorOutlineBLVerticesArr.map(toVectors))

    let doorOutlineBL = new THREE.Line(doorOutlineBLGeo,doorOutlineMat);
    this.mesh.add(doorOutlineBL);

    // back right
    let doorOutlineBRVerticesArr = doorOutlineBLVerticesArr.map(flipXVertices),
    doorOutlineBRGeo = new ConvexGeometry(doorOutlineBRVerticesArr.map(toVectors))

    let doorOutlineBR = new THREE.Line(doorOutlineBRGeo,doorOutlineMat);
    this.mesh.add(doorOutlineBR);

    // C. Sliding Door
		let slidingDoorMat = new THREE.MeshStandardMaterial({
      color: 0x767c7f,
    }),
    slidingDoorVerticesArr = [
      [-0.35,0.274,-0.472],
      [0.35, 0.274,-0.472],
      [-0.35,0.407,-0.145],
      [0.35, 0.407,-0.145]
    ],
    slidingDoorGeo = new ConvexGeometry(slidingDoorVerticesArr.map(toVectors));

    let slidingDoor = new THREE.Mesh(slidingDoorGeo,slidingDoorMat);
    this.mesh.add(slidingDoor);
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

		let wheelHub = new THREE.Object3D();
		wheelHub.position.y = W*0.075;
		this.wheels[0].add(wheelHub);

		let hubBaseGeo = new THREE.CylinderBufferGeometry(H*0.16,H*0.17,W*0.01,7),
			hubBaseMat = new THREE.MeshStandardMaterial({
				//color: 0x1a1a1a,
        color: 0xb0b0b0,
			}),
			hubBase = new THREE.Mesh(hubBaseGeo,hubBaseMat);
		wheelHub.add(hubBase);

		let hubCenterGeo = new THREE.TorusBufferGeometry(H*0.03,H*0.03,4,7),
			hubCenter = new THREE.Mesh(hubCenterGeo,hubBaseMat);
		hubCenter.position.y = W*0.005;
		hubCenter.rotation.x = -Math.PI/2;
		hubCenter.rotation.z = 3/28 * Math.PI*2;
		hubBase.add(hubCenter);

		let hubCenterPlateGeo = new THREE.CircleBufferGeometry(H*0.03,7),
			hubCenterPlate = new THREE.Mesh(hubCenterPlateGeo,hubBaseMat);
		hubCenterPlate.position.z = W*0.025;
		hubCenter.add(hubCenterPlate);

		let spokeVerticesArr = [
				// back (0–5)
				[-0.02,-0.063,-0.003],
				[0.02, -0.063,-0.003],
				[-0.02,0.03,  -0.003],
				[0.02, 0.03,  -0.003],
				[-0.02,0.063,-0.003],
				[0.02, 0.063,-0.003],
				// front (6–9)
				[-0.015,-0.063,0.003],
				[0.015, -0.063,0.003],
				[-0.015,0.03,0.003],
				[0.015, 0.03,0.003]
			],
			spokeGeo = new ConvexGeometry(spokeVerticesArr.map(toVectors))
		  spokeGeo.translate(0,H*0.1135,0);

		let spoke = new THREE.Mesh(spokeGeo,hubBaseMat);
		spoke.rotation.z = 3/28 * Math.PI*2;
		hubCenter.add(spoke);

		for (let s = 1; s < 7; ++s) {
			let spokeClone = spoke.clone();
			spokeClone.rotation.z += ((Math.PI*2)/7) * s;
			hubCenter.add(spokeClone);
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
    clone.name = 'tire4';

    this.wheels.push(clone);
    this.wheels[3].position.set(W*-0.43,H*-0.27,D*-0.3);
    this.wheels[3].rotation.z = Math.PI/2;
    this.mesh.add(this.wheels[3]);

    this.createTiresDetails()
  }

  createTiresDetails(){
    let W = this.width,
        H = this.height,
        D = this.depth,
        flipXVertices = a => [-a[0],a[1],a[2]],
        toVectors = a => new THREE.Vector3(W * a[0],H * a[1],D * a[2]);

    // AQUI SUA ANTA
    //----------- Left Side Part Above Wheels ---------------
    let paralamasDoSucesso = new THREE.Object3D();

		let sideMat = new THREE.MeshStandardMaterial({
      color: 0x2b2b2b,
    }),
    leftSideVerticesArr = [
      [0.45, -0.1,  -0.4],
      [0.5,  -0.1,  -0.3825],
      [0.45, 0.06,  -0.36],
      [0.5,  0.03,  -0.35],
      [0.45, 0.06,  -0.236],
      [0.5,  0.03,  -0.24],
      [0.45, -0.15, -0.18],
      [0.5,  -0.15, -0.192],
      [0.41, -0.21, -0.173],
      [0.48, -0.21, -0.19]
    ],
    leftSideGeo = new ConvexGeometry(leftSideVerticesArr.map(toVectors))
    let leftSide = new THREE.Mesh(leftSideGeo,sideMat);
    leftSide.castShadow = true;
    paralamasDoSucesso.add(leftSide);

    let frontLeftSide = [
      [0.41, -0.23, 0.2498],
      [0.48, -0.23, 0.261],
      [0.45, -0.17, 0.255],
      [0.5,  -0.17, 0.263],
      [0.45, 0.06,  0.3015],
      [0.5,  0.03,  0.3035],
      [0.45, 0.06,  0.42],
      [0.5,  0.03,  0.4165],
      [0.45, -0.13, 0.46],
      [0.5,  -0.13, 0.45]
    ],
    frontLeftSideGeo = new ConvexGeometry(frontLeftSide.map(toVectors));
    let frontLeftSideSide = new THREE.Mesh(frontLeftSideGeo,sideMat);
    frontLeftSideSide.castShadow = true;
    paralamasDoSucesso.add(frontLeftSideSide);

    // frontRightSide
    let frontRightSideArr = frontLeftSide.map(flipXVertices),
    frontRightSideGeo = new ConvexGeometry(frontRightSideArr.map(toVectors))

    let frontRightSide = new THREE.Mesh(frontRightSideGeo,sideMat);
    frontRightSide.castShadow = true;
    paralamasDoSucesso.add(frontRightSide);

    //--------------------- bottomLeftSide ------------------------

    let bottomLeftSideArr = [
      [0.45, -0.074,-0.379],
      [0.5,  -0.1,  -0.3775],
      [0.45, 0.04,  -0.35],
      [0.5,  0.015, -0.348],
      [0.45, 0.04,  -0.2505],
      [0.5,  0.015, -0.2435],
      [0.45, -0.15, -0.197],
      [0.5,  -0.15, -0.197],
      [0.355,-0.29, -0.19],
      [0.4,  -0.29, -0.19],
      [0.355,-0.31, 0.2582],
      [0.4,  -0.31, 0.26],
      [0.45, -0.17, 0.265],
      [0.5,  -0.17, 0.267],
      [0.45, 0.04,  0.3099],
      [0.5,  0.015, 0.3065],
      [0.45, 0.04,  0.418],
      [0.5,  0.015, 0.4135],
      [0.45, -0.13, 0.455],
      [0.5,  -0.13, 0.445],
      [0.48, -0.21, -0.194],
      [0.48, -0.23, 0.265]
    ];
    let bottomLeftSideGeo = new ConvexGeometry(bottomLeftSideArr.map(toVectors));
    let bottomLeftSideSide = new THREE.Mesh(bottomLeftSideGeo,sideMat);
    bottomLeftSideSide.castShadow = true;
    //paralamasDoSucesso.add(bottomLeftSideSide);

    // bottomRightSide
    let bottomRightSideArr = bottomLeftSideArr.map(flipXVertices),
    bottomRightSideGeo = new ConvexGeometry(bottomRightSideArr.map(toVectors))

    let bottomRightSide = new THREE.Mesh(bottomRightSideGeo,sideMat);
    bottomRightSide.castShadow = true;
    //paralamasDoSucesso.add(bottomRightSide);

    //---------------- Right Side Part Above Wheels ------------------
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

    let rightSide = new THREE.Mesh(rightSideGeo,sideMat);
    rightSide.castShadow = true;
    paralamasDoSucesso.add(rightSide);

    this.mesh.add(paralamasDoSucesso);
  }
}

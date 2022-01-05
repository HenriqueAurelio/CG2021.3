import * as THREE from '../build/three.module.js'
import { ConvexGeometry } from '../build/jsm/geometries/ConvexGeometry.js'
export default class Cybertruck extends THREE.Mesh {
  constructor() {
    super()
    return this.createCar()
  }

  createCar() {
    var car = new THREE.Group()

    // APAGAR
    this.width = 4; //8
    this.height = 3.75; //7.5
    this.depth = 11.5; //23

    let W = this.width,
        H = this.height,
        D = this.depth;

    // B. Door Handles
    let doorHandleGeo = new THREE.BoxGeometry(W*0.01,W*0.024,D*0.0375),
    doorHandleFR = new THREE.Mesh(doorHandleGeo,new THREE.MeshPhongMaterial({ color: 0x000000 }));

    // front right
    doorHandleFR.position.set(W*-0.45,H*0.13,D*0.0844);
    doorHandleFR.rotation.x = 4 * Math.PI/180;

    // front left
    let doorHandleFL = doorHandleFR.clone();
    doorHandleFL.position.x *= -1;

    // back right
    let doorHandleBR = doorHandleFR.clone();
    doorHandleBR.position.y = H*0.165;
    doorHandleBR.position.z = D*-0.1094;

    // back left
    let doorHandleBL = doorHandleBR.clone();
    doorHandleBL.position.x *= -1;

    let wheelGeo = new THREE.CylinderBufferGeometry(H*0.23,H*0.23,W*0.14,32),
    wheelMat = new THREE.MeshLambertMaterial({
        color: 0x1c1c1c
    });

    this.wheels = [
        new THREE.Mesh(wheelGeo,wheelMat)
    ];


    var block = this.createBlock()

    car.add(block)
    car.add(doorHandleFR)
    car.add(doorHandleFL)
    car.add(doorHandleBR)
    car.add(doorHandleBL)

    this.wheels[0].position.set(W*0.43,H*-0.27,D*0.36);
    this.wheels[0].rotation.z = -Math.PI/2;
    this.wheels[0].castShadow = true;
    this.wheels[0].receiveShadow = true;
    car.add(this.wheels[0]);

    this.wheels.push(this.wheels[0].clone());
    this.wheels[1].position.set(W*-0.43,H*-0.27,D*0.36);
    this.wheels[1].rotation.z = Math.PI/2;
    car.add(this.wheels[1]);

    this.wheels.push(this.wheels[0].clone());
    this.wheels[2].position.set(W*0.43,H*-0.27,D*-0.3);
    this.wheels[2].rotation.z = -Math.PI/2;
    car.add(this.wheels[2]);

    this.wheels.push(this.wheels[0].clone());
    this.wheels[3].position.set(W*-0.43,H*-0.27,D*-0.3);
    this.wheels[3].rotation.z = Math.PI/2;
    car.add(this.wheels[3]);

    //----------------------------------------------------

    // X. Front Cylinders
    let cylinderGeo = new THREE.CylinderBufferGeometry(W*0.025,W*0.025,H*0.32,32),
    cylinderMat = new THREE.MeshStandardMaterial({
        color: 0x969696,
    }),
    leftCylinder = new THREE.Mesh(cylinderGeo,cylinderMat);
    
    // left
    leftCylinder.position.set(W*0.33,H*-0.09,D*0.355);
    leftCylinder.rotation.x = -5 *Math.PI/180;
    car.add(leftCylinder);

    // right
    let rightCylinder = leftCylinder.clone();
    rightCylinder.position.x *= -1;
    car.add(rightCylinder);

    car.rotateX(Math.PI / 2)

    //this.createTires().forEach((element) => car.add(element))
    car.position.set(0, 20, 0)
    return car
  }

  createBlock() {
    this.width = 4; //8
    this.height = 3.75; //7.5
    this.depth = 11.5; //23
    this.mesh = new THREE.Object3D();

    let W = this.width,
        H = this.height,
        D = this.depth,
        toVectors = a => new THREE.Vector3(W * a[0],H * a[1],D * a[2]);
    
    var pontos = [
        // back (0–3)
        [-0.45, 0.26, -0.5],
        [0.45,  0.26, -0.5],
        [-0.45, -0.1, -0.48],
        [0.45,  -0.1, -0.48],
        // top (4–5)
        [-0.326, 0.5,  0.08],
        [0.326,  0.5,  0.08],
        // middle (6–19)
        [-0.45, -0.1, -0.38],
        [0.45,  -0.1, -0.38],
        [-0.45, 0.06, -0.36],
        [0.45,  0.06, -0.36],
        [-0.45, 0.06, -0.24],
        [0.45,  0.06, -0.24],
        [-0.45, -0.15,-0.18],
        [0.45,  -0.15,-0.18],
        [-0.45, -0.17,0.255],
        [0.45,  -0.17,0.255],
        [-0.45, 0.06, 0.303],
        [0.45,  0.06, 0.303],
        [-0.45, 0.06, 0.42],
        [0.45,  0.06, 0.42],
        // upper front (20–23)
        [-0.45, 0.08, 0.47],
        [0.45,  0.08, 0.47],
        [-0.33, 0.045,0.5],
        [0.33,  0.045,0.5],
        // lower front (24–27)
        [-0.45, -0.13,0.46],
        [0.45,  -0.13,0.46],
        [-0.343,-0.13,0.488],
        [0.343, -0.13,0.488],
        // bottom flaps (28–31)
        [-0.41, -0.21,-0.173],
        [0.41,  -0.21,-0.173],
        [-0.41, -0.23,0.25],
        [0.41,  -0.23,0.25],
        // windows (32–39)
        [-0.4225,0.27,-0.14],
        [0.4225, 0.27,-0.14],
        [-0.379, 0.39,-0.13],
        [0.379,  0.39,-0.13],
        [-0.337, 0.47,0.08],
        [0.337,  0.47,0.08],
        [-0.425, 0.17,0.36],
        [0.425,  0.17,0.36]
    ]
    let p = pontos.map(toVectors);
    const geometry = new ConvexGeometry(p)
    const material = new THREE.MeshPhongMaterial({ color: 0xbac3c8 })
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

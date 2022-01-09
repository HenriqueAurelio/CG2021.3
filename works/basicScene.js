import * as THREE from '../build/three.module.js'
import Stats from '../build/jsm/libs/stats.module.js'
import KeyboardState from '../libs/util/KeyboardState.js'
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js'
import {
  initRenderer,
  createGroundPlaneWired,
  InfoBox,
  onWindowResize,
  initDefaultBasicLight,
  degreesToRadians,
} from '../libs/util/util.js'
import Cybertruck from './cyberTruck.js'
import Speedometer from './speedometer.js'
import carGroup from './carGroup.js'
import tracks from './tracks.js'
import BestLap from './bestLap.js'
import ActualLapBox from './actualLap.js'
import TotalTime from './totalTime.js'

var acc = 0
var speed = 0
var maxSpeed = 500
var maxReverseSpeed = -300
var actualLap = 0
var stringLap = ''
var checkvalue = 0
const blockSize = 10
var entryInspect = false
var laps = []
var removeObj
var stats = new Stats() // To show FPS information
var scene = new THREE.Scene() // Create main scene
var renderer = initRenderer() // View function in util/utils

initDefaultBasicLight(scene, true)

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12)
scene.add(axesHelper)
var angle = degreesToRadians(1)
var tireAngle = degreesToRadians(0.5)
var keyboard = new KeyboardState()
const coeficienteVelocidade = 1500

// create the ground plane
var planeGeometry = createGroundPlaneWired(400, 400, 80, 80)
planeGeometry.rotateX(Math.PI / 2)
scene.add(planeGeometry)

// Use this to show information onscreen
var controls = new InfoBox()
controls.add('Controls:')
controls.addParagraph()
controls.add('* X to accelerate')
controls.add('* Left/Right button to rotate')
controls.add('* Down button to brake')
controls.addParagraph()
controls.add('Press Space button to Inspect Mode')
controls.add('* Scroll to zoom in/out.')
controls.addParagraph()
controls.add('Lap time:')
controls.show()

var actualLapBox = new ActualLapBox()
var speedometer = new Speedometer()
var bestLapBox = new BestLap()
var totalTimeBox = new TotalTime()

// Listen window size changes
window.addEventListener(
  'resize',
  function () {
    onWindowResize(camera, renderer)
  },
  false
)

let foraDaPista = false
var inspectMode = false
var car = new carGroup()
let cybertruck = new Cybertruck()
cybertruck.position.z = 5
cybertruck.rotateY(22)
scene.add(cybertruck)
// Camera
let SCREEN_WIDTH = window.innerWidth
let SCREEN_HEIGHT = window.innerHeight
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT

var gameCamera = new THREE.PerspectiveCamera(30, aspect, 1, 500)
var inspectCamera = new THREE.PerspectiveCamera(50, aspect, 1, 500)
inspectCamera.position.set(5, -10, 10)
inspectCamera.up.set(0, 0, 2)
var trackballControls = new TrackballControls(
  inspectCamera,
  renderer.domElement
)

//SpotLight InspectCamera
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(100, 1000, 100)

spotLight.castShadow = true

spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024

spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 500
spotLight.shadow.camera.fov = 50

spotLight.name = 'inspectModeLight'
spotLight.visible = false
scene.add(spotLight)

var camera = gameCamera //camera.add(car)
camera.up.set(0, 0, 1)
scene.add(camera)

// Virtual Camera

var virtualCamera = new THREE.PerspectiveCamera(45, 400 / 300, 1.0, 200.0)

var worldPosition = new THREE.Vector3()
function cameraUpdate() {
  //-- Update virtual camera settings --
  cameraPoint.getWorldPosition(worldPosition)
  camera.position.x = cybertruck.position.x + 20
  camera.position.y = cybertruck.position.y - 10
  camera.position.z = cybertruck.position.z + 25

  camera.lookAt(worldPosition)
}

// Tracks
let roads = []
roads = new tracks(scene, 1).getRoads()
// scene.add(car)
var initialPosition = roads.filter((part) => part.name == 'InitialPosition')
var roda1 = cybertruck.children.filter((part) => part.name == 'tire1')[0]
var roda2 = cybertruck.children.filter((part) => part.name == 'tire2')[0]
var roda3 = cybertruck.children.filter((part) => part.name == 'tire3')[0]
var roda4 = cybertruck.children.filter((part) => part.name == 'tire4')[0]
var cameraPoint = cybertruck.children.filter(
  (part) => part.name == 'cameraPoint'
)[0]
var wheels = [roda1, roda2, roda3, roda4]

var won = false
var totalTimer = new THREE.Clock()
var timer = new THREE.Clock()
timer.start()
totalTimer.start()
//render()
var minutes = 0
var entryTimer = false
var entryTimer2 = false

function keyboardUpdate() {
  keyboard.update()
  if (keyboard.down('1')) {
    removeRoad()
    roads = new tracks(scene, 1).getRoads()
    initialPosition = roads.filter((part) => part.name == 'InitialPosition')
    carStartPosition()
    actualLap = 0
    checkvalue = 0
    timer.start()
    totalTimer.start()
  }
  if (keyboard.down('2')) {
    removeRoad()
    roads = new tracks(scene, 2).getRoads()
    initialPosition = roads.filter((part) => part.name == 'InitialPosition')
    carStartPosition()
    actualLap = 0
    timer.start()
    totalTimer.start()
    checkvalue = 0
  }
  if (keyboard.down('3')) {
    removeRoad()
    roads = new tracks(scene, 3).getRoads()
    initialPosition = roads.filter((part) => part.name == 'InitialPosition')
    carStartPosition()
    actualLap = 0
    timer.start()
    totalTimer.start()
  }
  if (keyboard.down('4')) {
    removeRoad()
    roads = new tracks(scene, 4).getRoads()
    initialPosition = roads.filter((part) => part.name == 'InitialPosition')
    carStartPosition()
    actualLap = 0
    timer.start()
    totalTimer.start()
  }
  if (keyboard.down('space')) {
    inspectMode = !inspectMode
  }
  // if (!inspectMode) {
  if (actualLap < 4) {
    if (keyboard.pressed('X')) acc = 5
    else if (keyboard.pressed('down')) acc = -3
    else acc = 0

    switch (actualLap) {
      case 0:
        stringLap = 'First Lap'
        break
      case 1:
        stringLap = 'Second Lap'
        break
      case 2:
        stringLap = 'Third Lap'
        break
      case 3:
        stringLap = 'Fourth Lap'
        break
    }
    var totalTimeLap = totalTimer.getElapsedTime()
    if (
      totalTimeLap.toFixed() >= 60 &&
      (totalTimeLap % 60).toFixed() == 0 &&
      entryTimer2
    ) {
      minutes++
      entryTimer2 = false
    }
    if ((totalTimeLap % 60).toFixed() == 1) {
      entryTimer2 = true
    }
    totalTimeBox.changeMessage(
      `Tempo total: ${minutes}:${
        (totalTimeLap.toFixed() % 60).toFixed() < 10 ? '0' : ''
      }${(totalTimeLap.toFixed() % 60).toFixed()}`
    )
    var timeLap = timer.getElapsedTime()
    if (
      timeLap.toFixed() >= 60 &&
      (timeLap % 60).toFixed() == 0 &&
      entryTimer
    ) {
      minutes++
      entryTimer = false
    }
    if ((timeLap % 60).toFixed() == 1) {
      entryTimer = true
    }
    actualLapBox.changeMessage(
      `${stringLap} ${minutes}:${
        (timeLap.toFixed() % 60).toFixed() < 10 ? '0' : ''
      }${(timeLap.toFixed() % 60).toFixed()}`
    )
    speedometer.changeMessage((speed / 10).toFixed() + ' km/h')
    if (speed > 0) {
      movementOfWheels()
      if (keyboard.pressed('right') || keyboard.pressed('left')) {
        acc -= 1
      }
      acc -= 2
    } else if (speed < 0) {
      movementOfWheels()
      if (keyboard.pressed('right') || keyboard.pressed('left')) {
        acc += 1
      }
      acc += 2
    }

    speed += acc

    if (verificaCarroNaPista(cybertruck, roads).length > 0) {
      maxSpeed = 500
      maxReverseSpeed = -300
      foraDaPista = false
    } else {
      if (!foraDaPista) {
        speed = speed / 2
        maxSpeed = maxSpeed / 2
        maxReverseSpeed = maxReverseSpeed / 2
      }
      foraDaPista = true
    }

    if (speed > maxSpeed) speed = maxSpeed
    if (speed < maxReverseSpeed) speed = maxReverseSpeed

    cybertruck.translateZ(speed / coeficienteVelocidade)

    if (keyboard.pressed('right')) {
      if (roda1.rotation.y >= -0.25) {
        roda1.rotation.y -= tireAngle
        roda2.rotation.y -= tireAngle
      }
      if (!inspectMode) {
        if (speed > 0) cybertruck.rotateY(-angle)
        else if (speed < 0) cybertruck.rotateY(angle)
      }
    }
    if (keyboard.pressed('left')) {
      if (roda1.rotation.y <= 0.25) {
        roda1.rotation.y += tireAngle
        roda2.rotation.y += tireAngle
      }
      if (!inspectMode) {
        if (speed > 0) cybertruck.rotateY(angle)
        else if (speed < 0) cybertruck.rotateY(-angle)
      }
    }
    updateLap(cybertruck, initialPosition[0])
  } else {
    if (won == false) {
      alert('Você ganhou!')
      bestLap()
      won = true
    }
  }
}

function controlledRender() {
  var width = window.innerWidth
  var height = window.innerHeight

  // Set main viewport

  renderer.setViewport(0, 0, width, height) // Reset viewport
  renderer.setScissorTest(false) // Disable scissor to paint the entire window
  renderer.setClearColor('rgb(80, 70, 170)')
  renderer.clear() // Clean the window
  renderer.render(scene, camera)
  // Set virtual camera viewport
  if (!inspectMode) {
    var offset = 30
    renderer.setViewport(offset, height - 300 - offset, 400, 300) // Set virtual camera viewport
    renderer.setScissor(offset, height - 300 - offset, 400, 300) // Set scissor with the same size as the viewport
    renderer.setScissorTest(true) // Enable scissor to paint only the scissor are (i.e., the small viewport)
    renderer.setClearColor('rgb(60, 50, 150)') // Use a darker clear color in the small viewport
    renderer.clear() // Clean the small viewport
    virtualCamera.position.set(50, 50, 140)
    virtualCamera.lookAt(50, 50, 0)
    virtualCamera.up.set(0, 0, 1)
    renderer.render(scene, virtualCamera) // Render scene of the virtual camera
  }
}

// ----------------------------------- physics ------------------------------------
function createWireFrame(mesh) {
  // wireframe
  var geo = new THREE.EdgesGeometry(mesh.geometry) // or WireframeGeometry
  var mat = new THREE.LineBasicMaterial({
    color: 'rgb(80, 80, 80)',
    linewidth: 1.5,
  })
  var wireframe = new THREE.LineSegments(geo, mat)
  mesh.add(wireframe)
}

var materialInteractive = new THREE.MeshPhongMaterial({
  color: 'rgb(255, 50, 50)',
})
var materialDynamic = new THREE.MeshPhongMaterial({
  color: 'rgba(255, 160, 0)',
})
var materialGround = new THREE.MeshPhongMaterial({
  color: 'rgb(180, 180, 180)',
})
var materialWheels = new THREE.MeshPhongMaterial({ color: 'rgb(30, 30, 30)' })
var materialWheels2 = new THREE.MeshPhongMaterial({
  color: 'rgb(200, 200, 200)',
})

// mesh
var materialRamp = new THREE.MeshLambertMaterial({
  color: 'rgb(120, 120, 200)',
  polygonOffset: true,
  polygonOffsetFactor: 0.5, // positive value pushes polygon further away
  polygonOffsetUnits: 2,
})

// global variables
var TRANSFORM_AUX = null
var ZERO_QUATERNION = new THREE.Quaternion(0, 0, 0, 1)

// Graphics variables
var clock = new THREE.Clock()

// Physics variables
var collisionConfiguration
var dispatcher
var broadphase
var solver
var physicsWorld

var syncList = []

// Start physics
Ammo().then(function () {
  initPhysics()
  createObjects()
  render()
})

function initPhysics() {
  // Physics configuration
  collisionConfiguration = new Ammo.btDefaultCollisionConfiguration()
  dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration)
  broadphase = new Ammo.btDbvtBroadphase()
  solver = new Ammo.btSequentialImpulseConstraintSolver()
  physicsWorld = new Ammo.btDiscreteDynamicsWorld(
    dispatcher,
    broadphase,
    solver,
    collisionConfiguration
  )
  physicsWorld.setGravity(new Ammo.btVector3(0, 0, -9.82))
}

function createFloor() {
  let pos = { x: 0, y: 0, z: -0.5 }
  let scale = { x: 400, y: 0.5, z: 400 }
  let quat = { x: 0, y: 0, z: 0, w: 1 }
  let mass = 0

  let blockPlane = new THREE.Mesh(
    new THREE.BoxBufferGeometry(),
    new THREE.MeshPhongMaterial({ color: 0xf9c834 })
  )
  blockPlane.position.set(pos.x, pos.y, pos.z)
  blockPlane.scale.set(scale.x, scale.y, scale.z)
  blockPlane.castShadow = true
  blockPlane.receiveShadow = true
  blockPlane.rotateX(Math.PI / 2)
  scene.add(blockPlane)

  // AMMO
  let transform = new Ammo.btTransform()
  transform.setIdentity()
  transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z))
  transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w))
  let motionState = new Ammo.btDefaultMotionState(transform)

  let colShape = new Ammo.btBoxShape(
    new Ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5)
  )
  colShape.setMargin(0.05)

  let localInertia = new Ammo.btVector3(0, 0, 0)
  colShape.calculateLocalInertia(mass, localInertia)

  let rbInfo = new Ammo.btRigidBodyConstructionInfo(
    mass,
    motionState,
    colShape,
    localInertia
  )
  let body = new Ammo.btRigidBody(rbInfo)

  body.setFriction(1)
  body.setRollingFriction(1)
  body.setActivationState(4)
  body.setRestitution(1)

  physicsWorld.addRigidBody(body)
}

function createObjects() {
  // Ground plane
  //var ground = createBox(new THREE.Vector3(0, -0.5, 0), ZERO_QUATERNION, 100, 1, 100, 0, 2, materialGround, true);
  //setGroundTexture(ground);
  //createFloor()

  // Ramps
  var quaternion = new THREE.Quaternion(0, 0, 0, 1)
  var ramp
  quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), degreesToRadians(-15))
  ramp = createBox(
    new THREE.Vector3(0, -1.5, 0),
    quaternion,
    8,
    4,
    10,
    0,
    0,
    materialRamp
  )
  createWireFrame(ramp)
  quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), degreesToRadians(30))
  ramp = createBox(
    new THREE.Vector3(25, -3.0, 0),
    quaternion,
    8,
    8,
    15,
    0,
    0,
    materialRamp
  )
  createWireFrame(ramp)
  //quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), degreesToRadians(-5));
  //ramp = createBox(new THREE.Vector3(-25, -1.5, 0), quaternion, 8, 4, 15, 0, 0, materialRamp);
  //createWireFrame(ramp);

  // Vehicle
  createVehicle(
    new THREE.Vector3(4, 8, 1.5),
    new THREE.Quaternion(0.7071, 0, 0, 0.7071)
  )
}

function createBox(
  pos,
  quat,
  w,
  l,
  h,
  mass = 0,
  friction = 1,
  material,
  receiveShadow = false
) {
  if (!TRANSFORM_AUX) TRANSFORM_AUX = new Ammo.btTransform()
  var shape = new THREE.BoxGeometry(w, l, h, 1, 1, 1)
  var geometry = new Ammo.btBoxShape(
    new Ammo.btVector3(w * 0.5, l * 0.5, h * 0.5)
  )

  var mesh = new THREE.Mesh(shape, material)
  mesh.castShadow = true
  mesh.receiveShadow = receiveShadow
  mesh.position.copy(pos)
  mesh.quaternion.copy(quat)
  mesh.rotateX(Math.PI / 2)
  scene.add(mesh)

  var transform = new Ammo.btTransform()
  transform.setIdentity()
  transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z))
  transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, 90, quat.w))
  var motionState = new Ammo.btDefaultMotionState(transform)

  var localInertia = new Ammo.btVector3(0, 0, 0)
  geometry.calculateLocalInertia(mass, localInertia)

  var rbInfo = new Ammo.btRigidBodyConstructionInfo(
    mass,
    motionState,
    geometry,
    localInertia
  )
  var body = new Ammo.btRigidBody(rbInfo)
  body.setFriction(friction)

  physicsWorld.addRigidBody(body)

  if (mass > 0) {
    // Sync physics and graphics
    function sync(dt) {
      var ms = body.getMotionState()
      if (ms) {
        ms.getWorldTransform(TRANSFORM_AUX)
        var p = TRANSFORM_AUX.getOrigin()
        var q = TRANSFORM_AUX.getRotation()
        mesh.position.set(p.x(), p.y(), p.z())
        mesh.quaternion.set(q.x(), q.y(), q.z(), q.w())
      }
    }
    syncList.push(sync)
  }
  return mesh
}

function createWheelMesh(radius, width) {
  var t = new THREE.CylinderGeometry(radius, radius, width, 24, 1)
  t.rotateZ(Math.PI / 2)
  var mesh = new THREE.Mesh(t, materialWheels)
  mesh.castShadow = true
  mesh.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(width * 1.5, radius * 1.75, radius * 0.25, 1, 1, 1),
      materialWheels2
    )
  )
  scene.add(mesh)
  return mesh
}

function createChassisMesh(w, l, h) {
  var shape = new THREE.BoxGeometry(w, l, h, 1, 1, 1)
  var mesh = new THREE.Mesh(shape, materialInteractive)
  mesh.castShadow = true
  //scene.add(mesh);
  return mesh
}

function createVehicle(pos, quat) {
  // Vehicle contants
  var chassisWidth = 8 * 0.3 //2.0;
  var chassisHeight = 7.5 * 0.3 //1.0;
  var chassisLength = 23 * 0.3 //4.2;
  var massVehicle = 2000 //1000;

  var wheelRadiusFront = 0.4
  var wheelWidthFront = 0.4
  var wheelAxisFrontPosition = 1.6
  var wheelHalfTrackFront = 1.2
  var wheelAxisHeightFront = 0.2

  var wheelRadiusBack = 0.5
  var wheelWidthBack = 0.5
  var wheelAxisPositionBack = -1.3
  var wheelHalfTrackBack = 1.25
  var wheelAxisHeightBack = 0.1

  var friction = 1000
  var suspensionStiffness = 25.0
  var suspensionDamping = 2.3
  var suspensionCompression = 5.0
  var suspensionRestLength = 0.7
  var rollInfluence = 0.2

  var steeringIncrement = 0.04
  var steeringClamp = 0.5
  var maxEngineForce = 1500
  var maxBreakingForce = 100

  // Chassis
  var geometry = new Ammo.btBoxShape(
    new Ammo.btVector3(
      chassisWidth * 0.5,
      chassisHeight * 0.5,
      chassisLength * 0.5
    )
  )
  var transform = new Ammo.btTransform()
  transform.setIdentity()
  transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z))
  transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w))
  let motionState = new Ammo.btDefaultMotionState(transform)

  var localInertia = new Ammo.btVector3(0, 0, 0)
  geometry.calculateLocalInertia(massVehicle, localInertia)
  var body = new Ammo.btRigidBody(
    new Ammo.btRigidBodyConstructionInfo(
      massVehicle,
      motionState,
      geometry,
      localInertia
    )
  )
  /*
  let colShape = new Ammo.btBoxShape(new Ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5));
  colShape.setMargin(0.05);23

  let localInertia = new Ammo.btVector3(0, 0, 0);
  colShape.calculateLocalInertia(mass, localInertia);

  let rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, colShape, localInertia);
  let body = new Ammo.btRigidBody(rbInfo);
  body.setActivationState(4);*/

  physicsWorld.addRigidBody(body)
  var chassisMesh = createChassisMesh(
    chassisWidth,
    chassisHeight,
    chassisLength
  )
  //chassisMesh = cybertruck;

  // Raycast Vehicle
  var engineForce = 0
  var vehicleSteering = 0
  var breakingForce = 0
  var tuning = new Ammo.btVehicleTuning()
  var rayCaster = new Ammo.btDefaultVehicleRaycaster(physicsWorld)
  var vehicle = new Ammo.btRaycastVehicle(tuning, body, rayCaster)
  vehicle.setCoordinateSystem(0, 1, 2)
  physicsWorld.addAction(vehicle)

  // Wheels
  var FRONT_LEFT = 0
  var FRONT_RIGHT = 1
  var BACK_LEFT = 2
  var BACK_RIGHT = 3
  var wheelMeshes = []
  var wheelDirectionCS0 = new Ammo.btVector3(0, -1, 0)
  var wheelAxleCS = new Ammo.btVector3(-1, 0, 0)

  function addWheel(isFront, pos, radius, width, index) {
    var wheelInfo = vehicle.addWheel(
      pos,
      wheelDirectionCS0,
      wheelAxleCS,
      suspensionRestLength,
      radius,
      tuning,
      isFront
    )

    wheelInfo.set_m_suspensionStiffness(suspensionStiffness)
    wheelInfo.set_m_wheelsDampingRelaxation(suspensionDamping)
    wheelInfo.set_m_wheelsDampingCompression(suspensionCompression)
    wheelInfo.set_m_frictionSlip(friction)
    wheelInfo.set_m_rollInfluence(rollInfluence)

    wheelMeshes[index] = createWheelMesh(radius, width)
  }

  addWheel(
    true,
    new Ammo.btVector3(
      wheelHalfTrackFront,
      wheelAxisHeightFront,
      wheelAxisFrontPosition
    ),
    wheelRadiusFront,
    wheelWidthFront,
    FRONT_LEFT
  )
  addWheel(
    true,
    new Ammo.btVector3(
      -wheelHalfTrackFront,
      wheelAxisHeightFront,
      wheelAxisFrontPosition
    ),
    wheelRadiusFront,
    wheelWidthFront,
    FRONT_RIGHT
  )
  addWheel(
    false,
    new Ammo.btVector3(
      -wheelHalfTrackBack,
      wheelAxisHeightBack,
      wheelAxisPositionBack
    ),
    wheelRadiusBack,
    wheelWidthBack,
    BACK_LEFT
  )
  addWheel(
    false,
    new Ammo.btVector3(
      wheelHalfTrackBack,
      wheelAxisHeightBack,
      wheelAxisPositionBack
    ),
    wheelRadiusBack,
    wheelWidthBack,
    BACK_RIGHT
  )

  // Sync keybord actions and physics and graphics
  function sync(dt) {
    var speed = vehicle.getCurrentSpeedKmHour()
    breakingForce = 0
    engineForce = 10

    if (keyboard.pressed('X')) {
      if (speed < -1) breakingForce = maxBreakingForce
      else engineForce = maxEngineForce
    }
    if (keyboard.pressed('down')) {
      if (speed > 1) breakingForce = maxBreakingForce
      else engineForce = -maxEngineForce / 2
    }
    if (keyboard.pressed('left')) {
      if (vehicleSteering < steeringClamp) vehicleSteering += steeringIncrement
    } else {
      if (keyboard.pressed('right')) {
        if (vehicleSteering > -steeringClamp)
          vehicleSteering -= steeringIncrement
      } else {
        if (vehicleSteering < -steeringIncrement)
          vehicleSteering += steeringIncrement
        else {
          if (vehicleSteering > steeringIncrement)
            vehicleSteering -= steeringIncrement
          else {
            vehicleSteering = 0
          }
        }
      }
    }
    vehicle.applyEngineForce(engineForce, BACK_LEFT)
    vehicle.applyEngineForce(engineForce, BACK_RIGHT)

    //vehicle.setBrake(breakingForce, FRONT_LEFT);
    //vehicle.setBrake(breakingForce, FRONT_RIGHT);
    vehicle.setBrake(breakingForce, BACK_LEFT)
    vehicle.setBrake(breakingForce, BACK_RIGHT)

    vehicle.setSteeringValue(vehicleSteering, FRONT_LEFT)
    vehicle.setSteeringValue(vehicleSteering, FRONT_RIGHT)

    var tm, p, q, i
    var n = vehicle.getNumWheels()

    //for(i = 0; i < 4; i ++)
    //wheelMeshes[i] = wheels[i];

    for (i = 0; i < n; i++) {
      vehicle.updateWheelTransform(i, true)
      tm = vehicle.getWheelTransformWS(i)
      p = tm.getOrigin()
      q = tm.getRotation()
      wheelMeshes[i].position.set(p.x(), p.y(), p.z())
      wheelMeshes[i].quaternion.set(q.x(), q.y(), q.z(), q.w())
    }

    tm = vehicle.getChassisWorldTransform()
    p = tm.getOrigin()
    q = tm.getRotation()
    chassisMesh.position.set(p.x(), p.y(), p.z())
    chassisMesh.quaternion.set(q.x(), q.y(), q.z(), q.w())
  }
  syncList.push(sync)
}

function render() {
  // AmmoJs
  var dt = clock.getDelta()
  for (var i = 0; i < syncList.length; i++) syncList[i](dt)
  physicsWorld.stepSimulation(dt, 10)

  stats.update() // Update FPS
  if (inspectMode) {
    spotLight.position.copy(inspectCamera)
    trackballControls.update()
  }
  // Enable mouse movements
  else cameraUpdate()
  keyboardUpdate()
  gameMode()
  controlledRender()
  requestAnimationFrame(render)
  // renderer.render(scene, camera) // Render scene
}

function gameMode() {
  var obj

  if (inspectMode) {
    speedometer.changeVisibility('hidden')
    actualLapBox.changeVisibility('hidden')
    bestLapBox.changeVisibility('hidden')
    totalTimeBox.changeVisibility('hidden')

    cybertruck.position.set(0, 0, 0)
    if (entryInspect == false) {
      inspectCamera.position.set(5, -10, 10)
      console.log(inspectCamera.position)
      console.log('entrou no inspect')
    }
    camera = inspectCamera
    entryInspect = true
    for (var i = scene.children.length - 1; i >= 2; i--) {
      obj = scene.children[i]
      if (scene.children[i].name != `Cybertruck`) obj.visible = false
      spotLight.visible = true
    }
  } else {
    if (laps.length == 0) bestLapBox.changeVisibility('hidden')
    else bestLapBox.changeVisibility('')
    actualLapBox.changeVisibility('')
    speedometer.changeVisibility('')
    totalTimeBox.changeVisibility('')

    spotLight.visible = false
    if (entryInspect) {
      camera = gameCamera

      for (var i = scene.children.length - 1; i >= 2; i--) {
        obj = scene.children[i]
        if (scene.children[i].name != `Cybertruck`) obj.visible = true
      }
      carStartPosition()
      timer.start()
      totalTimer.start()
      entryInspect = false
    }
  }
}

function verificaCarroNaPista(carro, blocosDaPista) {
  let blocos = []
  let x = carro.position.x
  let y = carro.position.y
  for (let i = 0; i < blocosDaPista.length; i++) {
    let xb = blocosDaPista[i].position.x
    let yb = blocosDaPista[i].position.y
    if (
      x >= xb - blockSize / 2 &&
      y >= yb - blockSize / 2 &&
      x <= xb + blockSize / 2 &&
      y <= yb + blockSize / 2
    ) {
      blocos.push(blocosDaPista[i])
    }
  }
  return blocos
}

function updateLap(car, initialBlock) {
  var checkpoint = roads[15]
  checkpoint.set
  var checkx = checkpoint.position.x
  var checky = checkpoint.position.y

  let cx = car.position.x
  let cy = car.position.y
  let bx = initialBlock.position.x
  let by = initialBlock.position.y
  if (
    cx >= bx - blockSize / 2 &&
    cy >= by - blockSize / 2 &&
    cx <= bx + blockSize / 2 &&
    cy <= by + blockSize / 2 &&
    actualLap < checkvalue
  ) {
    var timelap = `${minutes}:${
      (timer.getElapsedTime().toFixed() % 60).toFixed() < 10 ? '0' : ''
    }${(timer.getElapsedTime().toFixed() % 60).toFixed()}`
    controls.add(stringLap + ':' + ' ' + timelap)
    laps.push(timelap)
    actualLap += 1
    checkvalue = 0
    minutes = 0
    timer.start()
  }
  if (
    cx >= checkx - blockSize / 2 &&
    cy >= checky - blockSize / 2 &&
    cx <= checkx + blockSize / 2 &&
    cy <= checky + blockSize / 2
  ) {
    checkvalue += 1
  }
  bestLapFunction()
  if (laps.length == 0) {
    bestLapBox.changeVisibility('hidden')
  } else {
    bestLapBox.changeVisibility('')
  }
}

function bestLapFunction() {
  var bestLapTime = laps[0]
  for (let i = 0; i < laps.length; i++) {
    if (bestLapTime.split(':')[0] > laps[i].split(':')[0]) bestLapTime = laps[i]
    if (bestLapTime.split(':')[0] == laps[i].split(':')[0]) {
      if (bestLapTime.split(':')[1] > laps[i].split(':')[1]) {
        bestLapTime = laps[i]
      }
    }
  }
  bestLapBox.changeMessage(`Best Lap:${bestLapTime}`)
}

function carStartPosition() {
  cybertruck.position.set(1, 10, 1.5)
  cybertruck.rotation.set(Math.PI / 2, 0, 0)
  cybertruck.rotateY(22)
  roda1.rotation.set(0, 0, -Math.PI / 2)
  roda2.rotation.set(0, 0, Math.PI / 2)
  speed = 0
}

function removeRoad() {
  for (var i = scene.children.length - 1; i >= 2; i--) {
    removeObj = scene.children[i]
    if (
      scene.children[i].name == 'street' ||
      scene.children[i].name == 'InitialPosition'
    )
      scene.remove(removeObj)
  }
}

function movementOfWheels() {
  var height = 7.5 * 0.3 //7.5
  let fps = 60,
    scaleBy = 30,
    tireRadius = height * 0.23,
    feetPerMin = (speed * 50) / 60,
    rpm = feetPerMin / (2 * Math.PI * (tireRadius / 12)),
    incRotate = Math.PI * 2 * (rpm / 6e4) * (1e3 / fps)

  let rotateAngle = incRotate / scaleBy

  let calotas = []
  wheels.forEach((wheel) => {
    calotas.push(
      wheel.children.filter((part) => part.name == 'calota')[0].children[0]
    )
  })
  calotas[0].rotateY(rotateAngle)
  calotas[1].rotateY(-rotateAngle)
  calotas[2].rotateY(rotateAngle)
  calotas[3].rotateY(-rotateAngle)
}

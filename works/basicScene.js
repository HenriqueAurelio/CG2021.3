import * as THREE from '../build/three.module.js'
import Stats from '../build/jsm/libs/stats.module.js'
import KeyboardState from '../libs/util/KeyboardState.js'
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js'
import {
  initRenderer,
  createGroundPlaneWired,
  InfoBox,
  onWindowResize,
  SecondaryBox,
  initDefaultBasicLight,
  degreesToRadians,
  initCamera,
} from '../libs/util/util.js'
import Cybertruck from './cyberTruck.js'
import Speedometer from './speedometer.js'
import carGroup from './carGroup.js'
import tracks from './tracks.js'
import bestLap from './bestLap.js'

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
var tireAngle = degreesToRadians(0.7)
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

var secondaryBox = new SecondaryBox()
var secondaryBox2 = new Speedometer()
var bestLapBox = new bestLap()

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

var gameCamera = new THREE.PerspectiveCamera(50, aspect, 1, 500)
var inspectCamera = initCamera(new THREE.Vector3(5, -10, 10)) //new THREE.OrthographicCamera()
//var inspectCamera =  initCamera(new THREE.Vector3(0, 60, 35))
//inspectCamera.position.set(0, -20, 30);
inspectCamera.up.set(0, 0, 2)
var trackballControls = new TrackballControls(
  inspectCamera,
  renderer.domElement
)

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
  camera.position.z = cybertruck.position.z + 20

  camera.lookAt(cybertruck.position)
}

// Tracks
let roads = []
roads = new tracks(scene, 1).getRoads()
scene.add(car)
var initialPosition = roads.filter((part) => part.name == 'InitialPosition')
var roda1 = cybertruck.children.filter((part) => part.name == 'tire1')[0]
var roda2 = cybertruck.children.filter((part) => part.name == 'tire2')[0]
var roda3 = cybertruck.children.filter((part) => part.name == 'tire3')[0]
var roda4 = cybertruck.children.filter((part) => part.name == 'tire4')[0]
var cameraPoint = car.children.filter((part) => part.name == 'cameraPoint')[0]

var won = false
var timer = new THREE.Clock()
timer.start()
render()
var minutes = 0
var entryTimer = false

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
  }
  if (keyboard.down('2')) {
    removeRoad()
    roads = new tracks(scene, 2).getRoads()
    initialPosition = roads.filter((part) => part.name == 'InitialPosition')
    carStartPosition()
    actualLap = 0
    timer.start()
    checkvalue = 0
  }
  if (keyboard.down('3')) {
    removeRoad()
    roads = new tracks(scene, 3).getRoads()
    initialPosition = roads.filter((part) => part.name == 'InitialPosition')
    carStartPosition()
    actualLap = 0
    timer.start()
  }
  if (keyboard.down('4')) {
    removeRoad()
    roads = new tracks(scene, 4).getRoads()
    initialPosition = roads.filter((part) => part.name == 'InitialPosition')
    carStartPosition()
    actualLap = 0
    timer.start()
  }
  if (keyboard.down('space')) {
    inspectMode = !inspectMode
  }
  if (!inspectMode) {
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
      var x = timer.getElapsedTime()
      if (x.toFixed() >= 60 && (x % 60).toFixed() == 0 && entryTimer) {
        minutes++
        entryTimer = false
      }
      if ((x % 60).toFixed() == 1) {
        entryTimer = true
      }
      secondaryBox.changeMessage(
        `${stringLap} ${minutes}:${
          (x.toFixed() % 60).toFixed() < 10 ? '0' : ''
        }${(x.toFixed() % 60).toFixed()}`
      )
      secondaryBox2.changeMessage((speed / 10).toFixed() + ' km/h')
      if (speed > 0) {
        if (keyboard.pressed('right') || keyboard.pressed('left')) {
          acc -= 1
        }
        acc -= 2
      } else if (speed < 0) {
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
        if (roda1.rotation.y >= 0.15) {
          console.log(roda1.rotation.y)

          roda1.rotateX(-tireAngle)
          roda2.rotateX(-tireAngle)
        }
        if (speed > 0) cybertruck.rotateY(-angle)
        else if (speed < 0) cybertruck.rotateY(angle)
      }
      if (keyboard.pressed('left')) {
        if (roda1.rotation.y <= 0.15) {
          console.log(roda1.rotation.y)
          roda1.rotateX(tireAngle)
          roda2.rotateX(tireAngle)
        }
        if (speed > 0)
          cybertruck.rotateOnAxis(new THREE.Vector3(0, 1, 0), angle)
        else if (speed < 0) cybertruck.rotateY(-angle)
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

function render() {
  stats.update() // Update FPS
  if (inspectMode) trackballControls.update()
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
    car.position.set(0, 0, 0)
    camera = inspectCamera
    entryInspect = true
    for (var i = scene.children.length - 1; i >= 2; i--) {
      obj = scene.children[i]
      if (scene.children[i].name != `Carro`) obj.visible = false
    }
  } else {
    if (entryInspect) {
      camera = gameCamera

      for (var i = scene.children.length - 1; i >= 2; i--) {
        obj = scene.children[i]
        if (scene.children[i].name != `Carro`) obj.visible = true
      }
      car.position.set(1, 10, 1.5)
      car.rotation.set(0, 0, -1.5663706143591731)
      roda1.rotation.set(Math.PI / 2, 0, 0)
      roda2.rotation.set(Math.PI / 2, 0, -0)
      timer.start()
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
  car.position.set(1, 10, 1.5)
  car.rotation.set(0, 0, -1.5663706143591731)
  roda1.rotation.set(Math.PI / 2, 0, 0)
  roda2.rotation.set(Math.PI / 2, 0, -0)
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

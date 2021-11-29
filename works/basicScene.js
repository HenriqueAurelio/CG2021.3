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
} from '../libs/util/util.js'

import carGroup from './carGroup.js'
import tracks from './tracks.js'

var acc = 0
var speed = 0
var maxSpeed = 500
var maxReverseSpeed = -300
var Laps = 4
var actualLap = 0
var stringLap = ''
var checkvalue = 0
const blockSize = 10
var entryInspect = false

var stats = new Stats() // To show FPS information
var scene = new THREE.Scene() // Create main scene
var renderer = initRenderer() // View function in util/utils
// var camera = initCamera(new THREE.Vector3(0, -30, 15)) // Init camera in this position

initDefaultBasicLight(scene, true)
// Enable mouse rotation, pan, zoom etc.
//var trackballControls = new TrackballControls(camera, renderer.domElement)

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12)
scene.add(axesHelper)
var angle = degreesToRadians(1)
var keyboard = new KeyboardState()
const coeficienteVelocidade = 1500

// create the ground plane
var planeGeometry = createGroundPlaneWired(400, 400, 80, 80) //250
//planeGeometry.translate(0.0, 0.0, -0.3) // To avoid conflict with the axeshelper
//var planeMaterial = new THREE.MeshBasicMaterial({
//  color: 0xff0ab,
//  side: THREE.DoubleSide,
//})
//var plane = new THREE.Mesh(planeGeometry, planeMaterial)
// add the plane to the scene
planeGeometry.rotateX(Math.PI / 2)
scene.add(planeGeometry)

// Use this to show information onscreen
var controls = new InfoBox()
controls.add('Controls:')
controls.addParagraph()
controls.add('* X to acelerate')
controls.add('* Left/Right button to rotate')
controls.add('* Down button to brake')
controls.add('* Down button to brake')
controls.add('* Down button to brake')
controls.addParagraph()
controls.add('Press Space button to Inspect Mode')
controls.add('* Scroll to zoom in/out.')
controls.addParagraph()
controls.add('Lap time:')
controls.show()
var secondaryBox = new SecondaryBox()

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

let SCREEN_WIDTH = window.innerWidth
let SCREEN_HEIGHT = window.innerHeight
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT
var camera = new THREE.PerspectiveCamera(50, 0.5 * aspect, 1, 500)
camera.position.z = 40

function cameraUpdate() {
  camera.position.y = car.position.y - 20
  camera.position.x = car.position.x + 20
  camera.lookAt(car.position)
}

let roads = []

camera.add(car)
scene.add(camera)

var trackNum = prompt('Qual pista? (Digite 1 ou 2)')
roads = new tracks(scene, trackNum).getRoads()
var initialPosition = roads.filter((part) => part.name == 'InitialPosition')
scene.add(car)
var roda1 = car.children.filter((part) => part.name == 'tire1')[0]
var roda2 = car.children.filter((part) => part.name == 'tire2')[0]

var won = false
var timer = new THREE.Clock()
timer.start()
render()
console.log(roda2.rotation)
function keyboardUpdate() {
  keyboard.update()

  if (keyboard.down('space')) inspectMode = !inspectMode
  if (!inspectMode) {
    if (actualLap < 4) {
      if (keyboard.pressed('X')) acc = 5
      else if (keyboard.pressed('down')) acc = -3
      else acc = 0

      switch (actualLap) {
        case 0:
          stringLap = 'Primeira Volta'
          break
        case 1:
          stringLap = 'Segunda Volta'
          break
        case 2:
          stringLap = 'Terceira Volta'
          break
        case 3:
          stringLap = 'Quarta Volta'
          break
      }
      var x = timer.getElapsedTime()
      secondaryBox.changeMessage(stringLap + ' ' + x.toFixed(2))

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

      if (verificaCarroNaPista(car, roads).length > 0) {
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

      car.translateX(-speed / coeficienteVelocidade)

      //console.log('ACC: ' + acc + 'Speed: ' + (coeficienteVelocidade))

      if (keyboard.pressed('right')) {
        if (roda1.rotation.y >= -0.37) {
          roda1.rotateY(-angle)
          roda2.rotateY(-angle)
        }
        if (speed > 0) car.rotateZ(-angle)
        else if (speed < 0) car.rotateZ(angle)
      }
      if (keyboard.pressed('left')) {
        if (roda1.rotation.y <= 0.37) {
          roda1.rotateY(angle)
          roda2.rotateY(angle)
        }
        if (speed > 0) car.rotateZ(angle)
        else if (speed < 0) car.rotateZ(-angle)
      }
      updateLap(car, initialPosition[0])
    } else {
      if (won == false) {
        alert('Você ganhou!')
        won = true
      }
    }
  }
}

function render() {
  stats.update() // Update FPS
  cameraUpdate()
  //trackballControls.update() // Enable mouse movements
  keyboardUpdate()
  gameMode()
  requestAnimationFrame(render)
  renderer.render(scene, camera) // Render scene
}

function gameMode() {
  var obj

  if (inspectMode) {
    entryInspect = true
    for (var i = scene.children.length - 1; i >= 2; i--) {
      obj = scene.children[i]
      if (scene.children[i].name != `Carro`) obj.visible = false
    }
  } else {
    if (entryInspect) {
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
    var timelap = timer.getElapsedTime().toFixed(2)
    controls.add(stringLap + ':' + ' ' + timelap)
    actualLap += 1
    checkvalue = 0
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
}

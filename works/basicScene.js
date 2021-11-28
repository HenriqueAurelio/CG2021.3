import * as THREE from '../build/three.module.js'
import Stats from '../build/jsm/libs/stats.module.js'
import KeyboardState from '../libs/util/KeyboardState.js'
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js'
import {
  initRenderer,
  initCamera,
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



const blockSize = 10;

var stats = new Stats() // To show FPS information
var scene = new THREE.Scene() // Create main scene
var renderer = initRenderer() // View function in util/utils
//var camera = initCamera(new THREE.Vector3(0, -30, 15)) // Init camera in this position

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
var planeGeometry = new THREE.PlaneGeometry(250, 250)
planeGeometry.translate(0.0, 0.0, -0.3) // To avoid conflict with the axeshelper
var planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0ab,
  side: THREE.DoubleSide,
})
var plane = new THREE.Mesh(planeGeometry, planeMaterial)
// add the plane to the scene
scene.add(plane)

// Use this to show information onscreen
var controls = new InfoBox()
controls.add('Basic Scene')
controls.addParagraph()
controls.add('Use mouse to interact:')
controls.add('* Left button to rotate')
controls.add('* Right button to translate (pan)')
controls.add('* Scroll to zoom in/out.')
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

let foraDaPista = false;

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

if (inspectMode) {
} else {
  var trackNum = prompt("Qual pista?");
  roads = new tracks(scene, trackNum).getRoads()  
  scene.add(car)
  var roda1 = car.children.filter((part) => part.name == 'tire1')[0]
  var roda2 = car.children.filter((part) => part.name == 'tire2')[0]
}
var timer = new THREE.Clock()
timer.start()
render()

function keyboardUpdate() {
  keyboard.update()
  if (keyboard.pressed('space')) inspectMode = !inspectMode
  if (keyboard.pressed('up')) acc = 5
  else if (keyboard.pressed('down')) acc = -3
  else acc = 0
  var x = timer.getElapsedTime()
  secondaryBox.changeMessage(x.toFixed(2))

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

 
  if(verificaCarroNaPista(car, roads).length > 0){
    maxSpeed = 500;
    maxReverseSpeed = -300;
    foraDaPista = false;
  }
  else{
    if(!foraDaPista){
      speed = speed/2;
      maxSpeed = maxSpeed/2;
      maxReverseSpeed = maxReverseSpeed/2;
    }
    foraDaPista = true;    
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
}

function render() {
  stats.update() // Update FPS
  cameraUpdate()
  //trackballControls.update() // Enable mouse movements
  keyboardUpdate()
  requestAnimationFrame(render)
  renderer.render(scene, camera) // Render scene
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

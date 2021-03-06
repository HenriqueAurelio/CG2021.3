import * as THREE from '../build/three.module.js'
import Stats from '../build/jsm/libs/stats.module.js'
import KeyboardState from '../libs/util/KeyboardState.js'
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js'
import {
  initRenderer,
  InfoBox,
  onWindowResize,
  degreesToRadians,
  initDefaultBasicLight,
} from '../libs/util/util.js'
import Cybertruck from './cyberTruck.js'
import Speedometer from './speedometer.js'
import tracks from './tracks.js'
import BestLap from './bestLap.js'
import ActualLapBox from './actualLap.js'
import TotalTime from './totalTime.js'

const listener = new THREE.AudioListener()
var textureLoader = new THREE.TextureLoader()

// create a global audio source
const sound = new THREE.Audio(listener)

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader()
audioLoader.load('./music.mp3', function (buffer) {
  sound.setBuffer(buffer)
  sound.setLoop(true)
  sound.setVolume(0.2)
  sound.play()
})

var acc = 0
var speed = 0
var maxSpeed = 500
var maxReverseSpeed = -300
var actualLap = 0
var stringLap = ''
var checkvalue = 0
const blockSize = 10
var entryInspect = false
var controls = new InfoBox()
var laps = []
var removeObj
var stats = new Stats() // To show FPS information
var scene = new THREE.Scene() // Create main scene
var renderer = initRenderer() // View function in util/utils
var isCollided = false
var actualTrack = 1
scene.add(listener)

// setShadowMap
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.VSMShadowMap // default
//---------------- setLights -----------------

//initDefaultBasicLight(scene, true)

var ambientLight = new THREE.AmbientLight('rgb(60,60,60)', 0.5) //0.5

// var ambientLight = new THREE.HemisphereLight(
//   'white', // bright sky color
//   'darkslategrey', // dim ground color
//   0.5, // intensity
// );
scene.add(ambientLight)

// Create and set the spotlight
var dirLight = new THREE.DirectionalLight('rgb(255,255,255)', 0.7555) //0.7555
dirLight.position.copy(new THREE.Vector3(2.0, 1.2, 0.0))
dirLight.castShadow = true

// Shadow Parameters
dirLight.shadow.mapSize.width = 512 //256
dirLight.shadow.mapSize.height = 512 //256
dirLight.shadow.camera.near = 0.1 //0.1
dirLight.shadow.camera.far = 100 //100
dirLight.shadow.camera.left = -5 //-5
dirLight.shadow.camera.right = 5 //5
dirLight.shadow.camera.bottom = -5 //-5
dirLight.shadow.camera.top = 5 //5
dirLight.shadow.bias = -0.0005 //-0.0005

// No effect on Basic and PCFSoft
dirLight.shadow.radius = 4 //4

// Just for VSM - to be added in threejs.r132
dirLight.shadow.blurSamples = 2
scene.add(dirLight)

// Create helper for the spotlight shadow
//const shadowHelper = new THREE.CameraHelper(dirLight.shadow.camera)
//shadowHelper.visible = true
//scene.add(shadowHelper)

//---------------------------------------------------------

// Show axes (parameter is size of each axis)
//var axesHelper = new THREE.AxesHelper(12)
//scene.add(axesHelper)

var angle = degreesToRadians(1)
var tireAngle = degreesToRadians(0.5)
var keyboard = new KeyboardState()
const coeficienteVelocidade = 1500
addSkybox()
// create the ground plane

var planeGeometry = new THREE.PlaneGeometry(400, 400, 64, 64)
var planeMaterial = new THREE.MeshLambertMaterial({
  color: 'rgb(255,255,255)',
  side: THREE.DoubleSide,
})
var plane = new THREE.Mesh(planeGeometry, planeMaterial)

var textureLoader = new THREE.TextureLoader()
if (actualTrack == 1) {
  var floor = textureLoader.load('../textures/grass3.jpg')
  plane.material.map = floor
  plane.material.map.repeat.set(100, 100)
  plane.material.map.wrapS = THREE.RepeatWrapping
  plane.material.map.wrapT = THREE.RepeatWrapping
}

scene.add(plane)

// Use this to show information onscreen

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
var thirdPersonMode = false
let cybertruck = new Cybertruck()

scene.add(cybertruck)

// Camera
let SCREEN_WIDTH = window.innerWidth
let SCREEN_HEIGHT = window.innerHeight
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT

var gameCamera = new THREE.PerspectiveCamera(30, aspect, 1, 15000)
var inspectCamera = new THREE.PerspectiveCamera(50, aspect, 1, 15000)
var thirdPersonCamera = new THREE.PerspectiveCamera(40, aspect, 1, 500)

//InspectCamera
inspectCamera.position.set(5, -10, 10)
inspectCamera.up.set(0, 0, 2)
var trackballControls = new TrackballControls(
  inspectCamera,
  renderer.domElement
)

//SpotLight InspectCamera
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(10, 10, 10)

spotLight.castShadow = true

spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024

spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 100
spotLight.shadow.camera.fov = 40

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
  cameraPoint.getWorldPosition(worldPosition)
  var temp = new THREE.Vector3()
  if (thirdPersonMode) {
    temp.setFromMatrixPosition(thirdCameraPoint.matrixWorld)
    camera.position.lerp(new THREE.Vector3(temp.x, temp.y, temp.z + 2), 0.1)
    camera.lookAt(lookAtPoint)
  } else {
    cybertruck.remove(camera)
    camera.position.x = cybertruck.position.x + 20
    camera.position.y = cybertruck.position.y - 10
    camera.position.z = cybertruck.position.z + 25
  }

  dirLight.position.x = camera.position.x
  dirLight.position.y = camera.position.y - 15 //-15
  dirLight.position.z = camera.position.z + 30 // 30
  dirLight.target = cybertruck
  camera.lookAt(worldPosition)
}

// Tracks
let roads = []
let track = new tracks(scene, actualTrack)
recreatingInfoBox()
roads = track.getRoads()
track.createRoadItems()

var initialPosition = roads.filter((part) => part.name == 'InitialPosition')
var roda1 = cybertruck.children.filter((part) => part.name == 'tire1')[0]
var roda2 = cybertruck.children.filter((part) => part.name == 'tire2')[0]
var roda3 = cybertruck.children.filter((part) => part.name == 'tire3')[0]
var roda4 = cybertruck.children.filter((part) => part.name == 'tire4')[0]
var carBlock = cybertruck.children[0]
var cameraPoint = cybertruck.children.filter(
  (part) => part.name == 'cameraPoint'
)[0]
var thirdCameraPoint = cybertruck.children.filter(
  (part) => part.name == 'thirdCameraPoint'
)[0]
var lookAtPoint = cybertruck.children.filter(
  (part) => part.name == 'lookAtPoint'
)[0]
var wheels = [roda1, roda2, roda3, roda4]
carStartPosition()
var won = false
var totalTimer = new THREE.Clock()
var timer = new THREE.Clock()
timer.start()
totalTimer.start()
//render()
var minutes = 0
var totalMinutes = 0
var entryTimer = false
var entryTimer2 = false

var blockBoundingBox = new THREE.Box3()
carBlock.geometry.computeBoundingBox()
blockBoundingBox.copy(carBlock.geometry.boundingBox)
carBlock.updateMatrixWorld(true)
blockBoundingBox.applyMatrix4(carBlock.matrixWorld)
// var box3Helper = new THREE.Box3Helper(blockBoundingBox, 0xff0000)

// scene.add(box3Helper)

function keyboardUpdate() {
  keyboard.update()
  if (keyboard.down('1')) {
    actualTrack = 1
    keyboardEvent(actualTrack)
  }
  if (keyboard.down('2')) {
    actualTrack = 2
    keyboardEvent(actualTrack)
  }
  if (keyboard.down('3')) {
    actualTrack = 3
    keyboardEvent(actualTrack)
  }
  if (keyboard.down('4')) {
    actualTrack = 4
    keyboardEvent(actualTrack)
  }
  if (keyboard.down('space')) {
    if (inspectMode == false && thirdPersonMode == false) thirdPersonMode = true
    else if (thirdPersonMode == true) {
      inspectMode = true
      thirdPersonMode = false
    } else {
      inspectMode = false
      thirdPersonMode = false
    }
  }
  // if (!inspectMode) {
  if (actualLap < 4) {
    if (keyboard.pressed('X')) {
      acc = 5
    } else if (keyboard.pressed('down')) acc = -3
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
      totalMinutes++
      entryTimer2 = false
    }
    if ((totalTimeLap % 60).toFixed() == 1) {
      entryTimer2 = true
    }
    totalTimeBox.changeMessage(
      `Tempo total: ${totalMinutes}:${
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
    if (isCollided) {
      maxSpeed = 100
      maxReverseSpeed = -60
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
      alert('Voc?? ganhou!')
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
render()

function render() {
  stats.update() // Update FPS
  updateBoundingBox()
  checkCollision()
  //boxHelper.update();
  //carBlock.geometry.computeBoundingBox();
  if (inspectMode) {
    spotLight.position.copy(inspectCamera.position)
    spotLight.target.updateMatrixWorld()
    //spotHelper.update();
    //shadowHelper.update();
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
    }
    camera = inspectCamera
    entryInspect = true
    for (var i = scene.children.length - 1; i >= 2; i--) {
      obj = scene.children[i]
      if (
        scene.children[i].name != `Cybertruck` &&
        scene.children[i].name != 'skybox'
      )
        obj.visible = false
      spotLight.visible = true
    }
  }
  //else if(thirdPersonMode){
  //camera = thirdPersonCamera;
  //}
  else {
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
  cybertruck.position.set(1, 5, 0.9)
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
      scene.children[i].name == 'InitialPosition' ||
      scene.children[i].name == 'item'
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

function updateBoundingBox() {
  carBlock.geometry.computeBoundingBox()
  blockBoundingBox.copy(carBlock.geometry.boundingBox)
  carBlock.updateMatrixWorld(true)
  blockBoundingBox.applyMatrix4(carBlock.matrixWorld)
}

function addSkybox() {
  let texture_front = textureLoader.load('../textures/skybox/cloudy/front.jpg')
  let texture_back = textureLoader.load('../textures/skybox/cloudy/back.jpg')
  let texture_left = textureLoader.load('../textures/skybox/cloudy/left.jpg')
  let texture_right = textureLoader.load('../textures/skybox/cloudy/right.jpg')
  let texture_top = textureLoader.load('../textures/skybox/cloudy/up.jpg')
  let texture_bottom = textureLoader.load('../textures/skybox/cloudy/down.jpg')

  let materialArray = []

  materialArray.push(
    new THREE.MeshBasicMaterial({ map: texture_front, side: THREE.DoubleSide })
  )
  materialArray.push(
    new THREE.MeshBasicMaterial({ map: texture_back, side: THREE.DoubleSide })
  )

  materialArray.push(
    new THREE.MeshBasicMaterial({ map: texture_top, side: THREE.DoubleSide })
  )
  materialArray.push(
    new THREE.MeshBasicMaterial({ map: texture_bottom, side: THREE.DoubleSide })
  )
  materialArray.push(
    new THREE.MeshBasicMaterial({ map: texture_right, side: THREE.DoubleSide })
  )
  materialArray.push(
    new THREE.MeshBasicMaterial({ map: texture_left, side: THREE.DoubleSide })
  )

  let SkyboxGeo = new THREE.BoxGeometry(500, 500, 500)
  let skybox = new THREE.Mesh(SkyboxGeo, materialArray)

  // Apply texture to the 'map' property of the plane
  var minFilter = THREE.LinearFilter
  var magFilter = THREE.LinearFilter
  skybox.material.map.minFilter = minFilter
  skybox.material.map.magFilter = magFilter

  skybox.rotateX(degreesToRadians(90))
  skybox.name = 'skybox'
  scene.add(skybox)
}

function checkCollision() {
  let bboxes = track.getBboxes()
  let filterObj
  filterObj = bboxes.filter((bbox) => {
    return bbox.intersectsBox(blockBoundingBox)
  })
  isCollided = filterObj.length !== 0
}

function changePlaneTexture(track) {
  if (track == 1) {
    var floor = textureLoader.load('../textures/grass3.jpg')
    plane.material.map = floor
    plane.material.map.repeat.set(100, 100)
    plane.material.map.wrapS = THREE.RepeatWrapping
    plane.material.map.wrapT = THREE.RepeatWrapping
  }
  if (track == 2) {
    var floor = textureLoader.load('../textures/Lava3.png')
    plane.material.map = floor
    plane.material.map.repeat.set(100, 100)
    plane.material.map.wrapS = THREE.RepeatWrapping
    plane.material.map.wrapT = THREE.RepeatWrapping
  }
  if (track == 3) {
    var floor = textureLoader.load('../textures/darkSand.jpg')
    plane.material.map = floor
    plane.material.map.repeat.set(1000, 1000)
    plane.material.map.wrapS = THREE.RepeatWrapping
    plane.material.map.wrapT = THREE.RepeatWrapping
  }
  if (track == 4) {
    var floor = textureLoader.load('../textures/brick2.jfif')
    plane.material.map = floor
    plane.material.map.repeat.set(100, 100)
    plane.material.map.wrapS = THREE.RepeatWrapping
    plane.material.map.wrapT = THREE.RepeatWrapping
  }
}

function recreatingInfoBox() {
  var element = document.getElementById('InfoxBox')
  if (element != null) element.remove()

  controls = new InfoBox()
  controls.name = 'controls'
  controls.add('Controls:')
  controls.addParagraph()
  controls.add('* X to accelerate')
  controls.add('* Left/Right button to rotate')
  controls.add('* Down button to brake')
  controls.add('1,2,3,4 To change the actual map')
  controls.addParagraph()
  controls.add('Press Space button to Inspect Mode')
  controls.add('* Scroll to zoom in/out.')
  controls.addParagraph()
  controls.add('Lap time:')
  controls.show()
}

function keyboardEvent(trackByParms) {
  removeRoad()
  recreatingInfoBox()
  track = new tracks(scene, trackByParms)
  roads = track.getRoads()
  track.createRoadItems()
  initialPosition = roads.filter((part) => part.name == 'InitialPosition')
  carStartPosition()
  actualLap = 0
  changePlaneTexture(actualTrack)
  checkvalue = 0
  timer.start()
  totalTimer.start()
  console.log(scene)
}

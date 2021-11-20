import * as THREE from '../build/three.module.js'
import Stats from '../build/jsm/libs/stats.module.js'
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js'
import {
  initRenderer,
  initCamera,
  InfoBox,
  onWindowResize,
  initDefaultBasicLight,
} from '../libs/util/util.js'

var stats = new Stats() // To show FPS information
var scene = new THREE.Scene() // Create main scene
var renderer = initRenderer() // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, -30, 15)) // Init camera in this position
initDefaultBasicLight(scene, true)
// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement)

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12)
scene.add(axesHelper)

// create the ground plane
var planeGeometry = new THREE.PlaneGeometry(60, 60)
planeGeometry.translate(0.0, 0.0, -0.02) // To avoid conflict with the axeshelper
var planeMaterial = new THREE.MeshBasicMaterial({
  color: 'rgba(150, 150, 150)',
  side: THREE.DoubleSide,
})
var plane = new THREE.Mesh(planeGeometry, planeMaterial)
// add the plane to the scene
scene.add(plane)

//Adding car to the scene
var tire1 = createTire()
scene.add(tire1)
var tire2 = createTire()
scene.add(tire2)
var tire3 = createTire()
scene.add(tire3)
var tire4 = createTire()
scene.add(tire4)
var axis1 = createAxis()
scene.add(axis1)
var axis2 = createAxis()
scene.add(axis2)

//Grouping tires with axis
axis1.add(tire1)
axis1.add(tire2)
axis2.add(tire3)
axis2.add(tire4)

//Setting position to the axis and tire
axis1.position.set(10, 0, 0.5)
tire1.position.set(0, 2.0, 0)
tire1.rotateX(Math.PI / 2)
tire2.position.set(0, -2.0, 0)
tire2.rotateX(Math.PI / 2)

axis2.position.set(0, 0, 0.5)
tire3.position.set(0, 2.0, 0)
tire3.rotateX(Math.PI / 2)
tire4.position.set(0, -2.0, 0)
tire4.rotateX(Math.PI / 2)

// Use this to show information onscreen
var controls = new InfoBox()
controls.add('Basic Scene')
controls.addParagraph()
controls.add('Use mouse to interact:')
controls.add('* Left button to rotate')
controls.add('* Right button to translate (pan)')
controls.add('* Scroll to zoom in/out.')
controls.show()

// Listen window size changes
window.addEventListener(
  'resize',
  function () {
    onWindowResize(camera, renderer)
  },
  false
)

render()

function createTire() {
  const geometry = new THREE.TorusGeometry(0.25, 0.08, 8, 100)
  const material = new THREE.MeshPhongMaterial({ color: 'rgb(0, 0, 213)' })
  const torus = new THREE.Mesh(geometry, material)
  return torus
}

function createAxis() {
  const CylinderGeometry = new THREE.CylinderGeometry(0.25, 0.25, 4)
  const cylinderMaterial = new THREE.MeshPhongMaterial({
    color: 'rgb(255, 0, 0)',
  })
  const cylinder = new THREE.Mesh(CylinderGeometry, cylinderMaterial)
  return cylinder
}
function render() {
  stats.update() // Update FPS
  trackballControls.update() // Enable mouse movements
  requestAnimationFrame(render)
  renderer.render(scene, camera) // Render scene
}

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

import car from './car.js'
import tracks from './tracks.js'

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
var planeGeometry = new THREE.PlaneGeometry(400, 400)
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

// Listen window size changes
window.addEventListener(
  'resize',
  function () {
    onWindowResize(camera, renderer)
  },
  false
)

var inspectCar = false;

new car(scene);
if(inspectCar == false){
  new tracks(scene,1);

}

render()

function render() {
  stats.update() // Update FPS
  trackballControls.update() // Enable mouse movements
  requestAnimationFrame(render)
  renderer.render(scene, camera) // Render scene
}

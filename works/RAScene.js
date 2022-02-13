import * as THREE from  '../build/three.module.js';
import {ARjs}    from  '../libs/AR/ar.js';
import {InfoBox,
	getMaxSize, 
	initDefaultSpotlight,
	degreesToRadians} from "../libs/util/util.js";
import Cybertruck from './cyberTruck.js'


var renderer	= new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize( 640, 480 );
document.body.appendChild( renderer.domElement );
// init scene and camera
var scene	= new THREE.Scene();
var camera = new THREE.Camera();
scene.add(camera);

// array of functions for the rendering loop
var onRenderFcts= [];

// Show text information onscreen
showInformation();

var arToolkitSource = new ARjs.Source({	
	// to read from the webcam
	//sourceType : 'webcam',

	// to read from an image
	sourceType : 'image',
	sourceUrl : '../assets/AR/kanjiScene.jpg',

	// to read from a video
	// sourceType : 'video',
	// sourceUrl : '../assets/AR/kanjiScene.mp4'
})

arToolkitSource.init(function onReady(){
	setTimeout(() => {
		onResize()
	}, 2000);
})

// handle resize
window.addEventListener('resize', function(){
	onResize()
})

function onResize(){
	arToolkitSource.onResizeElement()
	arToolkitSource.copyElementSizeTo(renderer.domElement)
	if( arToolkitContext.arController !== null ){
		arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
	}
}

//----------------------------------------------------------------------------
// initialize arToolkitContext
//
// create atToolkitContext
var arToolkitContext = new ARjs.Context({
	cameraParametersUrl: '../libs/AR/data/camera_para.dat',
	detectionMode: 'mono',
})

// initialize it
arToolkitContext.init(function onCompleted(){
	// copy projection matrix to camera
	camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
})

// update artoolkit on every frame
onRenderFcts.push(function(){
	if( arToolkitSource.ready === false )	return
	arToolkitContext.update( arToolkitSource.domElement )
	// update scene.visible if the marker is seen
	scene.visible = camera.visible
})

//----------------------------------------------------------------------------
// Create a ArMarkerControls
//
// init controls for camera
//var markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
var markerControls = new ARjs.MarkerControls(arToolkitContext, camera, {	
	type : 'pattern',
	patternUrl : '../libs/AR/data/patt.kanji',
	changeMatrixMode: 'cameraTransformMatrix' // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
})
// as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
scene.visible = false


//createTorus();
var cybertruck = new THREE.Object3D()
createCybertruck();
scene.add( cybertruck );

// render the scene
onRenderFcts.push(function(){
	renderer.render( scene, camera );
})

function createCybertruck()
{
	initDefaultSpotlight(scene, new THREE.Vector3(25, 30, 20)); // Use default light
	var object = new Cybertruck();
	object.position.set(0.0, 0.2, 0.0);
	object.rotateX(Math.PI/2);
	object.rotateZ(degreesToRadians(180))
	object.rotateY(degreesToRadians(180))
	
	cybertruck.add(normalizeAndRescale(object,40));
	cybertruck.visible = true;
}

function showInformation()
{
	// Use this to show information onscreen
	var controls = new InfoBox();
		controls.add("Augmented Reality - Basic Example");
		controls.addParagraph();
		controls.add("Put the 'KANJI' marker in front of the camera.");
		controls.show();
}

// run the rendering loop
requestAnimationFrame(function animate(nowMsec)
{
	var lastTimeMsec= null;	
	// keep looping
	requestAnimationFrame( animate );
	// measure time
	lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
	var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
	lastTimeMsec	= nowMsec
	// call each update function
	onRenderFcts.forEach(function(onRenderFct){
		onRenderFct(deltaMsec/1000, nowMsec/1000)
	})
})


// Normalize scale and multiple by the newScale
function normalizeAndRescale(obj, newScale)
{
  var scale = getMaxSize(obj); // Available in 'utils.js'
  obj.scale.set(newScale * (1.0/scale),
                newScale * (1.0/scale),
                newScale * (1.0/scale));
  return obj;
}

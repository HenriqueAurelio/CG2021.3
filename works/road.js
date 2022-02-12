import * as THREE from '../build/three.module.js'

export default class road extends THREE.Mesh {
  constructor(x, y, start = false, shape = 1) {
    let geometry = new THREE.BoxGeometry(10, 10, 0.3)

    if (shape == 2) geometry = THREE.CylinderGeometry(0.125, 0.125, 2.5)

    let material

    if (start) {
      material = new THREE.MeshLambertMaterial({
        color: 'rgb(255,255,255)',
        side: THREE.DoubleSide,
      })
    } else {
      material = new THREE.MeshLambertMaterial({
        color: 'rgb(255,255,255)',
        side: THREE.DoubleSide,
      })
    }

    const cube = new THREE.Mesh(geometry, material)
    cube.name = start ? 'InitialPosition' : 'street'
    cube.position.set(x, y)
    cube.receiveShadow = true
    cube.castShadow = true

    if (start) {
      var textureLoader = new THREE.TextureLoader()
      // var floor = textureLoader.load('../textures/start.jpg')
      // cube.material.map = floor
      // cube.material.map.repeat.set(100, 100)
      // cube.material.map.wrapS = THREE.RepeatWrapping
      // cube.material.map.wrapT = THREE.RepeatWrapping
      const geometry = new THREE.PlaneGeometry(10, 1)
      const material = new THREE.MeshLambertMaterial({
        color: 'rgb(255,255,255)',
        side: THREE.DoubleSide,
      })
      const plane = new THREE.Mesh(geometry, material)
      console.log(plane)
      var textureLoader = new THREE.TextureLoader()
      var floor = textureLoader.load('../textures/checker.jpg')
      plane.material.map = floor
      plane.material.map.repeat.set(1, 1)
      plane.material.map.wrapS = THREE.RepeatWrapping
      plane.material.map.wrapT = THREE.RepeatWrapping
      plane.position.set(0, 2, 0.2)
      cube.add(plane)
    } else {
      var textureLoader = new THREE.TextureLoader()
      var floor = textureLoader.load('../textures/road.jpg')
      cube.material.map = floor
      cube.material.map.repeat.set(100, 100)
      cube.material.map.wrapS = THREE.RepeatWrapping
      cube.material.map.wrapT = THREE.RepeatWrapping
    }

    return cube
  }
}

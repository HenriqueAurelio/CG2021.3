import * as THREE from '../build/three.module.js'

export default class road extends THREE.Mesh{
    constructor(x,y){
        const geometry = new THREE.BoxGeometry(9.9, 9.9, 0.3)
        const material = new THREE.MeshPhongMaterial({ color: 0xffffff})
        const cube = new THREE.Mesh(geometry, material)
        cube.position.set(x,y);
        return cube;
    }
}

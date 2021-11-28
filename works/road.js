import * as THREE from '../build/three.module.js'

export default class road extends THREE.Mesh{
    constructor(x,y,start = false){
        const geometry = new THREE.BoxGeometry(9.85, 9.85, 0.3)
        let material
        if(start)
            material = new THREE.MeshPhongMaterial({ color: 0xfd8612})
        else
            material = new THREE.MeshPhongMaterial({ color: 0xffffff})
        const cube = new THREE.Mesh(geometry, material)
        cube.position.set(x,y);
        return cube;
    }
}

import * as THREE from '../build/three.module.js'


export default class road {
    constructor(scene,x,y){
        super();
        scene.add(new THREE.BoxGeometry());
    }
}
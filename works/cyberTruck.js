import * as THREE from '../build/three.module.js'

export default class Cybertruck extends THREE.Mesh{
    constructor() {
        super();
        return this.createCar()
    }

    createCar(){
        var car = new THREE.Group()

        var block = this.createBlock();
        block.position.set(1,1,3);
        car.add(block);

        this.createTires().forEach(element => car.add(element));
        return car;
    }

    createBlock(){
        const geometry = new THREE.BoxGeometry(1,3,1)
        const material = new THREE.MeshPhongMaterial({ color: '#c0c0c0' })
        const block = new THREE.Mesh(geometry, material)
        block.position.set(1,1,3);
        return block;
    }

    createBodywork(){
        
    }

    createHeadlights(){
        
    }

    createWindows(){
        //THREE.MeshLambertMaterial
    }

    createTires() {
        var tires = []
        for(let index = 0; index < 4; index++) {
            const geometry = new THREE.TorusGeometry(0.3, 0.1, 8, 100)
            const material = new THREE.MeshPhongMaterial({ color: 'rgb(0, 0, 213)' })
            const torus = new THREE.Mesh(geometry, material)
            tires.push(torus);
        }

        tires[0].position.set(0, 1.25, 0.6);
        tires[1].position.set(0, -1.25, 0.6);
        tires[2].position.set(3, 1.25, 0.6);
        tires[3].position.set(3, -1.25, 0.6);

        return tires;
    }
}
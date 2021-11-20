import * as THREE from '../build/three.module.js'

export default class car {

    constructor(scene) {
        this.scene = scene
        this.createCar()
    }

    createTire() {
        const geometry = new THREE.TorusGeometry(0.3, 0.08, 8, 100)
        const material = new THREE.MeshPhongMaterial({ color: 'rgb(0, 0, 213)' })
        const torus = new THREE.Mesh(geometry, material)
        return torus
    }

    createAxis() {
        const CylinderGeometry = new THREE.CylinderGeometry(0.25, 0.25, 4)
        const cylinderMaterial = new THREE.MeshPhongMaterial({
        color: 'rgb(255, 0, 0)',
        })
        const cylinder = new THREE.Mesh(CylinderGeometry, cylinderMaterial)
        return cylinder
    }
    
    createCar() {
        //Adding car to the scene
        var tire1 = this.createTire()
        this.scene.add(tire1)
        var tire2 = this.createTire()
        this.scene.add(tire2)
        var tire3 = this.createTire()
        this.scene.add(tire3)
        var tire4 = this.createTire()
        this.scene.add(tire4)
        var axis1 = this.createAxis()
        this.scene.add(axis1)
        var axis2 = this.createAxis()
        this.scene.add(axis2)

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
    }
}

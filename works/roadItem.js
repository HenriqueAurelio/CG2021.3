import * as THREE from '../build/three.module.js'
import {
    degreesToRadians,
  } from '../libs/util/util.js'

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export default class roadItem{

    constructor(roads) {
        this.itemIndex = 0;
        this.roads =[];
        this.roads = roads;
    }

    createRoadItem(){
        let block;
        let object;
        
        // escolhe em qual road vai colocar, não podendo ser 0 e 1 por estar proximo demais da largada
        block = this.roads[getRandomInt(2,this.roads.length-1)]
        
        //Colocar em posição aleatoria da estrada
        //entre [-5,5] em x e y, converter para posição real
        let objectPos = new THREE.Vector3(
          block.position.x + getRandom(-4.5,4.5),
          block.position.y + getRandom(-4.5,4.5),
          0.8
        );

        // itemIndex = 0-2 -> ['cone','caixa','barril']
        switch (this.itemIndex) {
            case 0:
                object = this.createCone();
                break;
            case 1:
                object = this.createCrate();
                break;
            case 2:
                object = this.createWoodenBarrel();
                break;        
            default:
                break;
        }
        object.position.copy(objectPos);
        this.itemIndex++;

        if(this.itemIndex == 3)
            this.itemIndex = 0;
        
        object.name = 'item';
        return object;
    }

    createCone() {
        const geometry = new THREE.CylinderGeometry(0.05, 0.4, 1.3,36,36,true)
        var defaultMaterial = new THREE.MeshLambertMaterial({
          color: 'rgb(255,255,255)',
          side: THREE.DoubleSide,
        })
        const cone = new THREE.Mesh(geometry, defaultMaterial)
        var textureLoader = new THREE.TextureLoader()
        var body = textureLoader.load('../textures/cone2.jpg')
      
        var minFilter = THREE.LinearFilter
        var magFilter = THREE.LinearFilter
      
        // Apply texture to the 'map' property of the plane
        cone.material.map = body
      
        cone.material.map.minFilter = minFilter
        cone.material.map.magFilter = magFilter
        cone.position.set(0, 16, 0.9)
      
        cone.rotateX(degreesToRadians(90))
        return cone;
    }
      
    createCrate() {
        var minFilter = THREE.LinearFilter
        var magFilter = THREE.LinearFilter
      
        // Apply texture to the 'map' property of the plane
      
        var textureLoader = new THREE.TextureLoader()
        var body = textureLoader.load('../textures/crate.jpg')
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        var defaultMaterial = new THREE.MeshLambertMaterial({
          color: 'rgb(255,255,255)',
          side: THREE.DoubleSide,
        })
      
        const cube = new THREE.Mesh(geometry, defaultMaterial)
        cube.material.map = body
      
        cube.material.map.minFilter = minFilter
        cube.material.map.magFilter = magFilter
        cube.position.set(0, 13, 0.9)
        return cube;
      }
      
    createWoodenBarrel() {
        var cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.25, 40, 3, true)
        var defaultMaterial = new THREE.MeshLambertMaterial({
          color: 'rgb(255,255,255)',
          side: THREE.DoubleSide,
        })
      
        var cylinderBody = new THREE.Mesh(cylinderGeometry, defaultMaterial)
      
        var topGeometry = new THREE.CircleGeometry(0.5, 80)
        var topMaterial = new THREE.MeshLambertMaterial({
          color: 'rgb(255,255,255)',
          side: THREE.DoubleSide,
        })
      
        var cylinderTop = new THREE.Mesh(topGeometry, topMaterial)
        var cylinderBottom = new THREE.Mesh(topGeometry, topMaterial)
      
        cylinderTop.rotateX(degreesToRadians(90))
        cylinderBody.add(cylinderTop)
        cylinderBody.position.set(1, 10, 0.9)
        cylinderBody.rotateX(degreesToRadians(90))
        cylinderBody.add(cylinderBottom)
      
        cylinderBottom.rotateX(degreesToRadians(90))
        cylinderBottom.translateZ(0.625)
        cylinderTop.translateZ(-0.625)
        //----------------------------------------------------------------------------
        //-- Use TextureLoader to load texture files
        var textureLoader = new THREE.TextureLoader()
        var body = textureLoader.load('../textures/barrel.jpg')
        var top = textureLoader.load('../textures/barrel.jpg')
      
        var minFilter = THREE.LinearFilter
        var magFilter = THREE.LinearFilter
        // Apply texture to the 'map' property of the plane
        cylinderBody.material.map = body
        cylinderTop.material.map = top
        cylinderBottom.material.map = top
      
        cylinderBody.material.map.repeat.set(1, 1)
        cylinderBody.material.map.wrapS = THREE.RepeatWrapping
        cylinderBody.material.map.wrapT = THREE.RepeatWrapping
      
        cylinderBody.material.map.minFilter = minFilter
        cylinderBody.material.map.magFilter = magFilter
      
        cylinderTop.material.map.repeat.set(1, 1)
        cylinderTop.material.map.wrapS = THREE.RepeatWrapping
        cylinderTop.material.map.wrapT = THREE.RepeatWrapping
      
        cylinderTop.material.map.minFilter = minFilter
        cylinderTop.material.map.magFilter = magFilter
      
        cylinderBottom.material.map.repeat.set(1, 1)
        cylinderBottom.material.map.wrapS = THREE.RepeatWrapping
        cylinderBottom.material.map.wrapT = THREE.RepeatWrapping
      
        cylinderBottom.material.map.minFilter = minFilter
        cylinderBottom.material.map.magFilter = magFilter
    
        return cylinderBody;
    }
}
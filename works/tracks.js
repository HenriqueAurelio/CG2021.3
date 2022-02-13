import road from "./road.js";
import * as THREE from "../build/three.module.js";
import roadItem from "./roadItem.js";

const blockSize = 10;
export default class tracks {
  constructor(scene, track, xPos = 0, yPos = 0) {
    this.scene = scene;
    let layout = [];
    this.roads = [];

    // [x, y, tam, roadShape]
    switch (track) {
      case 1:
        layout = [
          [0, 1, 10, 1],
          [1, 0, 10, 1],
          [0, -1, 10, 1],
          [-1, 0, 10, 1]
        ];
        break;

      case 2:
        layout = [
          [0, 1, 10, 1],
          [1, 0, 5, 1],
          [0, -1, 5, 1],
          [1, 0, 5, 1],
          [0, -1, 5, 1],
          [-1, 0, 10, 1]
        ];
        break;

      case 3:
        layout = [
          [0, 1, 10, 1],
          [1, 0, 4, 1],
          [0, -1, 7, 1],
          [-1, 0, 4, 1],
          [0, 1, 7, 1],
          [1, 0, 10, 1],
          [0, -1, 6, 1],
          [-1, 0, 2, 1],
          [0, -1, 4, 1],
          [-1, 0, 8, 1]
          ];
        break;

      case 4:
        layout = [
          [0, 1, 3, 1],
          [1, 0, 5, 1],
          [0, 1, 7, 1],
          [1, 0, 5, 1],
          // Usar nessa parte abaixo pista diferente
          [0, -1, 5, 1],
          [-1, 0, 7, 1],
          [0, -1, 5, 1],
          [-1, 0, 3, 1]
        ];
        break;

      default:
        break;
    }

    let cube;

    for (let i = 0; i < layout.length; i++) {
      let dir = layout[i];
      let tam = dir[2];
      for (let j = 0; j < tam; j++) {
        // setStart
        if (i == 0 && j == 0)
          cube = new road(
            dir[0] * blockSize + xPos,
            dir[1] * blockSize + yPos,
            1
          );
        else
          cube = new road(dir[0] * blockSize + xPos, dir[1] * blockSize + yPos);
        this.scene.add(cube);
        this.roads.push(cube);
        xPos += dir[0] * blockSize;
        yPos += dir[1] * blockSize;
      }
    }
  }

  createRoadItems(){
    let bboxes = [];
    let item = new roadItem(this.getRoads())
    let itemCount = 0;
    while (itemCount != 20) {
      let object = item.createRoadItem();
      this.scene.add(object);
      bboxes.push(new THREE.Box3().setFromObject(object));
      var bboxHelper = new THREE.Box3Helper(new THREE.Box3().setFromObject(object), 0xFF0000);
      this.scene.add(bboxHelper);
      itemCount ++;
    }
  }

  getRoads() {
    return this.roads;
  }

  changew() {
    this.constructor();
  }
}

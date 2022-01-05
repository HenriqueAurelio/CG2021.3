import road from "./road.js";
import * as THREE from "../build/three.module.js";

const blockSize = 10;
let roads = [];
export default class tracks {
  constructor(scene, track, xPos = 0, yPos = 0) {
    this.scene = scene;
    let layout = [];

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
      for (let j = 0; j < dir[2]; j++) {
        // setStart
        if (i == 0 && j == 0)
          cube = new road(
            dir[0] * blockSize + xPos,
            dir[1] * blockSize + yPos,
            1
          );
        else
          cube = new road(dir[0] * blockSize + xPos, dir[1] * blockSize + yPos);
        scene.add(cube);
        roads.push(cube);
        xPos += dir[0] * blockSize;
        yPos += dir[1] * blockSize;
      }
    }
  }
  getRoads() {
    return roads;
  }
  changeRoads() {
    this.constructor();
  }
}

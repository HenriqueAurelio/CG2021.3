import road from './road.js';

const blockSize = 10;

export default class tracks{
    constructor(scene,track,xPos = 0, yPos = 0){

        this.scene = scene;
        let layout = [];
    
        if(track == 1){
            // [x, y, tam]
            layout = [ 
                [0,1,10],
                [1,0,10],
                [0,-1,10],
                [-1,0,10]
            ]
        }
        else{
            layout = [ 
                [0,1,10],
                [1,0,5],
                [0,-1,5],
                [1,0,5],
                [0,-1,5],
                [-1,0,10]                
            ]
        }
        
        for(let i = 0; i < layout.length;i++){                
            let dir = layout[i]; 
            for(let j = 0; j < dir[2];j++){
                // setStart
                if(i == 0 && j == 2){
                    scene.add(new road(dir[0]*blockSize + xPos, dir[1]*blockSize + yPos,1));
                }
                else{
                    scene.add(new road(dir[0]*blockSize + xPos, dir[1]*blockSize + yPos));
                }
                xPos += dir[0]*blockSize;
                yPos += dir[1]*blockSize;
            }
        }   
    }
}
import road from './road.js';

const blockSize = 10;

export default class tracks{
    constructor(scene,track){
        this.scene = scene;
        let xPos = 0;
        let yPos = 0;
        if(track == 1){
            // [x, y, tam]
            const layout = [ 
                [0,1,10],
                [1,0,10],
                [0,-1,10],
                [-1,0,10]
            ]

            for(let i = 0; i < layout.length;i++){
                let dir = layout[i]; 
                for(let i = 0; i < dir[2];i++){
                    scene.add(new road(dir[0]*blockSize + xPos, dir[1]*blockSize + yPos));
                    xPos += dir[0]*blockSize;
                    yPos += dir[1]*blockSize;
                }
            }   
        }
        else{

            const layout = [ 
                [0,1,10],
                [1,0,5],
                [0,-1,5],
                [1,0,5],
                [0,-1,5],
                [-1,0,10]
                
            ]


            for(let i = 0; i < layout.length;i++){                
                let dir = layout[i]; 
                for(let i = 0; i < dir[2];i++){
                    scene.add(new road(dir[0]*blockSize + xPos, dir[1]*blockSize + yPos));
                    xPos += dir[0]*blockSize;
                    yPos += dir[1]*blockSize;
                }
            }   
        }
        
    }
}
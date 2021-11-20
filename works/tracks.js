import road from './road.js';

export default class tracks{
    constructor(scene,track){
        this.scene = scene;

        if(track == 1){
            // [x, y, tam]
            const layout = [ 
                [0,1,10]
                [1,0,10]
                [0,-1,10]
                [-1,0,10]
            ]

            for(let i = 0; i < layout.length();i++){
                for(let i = 0; i < layout[i][3];i++){
                    scene.add(new road(i,i));
                }
            }   
        }
        else{

            const layout = [ 
                [0,1,10]
                [1,0,5]
                [0,-1,5]
                [1,0,5]
                [-1,0,10]
            ]
        }
    }
}
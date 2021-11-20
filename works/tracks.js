import road from './road.js';

export default class tracks{
    constructor(scene,track){
        this.scene = scene;

        if(track == 1){
            new road(scene,1,2)
        }
        else{
            //nothing here!
        }
    }
}
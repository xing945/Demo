import {Rectangle} from './rectangle.js'
const landDom = document.getElementsByClassName('land')[0];
const landStyles = getComputedStyle(landDom);
const landWidth = parseFloat(landStyles.width);
export const landTop = parseFloat(landStyles.top);
export const landHeight = parseFloat(landStyles.height);
/**
 * 大地类
 */
export class Land extends Rectangle{
    constructor(speed){
        super(landWidth,landHeight,0,landTop,speed,0,landDom)
    }
    onMove(){
        if(this.left <= -landWidth / 2){
            this.left = 0;
        }
    }
}
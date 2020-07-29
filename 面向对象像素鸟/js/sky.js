import {Rectangle} from './Rectangle.js'
const skyDom = document.getElementsByClassName('sky')[0];
const skyStyles = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyles.width);
const skyHeight = parseFloat(skyStyles.height);
/**
 * 天空类
 */
export class Sky extends Rectangle{
    constructor(){
        super(skyWidth,skyHeight,0,0,-50,0,skyDom)
    }
    // 判断边界
    onMove(){
        if(this.left <= -skyWidth / 2){
            this.left = 0;
        }
    }
}


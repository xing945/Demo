import {gameWidth,gameDom} from './game.js'
import { Rectangle } from './rectangle.js';
import {landTop} from './land.js'
/**
 * 一个柱子
 */
class Pipe extends Rectangle{
    constructor(height,top,speed,dom){  
        super(52,height,gameWidth,top,speed,0,dom)
    }
    onMove(){
        if(this.left < -this.width){
            // 移除
            this.dom.remove();
        }
    }
}
/**
 * 随机数
 * @param {*} min 最小值
 * @param {*} max 最大值
 */
function getRandom(min,max){
    return Math.floor(Math.random() * (max + 1 - min) + min)
}
/**
 * 一对柱子
 */
class PipePair{
    constructor(speed){
        this.spaceHeight = 150; //空隙的高度
        this.minHeight = 80; //水管最小高度
        this.maxHeight = landTop - this.spaceHeight - this.minHeight; //水管最大高度
        // 上管子
        const upHeight = getRandom(this.minHeight,this.maxHeight);
        const upDom = document.createElement('div');
        upDom.className = 'pipe up';
        this.upPipe = new Pipe(upHeight,0,speed,upDom);
        // 下管子
        const downHeight = landTop - upHeight - this.spaceHeight;
        const downTop = landTop - downHeight;
        const downDom = document.createElement('div');
        downDom.className = 'pipe down';
        this.downPipe = new Pipe(downHeight,downTop,speed,downDom)
        gameDom.appendChild(upDom)
        gameDom.appendChild(downDom);
    }
    // 该柱子已经移出了视野
    get useLess(){
        return this.upPipe.left < -this.upPipe.width;
    }
    // 移动
    move(duration){
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
}
/**
 * 不断产生柱子
 */
export class PipeProducer{
    constructor(speed){
        this.speed = speed;
        this.pairs = [];
        this.timer = null;
        this.tick = 1500;
    }
    startProduce(){
        if(this.timer){
            return;
        }
        this.timer = setInterval(() => {
            this.pairs.push(new PipePair(this.speed))
            //移除掉用不到的柱子
            for(let i = 0; i < this.pairs.length; i++){
                let pair = this.pairs[i];
                if(pair.useLess){
                    //没用的柱子对
                    this.pairs.splice(i,1);
                    i--;
                }
            }
        }, this.tick);
    }
    stopProduce(){
        clearInterval(this.timer);
        this.timer = null;
    }
}


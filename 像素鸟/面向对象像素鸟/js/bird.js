import { Rectangle } from './Rectangle.js'
import {landHeight} from './land.js'
import {gameHeight} from './game.js'
const birdDom = document.getElementsByClassName('bird')[0]
const birdStyles = getComputedStyle(birdDom)
const birdWidth = parseFloat(birdStyles.width)
const birdHeight = parseFloat(birdStyles.height)
const birdTop = parseFloat(birdStyles.top)
const birdLeft = parseFloat(birdStyles.left)
/**
 * 小鸟类
 */
export class Bird extends Rectangle {
	constructor() {
		super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom)
        this.swingStatus = 1 //小鸟翅膀的状态
        this.swingTimer = null; // 扇动翅膀计时器
        this.g = 1500; //向下的加速度，单位：像素/秒²
        // 最大的Y坐标
        this.maxY = gameHeight - landHeight - this.height;
        this.render(); //一开始就渲染
	}
	// 开始扇动翅膀
	startSwing() {
        if(this.swingTimer){
            return;
        }
		this.swingTimer = setInterval(() => {
			this.swingStatus++
			if (this.swingStatus === 4) {
				this.swingStatus = 1
			}
			this.render()
		}, 200)
	}
	// 渲染
	render() {
		super.render() //重用父类的render
		birdDom.className = `bird swing${this.swingStatus}`
	}
	// 停止扇动翅膀
	stopSwing() {
        clearInterval(this.swingTimer);
        this.swingTimer = null;
    }
    // 移动
    move(duration){
        super.move(duration); //重用父类的move
        this.speedY += this.g * duration;
    }
    // 小鸟跳
    jump(){
        this.speedY = -450;
    }
    // 判定边界
    onMove(){
        if(this.top < 0){
            this.top = 0;
        }else if(this.top > this.maxY){
            this.top = this.maxY;
        }
    }
}

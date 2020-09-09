import { Sky } from './sky.js'
import { Land } from './land.js'
import { Bird } from './bird.js'
import { PipeProduce } from './pipe.js'
export const gameDom = document.getElementById('game')
export const gameHeight = gameDom.clientHeight
export const gameWidth = gameDom.clientWidth
const overDom = document.getElementsByClassName('over')[0];
/**
 * 游戏类
 */
export class Game {
	constructor() {
		this.sky = new Sky()
		this.land = new Land(-100)
		this.bird = new Bird()
		this.pipeProduce = new PipeProduce(-100)
		this.timer = null //计时器
		this.tick = 16 //移动时间间隔，毫秒
		this.gameOver = false // 是否结束游戏
	}
	// 开始游戏
	start() {
		// 如果已经开启了直接结束
		if (this.timer) {
			return
        }
        if(this.gameOver){
            // 重新开始游戏
            window.location.reload();
        }
		this.bird.startSwing() //小鸟开始扇动翅膀
		this.pipeProduce.startProduce() //开始生成柱子
		this.timer = setInterval(() => {
			const duration = this.tick / 1000
			this.sky.move(duration)
			this.land.move(duration)
			this.bird.move(duration)
			this.pipeProduce.pairs.forEach((pair) => {
                pair.move(duration)
            })
            if(this.isGameOver()){
                this.stop();
                this.gameOver = true;
                overDom.style.display = 'block';
            }
		}, this.tick)
    }
    /**
     * 是否游戏结束
     */
    isGameOver(){
        // 小鸟碰到大地
        if(this.bird.top === this.bird.maxY){
            return true;
        }
        for(let i = 0; i < this.pipeProduce.pairs.length; i++){
            let pair = this.pipeProduce.pairs[i];
            // 小鸟碰到了柱子
            if(this.isHit(this.bird,pair.upPipe) || this.isHit(this.bird,pair.downPipe)){
                return true;
            }
        }
        return false;
    }
    /**
     * 碰撞检测
     * @param {*} r1 小鸟
     * @param {*} r2 每根柱子
     */
    isHit(r1,r2){
        // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
        // 小鸟的中心点
        const centerX1 = r1.left + r1.width / 2;
        const centerY1 = r1.top + r1.height / 2;
        // 柱子的中心点
        const centerX2 = r2.left + r2.width / 2;
        const centerY2 = r2.top + r2.height / 2;
        // 中心点横向坐标
        const disX = Math.abs(centerX1 - centerX2);
        const disY = Math.abs(centerY1 - centerY2);
        if(disX < (r1.width + r2.width) / 2 && disY < (r1.height + r2.height) / 2){
            return true;
        }
        return false;
    }
	// 停止游戏
	stop() {
		clearInterval(this.timer)
		this.timer = null
		this.bird.stopSwing() //小鸟停止扇动翅膀
		this.pipeProduce.stopProduce() //停止生成柱子
	}
	// 绑定事件
	bindEvent() {
		window.onkeydown = (e) => {
			if (e.key === 'Enter') {
				if (this.timer) {
					this.stop()
				} else {
					this.start()
				}
			} else if (e.key === ' ') {
				this.bird.jump()
			}
		}
	}
}

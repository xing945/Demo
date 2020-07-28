import { Sky } from './sky.js'
import { Land } from './land.js'
import { Bird } from './bird.js'
import { PipeProducer } from './pipeProducer.js'
export const gameDom = document.getElementById('game')
export const gameHeight = gameDom.clientHeight
export const gameWidth = gameDom.clientWidth
const over = document.getElementsByClassName('over')[0]
/**
 * 游戏类
 */
class Game {
	constructor() {
		this.sky = new Sky() // 天空类
		this.land = new Land(-100) //大地
		this.bird = new Bird() //小鸟类
		this.pipeProducer = new PipeProducer(-100) // 柱子类
		this.timer = null //计时器
		this.tick = 16 // 移动时间间隔，毫秒
		this.gameOver = false
	}
	// 开始游戏
	start() {
		if (this.timer) {
			//如果定时器开启就直接返回
			return
		}
		if (this.gameOver) {
			// 重新开始游戏
			window.location.reload()
		}
		this.bird.startSwing() //开始扇动翅膀
		this.pipeProducer.startProduce() //开始生成柱子
		this.timer = setInterval(() => {
			const duration = this.tick / 1000
			this.sky.move(duration)
			this.land.move(duration)
			this.bird.move(duration)
			this.pipeProducer.pairs.forEach((pair) => {
				pair.move(duration)
			})
			if (this.isGameOver()) {
				this.stop()
				over.style.display = 'block'
				this.gameOver = true
			}
		}, this.tick)
	}
	// 停止游戏
	stop() {
		clearInterval(this.timer)
		this.timer = null
		this.bird.stopSwing()
		this.pipeProducer.stopProduce()
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
	// 游戏结束
	isGameOver() {
		// 如果碰到了大地
		if (this.bird.top === this.bird.maxY) {
			return true
		}
		// 如果碰到了每个柱子
		for (let i = 0; i < this.pipeProducer.pairs.length; i++) {
			let pair = this.pipeProducer.pairs[i]
			//看柱子对pair是否跟bird进行了碰撞
			if (
				this.isHit(this.bird, pair.upPipe) ||
				this.isHit(this.bird, pair.downPipe)
			) {
				return true
			}
		}
		return false
	}
	// 碰撞检测
	isHit(r1, r2) {
		// 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
        let centerX1 = r1.left + r1.width / 2;   
        let centerY1 = r1.top + r1.height / 2;   
        let centerX2 = r2.left + r2.width / 2;   
        let centerY2 = r2.top + r2.height / 2;   
        let disX = Math.abs(centerX1 - centerX2) //中心点横向距离
        let disY = Math.abs(centerY1 - centerY2) //中心点总想距离
        if(disX < (r1.width + r2.width) / 2 && disY < (r1.height + r2.height) / 2){
            return true;
        }
        return false;
	}
}
// 游戏开始
const game = new Game()
game.bindEvent()

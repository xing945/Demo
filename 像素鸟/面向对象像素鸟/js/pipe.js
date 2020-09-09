import { Rectangle } from './Rectangle.js'
import { gameDom, gameWidth } from './game.js'
import { landTop } from './land.js'
/**
 * 一个柱子类
 */
class Pipe extends Rectangle {
	constructor(height, top, speed, dom) {
		super(52, height, gameWidth, top, speed, 0, dom)
	}
	// 判定边界
	onMove() {
		if (this.left < -this.width) {
			this.dom.remove() //超出去就移除
		}
	}
}
/**
 * 随机数
 * @param {*} min 最小值
 * @param {*} max 最大值
 */
function getRandom(min, max) {
	return Math.floor(Math.random() * (max + 1 - min) + min)
}
/**
 * 一堆柱子类
 */
class PipePair {
	constructor(speed) {
		this.spaceHeight = 150 //柱子空隙的高度
		this.minHeight = 80 //柱子最小高度
		this.maxHeight = landTop - this.spaceHeight - this.minHeight // 柱子最大高度
		// 上面的柱子
		const upHeight = getRandom(this.minHeight, this.maxHeight)
		const upDom = document.createElement('div')
		upDom.className = 'pipe up'
		this.upPipe = new Pipe(upHeight, 0, speed, upDom)
		// 下面的柱子
		const downHeight = landTop - this.spaceHeight - upHeight
		const downTop = landTop - downHeight
		const downDom = document.createElement('div')
		downDom.className = 'pipe down'
		this.downPipe = new Pipe(downHeight, downTop, speed, downDom)
		gameDom.appendChild(upDom)
		gameDom.appendChild(downDom)
	}
	/**
	 * 该柱子对是否已经移出了视野
	 */
	get upLess() {
		return this.upPipe.left < -this.upPipe.width
	}
	/**
	 * 移动
	 * @param {*} duration 间隔时间
	 */
	move(duration) {
		this.upPipe.move(duration)
		this.downPipe.move(duration)
	}
}
/**
 * 不断的产生柱子
 */
export class PipeProduce {
	constructor(speed) {
        this.speed = speed;
		this.pipeTimer = null //产生柱子的计时器
		this.pairs = [] //装柱子的数组
		this.tick = 1500 //间隔时间
	}
	// 开始产生柱子
	startProduce() {
		if (this.pipeTimer) {
			return
		}
		this.pipeTimer = setInterval(() => {
			this.pairs.push(new PipePair(this.speed))
			// 移除没用的柱子
			for (let i = 0; i < this.pairs.length; i++) {
				if (this.upLess) {
                    //没用的柱子对
					this.pairs[i].splice(i, 1)
					i--
				}
			}
		}, this.tick)
	}
	// 停止产生柱子
	stopProduce() {
		clearInterval(this.pipeTimer)
		this.pipeTimer = null
	}
}

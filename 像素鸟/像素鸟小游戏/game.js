// 像素鸟小游戏
const game = {
	gameDom: document.getElementById('game'),
	overDom: document.getElementsByClassName('over')[0],
	isFlag: true, //是否处于暂停状态
	isOver: false, //是否游戏结束
	start() {
		sky.skyTimer.start() //天空开始移动
		land.landTimer.start() //大地开始移动
		bird.swingTimer.start() //翅膀动
		bird.dropTimer.start() // 小鸟下坠
		pipeManager.produceTimer.start() //生产柱子
		pipeManager.moveTimer.start() //开始移动柱子
		hitManager.timer.start() //碰撞检测
		this.isFlag = false
	},
	stop() {
		sky.skyTimer.stop()
		land.landTimer.stop()
		bird.swingTimer.stop()
		bird.dropTimer.stop()
		pipeManager.produceTimer.stop()
		pipeManager.moveTimer.stop()
		hitManager.timer.stop()
		this.isFlag = true
	},
}
// 游戏的尺寸
game.width = game.gameDom.clientWidth
game.height = game.gameDom.clientHeight

// 天空
const sky = {
	skyDom: document.getElementsByClassName('sky')[0],
	left: 0, //当前横坐标
}
// 天空的定时器
sky.skyTimer = getTimer(16, sky, function() {
	this.left -= 2
	if (this.left <= -game.width) {
		this.left = 0
	}
	this.skyDom.style.left = this.left + 'px'
})
// 大地
const land = {
	landDom: document.getElementsByClassName('land')[0],
	left: 0, //当前横坐标
}
land.height = land.landDom.clientHeight //大地的高度
land.top = game.height - land.height //大地的纵坐标
// 大地的定时器
land.landTimer = getTimer(16, land, function() {
	this.left--
	if (this.left <= -game.width) {
		this.left = 0
	}
	this.landDom.style.left = this.left + 'px'
})
// 小鸟
const bird = {
	birdDom: document.getElementsByClassName('bird')[0],
	left: 150,
	top: 150,
	width: 33,
	height: 26,
	swingIndex: 0, //翅膀的状态：0~2
	v: 0, //当前速度
	t: 16, //时间间隔
	a: 0.002, //重力加速度
	show() {
		// 设置翅膀的状态
		if (this.swingIndex === 0) {
			this.birdDom.style.backgroundPosition = '-8px -10px'
		} else if (this.swingIndex === 1) {
			this.birdDom.style.backgroundPosition = '-60px -10px'
		} else {
			this.birdDom.style.backgroundPosition = '-113px -10px'
		}
		// 设置小鸟的位置
		this.birdDom.style.left = this.left + 'px'
		this.birdDom.style.top = this.top + 'px'
	},
	setTop(top) {
		if (top < 0) {
			top = 0
		} else if (top >= land.top - this.height) {
			top = land.top - this.height
			// this.jump();
		}
		this.top = top
		this.show()
	},
	jump() {
		this.v = -0.5
	},
}
bird.show()
// 小鸟翅膀动
bird.swingTimer = getTimer(200, bird, function() {
	this.swingIndex = (this.swingIndex + 1) % 3
	this.show()
})
// 小鸟下坠
bird.dropTimer = getTimer(bird.t, bird, function() {
	// 计算移动的距离
	const dis = this.v * this.t + 0.5 * this.a * this.t ** 2
	// 改变速度
	this.v = this.v + this.a * this.t
	// 改变top
	this.setTop(this.top + dis)
})
/**
 * 构造一个柱子
 * @param {*} direction up，down
 * @param {*} height 柱子高度
 */
function Pipe(direction, height) {
	this.width = Pipe.width //方便访问，给对象加上宽度属性
	this.direction = direction
	this.height = height
	this.left = game.width
	if (direction === 'up') {
		this.top = 0
	} else {
		this.top = land.top - this.height
	}
	this.pipeDom = document.createElement('div')
	this.pipeDom.className = 'pipe ' + direction
	this.pipeDom.style.height = this.height + 'px'
	this.pipeDom.style.top = this.top + 'px'
	game.gameDom.appendChild(this.pipeDom)
	this.show()
}
Pipe.width = 52 //每个柱子的宽度统一
Pipe.prototype.show = function() {
	this.pipeDom.style.left = this.left + 'px'
}
/**
 * 构造一对柱子
 */
function PipePair() {
	const minHeight = 60 //最小高度
	const gap = 150 //空隙
	const maxHeight = land.top - minHeight - gap //最大高度
	const h = getRandom(minHeight, maxHeight)
	this.up = new Pipe('up', h)
	this.down = new Pipe('down', land.top - h - gap)
	this.left = this.up.left // 设置位置
	/**
	 * 生成一个随机数
	 * @param {*} min 最小值
	 * @param {*} max 最大值
	 */
	function getRandom(min, max) {
		return Math.floor(Math.random() * (max + 1 - min) + min)
	}
}
/**
 * 显示一对柱子
 */
PipePair.prototype.show = function() {
	this.up.left = this.left
	this.down.left = this.left
	this.up.show()
	this.down.show()
}
/**
 * 移除一对柱子
 */
PipePair.prototype.remove = function() {
	this.up.pipeDom.remove()
	this.down.pipeDom.remove()
}
// 柱子管理器
const pipeManager = {
	pairs: [], //装所有柱子的数组
}
/**
 * 生产柱子的定时器
 */
pipeManager.produceTimer = getTimer(1500, pipeManager, function() {
	this.pairs.push(new PipePair())
})
/**
 * 移动柱子的定时器
 */
pipeManager.moveTimer = getTimer(16, pipeManager, function() {
	for (let i = 0; i < this.pairs.length; i++) {
		const pair = this.pairs[i]
		pair.left -= 2
		if (pair.left <= -Pipe.width) {
			pair.remove() //移除dom对象
			this.pairs.splice(i, 1) //从数组中移除
			i--
		} else {
			pair.show()
		}
	}
})
// 碰撞检测器
const hitManager = {
	//验证是否发生碰撞，true：碰撞了，false：没有碰撞
	validate() {
		// 与大地亲吻
		if (bird.top >= land.top - bird.height) {
			return true
		}
		// 与柱子亲吻
		for (let i = 0; i < pipeManager.pairs.length; i++) {
			const pair = pipeManager.pairs[i]
			if (
				this.validateBirdAndPipe(pair.up) ||
				this.validateBirdAndPipe(pair.down)
			) {
				return true
			}
		}
		return false
	},
	//判断某根柱子与小鸟是否发生碰撞
	validateBirdAndPipe(pipe) {
		// bird pipe
		const bx = bird.left + bird.width / 2 //小鸟中心点x
		const by = bird.top + bird.height / 2 //小鸟中心点y;
		const px = pipe.left + pipe.width / 2 //柱子中心点x
		const py = pipe.top + pipe.height / 2 //柱子中心点y
		if (
			Math.abs(px - bx) <= (bird.width + pipe.width) / 2 &&
			Math.abs(py - by) <= (bird.height + pipe.height) / 2
		) {
			return true
		} else {
			return false
		}
	},
}
/**
 * 碰撞检测定时器
 */
hitManager.timer = getTimer(16, hitManager, function() {
	if (this.validate()) {
		// 碰撞了游戏结束
		game.stop()
		game.overDom.style.display = 'block'
		game.isOver = true
	}
})
// 绑定事件
window.onkeydown = function(e) {
	if (e.key === 'Enter') {
		if (game.isOver) {
			location.reload() //重新刷新页面
			return
		}
		if (game.isFlag) {
			game.start()
		} else {
			game.stop()
		}
	} else if (e.key === ' ') {
		bird.jump()
	}
}

/**
 * 得到一个定时器对象
 * @param {*} direction 间隔时间
 * @param {*} thisArg this指向
 * @param {*} callback 回调函数
 */
function getTimer(direction, thisArg, callback) {
	let timer
	return {
		start() {
			if (timer) return
			timer = setInterval(callback.bind(thisArg), direction)
		},
		stop() {
			clearInterval(timer)
			timer = null
		},
	}
}

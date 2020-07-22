const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let allCircle = [] //装圆圈的数组
// 设置画布的大小
canvas.width = window.innerWidth
canvas.height = window.innerHeight

/**
 * 构造小圆圈
 * @param {*} x x坐标
 * @param {*} y y坐标
 */
function Circle(x, y) {
	this.x = x
	this.y = y
	//随机位置
	this.vx = (Math.random() - 0.5) * 3
	this.vy = (Math.random() - 0.5) * 3
	// 圆的大小
	this.r = getRandom(20, 50)
	// 随机颜色
	this.color = `rgb(${getRandom(0, 255)},${getRandom(0, 255)},${getRandom(
		0,
		255
	)})`
	// 透明度
	this.a = 1
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
 * 开始画圆
 */
Circle.prototype.draw = function() {
	// 开始路径
	ctx.beginPath()
	// 填充颜色
	ctx.fillStyle = this.color
	// 合成
	ctx.globalCompositeOperation = 'lighter'
	// 高亮
	ctx.globalAlpha = this.a
	// 画圆
	ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
	// 开始填充
	ctx.fill()
	// 扩散
	this.spread()
}
/**
 * 扩散
 */
Circle.prototype.spread = function() {
	this.x += this.vx
	this.y += this.vy
	this.a *= 0.98
}

/**
 * 移动事件
 * @param {*} e
 */
canvas.addEventListener('mousemove', function(e) {
	let circle = new Circle(e.pageX, e.pageY)
	allCircle.push(circle)
})
/**
 * 开始渲染
 */
function render() {
	// 清除画布
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	allCircle.forEach(function(ele, index) {
        ele.draw()
        // 如果小于0.03 就从数组中清除
        if(ele.a < 0.03){
            allCircle.splice(index,1);
        }
    })
    // 动画帧
    requestAnimationFrame(render)
}
render()

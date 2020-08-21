/**
 * 创建一个星星评分区域
 * @param {*} config 配置对象
 */
function createStar(config) {
	//1. 将各种配置保存到变量中，没有传递的，设置默认值
	// 装星星的容器
	let dom = config.dom
	// 一共有多少课星星 默认值为5
	let starNumber = config.starNumber || 5
	// 当前固定的评分 默认值为0
	let starValue = config.starValue || 0
	// 右侧的文字 默认一个空数组
	let starText = config.starText || ["无评分", "很差", "较差", "还行", "推荐", "力荐"];
	//2. 编写初始化函数，按照配置设置元素结构
	let starParent, stars, label
	let spans = [] // 存放星星元素的数组
	/**
	 * 初始化
	 */
	function init() {
		starParent = createTag('div', 'star-container', dom)
		stars = createTag('div', 'stars', starParent)
		label = createTag('lable', '', starParent)
		for (let i = 0; i < starNumber; i++) {
			let span = createTag('span', '', stars)
			spans.push(span)
		}
		/**
		 * 辅助函数，帮助创建标签
		 * @param {*} tagName 创建的标签名字
		 * @param {*} className 类名
		 * @param {*} parent 父元素
		 */
		function createTag(tagName, className, parent) {
			let tag = document.createElement(tagName)
			tag.className = className
			parent.appendChild(tag)
			return tag
		}
	}
	init()
	//3. 编写辅助函数，用于根据某个值设置当前的评分样式
	/**
	 * 根据指定的值，设置整个星星区域的样式
	 * @param {*} value
	 */
	function setStars(value) {
		// 边界判定
		if (value < 0) {
			value = 0
		}
		if (value > starNumber) {
			value = starNumber
		}
		for (let i = 0; i < spans.length; i++) {
			if (i < value) {
				spans[i].className = 'fill'
			} else {
				spans[i].className = 'hollow'
			}
		}
		// 设置下文字
		label.innerText = starText[value]
	}
	setStars(starValue)
	//4. 完成各种事件的注册
	function bindEvent() {
		// 鼠标移入
		stars.onmousemove = function(e) {
            setStars(getTempValue(e))
        }
		// 鼠标移开
		stars.onmouseleave = function(e) {
			// 重新设置星星
			setStars(starValue)
		}
		// 点击 星星固定
		stars.onclick = function(e) {
			starValue = getTempValue(e);
		}
		/**
		 * 根据鼠标事件参数e，得到临时的value值
		 * @param {*} e
		 */
		function getTempValue(e) {
			// 获取所有星星的整个宽度
			let starsWidth = stars.offsetWidth
			// 获取的是divStars到视口左边的距离
            let starsLeft = stars.getClientRects()[0].left
            let left = e.clientX - starsLeft
            // 要计算的值
			let val = Math.ceil((left / starsWidth) * starNumber)
			return val
		}
	}
	bindEvent()
}

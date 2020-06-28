if (!window.myPlugin) {
	window.myPlugin = {}
}
/**
 * 函数防抖
 */
function debounce(callback, time) {
	var timer
	return function() {
		clearTimeout(timer) //清除之前的计时
		var args = arguments //利用闭包保存参数数组
		timer = setTimeout(function() {
			callback.apply(null, args)
		}, time)
	}
}

/**
 * 创建一个图片瀑布流
 */
window.myPlugin.createWaterFall = function(option) {
	const defaultOption = {
		minGap: 10, // 最小间隙
		imgSrc: [], //图片路径
		imgWidth: 220, //单张图片的宽度
		container: document.body, //容器
	}
	const options = Object.assign({}, defaultOption, option)
	const imgs = [] // 存放所有的图片dom对象
	console.log(options)
	createImg()
	setParentPosition()
	setPosition()
    // 窗口发生变化时发生改变
    window.onresize = debounce(setPosition,300);
    /**
	 * 创建图片
	 */
	function createImg() {
        const debounces = debounce(setPosition,30);
		for (let i = 0; i < options.imgSrc.length; i++) {
			const img = document.createElement('img')
            img.src = options.imgSrc[i]
            img.style.width = options.imgWidth + 'px';
            img.style.position = 'absolute'
            imgs.push(img);
            img.style.transition = 'all .3s'
            img.onload = debounces;
			options.container.appendChild(img)
		}
	}
	/**
	 * 处理父元素，因为图片都是绝对定位，父元素必须是一个定位元素
	 */
	function setParentPosition() {
		const style = getComputedStyle(options.container)
		// 如果不是定位元素加上定位元素
		if (style.position === 'static') {
			options.container.style.position = 'relative'
		}
	}
	/**
	 * 设置位置
	 */
	function setPosition() {
        const info = getHorizontalInfo()
        // 存放每一张下一张图片的top值
        const arr = new Array(info.number); 
        arr.fill(0);
        imgs.forEach(item =>{
            // 设置top
            const minTop = Math.min.apply(null,arr);
            item.style.top = minTop + 'px';
            // 找到对应的列编号
            const index = arr.indexOf(minTop);
            arr[index] += item.clientHeight + info.gap;
            // 设置left
            item.style.left = index * (options.imgWidth + info.gap) + 'px';
        })
        // 设置容器的高度
        const maxTop = Math.max.apply(null,arr);
        options.container.style.height = maxTop - info.gap + 'px';
	}
	/**
	 * 得到图片水平方向上的信息
	 */
	function getHorizontalInfo() {
		const obj = {}
		// 获取容器宽度
		obj.containerWidth = options.container.clientWidth
		// 计算一行图片的数量 //每行的图片只能少，不能多
		obj.number = Math.floor(
			(obj.containerWidth + options.minGap) /
				(options.imgWidth + options.minGap)
		)
		// 计算水平的缝隙
		obj.gap =
			(obj.containerWidth - options.imgWidth * obj.number) /
            (obj.number - 1)
		return obj
	}
}

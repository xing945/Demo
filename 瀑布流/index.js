const oLi = document.getElementsByClassName('col')
let timer = null
let lock = true // 是否请求数据
/**
 * 请求数据
 */
function getData() {
	// 如果没有完成则不进行下面的请求数据处理
	if (!lock) {
		return;
	}
	// 如果上一个请求完成了  则进行下面的请求数据
	lock = false
	ajax('./data.json', 'get', '', renderDom, true)
}
/**
 * 渲染页面
 * @param {*} data 数据
 */
function renderDom(data) {
	lock = true //需要重新请求数据
	let imgWidth = oLi[0].offsetWidth - 20 - 20
	for (let i = 0; i < data.length; i++) {
		let item = document.createElement('div')
		item.className = 'item'
		let img = new Image()
		img.src = data[i].img
		img.height = (imgWidth * data[i].height) / data[i].width
		item.appendChild(img)
		let p = document.createElement('p')
		p.innerText = data[i].desc
		item.appendChild(p)
		let index = getMinLi().minIndex
		oLi[index].appendChild(item)
	}
}
/**
 * 获取最短的列
 */
function getMinLi() {
	let minIndex = 0
	let minHeight = oLi[0].offsetHeight
	for (let i = 0; i < oLi.length; i++) {
		if (oLi[i].offsetHeight < minHeight) {
			minHeight = oLi[i].offsetHeight
			minIndex = i
		}
	}
	return {
		minIndex,
		minHeight,
	}
}
/**
 * 懒加载
 */
window.onscroll = function() {
	clearTimeout(timer)
	let scrollTop = document.documentElement.scrollTop
	let clientHeight = document.documentElement.clientHeight
	let minHeight = getMinLi().minHeight
	if (scrollTop + clientHeight > minHeight) {
		// 请求数据 防抖处理
		timer = setTimeout(function() {
			getData()
		}, 500)
	}
}

getData()

import render from './render.js'
import move, { isWin } from './move.js'
render()
let isOver = false //游戏是否结束
/**
 * 注册事件
 * @param {*} e
 */
window.onkeydown = function(e) {
	if (isOver) {
		return
	}
	let result = false
	if (e.key === 'ArrowUp') {
		result = move('up')
	} else if (e.key === 'ArrowDown') {
		result = move('down')
	} else if (e.key === 'ArrowLeft') {
		result = move('left')
	} else if (e.key === 'ArrowRight') {
		result = move('right')
	}
	if (result) {
		render()
	}
	if (isWin()) {
		isOver = true
		console.log('游戏结束')
	}
}

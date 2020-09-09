import * as map from './map.js'
const gameDom = document.getElementById('game')
const block = 45

/**
 * 判断是否在正确的位置上
 * @param {*} row
 * @param {*} col
 */
function isCurrect(row, col) {
	for (let i = 0; i < map.correct.length; i++) {
		let point = map.correct[i]
		if (point.row === row && point.col === col) {
			return true
		}
	}
	return false;
}

/**
 * 设置每个方块的内容
 * @param {*} row
 * @param {*} col
 */
function setBlock(row, col) {
	const div = document.createElement('div')
	div.className = 'item'
	// 设置位置
	div.style.left = col * block + 'px'
	div.style.top = row * block + 'px'
	const value = map.content[row][col]
	// 如果是墙壁
	if (value === map.WALL) {
		div.classList.add('wall')
	} else if (value === map.PLAYER) {
		// 如果是玩家
		div.classList.add('player')
	} else if (value === map.BOX) {
		// 如果是箱子
		if (isCurrect(row, col)) {
			div.classList.add('correct-box')
		} else {
			div.classList.add('box')
		}
	} else {
		if (isCurrect(row, col)) {
			div.classList.add('correct')
		} else {
			return
		}
	}
	gameDom.appendChild(div)
}

/**
 * 设置游戏内容
 */
function setGameContent() {
	gameDom.innerHTML = '' //清空容器
	// 根据地图创建元素
	for (let row = 0; row < map.rowNumber; row++) {
		for (let col = 0; col < map.colNumber; col++) {
			setBlock(row, col)
		}
	}
}

/**
 * 设置游戏的尺寸
 */
function setGameSize() {
	gameDom.style.width = map.colNumber * block + 'px'
	gameDom.style.height = map.rowNumber * block + 'px'
}

export default function() {
	setGameSize()
	setGameContent()
}

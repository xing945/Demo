import {
	rowNumber,
	colNumber,
	content,
	PLAYER,
	WALL,
	SPACE,
	correct,
	BOX,
} from './map.js'

/**
 * 交换位置
 * @param {*} p1
 * @param {*} p2
 */
function exChange(p1, p2) {
	let temp = content[p1.row][p1.col]
	content[p1.row][p1.col] = content[p2.row][p2.col]
	content[p2.row][p2.col] = temp
}
/**
 * 得到某个位置在指定方向上的下一个位置的信息（第几行、第几列、内容是啥）
 * @param row 指定的行
 * @param col 指定的列
 * @param {*} direction
 */
function getNextInfo(row, col, direction) {
	if (direction === 'left') {
		return {
			row: row,
			col: col - 1,
			value: content[row][col - 1],
		}
	} else if (direction === 'right') {
		return {
			row: row,
			col: col + 1,
			value: content[row][col + 1],
		}
	} else if (direction === 'up') {
		return {
			row: row - 1,
			col: col,
			value: content[row - 1][col],
		}
	} else if (direction === 'down') {
		return {
			row: row + 1,
			col: col,
			value: content[row + 1][col],
		}
	}
}
/**
 * 获取玩家的位置
 */
function getPlayer() {
	for (let row = 0; row < rowNumber; row++) {
		for (let col = 0; col < colNumber; col++) {
			if (content[row][col] === PLAYER) {
				return {
					row,
					col,
				}
			}
		}
	}
	throw new Error('没有找到玩家')
}

/**
 * 按照指定的方向，让玩家移动一步
 * @param {*} direction left、right、up、down
 */
export default function(direction) {
	const player = getPlayer() //获取玩家的位置
	const nextInfo = getNextInfo(player.row, player.col, direction) //得到某个位置的下一个位置的信息
	// 如果碰到了墙壁 不能移动
	if (nextInfo.value === WALL) {
		return false
	}
	// 能移动的情况
	// 空白可移动
	if (nextInfo.value === SPACE) {
		exChange(player, nextInfo)
		return true
	} else {
		// 得到下一个下一个位置的信息然后交换
		const nextNextInfo = getNextInfo(nextInfo.row, nextInfo.col, direction)
		// 如果下下个位置是空白 可以移动
		if (nextNextInfo.value === SPACE) {
			exChange(nextInfo, nextNextInfo)
			exChange(player, nextInfo)
			return true
		} else {
			return false
		}
	}
}

/**
 * 根据当前地图内容，判断是否游戏胜利
 */
export function isWin() {
	for (let i = 0; i < correct.length; i++) {
		let point = correct[i]
		if (content[point.row][point.col] !== BOX) {
			return false
		}
	}
	return true
}

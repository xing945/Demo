/**
 * 产生一个随机数
 * @param {*} min 最小值
 * @param {*} max 最大值
 */
export function getRandom(min, max) {
	return Math.floor(Math.random() * (max + 1 - min) + min)
}
/**
 * 随机颜色
 */
export default function() {
	const colors = [
		'#f26395',
		'#62efab',
		'#ef7658',
		'#ffe868',
		'#80e3f7',
		'#d781f9',
    ]
    let index = getRandom(0,colors.length - 1);
    return colors[index];
}

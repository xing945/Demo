/**
 * 判断是否是素数
 * @param {*} number
 */
export default function (number) {
	if (number < 2) {
		return false
	}
	for (let i = 2; i < number - 1; i++) {
		if (number % i === 0) {
			return false
		}
	}
	return true
}

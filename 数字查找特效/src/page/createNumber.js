import randomColor, { getRandom } from '../util/getRandom'
import $ from 'jquery'
const divContainer = $('#divContainer')
const divCenter = $('#divCenter')
/**
 * 创建数字并加入到页面中
 */
export default function (num, isPrime) {
	let span = $('<span>').text(num)
	if (isPrime) {
		// 变色
		let color = randomColor()
		span.css('color', color)
		// 中间的素数
		createCenterPrimeNumber(num, color)
	}
    divContainer.append(span)
    span.get(0).scrollIntoView();
	// 产生中间的数字
	divCenter.text(num)
}

/**
 * 在中间产生一个素数
 * @param {*} n
 * @param {*} color
 */
function createCenterPrimeNumber(n, color) {
	let div = $('<div>').addClass('center').css('color', color).text(n)
	$('body').append(div)
	//加入了div后，强行让页面重新渲染
	//只要读取某个元素的位置或尺寸信息，则会导致浏览器重新渲染 reflow
	getComputedStyle(div[0]).left
	div.css(
		'transform',
		`translate(${getRandom(-200, 200)}px,${getRandom(-200, 200)}px)`
    ).css('opacity', 0)
    div.on('transitionend',function(){
        div.remove();
    });
}

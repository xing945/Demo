const demo = document.getElementsByClassName('demo')[0]
const aHeight = 35 //每个a元素的高度

demo.onclick = function(e) {
	if (e.target.tagName === 'H2') {
		const nextDiv = e.target.nextElementSibling
		if (nextDiv.classList.contains('active')) {
			return
		}
		//1.去掉当前具有active样式的nextDiv
		const before = document.querySelector('.active')
		if (before) {
			hideDiv(before)
		}
		//2.给当前的h2元素后面的nextDiv加上active
		showDiv(nextDiv)
	}
}
/**
 * 隐藏
 * @param {*} div
 */
function hideDiv(div) {
	const height = div.clientHeight
	const animate = new plugin.Animate({
		total: 300,
		begin: {
            height,
		},
		end: {
			height:0,
		},
		onMove() {
            div.style.height = this.status.height + 'px';
        },
		onOver() {
			div.classList.remove('active');
		},
    })
    animate.start(); //开始
}
/**
 * 显示
 * @param {*} div
 */
function showDiv(div) {
    div.classList.add('active');
    div.style.height = 0;
    let targetHeight = div.children.length * aHeight;
    const animate = new plugin.Animate({
		total: 300,
		begin: {
            height:0,
		},
		end: {
			height:targetHeight,
		},
		onMove() {
            div.style.height = this.status.height + 'px';
        },
    })
    animate.start(); //开始
}

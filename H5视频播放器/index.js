const wrapper = document.getElementsByClassName('wrapper')[0]
const menu = document.getElementsByClassName('menu')[0]
const playDom = document.getElementsByClassName('play')[0]
const videoDom = document.getElementsByTagName('video')[0]
const timeDom = document.getElementsByClassName('time')[0]
const bar = document.getElementsByClassName('bar')[0]
const barContent = bar.getElementsByClassName('bar-content')[0]
const barCircle = bar.getElementsByClassName('bar-circle')[0]
const quickDom = document.getElementsByClassName('quick')[0]
const quickList = document.getElementsByClassName('quick-list')[0]
const volAdd = document.getElementsByClassName('vol-add')[0]
const volIns = document.getElementsByClassName('vol-ins')[0]
const fullScreen = document.getElementsByClassName('full-screen')[0]
/**
 * 移入移出
 */
function mouseFn(){
    // 移入
	wrapper.onmouseenter = function(){
	    menu.style.display = 'block';
	}
	// 移出
	wrapper.onmouseleave = function(){
	    menu.style.display = 'none';
	}
}
/**
 * 播放与暂停
 */
function pauseFn(){
    playDom.onclick = function() {
		// 如果是播放的状态
		if (videoDom.paused) {
			videoDom.play()
			this.innerText = '暂停'
		} else {
			videoDom.pause()
			this.innerText = '播放'
		}
	}
}
/**
 * 时间
 */
function timeFn(){
    setInterval(() => {
		let total = videoDom.duration
		let nowTime = videoDom.currentTime
		timeDom.innerHTML = `${parseInt(nowTime / 60)} : ${parseInt(
			nowTime % 60
		)} / ${parseInt(total / 60)} : ${parseInt(total % 60)}`
		// 进度条
		let num = (nowTime / total) * bar.clientWidth
		barContent.style.width = num + 'px'
		barCircle.style.left = num + 'px'
	}, 1000)
}
/**
 * 进度条
 */
function barFn(){
    bar.onclick = function(e) {
		let x = e.layerX
		let width = bar.clientWidth
		let targetTime = (x / width) * videoDom.duration
		videoDom.currentTime = targetTime
	}
}
/**
 * 倍速
 */
function quickFn(){
    quickDom.onclick = function() {
		quickList.style.display = 'block'
	}
	quickList.onmouseleave = function() {
		quickList.style.display = 'none'
	}
	let quickLi = quickList.getElementsByTagName('li')
	for (let i = 0; i < quickLi.length; i++) {
		quickLi[i].index = i
		quickLi[i].onclick = function() {
			if (this.index === 0) {
				//正常倍速
				videoDom.playbackRate = 1
				quickDom.innerHTML = this.innerText
				quickList.style.display = 'none'
			} else if (this.index === 1) {
				videoDom.playbackRate = 1.25
				quickDom.innerHTML = this.innerText
				quickList.style.display = 'none'
			} else if (this.index === 2) {
				videoDom.playbackRate = 1.5
				quickDom.innerHTML = this.innerText
				quickList.style.display = 'none'
			} else {
				videoDom.playbackRate = 2
				quickDom.innerHTML = this.innerText
				quickList.style.display = 'none'
			}
		}
	}
}
/**
 * 音量
 */
function volFn(){
    volAdd.onclick = function() {
		if (videoDom.volume + 0.1 >= 1) {
			videoDom.volume = 1
		} else {
			videoDom.volume += 0.1
		}
	}
	volIns.onclick = function() {
		if (videoDom.volume - 0.1 <= 0) {
			videoDom.volume = 0
		} else {
			videoDom.volume -= 0.1
		}
	}
}
/**
 * 
 */
function fullFn(){
    fullScreen.onclick = function() {
		videoDom.requestFullscreen()
	}
}
/**
 * 绑定事件
 */
function handle() {
    //移入移出
	mouseFn(); 
	// 播放与暂停
	pauseFn();
	// 时间
	timeFn();
	// 点击进度条
	barFn();
	// 倍速
	quickFn();
	// 音量设置
	volFn();
	// 全屏
	fullFn();
}
handle()
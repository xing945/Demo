const btn = document.getElementsByTagName('button')[0]
const oUl = document.getElementsByTagName('ul')[0]
const pic = document.getElementsByClassName('pic')[0]
const picUl = pic.getElementsByClassName('banner')[0]
const picLis = picUl.children //所有轮播图
/**
 * 切换导航栏
 */
function change() {
	let isDisplay = true
	btn.onclick = function() {
		oUl.style.height = isDisplay ? '250px' : 0
		isDisplay = !isDisplay
	}
}

/**
 * 轮播图
 */
function banner() {
	let index = 0
	// 将第一个图片克隆到最后
	let first = picUl.firstElementChild.cloneNode(true)
	picUl.appendChild(first)
	picUl.style.width = picLis.length * 100 + 'vw'

	/**
	 * 移动
	 */
	function move() {
		picUl.style.left = -index * 100 + 'vw'
		picUl.style.transition = 'left .5s'
	}
	/**
	 * 轮播图移动
	 */
	function autoPlay() {
        index++
        if(index > picLis.length - 1){
            index = 0;
        }
        move();
    }
    // 动画结束做的事情
    picUl.addEventListener('transitionend',function(){
        //图片已经走到最后一张了，这时候要让ul回到0才能接上
        if(index === picLis.length - 1){
            picUl.style.left = 0;
            picUl.style.transition = '';
            index = 0;
        }
    })
    let timer = setInterval(autoPlay,1000);
    // 移入轮播图不动
    pic.onmouseenter = function(){
        clearInterval(timer);
    }
    // 移出继续
    pic.onmouseleave = function(){
        timer = setInterval(autoPlay,1000)
    }
}

change()
banner()

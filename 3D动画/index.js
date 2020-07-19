const boxBg = [
	'#f44336',
	'#e91e63',
	'#9c27b0',
	'#673ab7',
	'#3f51b5',
	'#2196f3',
	'#03a9f4',
	'#00bcd4',
	'#009688',
	'#4caf50',
	'#8bc34a',
	'#cddc39',
	'#ffeb3b',
	'#ffc107',
	'#ff9800',
	'#ff5722',
	'#795548',
	'#564545',
	'#607d8b',
	'#405d6b',
	'#9e9e9e',
	'#70737d',
	'#389fa0',
	'#38a05e',
	'#b3c981',
	'#76a803',
	'#fecf43',
	'#e2785f',
] //box背景色
const bodyBg = [
	'#F7E8ED',
	'#F2D9E6',
	'#ECC6DE',
	'#E0ECF5',
	'#DDF4DE',
	'#F0F1D5',
	'#EEDECD',
	'#B8E6B3',
	'#ABE3D8',
	'#E0E1F5',
	'#F7E8ED',
	'#F2D9E6',
	'#E0ECF5',
	'#DDF4DE',
	'#F0F1D5',
	'#EEDECD',
	'#B8E6B3',
	'#ABE3D8',
	'#DFD1F0',
	'#6161616',
] //body背景色
const wrapper = document.getElementsByClassName('wrapper')[0]
const boxs = document.querySelectorAll('.box')

/**
 * 给每个box创建背景图片和背景颜色
 */
function createBackground() {
	let style = document.createElement('style')
	let str = ''
	for (let i = 0; i < boxBg.length; i++) {
		str += `.box:nth-child(${i + 1}) div{
            background: ${boxBg[i]} url(images/${i + 1}.png) no-repeat center;
        }`
	}
	style.innerHTML = str
	document.head.appendChild(style)
}

/**
 * 移入每个箱子突出来
 */
function boxEnter() {
	//下(0)左(1)上(2)右(3)
	let rot = [
		'rotateX(-180deg)',
		'rotateY(-180deg)',
		'rotateX(180deg)',
		'rotateY(180deg)',
	]
	// 遍历每个小盒子
	boxs.forEach((box) => {
		// 移入
		box.onmouseenter = function(e) {
            // 获取方向
            let dir = getDir(e,this);
            this.style.transform = 'translateZ(150px)' + rot[dir];
            document.body.style.background = bodyBg[Math.round(Math.random() * (bodyBg.length - 1))];
		}
		// 移出
		box.onmouseleave = function(e) {
			this.style.transform = ''
		}
    })
    /**
     * 获取箱子的方向 返回的是 0 1 2 3
     * @param {*} e 事件源对象
     * @param {*} box 对应的每个箱子
     */
    function getDir(e,box){
        let top = box.getBoundingClientRect().top;
        let left = box.getBoundingClientRect().left;
        let boxW = box.offsetWidth;
        let boxH = box.offsetHeight;
        let x = e.clientX - left - boxW / 2;
        let y = e.clientY - top - boxH / 2;
        // 获取角度值 -180~180  0~360
        let deg = Math.atan2(y,x) / (Math.PI / 180);
        let result = (Math.round((deg + 180) / 90) + 3) % 4;
        return result;
    }
}

/**
 * 根据鼠标的方向，视角变化
 */
function view(){
    // 鼠标变化
    // document.body.onmousemove = function(e){
    //     wrapper.style.perspectiveOrigin = e.pageX + 'px ' + e.pageY + 'px';
    // }
    document.body.onmousemove = function(e){
        let x = (0.5 - e.clientY / window.innerHeight) * 50;  //0~1 -0.5~0.5
        let y = (e.clientX / window.innerWidth - 0.5) * 50; //0~1 -0.5~0.5
        wrapper.style.transform = `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`;
    }
}

createBackground()
boxEnter()
view()
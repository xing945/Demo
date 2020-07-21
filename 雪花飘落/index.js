/** @type {HTMLCanvasElement} */ 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// 设置画布的宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/**
 * 创建一个雪花
 * @param {*} x x坐标
 * @param {*} y y坐标
 * @param {*} scale 缩放
 * @param {*} rotate 旋转
 * @param {*} sPeedX 移动的X位置
 * @param {*} sPeedY 移动的Y位置
 * @param {*} sPeedR 半径
 */
function Snow(x,y,scale,rotate,sPeedX,sPeedY,sPeedR){
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.rotate = rotate;
    this.sPeedX = sPeedX;
    this.sPeedY = sPeedY;
    this.sPeedR = sPeedR;
}
/**
 * 渲染
 */
Snow.prototype.render = function(){
    let r = 20;
    let disX = Math.sin(30 * Math.PI / 180) * r;
    let disY = Math.sin(60 * Math.PI / 180) * r;
    ctx.beginPath();  //开始一条路径
    ctx.save();  // 保存
    ctx.translate(this.x,this.y); // 平移
    ctx.scale(this.scale,this.scale) // 缩放
    ctx.rotate(this.rotate * Math.PI / 180) //旋转
    ctx.moveTo(-20,0); //起始坐标
    ctx.lineTo(r,0); // 画一条线，终点坐标
    ctx.strokeStyle = '#fff'; // 改变线的颜色
    ctx.lineWidth = 10; // 改变线的粗细
    ctx.lineCap = 'round'; // 改变线的两端
    ctx.moveTo(-disX,disY)    
    ctx.lineTo(disX,-disY)    
    ctx.moveTo(-disX,-disY)
    ctx.lineTo(disX,disY);
    ctx.stroke();  // 开始画线
    ctx.restore(); // 恢复所有的平移和旋转
}

// 装雪花的数组
let snowAll = [];
/**
 * 生成雪花
 */
function production(){
    let num = 50; //雪花的个数、
    for(let i = 0; i < num; i++){
        // 位置大小都是随机生成的
        let x = Math.random() * canvas.width;
        let scale = Math.random() + 0.5;
        let rotate = Math.random() * 60;
        let speedX = Math.random() + 1;
        let speedY = Math.random() + 5;
        let speedR = Math.random() * 4 + 2;
        (function(x,y,scale,rotate,speedX,speedY,speedR){
            setTimeout(function(){
                let snow = new Snow(x,0,scale,rotate,speedX,speedY,speedR)
                snow.render();
                snowAll.push(snow);
            },Math.random() * 10000);
        }(x,0,scale,rotate,speedX,speedY,speedR))
    }
    // 移动雪花
    moveSnow();
}
/**
 * 移动雪花
 */
function moveSnow(){
    setInterval(function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(let i = 0; i < snowAll.length; i++){
            let snows = snowAll[i];
            snows.x = (snows.x + snows.sPeedX) % canvas.width;
            snows.y = (snows.y + snows.sPeedY) % canvas.height;
            snows.rotate = (snows.rotate + snows.sPeedR) % 60;
            snows.render(); //开始渲染
        }
    },30)
}

production();

// let snow = new Snow(100,100,1,0,10,10,10)
// let snow1 = new Snow(50, 50, 2, 10, 10, 10, 10)


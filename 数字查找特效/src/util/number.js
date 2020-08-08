import isPrime from './isPrime'
/**
 * 构造数字类
 */
export default class Number{
    constructor(duration = 500){
        this.duration = duration; //间隔时间
        this.timer = null; //定时器 
        this.onCreateNum = null; //当一个数字产生的时候，要调用的回调函数
        this.number = 1; //从数字1开始
    }
    // 开始产生数字
    start(){
        if(this.timer){
            return;
        }
        this.timer= setInterval(() => {
            this.onCreateNum && this.onCreateNum(this.number,isPrime(this.number))
            this.number++;
        }, this.duration);
    }
    // 停止产生数字
    stop(){
        clearInterval(this.timer);
        this.timer = null;
    }
}
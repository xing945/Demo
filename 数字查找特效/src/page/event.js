import createNumber from './createNumber'
import Number from '../util/number'
let n = new Number(100)
/**
 * 类中自动调用回调函数
 * @param {*} n 
 * @param {*} isPrime 
 */
n.onCreateNum = function(n,isPrime){
    createNumber(n,isPrime) // 创建数字
}

//该模块用于注册事件
let isStart = false; //默认没有开始
window.onclick = function(){
    if(isStart){
        isStart = false; //关门
        n.stop();
    }else{
        isStart = true; //开门
        n.start();
    }
}
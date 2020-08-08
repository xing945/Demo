/**
 * 判断是否是素数
 * @param {*} number 
 */
export default function(number){
    let flag = true;
    for(let i = 2; i < number - 1; i++){
        if(number % i === 0){
            flag = false;
            continue;
        }
    }
    if(flag){
        return true;
    }
    return false;
}
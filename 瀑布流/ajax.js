/**
 * 同源策略： 协议 域名端口号 均相同的地址 才可以进行数据间的交互
 * ajax请求
 * @param {*} url 地址
 * @param {*} method 请求方式
 * @param {*} data 数据
 * @param {*} callback 回调
 * @param {*} isAsync 是否异步
 */
function ajax(url,method,data,callback,isAsync){
    let xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            callback(JSON.parse(xhr.responseText))
        }
    }
    if(method === 'get'){
        xhr.open(method, url + '?' + data,isAsync);
        xhr.send();
    }else if(method === 'post'){
        xhr.open(method,url,isAsync);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
}
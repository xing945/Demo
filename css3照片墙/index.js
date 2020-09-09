const oUl = document.querySelector('.wrapper ul');
const lis = document.querySelectorAll('.wrapper ul li');
const closeBtns = document.querySelectorAll('.wrapper .close');
let last = null;  //上一个选中的li

setTimeout(function () {
    oUl.className = '';
}, 200);

lis.forEach(function(li,index){
    li.onclick = function(){
        oUl.setAttribute('class','activeWrapper')
        last && (last.className = '');
        this.className = 'active';
        last = this; //把当前这次点击的元素赋值给last
    }
    closeBtns[index].onclick = function(e){
        e.stopPropagation();
        oUl.removeAttribute('class')
        lis[index].className = '';
        last = null;
    }
})
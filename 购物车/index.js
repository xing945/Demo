let lblScore = document.getElementById('integral')
let lblPrice = document.getElementById('total')
let table = document.getElementById('shopping')
/**
 * 得到某一行的所有信息
 * @param {*} tr
 */
function getInfo(tr) {
	const unitPrice = +tr.querySelector('.cart_td_5').innerText
	const score = +tr.querySelector('.cart_td_4').innerText
	const checked = tr.querySelector('.cart_td_1 input').checked
	const num = +tr.querySelector('.cart_td_6 input').value
	const total = +tr.querySelector('.cart_td_7').innerText
	return {
		unitPrice,
		score,
		checked,
		num,
		total,
	}
}
/**
 * 计算某一行的总价
 * @param {*} tr
 */
function calTrTotal(tr) {
	const info = getInfo(tr)
	const trTotal = info.num * info.unitPrice
	tr.querySelector('.cart_td_7').innerText = trTotal.toFixed(2)
}
/**
 * 计算所有tr的总价
 * @param {*} tr
 */
function calAllTrTotal() {
	let trs = document.querySelectorAll('tbody tr[id^=product]')
	for (let i = 0; i < trs.length; i++) {
		calTrTotal(trs[i])
	}
}
/**
 *  计算所有商品的总价
 */
function calTotal() {
	let sum = 0
	let score = 0
	var trs = document.querySelectorAll('tbody tr[id^=product]')
	for (let i = 0; i < trs.length; i++) {
		let info = getInfo(trs[i])
		if (info.checked) {
			sum += info.total
			score += info.score * info.num
		}
	}
	lblPrice.innerText = sum.toFixed(2)
	lblScore.innerText = score
}
/**
 * 重新计算所有价格
 */
function reCal() {
	calAllTrTotal()
	calTotal()
}
// 添加事件
table.onclick = function(e) {
	if (e.target.alt === 'add') {
		setInputValue(e.target.previousElementSibling, 1)
	} else if (e.target.alt === 'minus') {
		setInputValue(e.target.nextElementSibling, -1)
	} else if (e.target.type === 'checkbox') {
		if (e.target.id === 'allCheckBox') {
			//全选
			let cbs = table.querySelectorAll('[name=cartCheckBox]')
			for (let i = 0; i < cbs.length; i++) {
				cbs[i].checked = e.target.checked
			}
		}
		calTotal()
	}else if(e.target.parentElement.className === 'cart_td_8'){
        deleteTr(e.target.parentElement.parentElement)
        calTotal();
    }else if(e.target.alt === 'delete'){
        deleteChecked();
        calTotal();
    }
}
/**
 * 设置input的增量
 * @param {*} inp
 * @param {*} num
 */
function setInputValue(inp, num) {
	let val = +inp.value + num
	if (val < 1) return
	inp.value = val
	reCal()
}
/**
 * 删除一行
 * @param {*} tr 
 */
function deleteTr(tr){
    tr.previousElementSibling.remove();
    tr.remove();
}
/**
 * 删除所选中的
 */
function deleteChecked(){
    let trs = document.querySelectorAll("tbody tr[id^=product]");
    for(let i = 0; i < trs.length; i++){
        const info = getInfo(trs[i]);
        if(info.checked){
            deleteTr(trs[i])
        }
    }
}   
reCal()

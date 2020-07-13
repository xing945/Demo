// 发送信息
$('#send-btn').click(function() {
	let val = $('#send-inp').val()
	if (val) {
		renderDom('mine', val)
		$('#send-inp').val('') //清空
		setTimeout(function(){
            getRobot(val)
        },2000)
	}
})
// 回车发送信息
$('#send-inp').on('keyup',function(e){
    if(e.keyCode === 13){
        $('#send-btn').click(); //发送
    }
})
/**
 * 机器人返回来的数据
 * @param {} val 数据
 */
function getRobot(val) {
	$.ajax({
		type: 'get',
        url: 'https://developer.duyiedu.com/edu/turing/chat',
        data:{
            text:val,
        },
        dataType:'json',
        success(res){
            renderDom('robot',res.text)
        }
	})
}

/**
 * 渲染dom结构
 * @param {*} who 代表当前是谁说的话
 * @param {*} text 代表对话内容
 */
function renderDom(who, text) {
	$(`<div class="${who}">
        <div class="avator"></div>
        <div class="text">${text}</div>
    </div>`).appendTo($('.main'))
    // 让信息一直在底部
    $('.main').scrollTop($('.main')[0].scrollHeight - $('.main').outerHeight());
}


// 打开显示
$('#showBtn').on('click',function(){
    $('.menu').removeClass('hide').addClass('show')
    scrollFn();
})
// 关闭隐藏
$('#closeBtn').on('click',function(){
    $('.menu').removeClass('show').addClass('hide');
    scrollFn();
})
// 窗口改变时触发
$(window).resize(scrollFn)

//当菜单弹出的时候，不要让body出现滚动条。当菜单消失的时候再让body出现滚动条 
function scrollFn(){
    //只有当屏幕尺寸小于992，以及menu菜单是显示的状态，这时才要干掉body的滚动条
    if($(window).innerWidth() <= 992 && $('.menu').hasClass('show')){
        $('body').css('overflow','hidden')
    }else{
        $('body').css('overflow','auto')
    }
}
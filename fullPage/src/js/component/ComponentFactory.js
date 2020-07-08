let ComponentFactory = function(config){
    let $div = $('<div class="component base"></div>')
    // config 定制化 $Div
    config.className && $div.addClass(config.className)
    config.width && $div.css('width',config.width)
    config.height && $div.css('height',config.height)
    config.text && $div.text(config.text);
    config.center && $div.css({position: 'absolute', left: '50%', marginLeft: -config.width / 2});
    config.css && $div.css(config.css);
    if(config.event){
        for(let prop in config.event){
            $div.on(prop,config.event[prop])
        }
    }
    $div.on('cpLeave',function(){
        setTimeout(() =>{
            config.animateOut && $(this).animate(config.animateOut);
        },config.delay || 0)
    })
    $div.on('cpLoad',function(){
        setTimeout(()=>{
            config.animateIn && $(this).animate(config.animateIn);
        },config.delay || 0)
    })
    return $div;
}
// 实例方法
$.fn.extend({
	fullpage: function(config) {
		// 初始化变量
		let colorArray = config.colorArray
		let $w = $(this)
		let $section = $w.find('.section')
		let commentStyle = {
			width: '100%',
			height: '100%',
		}
		// 移动下标的索引
		var curIndex = 0
		// 获取窗口的尺寸
		var clientWidth = $(window).outerWidth()
		var clientHeight = $(window).outerHeight()
		var flag = true // 锁
		// 给htmlbody添加共同的样式
		$('html')
			.add('body')
			.css({
				position: 'relative',
				margin: 0,
				overflow: 'hidden',
			})
			.add($w)
			.add($section)
			.css(commentStyle)
		// 给wrapper添加样式
		$w.css({
			position: 'absolute',
			left: 0,
			top: 0,
		})
			.find('.section')
			.each(function(index, ele) {
				$(ele).css({
					position: 'relative',
					textAlign: 'center',
					backgroundColor: colorArray[index],
				})
			})
			.find('.slide')
			.css({
				float: 'left',
				height: clientHeight,
				width: clientWidth,
				position: 'relative',
			})
			.wrapAll('<div class="sliderWapper"></div>')
		$section.find('.sliderWapper').each(function(index, ele) {
			$(ele).css({
				width: $(ele).find('.slide').length * clientWidth,
				height: clientHeight,
			})
		})
		// js控制移动
		// active
		// 先给第一section active
		// 给每一个section 下面的第一个slide innerActive
		// 类名初始化
		$section
			.eq(0)
			.addClass('active')
			.end()
			.find('.sliderWapper')
			.css({
				position: 'absolute',
				left: 0,
				top: 0,
			})
			.each(function(index, ele) {
				$(ele)
					.find('.slide')
					.eq(0)
					.addClass('innerActive')
			})
		// 控制移动
		$(document).on('keydown', function(e) {
			// 垂直移动
			if (e.which === 38 || e.which === 40) {
				var newTop = $w.offset().top
				var direction = null
				if (flag) {
					flag = false // 关门
					// 上
					if (e.which === 38 && curIndex !== 0) {
						direction = 'top'
						config.onLeave(curIndex, direction)
						curIndex--
						newTop += clientHeight
					} else if (
						e.which === 40 &&
						curIndex !== $section.length - 1
					) {
						// 下
						direction = 'bottom'
						config.onLeave(curIndex, direction)
						curIndex++
						newTop -= clientHeight
					}
					// 设置动画
					$w.animate(
						{
							top: newTop,
						},
						450,
						'swing',
						function() {
							flag = true
							// 切换类名
							$section.eq(curIndex).addClass('active')
							if (direction === 'top') {
								$section.eq(curIndex + 1).removeClass('active')
							} else if (direction === 'bottom') {
								$section.eq(curIndex - 1).removeClass('active')
							}
							config.afterLoad(curIndex, direction)
						}
					)
				}
			}

			// 水平移动
			if (e.which === 37 || e.which === 39) {
				var $sw = $('.active').find('.sliderWapper')
				var curShowDom = $sw.find('.innerActive')
				var direction = null
				var newLeft
				if (flag && $sw.length !== 0) {
					flag = false // 关门
					newLeft = $sw.offset().left
					// 左
					if (e.which === 37 && curShowDom.index() !== 0) {
						newLeft += clientWidth
						direction = 'left'
					} else if (
						e.which === 39 &&
						curShowDom.index() !== $sw.find('.slide').length - 1
					) {
						// 右
						newLeft -= clientWidth
						direction = 'right'
					}
					$sw.animate(
						{
							left: newLeft,
						},
						300,
						'swing',
						function() {
							flag = true
							direction !== null
								? curShowDom.removeClass('innerActive')
								: ''
							if (direction === 'left') {
								curShowDom.prev().addClass('innerActive')
							} else {
								curShowDom.next().addClass('innerActive')
							}
						}
					)
				}
			}
		})
	},
})

;(function() {
	// 扩展插件方法
	$.fn.extend({
		page(config) {
			let page = new Page(config, this)
			page.init()
		},
	})
	/**
	 * 构造一个分页插件
	 * @param {*} config 配置对象
	 * @param {*} wrap 父元素
	 */
	function Page(config, wrap) {
		// 配置默认值
		this.wrap = wrap || $('body')
		this.nowPage = config.nowPage || 1
		this.allPage = config.allPage || 1
		this.callback = config.callback || function() {}
	}
	/**
	 * 初始化函数
	 */
	Page.prototype.init = function() {
		// 创建dom结构
		this.createPageDom()
		// 初始化样式
		this.initStyle()
		// 绑定事件
		this.pageHandle()
	}
	/**
	 * 创建分页结构
	 */
	Page.prototype.createPageDom = function() {
		let pageWrapper = $('<ul class="page-wrapper"></ul>')
		if (this.nowPage > 1) {
			$('<li class="prev">上一页</li>').appendTo(pageWrapper)
		}
		// 第一页的页码
		$('<li class="num">1</li>')
			.appendTo(pageWrapper)
			.addClass(this.nowPage === 1 ? 'active' : '')
		if (this.nowPage - 2 > 2) {
			$('<span>...</span>').appendTo(pageWrapper)
		}
		// 中间的页码
		for (let i = this.nowPage - 2; i <= this.nowPage + 2; i++) {
			if (i > 1 && i < this.allPage) {
				$('<li class="num"></li>')
					.text(i)
					.appendTo(pageWrapper)
					.addClass(this.nowPage === i ? 'active' : '')
			}
		}
		if (this.nowPage + 2 < this.allPage - 1) {
			$('<span>...</span>').appendTo(pageWrapper)
		}
		// 最后一个页码
		if (this.nowPage > 1) {
			$('<li class="num"></li>')
				.text(this.allPage)
				.appendTo(pageWrapper)
				.addClass(this.nowPage === this.allPage ? 'active' : '')
		}
		if (this.nowPage < this.allPage) {
			$('<li class="next">下一页</li>').appendTo(pageWrapper)
		}
		$(this.wrap)
			.empty()
			.append(pageWrapper)
	}
	/**
	 * 初始化样式
	 */
	Page.prototype.initStyle = function() {
		$('.page-wrapper > *').css({
			margin: 0,
			padding: 0,
			listStyle: 'none',
		})
		$('.page-wrapper')
			.find('li')
			.css({
				float: 'left',
				padding: '5px 10px',
				border: '1px solid #ddd',
				margin: '0 5px',
				cursor: 'pointer',
			})
		$('.page-wrapper')
			.find('span')
			.css({
				float: 'left',
			})
		$('.page-wrapper')
			.find('li.active')
			.css({
				backgroundColor: '#428bca',
				border: '1px solid #428bca',
				color: '#fff',
			})
	}
	/**
	 * 绑定事件
	 */
	Page.prototype.pageHandle = function() {
		let self = this
		// 下一页
		$('.next').click(function() {
			self.nowPage++
			self.init() // 重构
			self.callback(self.nowPage)
		})
		// 上一页
		$('.prev').click(function() {
			self.nowPage--
			self.init() // 重构
			self.callback(self.nowPage)
		})
		// 每页页码
		$('.num').click(function() {
			self.nowPage = parseInt($(this).text())
			self.init() // 重构
			self.callback(self.nowPage)
		})
	}
})()

let pageEngine = {
	init(selector, colorArray) {
		this.$w = $(selector)
		this.colorArray = colorArray
		this.slideFlag = false
		return this
	},
	addSection(className) {
		this.slideFlag = false
		this.$section = $('<div class="section"></div>').addClass(className)
		this.$section.appendTo(this.$w)
		return this
	},
	addSlide(className) {
		this.slideFlag = true
		this.$slide = $('<div class="slide"></div>').addClass(className)
		this.$slide.appendTo(this.$section)
		return this
	},
	addComponent(options) {
		let type = options.type
		let component = null
		switch (type) {
			case 'base':
				component = ComponentFactory(options)
				break
			case 'super':
				component = ComponentSuperFactory(options)
				break
		}
		this.slideFlag
			? this.$slide.append(component)
			: this.$section.append(component)
		return this
	},
	bindEvent() {
		this.$w.find('.section').on({
            _leave(){
                $(this).find('.component').trigger('cpLeave');
            },
            _load(){
                $(this).find('.component').trigger('cpLoad');
            }
        })
	},
	load() {
        this.bindEvent();
        let self = this;
        this.$w.fullpage({
            colorArray:this.colorArray,
            onLeave(index,direction){
                self.$w.find('.section').eq(index).trigger('_leave');
            },
            afterLoad(index,direction){
                self.$w.find('.section').eq(index).trigger('_load');
            }
        })
        this.$w.find('.section').eq(0).trigger('_load')
    },
}

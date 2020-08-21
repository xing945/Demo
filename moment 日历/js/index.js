const time1 = document.querySelector('.time1')
const time2 = document.querySelector('.time2')
const time3 = document.querySelector('.time3')
const week = document.querySelector('.week')
const date = document.querySelector('.date')
const up = document.querySelector('.up')
const down = document.querySelector('.down')
let today = moment();  
/**
 * 初始化
 */
init()
function init() {
	timeFn1()
	timeFn2()
	weekFn()
    bindEvent()
    dateFn(today)//默认传现在的日期
}

// 即时时间
function timeFn1() {
	moment.locale('zh-cn')
	setInterval(() => {
		time1.innerHTML = moment().format('LTS')
	}, 1000)
}
// 即时日期
function timeFn2() {
	// 取到农历日期
	let dayCn = window.calendar.solar2lunar(
		moment().year(),
		moment().month() + 1,
		moment().date()
	)
	time2.innerHTML =
		moment().format('LL') +
		' ' +
		dayCn.IMonthCn +
		dayCn.IDayCn +
		' ' +
		(dayCn.Term ? dayCn.Term : '')
}
// 星期
function weekFn() {
	// 获取所有的星期
	let weekDay = moment.weekdaysMin(true)
	weekDay.forEach((item) => {
		week.innerHTML += `<span>${item}</span>`
	})
}

// 具体的每一台你
function dateFn(m) {
	//用户传进来的moment对象不能修改，如果修改了的话，后面的都会变了，所以要修改的话就要克隆一个
	// 获取上个月的最后一天
	let lastEndDay = getEndDay(m.clone().subtract(1, 'month'))
	// 当前月的最后一天
	let curEndDay = getEndDay(m)
	// 当前月的第一天的星期数(索引值)
	let firstWeek = getFirstWeek(m.clone())
	let str = '' //用来存储生成的结构的
	let nextMonthStart = 0 //下个月日期的起始值
	for (let i = 0; i < 42; i++) {
		if (i < firstWeek) {
			//这个条件成立，说明放的是上个月的日期
			str = `<li class="color">
                <span>${lastEndDay}</span>
                <span>${getDayCn(
					m.year(),
					m.month(),
					lastEndDay
				)}</span>
            </li>${str}`
			lastEndDay--
		} else if (i >= firstWeek + curEndDay) {
			//这个条件成立，说明放的是下个月的日期
			nextMonthStart++
			str += `<li class="color">
                <span>${nextMonthStart}</span>
                <span>${getDayCn(
					m.year(),
					m.month() + 2,
					nextMonthStart
				)}</span>
            </li>`
		} else {
			//这个条件成立，说明放的是当前月的日期
            let cl = m.date() == i - firstWeek + 1 ? 'active' : '' //
            if (m.year() != moment().year() || m.month() != moment().month()) {
				//这个条件成立说明用户传入的moment对象里的年份或者月份跟今天的年份与月份不对应了，此时就表示是其它日期，并不是今天的日期
				cl = '';
			}
			str += `<li class="${cl}">
				<span>${i - firstWeek + 1}</span>
				<span>${getDayCn(m.year(), m.month() + 1, i - firstWeek + 1)}</span>
				</li>`
		}
    }
    m.locale('zh-cn'); //转换成中文
	time3.innerHTML = m.format('YYYY年MMMM');
	date.innerHTML = str
	/**
	 * 辅助函数 帮助获取某月的天数
	 * @param {*} m
	 */
	function getEndDay(m) {
		return m.daysInMonth()
	}
	/**
	 * 辅助函数 帮助获取某月第一天的星期
	 * @param {*} m
	 */
	function getFirstWeek(m) {
		return m.startOf('month').weekday()
	}
}
/**
 * 绑定事件
 */
function bindEvent(){
    // 切换上个月
    up.onclick = function(){
        dateFn(today.subtract(1, 'month'))
    }
    // 切换下个月
    down.onclick = function () {
        dateFn(today.add(1, 'month'));
    };
}

/**
 * 获取农历
 * @param {*} year 年
 * @param {*} month 月
 * @param {*} date 日
 */
function getDayCn(year, month, date) {
	let dayCn = window.calendar.solar2lunar(year, month, date)
	let result = ''
	if (dayCn.IDayCn == '初一') {
		//如果是月初的话，换成这个月的名字
		result = dayCn.IMonthCn
	} else if (dayCn.Term) {
		//如果有节气的话，换成节气
		result = dayCn.Term
	} else if (dayCn.festival) {
		//如果有节日的话，换成节日
		result = dayCn.festival
	} else if (dayCn.lunarFestival) {
		//如果有中国传统的节日的话，换成传统节日（春节、元宵节、端午节）
		result = dayCn.lunarFestival
	} else {
		result = dayCn.IDayCn //都没有的话就是农历
	}
	return result
}

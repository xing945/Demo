<template>
  <div class="date-picker"
       v-panel-click>
    <div class="picker-input">
      <span class="input-prefix">
        <i class="iconfont icon-date"></i>
      </span>
      <input type="text"
             :value="setDate" />
    </div>
    <div class="picker-panel"
         v-if="showPanel">
      <div class="picker-arrow"></div>
      <div class="picker-body">
        <div class="picker-header">
          <span class="picker-btn iconfont icon-prev-year"
                @click="onChangeYear('prev')"></span>
          <span class="picker-btn iconfont icon-prev-month"
                @click="onChangeMonth('prev')"></span>
          <span class="picker-date"> {{ showDate.year }}年{{showDate.month + 1 }}月 </span>
          <span class="picker-btn iconfont icon-next-month"
                @click="onChangeMonth('next')"></span>
          <span class="picker-btn iconfont icon-next-year"
                @click="onChangeYear('next')"></span>
        </div>
        <div class="picker-content">
          <div class="picker-weeks">
            <span v-for="week in ['日','一','二','三','四','五','六']"
                  :key="week">{{ week }}</span>
          </div>
          <div class="picker-days">
            <span v-for="date in showDay"
                  :key="date.getTime()"
                  :class="{
                      'other-month':!isCur(date).other,
                      'is-select':isCur(date).select,
                      'is-today':isCur(date).today
                  }"
                  @click="onChangeDate(date)">
              {{ date.getDate() }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // 双向数据绑定
  model: {
    prop: 'date',
    event: 'change-date',
  },
  props: {
    date: {
      type: Date,
      default: () => new Date(),
    },
  },
  computed: {
    // 设置日期
    setDate() {
      const { year, month, day } = this.getYearMonthDay(this.date)
      return `${year}-${month + 1}-${day}`
    },
    // 显示每个月的每天
    showDay() {
      const { year, month } = this.showDate
      // 拿到当前月的第一天
      const firstDay = new Date(year, month, 1)
      // 拿到当前月的第一天的星期几
      const firstWeek = firstDay.getDay()
      const startDay = firstDay - firstWeek * 24 * 60 * 60 * 1000
      const arr = []
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 24 * 60 * 60 * 1000))
      }
      return arr
    },
  },
  data() {
    return {
      showPanel: false, // 是否显示panel
      showDate: {
        year: 0,
        month: 0,
        day: 0,
      },
    }
  },
  methods: {
    // 获取年月日
    getYearMonthDay(date) {
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      return {
        year,
        month,
        day,
      }
    },
    // 切换panel
    changePanel(flag) {
      this.showPanel = flag
    },
    // 设置当前日期
    setShowDate(date) {
      const { year, month, day } = this.getYearMonthDay(date)
      this.showDate = {
        year,
        month,
        day,
      }
    },
    // 判断是否为今天。是的话就添加上类名
    isCur(date) {
      // 是否是其他的月
      const { year: showYear, month: showMonth } = this.showDate
      const { year, month, day } = this.getYearMonthDay(date)
      // 当前日期
      const toDate = new Date(this.setDate)
      const {
        year: selectYear,
        month: selectMonth,
        day: selectDay,
      } = this.getYearMonthDay(toDate)
      // 当天
      const {
        year: curYear,
        month: curMonth,
        day: curDay,
      } = this.getYearMonthDay(new Date())
      return {
        other: year === showYear && month === showMonth,
        select:
          year === selectYear && month === selectMonth && day === selectDay,
        today: year === curYear && month === curMonth && day === curDay,
      }
    },
    // 切换月份
    onChangeMonth(type) {
      const curMonth = type === 'prev' ? -1 : 1
      const minMonth = 0
      const maxMonth = 11
      let { year, month } = this.showDate
      month += curMonth
      if (month < minMonth) {
        month = maxMonth
        year--
      } else if (month > maxMonth) {
        month = minMonth
        year++
      }
      this.showDate.month = month
      this.showDate.year = year
    },
    // 切换年份
    onChangeYear(type) {
      const curYear = type === 'prev' ? -1 : 1
      this.showDate.year += curYear
    },
    onChangeDate(date) {
      this.$emit('change-date', date)
      this.setShowDate(date)
      this.changePanel(false)
    },
  },
  // 自定义指令
  directives: {
    'panel-click': {
      bind(el, binding, vnode) {
        const vm = vnode.context
        window.onclick = function (e) {
          const isPanel = el.contains(e.target)
          if (isPanel && !vm.showPanel) {
            vm.changePanel(true)
          } else if (!isPanel && vm.showPanel) {
            vm.changePanel(false)
          }
        }
      },
    },
  },
  mounted() {
    this.setShowDate(this.date)
  },
}
</script>
<style>
@import './assets/font.css';
.date-picker {
  display: inline-block;
}
.date-picker .picker-input {
  position: relative;
}
.date-picker .picker-input .input-prefix {
  position: absolute;
  left: 5px;
  width: 25px;
  height: 100%;
  line-height: 40px;
  color: #c0c4cc;
  text-align: center;
}
.date-picker .picker-input input {
  height: 40px;
  line-height: 40px;
  padding: 0 30px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  outline: none;
  border-radius: 4px;
  cursor: pointer;
}

.date-picker .picker-panel {
  position: absolute;
  width: 322px;
  height: 329px;
  margin-top: 5px;
  border: 1px solid #e4e7ed;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  user-select: none;
}
.date-picker .picker-panel .picker-arrow {
  position: absolute;
  top: -12px;
  left: 30px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #ebeef5;
}
.date-picker .picker-panel .picker-arrow::after {
  content: '';
  display: block;
  position: absolute;
  left: -6px;
  top: 1px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #fff;
  border-top-width: 0;
}

.date-picker .picker-panel .picker-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0 10px 0;
}

.date-picker .picker-panel .picker-header .picker-btn {
  margin-right: 5px;
  margin-left: 5px;
  font-size: 12px;
  color: #303133;
  cursor: pointer;
}

.date-picker .picker-panel .picker-header .picker-date {
  font-size: 14px;
  margin: 0 60px;
}

.date-picker .picker-panel .picker-content {
  padding: 0 10px 10px 10px;
  color: #606266;
}

.date-picker .picker-panel .picker-content .picker-weeks {
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ebeef5;
}

.date-picker .picker-panel .picker-content .picker-days {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.date-picker .picker-panel .picker-content .picker-days span {
  display: block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin: 4px 6px;
  font-size: 12px;
  cursor: pointer;
}
.date-picker .picker-panel .picker-content .picker-days span:hover {
  color: #409eff;
}
.date-picker .picker-panel .picker-content .picker-days span.is-today {
  color: #409eff;
  font-weight: 700;
}

.date-picker .picker-panel .picker-content .picker-days span.is-select {
  border-radius: 50%;
  background-color: #409eff;
  color: #fff;
}

.date-picker .picker-panel .picker-content .picker-days span.other-month {
  color: #c0c4cc;
}
</style>
(function(){
    var pie = {
        init(){
            this.options = {
                title:{
                    text:'',
                    subText:'纯属虚构',
                    left:'center',
                },
                legend: {
					orient: 'vertical',
					left: 'left',
					data: [],
				},
				series: {
					name: '',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: [],
				},
            }
            this.getData();
        },
        getData(){
            var self = this;
            $.ajax({
                url:'http://api.duyiedu.com/api/student/findAll?appkey=kaivon_1574822824764',
                success(data){
                    var list = JSON.parse(data).data;
                    if(list.length > 0){ // 说明有数据
                        self.areaChart(list);
                        self.sexChart(list);
                    }
                }
            })
        },
        areaChart(data){
            var myChart = echarts.init($('.areaChart')[0])
            var legendData = []
			var seriesData = []
            var newData = {} //{北京:5, 山东：6,...}
            data.forEach(item => {
                if(!newData[item.address]){
                    newData[item.address] = 1;
                    legendData.push(item.address)
                }else{
                    newData[item.address]++;
                }
            });
            for(let prop in newData){
                seriesData.push({
					name: prop,
					value: newData[prop],
				})
            }
            this.options.title.text = '渡一教育学生地区分布统计';
            this.options.legend.data = legendData
			this.options.series.name = '地区分布'
			this.options.series.data = seriesData
			myChart.setOption(this.options)
        },
        sexChart(data){
			var myChart = echarts.init($('.sexChart')[0])
			var legendData = ['男', '女']
			var newData = {} //{北京:5, 山东：6,...}
            data.forEach(function(item) {
				if (!newData[item.sex]) {
					newData[item.sex] = 1
				} else {
					newData[item.sex]++
				}
            })
            var seriesData = [
				{ name: '男', value: newData[0] },
				{ name: '女', value: newData[1] },
            ]
            this.options.title.text = '渡一教育学生性别统计'
			this.options.legend.data = legendData
			this.options.series.name = '性别分布'
			this.options.series.data = seriesData
			myChart.setOption(this.options)
        }
    }
    pie.init();
}())
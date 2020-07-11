;(function() {
	let allPage = 1 //总页数
	let nowPage = 1 // 当前页
	let pageSize = 1 // 当前页的数量
	let tableArr = [] // 装所有数据的数据
	/***
	 * 处理事件
	 */
	function bindEvent() {
		// 切换效果
		$('.side-menu').on('click', 'dd', function() {
			// 切换类名
			$(this)
				.addClass('active')
				.siblings()
				.removeClass('active')
			// 切换对应的右侧内容
			let id = $(this).attr('data-id')
			$('#' + id)
				.fadeIn()
				.siblings()
				.fadeOut()
		})
		// 点击提交学生列表
		$('.add-student').on('click', function(e) {
			e.preventDefault() // 阻止默认事件
			let val = $('#my-form').serializeArray()
			val = getForm(val)
			if (val) {
				transferData('/api/student/addStudent', val, function() {
					alert('新增成功')
					// 提交之后表单重置
					$('#my-form')
						.get(0)
						.reset()
					// 默认显示学生列表
					$('.side-menu')
						.find('dl > dd[data-id="student-list"]')
						.click()
					// 渲染列表
					getTableData()
				})
			}
		})
		// 编辑表单modal
		$('#t-body').on('click', '.edit', function() {
			$('.modal').slideDown()
			// 数据回填
			let index = $(this)
				.parents('tr')
				.index()
			renderModal(tableArr[index])
		})
		// 点击别处让modal消失
		$('.modal').click(function(e) {
			$(this).slideUp()
		})
		// 阻止冒泡
		$('.modal-content').click(function(e) {
			e.stopPropagation()
		})
		// 编辑表单提交
		$('.add-modal').on('click', function(e) {
			e.preventDefault() //组织默认事件
			let val = getForm($('#modal-form').serializeArray())
			if (val) {
				transferData('/api/student/updateStudent', val, function() {
					alert('修改成功')
					$('.modal').slideUp() //让modal消失
					getTableData() // 重新渲染
				})
			}
		})
		// 删除数据
		$('#t-body').on('click', '.del', function() {
			let isDel = window.confirm('确认删除？')
			let index = $(this)
				.parents('tr')
				.index()
			if (isDel) {
				transferData(
					'/api/student/delBySno',
					{
						sNo: tableArr[index].sNo,
					},
					function() {
						alert('删除成功')
						getTableData() //重新渲染
					}
				)
			}
		})
		// 搜索框
		$('.search-btn').click(function() {
			let val = $('.search-inp').val()
            nowPage = 1; 
            if(val){
                searchData(val);
            }else{
                getTableData(); //重新渲染
            }
        })
        // 回车触发楼上事件
        $('.search-inp').on('keydown',function(e){
            if(e.keyCode === 13){
                $('.search-btn').trigger('click');
            }
        })
	}

    /**
     * 搜索数据
     * @param {*} data 数据
     */
    function searchData(data){
        transferData('/api/student/searchStudent',{
            sex:$('.search-sex').val(),
            search: data,
            page: nowPage,
            size: pageSize
        },function(data){
             // 重新渲染表格数据
             allPage = Math.ceil(data.cont / pageSize);
             tableArr = data.searchList;
             renderTable(tableArr);
        })
    }

	/**
	 * 数据回填
	 * @param {*} data 数据
	 */
	function renderModal(data) {
		let form = $('#modal-form').get(0)
		for (let prop in data) {
			if (form[prop]) {
				form[prop].value = data[prop]
			}
		}
	}

	/**
	 * 获取数据，渲染列表
	 */
	function getTableData() {
		transferData(
			'/api/student/findByPage',
			{
				page: nowPage, //当前页，
				size: pageSize, //当前页的数量
			},
			function(data) {
				// 计算总页数
				allPage = Math.ceil(data.cont / pageSize)
				// 将所有的数据保存到这个数据中
				tableArr = data.findByPage
				// 渲染页面
				renderTable(tableArr)
			}
		)
	}
	/**
	 * 渲染页面
	 * @param {*} data 数据
	 */
	function renderTable(data) {
		let str = ''
		data.forEach((ele) => {
			str += `<tr>
            <td>${ele.sNo}</td>
            <td>${ele.name}</td>
            <td>${ele.sex === 0 ? '男' : '女'}</td>
            <td>${ele.email}</td>
            <td>${new Date().getFullYear() - ele.birth}</td>
            <td>${ele.phone}</td>
            <td>${ele.address}</td>
            <td>
                <button class="edit btn">编辑</button>
                <button class="del btn">删除</button>
            </td>
        </tr>`
		})
        $('#t-body').html(str)
        // 分页设置
        $('.turn-page').page({
            nowPage:nowPage,
            allPage:allPage,
            callback(num){
                nowPage = num;
                let val = $('.search-inp').val();
                if (val) {
                    searchData(val);
                } else {
                    getTableData()
                }
            }
        })
	}

	/**
	 * 与后端交互的数据
	 * @param {*} url 地址
	 * @param {*} data 数据
	 * @param {*} callback 回调
	 */
	function transferData(url, data, callback) {
		$.ajax({
			url: 'http://open.duyiedu.com' + url,
			type: 'get',
			data: $.extend(
				{
					appkey: '_x642743457_1585790588400',
				},
				data
			),
			dataType: 'json',
			success: function(res) {
				if (res.status === 'success') {
					callback(res.data)
				} else {
					alert(res.msg)
				}
			},
		})
	}

	/**
	 * 获取表单数据
	 * @param {*} data 数据
	 */
	function getForm(data) {
		let result = {}
		for (let i = 0; i < data.length; i++) {
			// if(!data[i].value){
			//     alert('请重新输入')
			//     return ;
			// }
			result[data[i].name] = data[i].value
		}
		return result
	}

	bindEvent()
	getTableData()
})()

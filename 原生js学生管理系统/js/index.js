const menu = document.getElementsByClassName('side-menu')[0]
const addStudent = document.getElementsByClassName('add-student')[0]
const tBody = document.getElementById('t-body')
const turnPage = document.getElementsByClassName('turn-page')[0]
const modal = document.getElementsByClassName('modal')[0]
const modalForm = document.getElementById('modal-form')
const addModal = document.getElementsByClassName('add-modal')[0]
const searchInp = document.getElementsByClassName('search-inp')[0]
const searchBtn = document.getElementsByClassName('search-btn')[0]
const searchsex = document.getElementsByClassName('search-sex')[0]
let nowPage = 1 //当前页数
let pageSize = 3 //当前页的数据
let allPage = 1 // 全部页数
let allTable = [] //所有数据
/**
 * 绑定事件
 */
function handleEvent() {
	// 切换学生
	menu.onclick = function(e) {
		if (e.target.tagName === 'DD') {
			changeClass(e.target)
			// 对应的右侧内容也切换
			const index = e.target.dataset.id
			const showConent = document.getElementById(index)
			changeClass(showConent)
		}
	}
	// 添加学生
	addStudent.onclick = function(e) {
		const form = document.getElementById('my-form')
		// 取消默认事件
		e.preventDefault()
		// 获取所有的表单数据
		let formData = getForm(form)
		if (formData) {
			dataTransfer('/api/student/addStudent', formData, function(res) {
				alert('新增成功')
				form.reset() // 添加成功后重置
				// 默认让学生列表显示
				menu.getElementsByTagName('dd')[0].click()
				// 渲染列表
				getTable()
			})
		}
	}
	// 分页
	turnPage.onclick = function(e) {
		// 上一页
		if (e.target.classList.contains('prev')) {
			nowPage--
			getTable()
		} else if (e.target.classList.contains('next')) {
			// 下一页
			nowPage++
			getTable()
		} else {
			return
		}
	}
	// 实现编辑删除功能
	tBody.onclick = function(e) {
		// 删除学生
		if (e.target.classList.contains('del')) {
			let isDel = confirm('是否要删除?')
			if (isDel) {
				let index = e.target.dataset.index
				dataTransfer(
					'/api/student/delBySno',
					{
						sNo: allTable[index].sNo,
					},
					function() {
						alert('删除成功')
						getTable() //重新渲染
					}
				)
			}
		} else if (e.target.classList.contains('edit')) {
			// 编辑学生
			modal.style.display = 'block'
			// 数据回填
			let index = e.target.dataset.index
			renderModal(allTable[index])
		} else {
			return
		}
	}
	// 点击空白编辑模板消失
	modal.onclick = function(e) {
		if (this === e.target) {
			modal.style.display = 'none'
		}
	}
	// 编辑提交
	addModal.onclick = function(e) {
		e.preventDefault()
		const data = getForm(modalForm)
		if (data) {
			dataTransfer('/api/student/updateStudent', data, function() {
				alert('修改成功')
				modal.style.display = 'none'
				getTable() //重新渲染
			})
		}
	}
	// 搜索框功能
	searchBtn.onclick = function() {
        let val = searchInp.value
        nowPage = 1;
		if (val) {
			searchData(val)
		} else {
			getTable()
		}
	}
}
/**
 * 筛选数据
 * @param {*} val 数据
 */
function searchData(val) {
	dataTransfer(
		'/api/student/searchStudent',
		{
			sex: searchsex.value,
			search: val,
			page: nowPage,
			size: pageSize,
		},
		function(data) {
			// 重新渲染表格数据
			allPage = Math.ceil(data.cont / pageSize)
			allTable = data.searchList
			renderTable(allTable)
		}
	)
}
/**
 * 编辑表单的回填  接受的参数是学生的信息
 * @param {*} data 数据
 */
function renderModal(data) {
	for (let prop in data) {
		if (modalForm[prop]) {
			modalForm[prop].value = data[prop]
		}
	}
}
/**
 * 获取数据
 */
function getTable() {
	dataTransfer(
		'/api/student/findByPage',
		{
			page: nowPage,
			size: pageSize,
		},
		function(data) {
			allTable = data.findByPage
			allPage = Math.ceil(data.cont / pageSize)
			renderTable(allTable)
		}
	)
}
/**
 * 渲染列表
 * @param {*} data
 */
function renderTable(data) {
	let str = ''
	data.forEach((item, index) => {
		str += `<tr>
        <td>${item.sNo}</td>
        <td>${item.name}</td>
        <td>${item.sex === 0 ? '男' : '女'}</td>
        <td>${item.email}</td>
        <td>${new Date().getFullYear() - item.birth}</td>
        <td>${item.phone}</td>
        <td>${item.address}</td>
        <td>
            <button class="edit btn" data-index="${index}">
                编辑
            </button>
            <button class="del btn" data-index="${index}">
                删除
            </button>
        </td>
    </tr>`
	})
	tBody.innerHTML = str
	// 分页
	const prev = document.getElementsByClassName('prev')[0]
	const next = document.getElementsByClassName('next')[0]
	// 判断下一页按钮是否显示
	if (allPage > nowPage) {
		next.style.display = 'inline-block'
	} else {
		next.style.display = 'none'
	}
	// 判断上一页按钮是否显示
	if (nowPage > 1) {
		prev.style.display = 'inline-block'
	} else {
		prev.style.display = 'none'
	}
}
/**
 * 和后端交互数据
 * @param {*} url 地址
 * @param {*} data 数据
 * @param {*} callback 回调
 */
function dataTransfer(url, data, callback) {
	data.appkey = 'qiqiqi_1569759019786'
	let result = ajax(`http://open.duyiedu.com${url}`, data)
	if (result.status === 'success') {
		callback(result.data)
	} else {
		alert(result.msg)
	}
}
/**
 * 获取所有的表单数据
 * @param {*} form
 */
function getForm(form) {
	let name = form.name.value
	let sex = form.sex.value
	let sNo = form.sNo.value
	let email = form.email.value
	let birth = form.birth.value
	let phone = form.phone.value
    let address = form.address.value
    // 校验
    if(!name || !sex || !sNo || !email || !birth || !phone || !address){
        alert('信息不能为空，请重新输入')
        return;
    }
    // 校验学号
    if(!/^\d{4,16}$/g.test(sNo)){   
        alert('学号应该为4-16位的数字');
        return ;
    }
    // 校验出生年份
    if(!/^(19|20)\d{2}$/g.test(birth)){
        alert('出生年份应该在1900-2099年');
        return;
    }
    // 校验手机号
    if(!/^\d{11}$/g.test(phone)){
        alert('手机号应为11位数字');
        return;
    }
    // 校验邮箱
    if(!/^\w+@\w+.com$/g.test(email)){
        alert('邮箱格式不正确');
        return;
    }
	return {
		name,
		sex,
		sNo,
		email,
		birth,
		phone,
		address,
	}
}

/**
 * 切换类名
 * @param {*} dom dom元素
 */
function changeClass(dom) {
	// 获取所有子节点
	const children = dom.parentElement.children
	for (let i = 0; i < children.length; i++) {
		children[i].classList.remove('active')
	}
	dom.classList.add('active')
}

/**
 * ajax请求
 */
function ajax(url, param) {
	let result = null
	let xhr = null
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest()
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP')
	}
	if (typeof param === 'string') {
		xhr.open('get', url + '?' + param, false)
	} else if (typeof param === 'object') {
		let str = ''
		for (let prop in param) {
			str += prop + '=' + param[prop] + '&'
		}
		xhr.open('get', url + '?' + str, false)
	} else {
		xhr.open('get', url + '?' + param.toString(), false)
	}
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			result = JSON.parse(xhr.responseText)
		}
	}
	xhr.send()
	return result
}
// 事件
handleEvent()
// 默认让列表显示
document.getElementsByClassName('active')[0].click()
//渲染
getTable() 

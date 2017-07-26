$(function() {

	$('#add').click(function() {
		getMenuPart();
		add();
	});
	$('#update').click(function() {
		// 获取选中行信息
		var row = $('#table').bootstrapTable('getSelections');
		if (row == null || "" == row) {
			swal("初始化失败", "请选择用户", "error");
		} else {
			edit(row[0]);
		}
	});
	$('#del').click(function() {
		// 获取选中行信息
		var row = $('#table').bootstrapTable('getSelections');
		if (row == null) {
			swal("删除失败", "请选择用户", "error");
		} else {
			del(row[0].menuId);
		}
	});

	// 加载数据
	$('#table').bootstrapTable(
			{
				url : '../../sysmenuController/main.json',
				striped : true,
				pagination : true,
				height : 400,
				method : 'get',
				dataType : "json",
				pageSize : 10,
				pageList : [ 10, 20, 30 ],
				sidePagination : 'server',// 设置为服务器端分页
				pageNumber : 1,
				striped : true, // 是否显示行间隔色
				search : false, // 显示搜索框
				toolbar : '#toolbar', // 工具按钮用哪个容器
				sortable : false, // 是否启用排序
				showToggle : true,
				showRefresh : true, // 是否显示刷新按钮
				selectItemName : 'btSelectItem',
				columns : [
						{
							field : 'Number',
							title : '',
							width : 20,
							formatter : function(value, row, index) {
								return index + 1;
							}
						},
						{
							field : 'number',
							title : '行号',
							align : 'center',
							width : 50,
							radio : true
						},
						{
							field : 'menuName',
							title : '菜单名称',
							align : 'center',
							visible : true
						},{
							field : 'menuUrl',
							title : '菜单地址',
							align : 'center',
							visible : true
						},
						{
							field : 'imgUrl',
							title : '自定义图标',
							align : 'center',
							visible : true
						},						{
							field : 'menuOrder',
							title : '菜单顺序',
							align : 'center',
							visible : true
						},
						{
							title : '操作',
							field : 'menuId',
							align : 'center',
							cardVisible : false,
							formatter : function(value, row, index) {
										var e = '<a href="#" style="margin-right：10px;"  onclick="editInit(\''
												+ index
												+ '\')"><i class="glyphicon glyphicon-pencil"/></a> ';
										var d = '<a href="#"  onclick="del(\''
												+ row.menuId
												+ '\')"><i class="glyphicon glyphicon-remove"/></a> ';
										return e + d;
							}
						} ]
			});

});

$('#btn_add').click(function() {
	if (!$('#from_sys_menu_add').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});
	;
	$.ajax({
		type : "POST",
		url : "../../sysmenuController/add.json",
		dataType : "json",
		data : $("#from_sys_menu_add").serialize(),
		success : function(data) {
			layer.closeAll('page');
			layer.close(index);
			swal("添加成功!", "权限保存成功", "success");
		},
		error : function() {
			layer.close(index);
			lrError("添加失败！服务器错误！");
		}
	});
});

$('#btn_update_submit').click(function() {
	if (!$('#from_sys_menu_update').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});
	;
	$.ajax({
		type : "POST",
		url : "../../sysmenuController/update.json",
		dataType : "json",
		data : $("#from_sys_menu_update").serialize(),
		success : function(data) {
			swal("修改成功", "权限修改成功", "success");
			layer.closeAll('page');
			layer.close(index);
		},
		error : function() {
			layer.close(index);
			lrError("修改失败！服务器错误！");
		}
	});
});

// 删除
function del(menuId) {
	var index = layer.load(0, {
		shade : false
	});
	;
	$.ajax({
		type : "POST",
		url : "../../sysmenuController/del.json",
		dataType : "json",
		data : {
			"menuId" : menuId
		},
		success : function(data) {
			$('#table').bootstrapTable('refresh');
			swal("删除成功", "权限删除成功", "success");
			layer.close(index);

		},
		error : function() {
			lrError("删除失败！服务器错误！");
			layer.close(index);
		}
	});
}

// 添加操作
function add() {

	var index_main = layer.open({
		type : 1,
		title : '添加权限',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '75%', '85%' ],
		content : $('#div_add'),
		end : function() { // 此处用于演示
			// swal("添加成功!", "活动信息保存成功", "success");
			$('#table').bootstrapTable('refresh');
		}
	});

	$('#btn_close').click(function() {
		layer.close(index_main);
	});

}

// 行内修改初始化i
function editInit(index) {
	getMenuPartUpdate();
	var row = $('#table').bootstrapTable('getData')[index];
	edit(row);
}
// 修改操作

function edit(row) {

	bindForm('from_sys_menu_update', row);
	var index_main = layer.open({
		type : 1,
		title : '修改权限',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '75%', '85%' ],
		content : $('#div_update'),
		end : function() { // 此处用于演示
			// swal("添加成功!", "活动信息保存成功", "success");
			$('#table').bootstrapTable('refresh');

		}
	});
	$('#btn_update_close').click(function() {
		layer.close(index_main);
	});

}
// 获取所有菜单信息
function getMenuPart() {
	$.ajax({
		type : "POST",
		url : "../../sysmenuController/findMenuAll.json",
		dataType : "json",
		data : {
			"date": Date.parse(new Date())
		},
		success : function(data) {
			var menus=data['data']['list'];
			$('#parentId').html("");
			var itemm="<option value='0'>主目录</option>";
			$('#parentId').append(itemm);
			$.each(menus, function(i, n){
				var item="<option value='"+n.menuId+"'>"+n['menuName']+"</option>";
				$('#parentId').append(item);
			});
		}
		,error : function() {
			lrError("获取菜单失败！服务器错误！");
			
		}
	});
}

//获取所有修改菜单信息
function getMenuPartUpdate() {
	$.ajax({
		type : "POST",
		url : "../../sysmenuController/findMenuAll.json",
		dataType : "json",
		data : {
			"date": Date.parse(new Date())
		},
		success : function(data) {
			var menus=data['data']['list'];
			$('#updateParentId').html("");
			var itemm="<option value='0'>主目录</option>";
			$('#updateParentId').append(itemm);
			$.each(menus, function(i, n){
				var item="<option value='"+n.menuId+"'>"+n['menuName']+"</option>";
				$('#updateParentId').append(item);
			});
		}
		,error : function() {
			lrError("获取菜单失败！服务器错误！");
			
		}
	});
}

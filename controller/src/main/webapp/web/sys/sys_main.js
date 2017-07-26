$(function() {

	$('#add').click(function() {
		getRoles('0');
		add();
	});
	$('#update').click(function() {
		// 获取选中行信息
		var row = $('#table').bootstrapTable('getSelections');
		if (row == null || "" == row) {
			swal({
				title : "初始化失败!",
				text : "请选择用户!",
				type : "error",
				confirmButtonText : "确定"
			});
		} else {
			edit(row[0]);
		}
	});
	$('#del').click(function() {
		// 获取选中行信息
		var row = $('#table').bootstrapTable('getSelections');
		if (row == null) {
			swal({
				title : "删除失败!",
				text : "请选择用户!",
				type : "error",
				confirmButtonText : "确定"
			});
		} else {
			swal({
				title : "确定到删除",
				text : "确定要删除该用户，删除后将无法回复",
				type : "warning",
				showCancelButton : true,
				confirmButtonColor : "#DD6B55",
				confirmButtonText : "确定",
				cancelButtonText : "取消",
				closeOnConfirm : false,
				closeOnCancel : true
			}, function(isConfirm) {
				if (isConfirm) {
					del(row[0].pid);
				}
			});

		}
	});

	// 加载数据
	$('#table')
			.bootstrapTable(
					{
						url : '../../sysuserController/main.json',
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
						search : true, // 显示搜索框
						toolbar : '#toolbar', // 工具按钮用哪个容器
						sortable : true, // 是否启用排序
						showToggle : true,
						showColumns : true,
						showRefresh : true, // 是否显示刷新按钮
						selectItemName : 'btSelectItem',
						showExport : true,advancedSearch : true,
						idForm : 'form_search',
						actionForm : 'main.json',
						Locales : {
							formatAdvancedSearch : '查询',
							formatAdvancedCloseButton : '关闭'
						},
						idTable : 'table_search',
						uniqueId : "pid",
						exportDataType : 'basic',
						clickToSelect : true, // 选择行即选择checkbox
						singleSelect : true, // 仅允许单选
						strictSearch : true,
						columns : [
								{
									align : 'center',
									width : 50,
									checkbox : true
								},
								{
									field : 'loginname',
									title : '登陆账号',
									align : 'center',
									valign : "middle",
									sortable : true
								},
								{
									field : 'password',
									title : '登陆密码',
									align : 'center',
									visible : false

								},
								{
									field : 'username',
									title : '用户姓名',
									align : 'center',
									sortable : true
								},
								{
									field : 'phoneno',
									title : '联系电话',
									align : 'center',
									sortable : true
								},
								{
									field : 'webchatno',
									title : '微信号',
									align : 'center',
									sortable : true
								},
								{
									field : 'email',
									title : 'email',
									align : 'center',
									sortable : true
								},
								{
									field : 'createtime',
									title : '用户创建时间',
									align : 'center',
									sortable : true
								},
								{
									field : 'logintime',
									title : '登录时间',
									visible : false,
									align : 'center',
									sortable : true
								},

								{
									title : '操作',
									field : 'pid',
									align : 'center',
									cardVisible : false,
									formatter : function(value, row, index) {
										var e = '<a href="#" style="margin-right：30px;"  onclick="editInit(\''
												+ index
												+ '\')"><i class="glyphicon glyphicon-pencil"/></a> ';
										var d = '<a href="#"  onclick="del(\''
												+ row.pid
												+ '\')"><i class="glyphicon glyphicon-remove"/></a> ';
										return e + d;
									}
								} ],

					});

});

$('#btn_add').click(function() {
	if (!$('#from_sys_user_add').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : "../../sysuserController/add.json",
		dataType : "json",
		data : $("#from_sys_user_add").serialize(),
		success : function(data) {
			layer.closeAll('page');
			layer.close(index);
			swal({
				title : "添加成功!",
				text : "用户信息保存成功!",
				type : "success",
				confirmButtonText : "确定"
			});
		},
		error : function() {
			layer.close(index);
			lrError("添加失败！服务器错误！");
		}
	});
});

$('#btn_update_submit').click(function() {
	if (!$('#from_sys_user_update').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});
	;
	$.ajax({
		type : "POST",
		url : "../../sysuserController/update.json",
		dataType : "json",
		data : $("#from_sys_user_update").serialize(),
		success : function(data) {
			swal({
				title : "修改成功!",
				text : "用户信息修改成功!",
				type : "success",
				confirmButtonText : "确定"
			});
			layer.closeAll('page');
			layer.close(index);
		},
		error : function() {
			layer.close(index);
			lrError("添加失败！服务器错误！");
		}
	});
});

// 删除
function del(pid) {

	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : "../../sysuserController/del.json",
		dataType : "json",
		data : {
			"pid" : pid
		},
		success : function(data) {
			$('#table').bootstrapTable('refresh');
			swal({
				title : "删除成功!",
				text : "用户删除成功!",
				type : "success",
				confirmButtonText : "确定"
			});
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
		title : '添加用户',
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
	var row = $('#table').bootstrapTable('getData')[index];
	edit(row);
}
// 修改操作

function edit(row) {
	getRolesUpdata(row['pid']);
	bindForm('from_sys_user_update', row);
	var index_main = layer.open({
		type : 1,
		title : '修改信息',
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

function getRoles(userId) {
	var index = layer.load(0, {
		shade : false
	});
	$
			.ajax({
				type : "POST",
				url : '../../sysuserController/findRoles.json',
				dataType : "json",
				data : {
					pid : userId
				},
				success : function(data) {
					var check_roles = $('#check_roles');
					check_roles.empty();
					$
							.each(
									data['data']['list'],
									function(i, n) {
										// 拼接语句
										var role = '<label class="checkbox-inline"> <input type="checkbox" name="role" value="'
												+ n.roleId
												+ '"> <i></i>'
												+ n.roleName + '</label>';
										check_roles.append(role);
									});
					layer.close(index);
				},
				error : function() {
					lrError("获取角色失败！服务器错误！");
					check_roles.empty();
					layer.close(index);
				}
			});
}

function getRolesUpdata(userId) {
	var index = layer.load(0, {
		shade : false
	});
	$
			.ajax({
				type : "POST",
				url : '../../sysuserController/findRolesByUserId.json?date='
						+ new Date(),
				dataType : "json",
				data : {
					pid : userId
				},
				success : function(data) {
					var check_roles = $('#check_roles_updata');
					check_roles.empty();
					$
							.each(
									data['data']['list'],
									function(i, n) {
										// 拼接语句
										if ("1" == n.check) {
											var role = '<label class="checkbox-inline"> <input checked="checked" type="checkbox" name="role" value="'
													+ n.roleId
													+ '"> <i></i>'
													+ n.roleName + '</label>';
											check_roles.append(role);
										} else {
											var role = '<label class="checkbox-inline"> <input type="checkbox" name="role" value="'
													+ n.roleId
													+ '"> <i></i>'
													+ n.roleName + '</label>';
											check_roles.append(role);
										}

									});

					layer.close(index);
				},
				error : function() {
					lrError("获取角色失败！服务器错误！");
					check_roles.empty();
					layer.close(index);
				}
			});
}

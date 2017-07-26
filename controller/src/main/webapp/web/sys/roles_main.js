$(function() {

	$('#add').click(function() {
		add();
	});

	$('#btn_grant').click(function() {
		var row = $('#table').bootstrapTable('getSelections');
		if (row == null || "" == row) {
			swal({
				title : "初始化授权失败!",
				text : "请选择角色!",
				type : "error",
				confirmButtonText : "确定"
			});
		} else {
			grant(row[0]);
		}
	});
	$('#update').click(function() {
		// 获取选中行信息
		var row = $('#table').bootstrapTable('getSelections');
		if (row == null || "" == row) {
			swal({
				title : "初始化失败!",
				text : "请选择角色!",
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
				text : "请选择角色!",
				type : "error",
				confirmButtonText : "确定"
			});
		} else {
			swal({
				title : "确定到删除",
				text : "确定要删除该角色，删除后将无法回复",
				type : "warning",
				showCancelButton : true,
				confirmButtonColor : "#DD6B55",
				confirmButtonText : "确定",
				cancelButtonText : "取消",
				closeOnConfirm : false,
				closeOnCancel : true
			}, function(isConfirm) {
				if (isConfirm) {
					del(row[0].roleId);
				}
			});
		
		}
	});

	// 加载数据
	$('#table')
			.bootstrapTable(
					{
						url : '../../sysrolesController/main.json',
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
						sortable : true, // 是否启用排序
						showToggle : true,
						showRefresh : true, // 是否显示刷新按钮
						selectItemName : 'btSelectItem',
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
									field : 'roleName',
									title : '角色姓名',
									align : 'center'
								},	{
									field : 'roleType',
									title : '角色类型',
									align : 'center',
									formatter : function(value, row, index) {
										if(""!=value){
											return getCodeKey("../../", "role_type", value);
										}
										
									}
										
								},
								{
									field : 'createTime',
									title : '创建时间',
									align : 'center',
									visible : false
								},
								{
									field : 'roleDesc',
									title : '备注信息',
									align : 'center',
									visible : true
								},
								{
									title : '操作',
									field : 'roleId',
									align : 'center',
									cardVisible : false,
									formatter : function(value, row, index) {
										var e = '<a href="#" style="margin-right：15px;"  onclick="editInit(\''
												+ index
												+ '\')"><i class="glyphicon glyphicon-pencil"/></a> ';
										var d = '<a href="#"  onclick="del(\''
												+ row.roleId
												+ '\')"><i class="glyphicon glyphicon-remove"/></a> ';
										return e + d;
									}
								} ]

					});
	$('#btn_add').click(function() {
		if (!$('#from_sys_roles').valid()) {
			lrError("请输入必填项！");
			return;
		}
		var index = layer.load(0, {
			shade : false
		});
		$.ajax({
			type : "POST",
			url : "../../sysrolesController/add.json",
			dataType : "json",
			data : $("#from_sys_roles").serialize(),
			success : function(data) {
				layer.closeAll('page');
				layer.close(index);
				// 清空表单信息
				emptyForm($('#from_sys_roles_add'));
				swal("添加成功!", "用户信息保存成功", "success");
			},
			error : function() {
				layer.close(index);
				lrError("添加失败！服务器错误！");
			}
		});
	});

	$('#btn_update_submit').click(function() {
		if (!$('#from_sys_roles').valid()) {
			lrError("请输入必填项！");
			return;
		}
		var index = layer.load(0, {
			shade : false
		});
		$.ajax({
			type : "POST",
			url : "../../sysrolesController/update.json",
			dataType : "json",
			data : $("#from_sys_roles").serialize(),
			success : function(data) {
				swal("修改成功", "角色信息修改成功", "success");
				layer.closeAll('page');
				layer.close(index);
			},
			error : function() {
				layer.close(index);
				lrError("修改失败！服务器错误！");
			}
		});

	});
	$('#btn_grant_submit').click(function() {
		grant_tree('../../sysrolesController/authorize.json');
	});

});

// 删除
function del(roleId) {
	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : "../../sysrolesController/del.json",
		dataType : "json",
		data : {
			"roleId" : roleId
		},
		success : function(data) {
			$('#table').bootstrapTable('refresh');
			swal("删除成功", "角色删除成功", "success");
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
	formReset("from_sys_roles");
	getCodes("../../","role_type", "roleType")
	$('#btn_add').show();
	$('#btn_update_submit').hide();
	var index_main = layer.open({
		type : 1,
		title : '添加用户',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '75%', '85%' ],
		content : $('#div_role'),
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
	getCodes("../../","role_type", "roleType")
	$('#btn_update_submit').show();
	$('#btn_add').hide();
	bindForm('from_sys_roles', row);
	var index_main = layer.open({
		type : 1,
		title : '修改信息',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '75%', '85%' ],
		content : $('#div_role'),
		end : function() { // 此处用于演示
			// swal("添加成功!", "活动信息保存成功", "success");
			$('#table').bootstrapTable('refresh');

		}
	});

}

function grant(row) {
	bindForm('from_sys_roles_grant', row);
	var index_main = layer.open({
		type : 1,
		title : '角色授权',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '75%', '85%' ],
		content : $('#div_grant'),
		success : function(layero, index) {

			var _treeRoot = $('<ul />').addClass('ztree').attr('id',
					'authorityTreeRoot');
			$('#div_authority').empty().append(_treeRoot).data(row);
			load_tree(row, _treeRoot)
		},
		end : function() {

		}
	});

	$('#btn_grant_close').click(function() {
		layer.close(index_main);
	});
}

function load_tree(row, _treeRoot) {
	$.post('../../sysrolesController/getMenuTree.json?date=' + new Date(), {
		'id' : row['roleId']
	}, function(d) {
		if (d.status == 1) {
			var setting = {
				check : {
					enable : true
				},
				data : {
					simpleData : {
						enable : true
					}
				}
			};
			$.fn.zTree.init(_treeRoot, setting, d['data']['list']);
		} else {
			swal('成功信息', d.msg, 'info');
		}
	});
}

// 表单提交
function grant_tree(url) {
	var treeObj = $.fn.zTree.getZTreeObj("authorityTreeRoot");
	var nodes = treeObj.getChangeCheckedNodes();
	var _cp = new Array();
	$.each(nodes, function(i, o) {
		var _p = new Object();
		_p['id'] = o['id'];
		_p['checked'] = o['checked'];
		_cp.push(_p);
	});
	var _postdata = {
			'id' : $('#div_authority').data()['roleId'],
			'list' : _cp
	}
	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : url,
		dataType : "json",
		contentType:'application/json;charset=UTF-8',
		data : JSON.stringify(_postdata),
		success : function(data) {
			$('#table').bootstrapTable('refresh');
			layer.closeAll('page');
			layer.close(index);
			swal("授权成功", data['msg'], "success");
		},
		error : function() {
			lrError("授权失败！服务器错误！");
		}
	});
}
$(function() {

	$('#add').click(function() {
		add();
	});
	$('#update').click(function() {
		// 获取选中行信息
		var row = $('#table').bootstrapTable('getSelections');
		if (row == null || "" == row) {
			swal({
				title : "初始化失败!",
				text : "请选择分类信息!",
				type : "error",
				confirmButtonText : "确定"
			});
		} else {
			edit(row[0]);
		}
	});
	
	$('#addDict').click(function() {
		// 获取选中行信息
		var row = $('#table').bootstrapTable('getSelections');
		if (row == null || "" == row) {
			swal({
				title : "初始化失败!",
				text : "请选择分类信息!",
				type : "error",
				confirmButtonText : "确定"
			});
		} else {
			addDict("detail-"+row[0].id,row[0].catCode);
		}
	});
	$('#del').click(function() {
		// 获取选中行信息
		var row = $('#table').bootstrapTable('getSelections');
		if (row == null) {
			swal({
				title : "删除失败!",
				text : "请选择分类信息!",
				type : "error",
				confirmButtonText : "确定"
			});
		} else {
			swal({
				title : "确定到删除",
				text : "确定要删除该分类信息，删除后将无法回复",
				type : "warning",
				showCancelButton : true,
				confirmButtonColor : "#DD6B55",
				confirmButtonText : "确定",
				cancelButtonText : "取消",
				closeOnConfirm : false,
				closeOnCancel : true
			}, function(isConfirm) {
				if (isConfirm) {
					del(row[0].id);
				}
			});

		}
	});

	// 加载数据
	$('#table')
			.bootstrapTable(
					{
						url : '../../sysCodeCatController/main.json',
						striped : true,
						pagination : true,
						height : 450,
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
						showExport : true,exportDataType : 'basic',
						uniqueId : "id",
						idField:"id",
						clickToSelect:true,
						singleSelect:true,
						strictSearch : true,
						detailView : true,// 显示子菜单
						detailFormatter : function(index, row) {
							var format=''
							return '<table id="detail-' + row.id + '"></table>';
						},// 格式化子菜单
						onExpandRow : function(index, row) {
							show_detail('detail-' + row.id, '', row.catCode);
						},
						onDblClickRow : function(index, row) {
							$('#table').bootstrapTable('expandRow', row.catCode);
						},// 双击打开
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
									field : 'catCode',
									title : '分类编码',
									align : 'center',
									valign : "middle",
									sortable : true
								},
								{
									field : 'catName',
									title : '分类名称',
									align : 'center',
									sortable : true
								},
								{
									field : 'reamk',
									title : '备注',
									align : 'center',
									sortable : true
								},
								{
									title : '操作',
									field : 'id',
									align : 'center',
									cardVisible : false,
									formatter : function(value, row, index) {
										var e = '<a href="#" style="margin-right:10px;"  onclick="editInit(\''
												+ index
												+ '\')"><i class="glyphicon glyphicon-pencil"/></a> ';
										var d = '<a href="#"  onclick="delDictRight(\''
												+ row.id
												+ '\')"><i class="glyphicon glyphicon-remove"/></a> ';
										return e + d;
									}
								} ],
					});
});

$('#btn_add').click(function() {
	if (!$('#from_sys_cat').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : "../../sysCodeCatController/add.json",
		dataType : "json",
		data : $("#from_sys_cat").serialize(),
		success : function(data) {
			layer.closeAll('page');
			layer.close(index);
			swal({
				title : "添加成功!",
				text : "分类信息保存成功!",
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

$('#btn_updata').click(function() {
	if (!$('#from_sys_cat').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});
	;
	$.ajax({
		type : "POST",
		url : "../../sysCodeCatController/update.json",
		dataType : "json",
		data : $("#from_sys_cat").serialize(),
		success : function(data) {
			swal({
				title : "修改成功!",
				text : "分类信息修改成功!",
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
function del(id) {

	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : "../../sysCodeCatController/del.json",
		dataType : "json",
		data : {
			"id" : id
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
	$('#btn_add').show();
	$('#btn_updata').hide();
	var index_main = layer.open({
		type : 1,
		title : '添加分类信息',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '75%', '85%' ],
		content : $('#div_code_cat'),
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
	$('#btn_updata').show();
	$('#btn_add').hide();
	bindForm('from_sys_cat', row);
	var index_main = layer.open({
		type : 1,
		title : '修改信息',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '75%', '85%' ],
		content : $('#div_code_cat'),
		end : function() { // 此处用于演示
			$('#table').bootstrapTable('refresh');

		}
	});
	$('#btn_close').click(function() {
		layer.close(index_main);
	});
}

function show_detail(table, toolbar, id) {
	$('#' + table)
			.bootstrapTable(
					{
						url : '../../sysCodeDictController/main.json?catCode='+id,
						striped : true,
						pagination : true,
						height : 400,
						method : 'get',
						dataType : "json",
						pageSize : 10,
						pageList : [ 10, 20, 30 ],
						sidePagination : 'server',//设置为服务器端分页
						pageNumber : 1,
						striped : true, //是否显示行间隔色
						search : false, //显示搜索框
						/*toolbar : '#toolbar', //工具按钮用哪个容器
*/						sortable : false,//是否启用排序
						showColumns : false,
						showToggle:false,
						showRefresh : false, //是否显示刷新按钮
						selectItemName:'btSelectItem',
						showExport : false,
						sortable : true, // 是否启用排序
						uniqueId : "id",
						strictSearch : true,
						columns : [
								{
									align : 'center',
									width:50,
									checkbox:true
								},
								{
									field : 'dictKey',
									title : '名称',
									align : 'center',
									sortable : true
								},
								{
									field : 'dictValue',
									title : '值',
									align : 'center',
									sortable : true
								},
								{
									field : 'dictLevel',
									title : '排序',
									align : 'center',
									sortable : true
								},{
									field : 'id',
									title : '操作',
									align : 'center',
									cardVisible:false,
									formatter : function(value, row,
											index) {
										var a = '<a href="#" mce_href="#" onclick="addDict(\''
											+ table+',\''+row.catCode
											+ '\')">添加</a> ';
										var e = '<a href="#" mce_href="#" onclick="editDictInit(\''
											+ table+'\',\''+index
												+ '\')">修改</a> ';
										var d = '<a href="#" mce_href="#" onclick="delDict(\''
												+ value
												+ '\')">删除</a> ';
										return e + d;
									}
								} ],

					});

}


//添加操作
function addDict(table,catCode) {
	formReset('from_sys_dict');
	$('#btn_dict_add').show();
	$('#btn_dict_updata').hide();
	$('#catCode').val(catCode);
	var index_main = layer.open({
		type : 1,
		title : '添加字典信息',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '75%', '85%' ],
		content : $('#div_code_dict'),
		end : function() { // 此处用于演示
			// swal("添加成功!", "活动信息保存成功", "success");
			$('#'+table).bootstrapTable('refresh');
		}
	});
	$('#btn_dict_close').click(function() {
		layer.close(index_main);
	});
	

}

$('#btn_dict_add').click(function() {
	if (!$('#from_sys_cat').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : "../../sysCodeDictController/add.json",
		dataType : "json",
		data : $("#from_sys_dict").serialize(),
		success : function(data) {
			layer.closeAll('page');
			layer.close(index);
			swal({
				title : "添加成功!",
				text : "数据保存成功!",
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

//行内修改初始化i
function editDictInit(table,index) {
	var row = $('#'+table).bootstrapTable('getData')[index];
	editDict(row,table);
}

function editDict(row,table) {
	$('#btn_dict_updata').show();
	$('#btn_dict_add').hide();
	bindForm('from_sys_dict', row);
	var index_main = layer.open({
		type : 1,
		title : '修改信息',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '75%', '85%' ],
		content : $('#div_code_dict'),
		end : function() { // 此处用于演示
			$('#'+table).bootstrapTable('refresh');

		}
	});
	$('#btn_close').click(function() {
		layer.close(index_main);
	});
}

$('#btn_dict_updata').click(function() {
	if (!$('#from_sys_cat').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : "../../sysCodeDictController/update.json",
		dataType : "json",
		data : $("#from_sys_dict").serialize(),
		success : function(data) {
			layer.closeAll('page');
			layer.close(index);
			swal({
				title : "修改成功!",
				text : "数据修改成功!",
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


function delDictRight(id){
	 swal({
			title : "确定到删除",
			text : "确定要删除该数据，删除后将无法回复",
			type : "warning",
			showCancelButton : true,
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "确定",
			cancelButtonText : "取消",
			closeOnConfirm : false,
			closeOnCancel : true
		}, function(isConfirm) {
			if (isConfirm) {
				delDict(id);
			}
		});
}


//删除
function delDict(id) {

	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : "../../sysCodeDictController/del.json",
		dataType : "json",
		data : {
			"id" : id
		},
		success : function(data) {
			$('#table').bootstrapTable('refresh');
			swal({
				title : "删除成功!",
				text : "数据删除成功!",
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




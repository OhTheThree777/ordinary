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
				text : "请选择分组!",
				type : "error",
				confirmButtonText : "确定"
			});
		} else {
			getTeamPartUpdate(row[0]);
		}
	});

	$('#del').click(function() {
		// 获取选中行信息
		var row = $('#table').bootstrapTable('getSelections');
		if (row == null) {
			swal("删除失败", "请选择分组", "error");
		} else {
			swal({
				title : "确定到删除",
				text : "确定要删除该分组，删除后将无法回复",
				type : "warning",
				showCancelButton : true,
				confirmButtonColor : "#DD6B55",
				confirmButtonText : "确定",
				cancelButtonText : "取消",
				closeOnConfirm : true,
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
						url : '../../layGroupController/main.json',
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
						sortable : true,// 是否启用排序
						showColumns : true,
						showToggle : true,
						showRefresh : true, // 是否显示刷新按钮
						selectItemName : 'btSelectItem',
						showExport : true,
						uniqueId : "id",
						exportDataType : 'basic',
						uniqueId : "id",
						idField : "id",
						undefinedText : '-',// 当数据为 undefined 时显示的字符
						clickToSelect : true,
						singleSelect : true,
						strictSearch : true,
						columns : [
								{

									align : 'center',
									width : 50,
									checkbox : true
								},
								{
									field : 'title',
									title : '标题',
									align : 'center',
									sortable : true,

								},
								{
									field : 'projectId',
									title : '竞赛产品编号',
									align : 'center',
									sortable : true,
									visible : false
								},
								{
									field : 'refereeName',
									title : '裁判长名称',
									align : 'center',
									sortable : true
								},
								{
									field : 'sponsorId',
									title : '主办方编号',
									align : 'center',
									sortable : true
								},
								{
									field : 'id',
									title : '操作',
									align : 'center',
									cardVisible : false,
									formatter : function(value, row, index) {
										var e = '<a href="#"  style="margin-right: 10px;"  onclick="editInit(\''
												+ index
												+ '\')"><i class="glyphicon glyphicon-pencil"/></a> ';
										var d = '<a href="#" mce_href="#" onclick="delRight(\''
												+ value
												+ '\')"><i class="glyphicon glyphicon-remove"/></a> ';
									return e + d;
									}
								} ],

					});

});

$('#btn_add').click(function() {
	if (!$('#form_personInfo').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : "../../personInfoController/add.json",
		dataType : "json",
		data : $("#form_personInfo").serialize(),
		success : function(data) {
			layer.closeAll('page');
			layer.close(index);
			swal("添加成功!", "分组信息保存成功", "success");
		},
		error : function() {
			layer.close(index);
			lrError("添加失败！服务器错误！");
		}
	});
});

$('#btn_update').click(function() {
	if (!$('#form_personInfo').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : "../../personInfoController/update.json",
		dataType : "json",
		data : $("#form_personInfo").serialize(),
		success : function(data) {
			swal("修改成功", "人员 基本信息修改成功", "success");
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
		url : "../../personInfoController/del.json",
		dataType : "json",
		data : {
			"id" : id
		},
		success : function(data) {
			$('#table').bootstrapTable('refresh');
			swal("删除成功", "人员删除成功", "success");
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
	$('#btn_update').hide();
	formReset("form_macth");
	var index_main = layer.open({
		type : 1,
		title : '比赛设置',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '100%', '100%' ],
		content : $('#div_macth'),
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
}


$(function() {
	// 加载数据
	$('#table').bootstrapTable({
		url : '../../ssSponsorController/main.json',
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
		columns : [{
			field : 'name',
			title : '主办方名称',
			align : 'center',
			formatter : function(value, row, index) {
				if ("" != value) {
					return '<a href="javascript:;" onclick="sponsorSeeInit(' + index + ')">' + value + '</a>';
				}
			}
		},{
			field : 'contacts',
			title : '主办方联系人',
			align : 'center'
		},{
			field : 'phone',
			title : '主办方联系电话',
			align : 'center'
		},{
			field : 'approvalFlag',
			title : '审批标记',
			align : 'center',
			formatter : function(value, row, index) {
				if("" != value){
					switch(parseInt(value)) {
						case 0:
							return '<span class="label label-info">未审核</span>';
							break;
						case 1:
							return '<span class="label label-primary">已通过</span>';
							break;
						case 2:
							return '<span class="label label-danger">未通过</span>';
							break;
						case 3:
							return '<span class="label">用户取消</span>';
							break;
					}
				}
			}
		},{
			title : '操作',
			field : 'roleId',
			align : 'center',
			cardVisible : false,
			formatter : function(value, row, index) {
                if (row.approvalFlag != "1") {
    				var e = '<a href="#" style="margin-right：15px;"  onclick="pass(\''
    						+ row.id
    						+ '\')"><i class="glyphicon glyphicon-ok" title="通过"/></a>&nbsp;';
    				var d = '<a href="#"  onclick="noPass(\''
    						+ row.id
    						+ '\')"><i class="glyphicon glyphicon-remove" title="不通过"/></a>';
    				return e + d;
                }
			}
		}]
	});
});

function sponsorSeeInit(index) {
	var row = $('#table').bootstrapTable('getData')[index];
	sponsorSee(row);	
}

function sponsorSee(row) {
	bindDiv("div_sponsor", row)
	
	var index_main = layer.open({
		type : 1,
		title : '主办方审批',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '75%', '85%' ],
		content : $('#div_sponsor'),
		end : function() { // 此处用于演示
			// swal("添加成功!", "活动信息保存成功", "success");
			$('#table').bootstrapTable('refresh');
		}
	});
	
	$("#btn_pass").click(function() {
		pass(row.id);
	});
	
	$("#btn_no_pass").click(function() {
		noPass(row.id);
	});
	
	$('#btn_close').click(function() {
		layer.close(index_main);
	});
}

function pass(sponsorId) {
	var index = layer.load(0, {
        shade : false
    });
	$.ajax({
		url:'../../ssSponsorController/approvalPass.json',
		type:"post",
		data:{id : sponsorId},
		async:true,
		cache:false,
		dataType:"json",
		success : function(data) {
			$('#table').bootstrapTable('refresh');
			layer.closeAll('page');
			layer.close(index);
			if (data.status == 1) {
				swal("审批成功", data['msg'], "success");
			} else {
				swal("审批失败", data['msg'], "error");
			}
		},
		error : function() {
			lrError("授权失败！服务器错误！");
		}
	});
}

function noPass(sponsorId) {
	var index = layer.load(0, {
        shade : false
    });
	$.ajax({
		url:'../../ssSponsorController/approvalNoPass.json',
		type:"post",
		data:{id : sponsorId},
		async:true,
		cache:false,
		dataType:"json",
		success : function(data) {
			$('#table').bootstrapTable('refresh');
			layer.closeAll('page');
			layer.close(index);
			if (data.status == 1) {
				swal("审批成功", data['msg'], "success");
			} else {
				swal("审批失败", data['msg'], "error");
			}
		},
		error : function() {
			lrError("授权失败！服务器错误！");
		}
	});
}
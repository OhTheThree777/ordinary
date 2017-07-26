$(function() {
	// 加载数据
	$('#table_nosee').bootstrapTable({
		url : '../../TeamLogController/main.json',
		striped : true,
		pagination : true,
		height : 400,
		method : 'get',
		dataType : "json",
		pageSize : 10,
		pageList : [10, 20, 30],
		sidePagination : 'server',// 设置为服务器端分页
		pageNumber : 1,
		striped : true, // 是否显示行间隔色
		search : true, // 显示搜索框
		toolbar : '#toolbar', // 工具按钮用哪个容器
		sortable : false, // 是否启用排序
		showToggle : true,
		showRefresh : true, // 是否显示刷新按钮
		selectItemName : 'btSelectItem',
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType : "limit",
		queryParams : function queryParams(params) { // 设置查询参数
			var param = {
				offset : params.offset,
				limit : params.limit,
				seeflag : "0"
			};
			return param;
		},
		onLoadSuccess: function(data){  //加载成功时执行
            $("#badge").text("").append(data.total);
		},
		columns : [{
					field : 'info',
					title : '消息内容',
					align : 'center',
					formatter : function(value, row, index) {
						if (value.indexOf("|") > 0) {
							return value.substring(0, value.indexOf("|"));
						} else {
							return value;
						}
					}
				}, {
					field : 'createTime',
					title : '时间',
					align : 'center'
				}, {
					field : 'seeflag',
					title : '状态',
					align : 'center',
					formatter : function(value, row, index) {
						return '<span class="see_sign">'+getCodeKey("../../", 'log_seeflag', value)+'</span>';
					}
				}, {
					title : '操作',
					field : 'id',
					align : 'center',
					cardVisible : false,
					formatter : function(value, row, index) {
						var s = '<a href="#" mce_href="#" class="look" onmouseover="bb()" onclick="messagesInfor(\''
								+ row.id
								+ '\')"><i class="glyphicon glyphicon-eye-open"/></a> ';
						var d = '<a href="#" mce_href="#" class="del" onmouseover="bb()" onclick="del(\''
								+ row.id
								+ '\')"><i class="glyphicon glyphicon-remove"/></a> ';
						return s + d;
	
					}
				}]
	});
	
	// 加载数据
	$('#table_see').bootstrapTable({
		url : '../../TeamLogController/main.json',
		striped : true,
		pagination : true,
		height : 400,
		method : 'get',
		dataType : "json",
		pageSize : 10,
		pageList : [10, 20, 30],
		sidePagination : 'server',// 设置为服务器端分页
		pageNumber : 1,
		striped : true, // 是否显示行间隔色
		search : true, // 显示搜索框
		toolbar : '#toolbar', // 工具按钮用哪个容器
		sortable : false, // 是否启用排序
		showToggle : true,
		showRefresh : true, // 是否显示刷新按钮
		selectItemName : 'btSelectItem',
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
        //设置为limit可以获取limit, offset, search, sort, order  
        queryParamsType : "limit",
		queryParams : function queryParams(params) { // 设置查询参数
			var param = {
				offset : params.offset,
				limit : params.limit,
				seeflag : "1"
			};
			return param;
		},
		columns : [{
					field : 'info',
					title : '消息内容',
					align : 'center'
				}, {
					field : 'createTime',
					title : '时间',
					align : 'center'
				}, {
					field : 'seeflag',
					title : '状态',
					align : 'center',
					formatter : function(value, row, index) {
						return '<span class="see_sign">'+getCodeKey("../../", 'log_seeflag', value)+'</span>';
					}
				}, {
					title : '操作',
					field : 'id',
					align : 'center',
					cardVisible : false,
					formatter : function(value, row, index) {
						var s = '<a href="#" mce_href="#" class="look" onmouseover="bb()" onclick="messagesInfor(\''
								+ row.id
								+ '\')"><i class="glyphicon glyphicon-eye-open"/></a> ';
						var d = '<a href="#" mce_href="#" class="del" onmouseover="bb()" onclick="del(\''
								+ row.id
								+ '\')"><i class="glyphicon glyphicon-remove"/></a> ';
						return s + d;
					}
				}]
	});
});

/*使其显示title*/
function bb() {
	$('[data-toggle="tooltip"]').tooltip();
	$(".look").tooltip({title: '查看详情'});
	$(".del").tooltip({title: '删除'});
}

function messagesInfor(id) {
	$.session.set('log_message_infor', id);
	$('#table_nosee').bootstrapTable('refresh');
	$('#table_see').bootstrapTable('refresh');
	var index_main = layer.open({
		type : 2,
		title : '消息详情',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : ['90%', '70%'],
		content : 'Messages_infor.html',
		end : function() { // 此处用于演示
			// swal("添加成功!", "信息保存成功", "success");
			$('#table_nosee').bootstrapTable('refresh');
			$('#table_see').bootstrapTable('refresh');
		}
	});
}

function del(id) {
	swal({
		title : "确定要删除吗",
		text : "删除后将无法恢复",
		type : "warning",
		showCancelButton : true,
		confirmButtonColor : "#DD6B55",
		confirmButtonText : "确定",
		cancelButtonText : "取消",
		closeOnConfirm : false,
		closeOnCancel : true
	}, function(isConfirm) {
		if (isConfirm) {
			var index = layer.load(0, {
				shade : false
			});
			$.ajax({
				type : "POST",
				url : "../../TeamLogController/del.json",
				dataType : "json",
				data : {
					"id" : id
				},
				success : function(data) {
					$('#table').bootstrapTable('refresh');
					swal("删除成功", "用户删除成功", "success");
					layer.close(index);
				},
				error : function() {
					lrError("删除失败！服务器错误！");
					layer.close(index);
				}
			});
		}
	});
}
/*$(function() {
	 	var kk = $(".see_sign");
		if(kk.innerHTML=="未查看"){
			$(".see_sign").css('color','red');
		}
		$(".see_sign").css('color','#fff');
	});*/
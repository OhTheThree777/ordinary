$(function(){
// ----------------------------------------------------------------------------------加载数据-------------------------------------------------------------------------------------------------------
	$('#table')
			.bootstrapTable(
					{
						url : '../../truncationTable/main.json',
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
									field : 'TABLE_NAME',
									title : '表名',
									align : 'center'
								},	
								{
									title : '操作',
									field : 'roleId',
									align : 'center',
									cardVisible : false,
									formatter : function(value, row, index) {
										var e = '<a href="#" style="margin-right：15px;"  onclick="truncation(\''
												+ row.TABLE_NAME
												+ '\')"><i class="glyphicon glyphicon-trash"/></a> ';
										return e;
									}
								} ]

					});
	
//------------------------------------------------------------------------------------------上方清除数据---------------------------------------------------------------------------------	
	
	$('#del').click(function() {
		var index=layer.load(0, {shade: false});  
		// 获取选中行信息
		var row = $('#table').bootstrapTable('getSelections');
		if (row == "" || row == null) {
			swal({
				title : "清除失败!",
				text : "请选择表!",
				type : "error",
				confirmButtonText : "确定"
			});
		} else {
			swal({
				title : "确定到清除",
				text : "确定要清除("+row[0].TABLE_NAME+")中的所有数据吗？清除后将无法恢复！",
				type : "warning",
				showCancelButton : true,
				confirmButtonColor : "#DD6B55",
				confirmButtonText : "确定",
				cancelButtonText : "取消",
				closeOnConfirm : false,
				closeOnCancel : true
			}, function(isConfirm) {
				if (isConfirm) {
					performer(row[0].TABLE_NAME);
				}
			});
		}
		layer.close(index);
	});
	
});

//----------------------------------------------------------------------------------行后清除数据-------------------------------------------------------------------------------------------------------
function truncation(TABLE_NAME){
	var index=layer.load(0, {shade: false}); 
	swal({
		title : "确定到清除",
		text : "确定要清除("+TABLE_NAME+")中的所有数据吗？清除后将无法恢复！",
		type : "warning",
		showCancelButton : true,
		confirmButtonColor : "#DD6B55",
		confirmButtonText : "确定",
		cancelButtonText : "取消",
		closeOnConfirm : false,
		closeOnCancel : true
	}, function(isConfirm) {
		if (isConfirm) {
			performer(TABLE_NAME);
		}
	});
	layer.close(index);
}


//---------------------------------------------------------------------------执行清除数据------------------------------------------------------------------------------------------
function performer(TABLE_NAME){
	var index=layer.load(0, {shade: false}); 
    $.ajax({
        url:'../../truncationTable/truncationTable.json',
        type:'post',
        data:{
            'TABLENAME':TABLE_NAME
        },
        dataType:'json',
        success:function(data){
        	if(1==data.status){
        		swal({
    				title :"执行成功",
    				text : data.msg,
    				type : "success",
    				confirmButtonText : "确定"
    			});
        	}else{
        		swal({
    				title :"执行失败",
    				text : data.msg,
    				type : "error",
    				confirmButtonText : "确定"
    			});
        	}
        },
        error:function(){
            lrError("添加失败！服务器错误！");
        }
    });
    layer.close(index);
}

$("#dels").click(function(){
	var index=layer.load(0, {shade: false}); 
	swal({
		title : "确定到清除",
		text : "确定要清除常用表中的所有数据吗？清除后将无法恢复！",
		type : "warning",
		showCancelButton : true,
		confirmButtonColor : "#DD6B55",
		confirmButtonText : "确定",
		cancelButtonText : "取消",
		closeOnConfirm : false,
		closeOnCancel : true
	}, function(isConfirm) {
		if (isConfirm) {
		    $.ajax({
		        url:'../../truncationTable/truncationTables.json',
		        type:'post',
		        data:{},
		        dataType:'json',
		        success:function(data){
		        	if(1==data.status){
		        		swal({
		    				title :"执行成功",
		    				text : data.msg,
		    				type : "success",
		    				confirmButtonText : "确定"
		    			});
		        	}else{
		        		swal({
		    				title :"执行失败",
		    				text : data.msg,
		    				type : "error",
		    				confirmButtonText : "确定"
		    			});
		        	}
		        },
		        error:function(){
		            lrError("添加失败！服务器错误！");
		        }
		    });
		}
	});
    layer.close(index);
});
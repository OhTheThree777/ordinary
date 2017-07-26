$(function() {
	// 加载数据
	$('#table').bootstrapTable({
		url : '../../ssRacingProductController/main.json',
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
		sortable : true,// 是否启用排序
		showColumns : true,
		showToggle : true,
		showRefresh : true, // 是否显示刷新按钮
		selectItemName : 'btSelectItem',
		showExport : true,
		exportDataType : 'basic',
		advancedSearch : true,
		uniqueId : "id",
		idField : "id",
		clickToSelect : true,
		singleSelect : true,
		strictSearch : true,
		columns : [ {
			field : 'productNo',
			title : '产品编号',
			align : 'center',
			sortable : true
		}, {
			field : 'specInfo',
			title : '规格信息',
			align : 'center',
			sortable : true
		}, {
			field : 'signCount',
			title : '报名人数',
			align : 'center',
			visible : false

		}, {
			field : 'cretateTime',
			title : '创建时间',
			align : 'center',
			sortable : true,
			visible : false
		}],

	});

});

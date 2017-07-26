/**
 * 裁判赛事公告
 */
$(function(){
	//-------------------------------------------------------------------------------获取用户信息---------------------------------------------------------------------------------	
				table();
});

function table(){
	// ----------------------------------------------------------------------------------加载进行赛事数据-------------------------------------------------------------------------------------------------------
	$('#table-handing')
	.bootstrapTable(
			{
				url : '../../refereeNoticeController/ssNotice.json',
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
				onClickCell : function(field, value, row, index) {
					$.cookie("racingid", row.id, {
						expires : 6,
						path : '/'
					});
				},
				queryParams : function(params) {
					params.matchState ='2'  
					return params;
				},
				columns : [
						{
							align : 'center',
							width : 50,
							checkbox : true
						},
						{
							field : 'racingPic',
							title : '赛事图片',
							align : 'center',
							formatter : function(value, row,
									index) {
								var html="<img src='"+row.racingPic+"' style='width:65px;height:65px;'>";
								return html;
							}
							
						},
						{
							field : 'product',
							title : '执裁项目',
							align : 'center',
							formatter : function(value, row,
									index) {
								var html='<a href="referee_notice_info.html;" style="width:65px;height:65px;">'+value+'</a>';
								return html;
							}
						},
						{
							field : 'racingBeginTime',
							title : '开始时间',
							align : 'center'
						},	
						{
							field : 'racingEndTime',
							title : '结束时间',
							align : 'center'
						},	
					  ]
			});

	// ----------------------------------------------------------------------------------加载結束賽事数据-------------------------------------------------------------------------------------------------------
	$('#table-completed')
	.bootstrapTable(
			{
				url : '../../refereeNoticeController/ssNotice.json',
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
				onClickCell : function(field, value, row, index) {
					$.cookie("racingid", row.id, {
						expires : 6,
						path : '/'
					});
				},
				queryParams : function(params) {
					params.matchState ='3' 
					return params;
				},
				columns : [
						{
							align : 'center',
							width : 50,
							checkbox : true
						},
						{
							field : 'racingPic',
							title : '赛事图片',
							align : 'center',
							formatter : function(value, row,
									index) {
								var html="<img src='"+row.racingPic+"' style='width:65px;height:65px;'>";
								return html;
							}
							
						},
						{
							field : 'racingName',
							title : '执裁项目',
							align : 'center',
							formatter : function(value, row,
									index) {
								var html='<a href="referee_notice_info.html;" style="width:65px;height:65px;">'+value+'</a>';
								return html;
							}
						},
						{
							field : 'racingType',
							title : '项目类型',
							align : 'center'
						},	
						{
							field : 'racingBeginTime',
							title : '开始时间',
							align : 'center'
						},	
						{
							field : 'racingEndTime',
							title : '结束时间',
							align : 'center'
						},	
					  ]
			});

}
function ittable (table_id) { 
	$('#' + table_id).bootstrapTable('refresh');
}
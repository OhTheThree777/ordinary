var project_Id = $.session.get("Project_Id");
var personflag = $.session.get("personFlag");
var occupationId =$.session.get("occupationId");
$(function(){
	//-------------------------------------------------------------------------------获取用户信息---------------------------------------------------------------------------------	
	$.ajax({
   		type:"post",
		url:'../../teamInfoController/query_user_message.json',
		data:{},
		dataType:"json",
		success:function(data){
			if(4 == personflag && "undefined" !=occupationId){
				istable(data);
			}else{
				ittable();
			}
			
		}
	});
});



function istable(data){
	// ----------------------------------------------------------------------------------加载数据-------------------------------------------------------------------------------------------------------
	$('#table')
	.bootstrapTable(
			{
				url : '../../ssProjectController/queryproject.json',
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
				queryParams : function(params) {
					params.projectId = project_Id;
					return params;
				},
				columns : [
						{
							align : 'center',
							width : 50,
							checkbox : true
						},
						{
							field : 'racing_pic',
							title : '宣传图片',
							align : 'center',
							formatter : function(value, row,
									index) {
								var html="<img src='"+incisionPicture(value)+"' style='width:65px;height:65px;'>";
								return html;
							}
							
						},
						{
							field : 'racing_name',
							title : '项目名称',
							align : 'center',
							formatter : function(value, row,
									index) {
								var html='<a href="javascript:;" style="width:65px;height:65px;" onclick="racing_name('+row.aproject_id+','+row.racing_id+')">'+value+'</a>';
								return html;
							}
						},
						{
							field : 'racing_begin_time',
							title : '开始时间',
							align : 'center'
						},	
						{
							field : 'racing_end_time',
							title : '结束时间',
							align : 'center'
						},	
						{
							field : 'attend_number',
							title : '参加人数',
							align : 'center'
						},
						{
							field : 'check_state_g',
							title : '加入状态',
							align : 'center',
								formatter : function(value, row,
										index) {
									var html="";
									if("1"==value){
										html="<span class='badge badge-success'>已加入</span>";
									}else if("2"==value){
										html="<span class='badge badge-danger'>已拒绝</span>";
									}else if("0"==value){
										html="<span class='badge badge-warning'>申请中</span>";
									}else{
										html="<span class='badge badge-primary'>未申请</span>";
									}
									return html;
								}
						},
					  ]

			});
}

function ittable(){
	// ----------------------------------------------------------------------------------加载数据-------------------------------------------------------------------------------------------------------
	$('#table')
	.bootstrapTable(
			{
				url : '../../ssProjectController/queryproject.json',
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
				queryParams : function(params) {
					params.projectId = project_Id;
					return params;
				},
				columns : [
						{
							align : 'center',
							width : 50,
							checkbox : true
						},
						{
							field : 'racing_pic',
							title : '宣传图片',
							align : 'center',
							formatter : function(value, row,
									index) {
								var html="<img src='"+value+"' style='width:65px;height:65px;'>";
								return html;
							}
							
						},
						{
							field : 'racing_name',
							title : '项目名称',
							align : 'center',
							formatter : function(value, row,
									index) {
								var html='<a href="javascript:;" style="width:65px;height:65px;" onclick="racing_name('+row.aproject_id+','+row.racing_id+')">'+value+'</a>';
								return html;
							}
						},
						{
							field : 'racing_begin_time',
							title : '开始时间',
							align : 'center'
						},	
						{
							field : 'racing_end_time',
							title : '结束时间',
							align : 'center'
						},	
						{
							field : 'attend_number',
							title : '参加人数',
							align : 'center'
						},
						
					  ]

			});
}


//------------------------------------------------------------------------------赛事详情-----------------------------------------------------------------------------
function racing_name(aproject_id,racing_id){
	$.session.set("Project_Id",aproject_id);
	$.session.set("Racing_Id",racing_id);
	window.location.href="../../web/ss/apply_main.html";
}
var occupationId =$.session.get("occupationId");
$(function(){
//-------------------------------------------------------------------------------获取用户信息---------------------------------------------------------------------------------	
	$.ajax({
   		type:"post",
		url:'../../teamInfoController/query_user_message.json',
		data:{},
		dataType:"json",
		success:function(data){
			//
			istable(data);
		}
	});
});

function istable(data){
	// ----------------------------------------------------------------------------------加载数据-------------------------------------------------------------------------------------------------------
	$('#table')
	.bootstrapTable(
			{
				url : '../../ssRacingController/main.json',
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
							field : 'racingPic',
							title : '宣传图片',
							align : 'center',
							formatter : function(value, row,
									index) {
								var html="<img src='"+incisionPicture(value)+"' style='width:65px;height:65px;'>";
								return html;
							}
							
						},
						{
							field : 'racingName',
							title : '项目名称',
							align : 'center',
							formatter : function(value, row,
									index) {
								var html='<a href="javascript:;" style="width:65px;height:65px;" onclick="racingName('+row.id+')">'+value+'</a>';
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
						{
							field : 'attendNumber',
							title : '参加人数',
							align : 'center'
						},
//						{
//							field : 'personId',
//							title : '加入状态',
//							align : 'center',
//								formatter : function(value, row,
//										index) {
//									var html="";
//									var array = value.split(",");
//									$.each(array,function(k,v){
//										if(data.data.map.id==v){
//											html="<span class='badge badge-success'>已加入</span>";
//											return false; 
//										}else{
//											html="<span class='badge badge-danger'>未加入</span>";
//										}
//									});
//									
//									return html;
//								}
//						},
					  ]

			});
}

//=------------------------------------------------------------------------------单人单击事件---------------------------------------------------------------------------
$('#joinSingle').click(function() {
	var index=layer.load(0, {shade: false});  
	// 获取选中行信息
	var row = $('#table').bootstrapTable('getSelections');
	if (row == "" || row == null) {
		swal({
			title : "加入失败!",
			text : "请选择赛事项目!",
			type : "error",
			confirmButtonText : "确定"
		});
	} else {
		swal({
			title : "确定到加入",
			text : "确定要清除("+row[0].racingName+")吗？",
			type : "warning",
			showCancelButton : true,
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "确定",
			cancelButtonText : "取消",
			closeOnConfirm : false,
			closeOnCancel : true
		}, function(isConfirm) {
			if (isConfirm) {
				performer(row[0].id);
			}
		});
	}
	layer.close(index);
});


//---------------------------------------------------------------------------------加入ajax交互------------------------------------------------------------------------------
function performer(id){
	$.ajax({
   		type:"post",
		url:'../../ssRacingController/join_racing.json',
		data:{'id':id,'occupationId':occupationId},
		dataType:"json",
		success:function(data){
			//
		}
	});
}

function racingName(id){
	$.session.set("Racing_Id",id);
	window.location.href="../../web/ss/apply_main.html";
}




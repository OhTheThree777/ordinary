		$(function() {
			laydate({
			    elem: '#checkDate', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
			    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
			});
			laydate({
			    elem: '#update_checkDate', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
			    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
			});
			
			$('#add').click(function(){
				add();
			
			});
			$('#btn_update').click(function(){
				//获取选中行信息
				var row=$('#table').bootstrapTable('getSelections');
				if(row==null||""==row){
					
					swal({
						title : "修改失败!",
						text : "请选择审核状态!",
						type : "error",
						confirmButtonText : "确定"
					});
				}else{
					edit(row[0]);
				}
			});

			/*$('#del').click(function() {
				// 获取选中行信息
				var row = $('#table').bootstrapTable('getSelections');
				if (row == null) {
					swal({
						title : "删除失败!",
						text : "请选择队伍!",
						type : "error",
						confirmButtonText : "确定"
					});
				} else {
					swal({
						title : "确定到删除",
						text : "确定要删除该队伍，删除后将无法回复",
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
*/	
			//加载数据
			$('#table')
					.bootstrapTable(
							{
								url : '../../teamCheckController/main.json',
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
								search : true, //显示搜索框
								toolbar : '#toolbar', //工具按钮用哪个容器
								sortable : true,//是否启用排序
								showColumns : true,
								showToggle:true,
								showRefresh : true, //是否显示刷新按钮
								selectItemName:'btSelectItem',
								showExport : true,
								advancedSearch : true,
								uniqueId : "id",
								strictSearch : true,
								columns : [
										{
											field : 'number',
											title : '行号',
											align : 'center',
											width:50,
											radio:true
										},
										{
											field : 'checkDate',
											title : '审核日期',
											align : 'center',
											sortable : true
										},
										{
											field : 'checkReviewer',
											title : '审核人',
											align : 'center',
											sortable : true
										},
										

										{
											field : 'id',
											title : '操作',
											align : 'center',
											cardVisible:false,
											formatter : function(value, row,
													index) {
												var e = '<a href="#" mce_href="#" onclick="editInit(\''
														+ index
														+ '\')">修改</a> ';
												var d = '<a href="#" mce_href="#" onclick="del(\''
													+ value
													+ '\')">详情</a> ';
												return e+d;
											}
										} ],

							});

		});
		
	
	$('#btn_add').click(function(){
		if(!$('#form_teamCheck_add').valid()){
			lrError("请输入必填项！");
			return;
		}
		var index=layer.load(0, {shade: false});
		$.ajax({
			   type: "POST",
			   url: "../../teamCheckController/add.json",
			   dataType:"json",
			   data: $("#form_teamCheck_add").serialize(),
			   success: function(data){
				   layer.closeAll('page');
				   layer.close(index);  
				   swal("添加成功!", "审核信息保存成功", "success");
			   },
			   error:function(){
				   layer.close(index);    
				   lrError("添加失败！服务器错误！");
			   }
		});	
	});
		
	
	$('#btn_update').click(function(){
		if(!$('#form_teamCheck_update').valid()){
			lrError("请输入必填项！");
			return;
		}
		var index=layer.load(0, {shade: false}); ;  
		$.ajax({
			   type: "POST",
			   url: "../../teamCheckController/update.json",
			   dataType:"json",
			   data: $("#form_teamCheck_update").serialize(),
			   success: function(data){
				   swal("修改成功", "审核信息修改成功", "success");
				   layer.closeAll('page');
				   layer.close(index);  
			   },
			   error:function(){
				   layer.close(index);    
				   lrError("添加失败！服务器错误！");
			   }
		});	
	});
		
	




//删除
/*function del(id){
	var index=layer.load(0, {shade: false});  
	$.ajax({
		   type: "POST",
		   url: "../../teamCheckController/del.json",
		   dataType:"json",
		   data: {
			   "id":id
		   },
		   success: function(data){
			   $('#table').bootstrapTable('refresh');  
			   swal("删除成功", "队伍删除成功", "success");
			   layer.close(index);    
			   
		   },
		   error:function(){   
			   lrError("删除失败！服务器错误！");
			   layer.close(index); 
		   }
	});	
}*/


//添加操作
function add(){
	
	var index_main=layer.open({
	      type: 1,
	      title: '添加队伍',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['75%', '85%'],
	      content: $('#div_add'),
	      end: function(){ //此处用于演示
	    	 // swal("添加成功!", "活动信息保存成功", "success");
	    	  $('#table').bootstrapTable('refresh');  
		  }
	});
	
	$('#btn_close').click(function(){
		layer.close(index_main);
	});
	
	
}

//行内修改初始化i
function editInit(index){
	var row=$('#table').bootstrapTable('getData')[index];

	edit(row);
}
//修改操作

function edit(id){
	
	
	bindForm('form_teamCheck_update',id);
	var index_main=layer.open({
	      type: 1,
	      title: '修改信息',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['65%', '80%'],
	      content: $('#div_update'),
	      end: function(){ //此处用于演示
	    	 // swal("添加成功!", "活动信息保存成功", "success");
	    	  $('#table').bootstrapTable('refresh');  
	    	  
		  }
	});
	
	
	$('#btn_update_close').click(function(){
		layer.close(index_main);
	});
	
}

/*function getTeamPart() {
	var index=layer.load(0, {shade: false});  
	
	$.ajax({
		type : "POST",
		url : "../../teamInfoController/findTeamAll.json",
		dataType : "json",
		data : {
			"date": Date.parse(new Date())
		},
		success : function(data) {

			layer.close(index);
			add();
			var infos=data['data']['list'];
			$('#teamOwn').empty();
			
			$.each(infos, function(i, n){
				var item="<option value='"+n.id+"'>"+n['teamName']+"</option>";
				$('#teamOwn').append(item);
			});
		}
		,error : function() {
			add();
			lrError("获取队伍失败！服务器错误！");
			
		}
	});
}

function getTeamPartUpdate(row) {
	var index=layer.load(0, {shade: false});  
	
	$.ajax({
		type : "POST",
		url : "../../teamInfoController/findTeamAll.json",
		dataType : "json",
		data : {
			"date": Date.parse(new Date())
		},
		success : function(data) {
			layer.close(index);
			edit(row);
			var menus=data['data']['list'];
			$('#updateTeamOwn').empty();
			$.each(menus, function(i, n){
				var item="<option value='"+n.id+"'>"+n['teamName']+"</option>";
				$('#updateTeamOwn').append(item);
			});
		}
		,error : function() {
			lrError("获取队伍失败！服务器错误！");
			
		}
	});
}


*/

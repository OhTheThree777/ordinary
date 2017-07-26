	$(function() {

//						添加
			$('#add').click(function(){
				emptyForm('from_ss_modelspec_add');
				$('#div_addnewspec').empty();
				addspec();
			});
//			修改
			$('#update').click(function(){
				emptyForm('from_ss_modelspec_add');
				//获取选中行信息
				
				var row=$('#table').bootstrapTable('getSelections');
				if(row==null||""==row){
					swal({
						title : "初始化失败!",
						text : "请选择信息!",
						type : "error",
						confirmButtonText : "确定"
					});
				}else{
					edit(row[0]);
				}
	
			});
//			删除
			$('#del').click(function(){
				//获取选中行信息
				var row=$('#table').bootstrapTable('getSelections');
				if(row==null){
					swal("删除失败", "请选择项目", "error");
				}else{
					swal({//弹出提示框提示用户是否确认删除
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
							del(row[0].id);
						}
					});		
					//del(row[0].id);
				
				}
			});
			
			
			
	
			//加载数据
			$('#table')
					.bootstrapTable(
							{
								url : '../../ssModelController/findspec.json',
								striped : true,
								pagination : true,
								height : 600,
								method : 'get',
								dataType : "json",
								pageSize : 10,
								pageList : [ 10, 20, 30 ],
								sidePagination : 'server',//设置为服务器端分页
								pageNumber : 1,
								striped : true, //是否显示行间隔色
								search : false, //显示搜索框
								toolbar : '#toolbar', //工具按钮用哪个容器
								sortable : false, //是否启用排序
								showToggle:true,
								showRefresh : true, //是否显示刷新按钮
//								selectItemName:'btSelectItem',
//								undefinedText : '无数据',
//								showExport : true,
//								uniqueId : "id",
//								clickToSelect : true, // 选择行即选择checkbox
//								singleSelect : true, // 仅允许单选
//								strictSearch : true,
//								idField : 'id',
//								queryParams:function(params){
//									params.teamName=$('#txt_search_team_name').val();
//									return params;
//								},
//								detailView : true,// 显示子菜单
//								detailFormatter : function(index, row) {
//									return '<table id="detail-' + index + '"></table>';
//								},// 格式化子菜单
//								onExpandRow : function(index, row) {
//									show_detail('detail-' + index, '', row.id);
//								},
//								onDblClickRow : function(index, row) {
//									$('#table').bootstrapTable('expandRow', index);
//								},// 双击打开
								columns : [
												{
													align : 'center',
													width : 50,
													checkbox : true
												},
//										{
//											field : 'number',
//											title : '行号',
//											align : 'center',
//											width:50,
//											radio:true
//										},
										{
											field : 'specName',
											title : '规格名称',
											align : 'center'
										},
										{
											field : 'specData',
											title : '规格内容',
											align : 'center'
										},
										{
											title : '操作',
											field : 'id',
											align : 'center',
											cardVisible:false, 
											formatter : function(value, row,	index) {
												var e = '<a href="#" mce_href="#" onclick="editInit(\''
														+ index
														+ '\')"><i class="glyphicon glyphicon-pencil"/></a> ';
												var d = '<a href="#" mce_href="#" onclick="del(\''
														+ row.id
														+ '\')"><i class="glyphicon glyphicon-remove"/></a> ';
												return e + d;
											}
										} ],

							});

		});
	
//	添加新规格内容的
	$('#btn_add_new_spec').click(function(){
		addnewspec();
	});

	function addnewspec(){
		
		$('#div_addnewspec').append($('#addnewspecclone').clone());
		
	}
		
//	修改提交
	$('#btn_update_submit').click(function(){
		if(!$('#from_ss_model_update').valid()){
			lrError("请输入必填项！");
			return;
		}
		var index=layer.load(0, {shade: false});  ; 
		$.ajax({
			   type: "POST",
			   url: "../../ssModelController/update.json",
			   dataType:"json",
			   data:$("#from_ss_model_update").serialize(),
			   success: function(data){
				   swal("修改成功", "信息修改成功", "success");
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
function del(id){
//	var index=layer.load(0, {shade: false}); ;  
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
			var index=layer.load(0, {shade: false}); ;  
	
			$.ajax({
				   type: "POST",
				   url: "../../ssModelController/delspec.json",
				   dataType:"json",
				   data: {
					   "id":id
				   },
				   success: function(data){
					   $('#table').bootstrapTable('refresh');  
					   swal("删除成功", "用户删除成功", "success");
					   layer.close(index);    
					   
				   },
				   error:function(){   
					   lrError("删除失败！服务器错误！");
					   layer.close(index); 
				   }
			});	
		}
	});	
}


//添加操作
function addspec(){
	$('#btn_addspec_submit').show();
	$('#btn_editspec_submit').hide();
	
	var index_main=layer.open({
	      type: 1, 	
	      title: '添加模型',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['95%', '95%'],
	      content: $('#div_addspec'),
	      end: function(){ //此处用于演示
	    	 // swal("添加成功!", "信息保存成功", "success");
	    	  $('#editspec').bootstrapTable('refresh');  
		  }
	});
	$('#btn_addspec_close').click(function(){
		layer.close(index_main);
	});

}
//添加提交
$('#btn_addspec_submit').click(function(){
	if(!$('#from_ss_modelspec_add').valid()){
		lrError("请输入必填项！");
		return;
	}
	var index=layer.load(0, {shade: false}); ;  
//	$('#specaddid').val(modelid);
	var data=$("#from_ss_modelspec_add").serialize();
	
	
	$.ajax({
		   type: "POST",
		   url: "../../ssModelController/addspec.json",
		   dataType:"json",
		   data:data,
//		   $("#from_ss_modelspec_edit").serialize(),
		   success: function(data){
			   layer.closeAll('page');
			   layer.close(index);  
			   swal("添加成功!", "信息保存成功", "success");
			   
			  
		   },
		   error:function(){
			   layer.close(index);    
			   lrError("添加失败！服务器错误！");
		   }
	});	
});



//修改提交
$('#btn_editspec_submit').click(function(){
	if(!$('#from_ss_modelspec_editt').valid()){
		lrError("请输入必填项！");
		return;
	}
	var index=layer.load(0, {shade: false});  ; 
	$.ajax({
		   type: "POST",
		   url: "../../ssModelController/updatespec.json",
		   dataType:"json",
		   data:$("#from_ss_modelspec_add").serialize(),
		   success: function(data){
			   swal("修改成功", "信息修改成功", "success");
			   layer.closeAll('page');
			   layer.close(index);  
			  
		   },
		   error:function(){
			   layer.close(index);    
			   lrError("添加失败！服务器错误！");
		   }
	});	
});




//行内修改初始化i
function editInit(index){
	emptyForm('from_ss_modelspec_add');
	var row=$('#table').bootstrapTable('getData')[index];	
	var key=row['specData'].toString();
//	alert(key);
	var spec=key.split(",");
	row['specData']=spec;
	edit(row);	
	
}
//修改操作

function edit(row){
	emptyForm('from_ss_modelspec_add');
	$('#btn_editspec_submit').show();
	$('#btn_addspec_submit').hide();
	
	var dat=row['specData'].toString();
	dat=dat.split(",");
	
	
	
	$('#div_addnewspec').empty();
	$.each(dat,function(z,h){
		var r="";
		r+="<div class='form-group'>";
		r+="<label class='col-sm-2 control-label'>规格内容 </label>";
		r+="<div class='col-sm-8'>";
		r+="<input type='text' name='specData' class='form-control required' value='"+this+"'>";
		r+="</div> </div>";
		r+="<div class='hr-line-dashed'></div>";
		$("#div_addnewspec").append(r);
//		alert(z+","+h);
	});
	
	delete row['specData']
		
	bindForm('from_ss_modelspec_add',row);
	var index_main=layer.open({
	      type: 1,
	      title: '修改信息',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['80%', '85%'],
	      content: $('#div_addspec'),
	      end: function(){ //此处用于演示
	    	 // swal("添加成功!", "活动信息保存成功", "success");
	    	  $('#table').bootstrapTable('refresh');  
	    	  
		  }
	});
	
	
	$('#btn_addspec_close').click(function(){
		layer.close(index_main);
	});
	
}


//删除。。。
function delModelspec(id){
	var index=layer.load(0, {shade: false}); ;  	
			$.ajax({
				   type: "POST",
				   url: "../../ssModelController/delspec.json",
				   dataType:"json",
				   data: {
					   "id":id
				   },
				   success: function(data){
					   $('#table').bootstrapTable('refresh');  
//					   swal("删除成功", "用户删除成功", "success");
					   $('#editspec').bootstrapTable('refresh');  
					   layer.close(index);    
					   
				   },
				   error:function(){   
					   lrError("删除失败！服务器错误！");
					   layer.close(index); 
				   }
			});		
}









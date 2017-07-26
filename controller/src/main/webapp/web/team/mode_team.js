$(function(){
//*************************************************上方添加按钮**************************************************
	$('#add').click(function(){	
		formReset('from_team_model_add');		
		getCodes("../../", 'html_property_type', 'sel_modelPropertyType');
		$('#add_prop_div').empty();
		addnew();
	});
	$("#prop_name").keyup(function(){
	    $("#prop_spelling").val(Pinyin.GetQP($("#prop_name").val()));
	});
	$('#update').click(function(){
		//获取选中行信息
		
		var row=$('#table').bootstrapTable('getSelections');
		if(row==null||""==row){
			swal("初始化失败", "请选择项目", "error");
		}else{
			edit(row[0]);
		}

	});
	$('#del').click(function(){
		//获取选中行信息
		var row=$('#table').bootstrapTable('getSelections');
		if(row==null || ""==row){
			swal("删除失败", "请选择项目", "error");
		}else{
			del(row[0].id);
		}
	});
	
	//加载第一层数据
	$('#table')
			.bootstrapTable(
					{
						url : '../../teamModelController/categorymain.json',
						striped : true,
						pagination : true,
						height : 500,
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
						selectItemName:'btSelectItem',
						undefinedText : '无数据',
						showExport : true,
						uniqueId : "id",
						clickToSelect : true, // 选择行即选择checkbox
						singleSelect : true, // 仅允许单选
						strictSearch : true,
						idField : 'id',
						queryParams:function(params){
							params.teamName=$('#txt_search_team_name').val();
							return params;
						},
						detailView : true,// 显示子菜单
						detailFormatter : function(index, row) {
							return '<table id="detail-' + index + '"></table>';
						},// 格式化子菜单
						onExpandRow : function(index, row) {
							show_detail('detail-' + index, '', row.id);
						},
						onDblClickRow : function(index, row) {
							$('#table').bootstrapTable('expandRow', index);
						},// 双击打开
						columns : [
								{
									field : 'number',
									title : '行号',
									align : 'center',
									width:50,
									radio:true
								},
								{
									field : 'name',
									title : '模型名称',
									align : 'center'
								},
								{
									field:'createTime',
									title:'添加日期',
									align:'center'
								},
								{
									field : 'remarks',
									title : '备注',
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
												+ '\')">编辑名称    </a> ';
										var d = '<a href="#" mce_href="#" onclick="del(\''
												+ row.id
												+ '\')">删除   </a> ';
										var f = '<a href="#" mce_href="#" onclick="addz(\''
											+ row.id
											+ '\',\''
											+ table
											+ '\')">添加属性 </a> ';
										return e + d +f;
									}
								} ],

					});
	
	$('#btn_team_add').click(function(){
		if(!$('#from_team_model_add').valid()){
			lrError("请输入必填项！");
			return;
		}

		var index=layer.load(0, {shade: false}); ;  
		var r=$("#from_team_model_add").serialize();
		$.ajax({
			   type: "POST",
			   url: "../../teamModelController/addnew.json",
			   dataType:"json",
			   data: $("#from_team_model_add").serialize(),
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
	$('#btn_add_new_prop').click(function(){
		addnewprop();
	});
});
//属性克隆
function addnewprop(){	
	$('#add_prop_div').append($('#dsb1').clone());		
}
//添加操作
function addnew(){
	var index_main=layer.open({
	      type: 1, 	
	      title: '添加模型',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['100%', '100%'],
	      content: $('#div_team_add'),
	      end: function(){ //此处用于演示
	    	 // swal("添加成功!", "信息保存成功", "success");
	    	  $('#table').bootstrapTable('refresh');  
		  }
	});
	
	$('#btn_team_close').click(function(){
		layer.close(index_main);
	});
	
	
}
//*********************************************************************添加操作******************************************************************
//添加模型操作
function add(){
	
	var index_main=layer.open({
	      type: 1, 	
	      title: '添加模型',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['100%', '100%'],
	      content: $('#div_addModelTeam'),
	      end: function(){ //此处用于演示
	    	 // swal("添加成功!", "信息保存成功", "success");
	    	  $('#table').bootstrapTable('refresh');  
		  }
	});
	
	$('#btn_closeModelTeam').click(function(){
		layer.close(index_main);
	});
	
	
}


//**********************************************************************添加模型实现*****************************************************************************
//添加
$('#div_addModelTeam').click(function(){

	if(!$('#from_panel_model_addModelTeam').valid()){
		lrError("请输入必填项！");
		return;
	}

	var index=layer.load(0, {shade: false}); ;  
	var r=$("#from_panel_model_addModelTeam").serialize();
	$.ajax({
		   type: "POST",
		   url: "../../teamModelController/addCategory.json",
		   dataType:"json",
		   data: $("#from_panel_model_addModelTeam").serialize(),
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

//**********************************************************************添加属性按钮***************************************************************************
function addz(id, table) {
   
    var index_main = layer.open({
        type : 1,
        title : '添加属性详情',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '95%', '95%' ],
        content : $('#div_add'),
        end : function() { // 此处用于演示
            // swal("添加成功!", "信息保存成功", "success");
            $('#' + table).bootstrapTable('refresh');
        }
    });
    formReset("from_model_prop");
    $('#modelId').val(id);
	getCodes("../../", 'html_property_type', 'sel_propertyType');
    $('#btn_team_pop_close').click(function() {
        layer.close(index_main);
    });
    $('#btn_team_pop_add').show();
    $('#btn_team_pop_update').hide();
    
//    $("#add_name").keyup(function(){
//        $("#add_spelling").val(Pinyin.GetQP($("#add_name").val()));
//    });

}

//**********************************************************************添加保存******************************************************************************
$('#btn_team_pop_add').click(function() {
	if (!$('#from_model_prop').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});
	$.ajax({
		type : "POST",
		url : "../../teamModelController/addProperty.json",
		dataType : "json",
		data : $("#from_model_prop").serialize(),
		success : function(data) {
			layer.close(index);
			swal("添加成功!", "信息保存成功", "success");
            layer.closeAll('page');
		},
		error : function() {
			layer.close(index);
			lrError("添加失败！服务器错误！");
		}
	});
});

$('#btn_team_pop_update').click(function(){
	if(!$('#from_model_prop').valid()){
		lrError("请输入必填项！");
		return;
	}
	var index=layer.load(0, {shade: false});  ; 
	$.ajax({
		   type: "POST",
		   url: "../../teamModelController/updateProp.json",
		   dataType:"json",
		   data:$("#from_model_prop").serialize(),
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

//**********************************************************************模型修改操作**************************************************************************
//行内修改初始化i
function editInit(index){
	var row=$('#table').bootstrapTable('getData')[index];	
	edit(row);	
	
}
//修改操作

function edit(row){	
	bindForm('from_panel_model_updateModelTeam',row);
	var index_main=layer.open({
	      type: 1,
	      title: '修改信息',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['85%', '65%'],
	      content: $('#div_updateModelTeam'),
	      end: function(){ //此处用于演示
	    	 // swal("添加成功!", "活动信息保存成功", "success");
	    	  $('#table').bootstrapTable('refresh');  	    	  
		  }
	});	
	
	$('#btn_update_closeModelTeam').click(function(){
		layer.close(index_main);
	});	
}

//********************************************************************修改实现*******************************************************************************
//修改
$('#btn_update_submitModelTeam').click(function(){
	if(!$('#from_panel_model_updateModelTeam').valid()){
		lrError("请输入必填项！");
		return;
	}
	var index=layer.load(0, {shade: false});  ; 
	$.ajax({
		   type: "POST",
		   url: "../../teamModelController/updateCategory.json",
		   dataType:"json",
		   data:$("#from_panel_model_updateModelTeam").serialize(),
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

//*******************************************************************************************删除实现******************************************************************
//删除
function del(id){
	
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
				   url: "../../teamModelController/delCategory.json",
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
		}else{			
			layer.close(index);
		}
		
	});	
}

//*********************************************************************************子表格******************************************************************************
//主界面每行最前面可以点开查看属性的加载数据的
function show_detail(table, toolbar, id) {
	$('#' + table)
			.bootstrapTable(
					{
						url : '../../teamModelController/detilprop.json?modelId='+id,
						striped : true,
						pagination : false,
						method : 'get',
						dataType : "json",
						pageSize : 10,
						pageList : [ 10, 20, 30 ],
						sidePagination : 'server',// 设置为服务器端分页
						pageNumber : 1,
						striped : true, // 是否显示行间隔色
						search : false, // 显示搜索框
						sortable : false, // 是否启用排序
						showToggle : false,
						showRefresh : false, // 是否显示刷新按钮
						selectItemName : 'btSelectItem',
						columns : [
								{
									field : 'propertyName',
									title : '属性名称',
									align : 'center'
								},
								{
									field : 'propertyType',
									title : '模型属性类型',
									align : 'center',
									formatter : function(value, row, index) {
										return 	getCodeKey("../../", 'html_property_type', value);
									}										
								},
								{
									field : 'propertyData',
									title : '属性内容',
									align : 'center'
								},	{
									field : 'propertyData',
									title : '全拼',
									align : 'center'
								},							
								{
									title : '操作',
									field : 'id',
									align : 'center',
									cardVisible : false,
									formatter : function(value, row, index) {
										var e = '<a href="javascript:void(0);" mce_href="#" onclick="editDetailprop('
												+ index
												+','
												+ row.id
												+ ',\''
												+ table
												+ '\')">编辑属性</i></a> ';
										var d = '<a href="javascript:void(0);" mce_href="#" onclick="delDetailprop(\''
												+ row.id
												+ '\',\''
												+ table
												+ '\')">删除属性</i></a> ';
										return e + d;
									}
								} ],
					});
}

//属性修改初始化修改
function editDetailprop(index,id,table){
	//行内修改初始化i
	var row=$('#'+table).bootstrapTable('getData')[index];	
	editProp(row,table);	
}
//修改属性
function editProp(row,table){
	$('#btn_team_pop_update').show();
	$('#btn_team_pop_add').hide();
	getCodes("../../", 'html_property_type', 'sel_propertyType');
	bindForm('from_model_prop',row);
	var index_main=layer.open({
	      type: 1,
	      title: '修改信息',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['80%', '75%'],
	      content: $('#div_add'),
	      end: function(){ //此处用于演示
	    	 // swal("添加成功!", "活动信息保存成功", "success");
	    	  $('#'+table).bootstrapTable('refresh');  	    	  
		  }
	});	
	
	$('#btn_team_pop_close').click(function(){
		layer.close(index_main);
	});	
}


//属性删除初始化
function delDetailprop(id,table){
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
				   url: "../../teamModelController/delProp.json",
				   dataType:"json",
				   data: {
					   "id":id
				   },
				   success: function(data){
					   $('#'+table).bootstrapTable('refresh');  
					   swal("删除成功", "属性删除成功", "success");
					   layer.close(index);    
					   
				   },
				   error:function(){   
					   lrError("删除失败！服务器错误！");
					   layer.close(index); 
				   }
			});	
		}else{			
			layer.close(index);
		}
		
	});	
}






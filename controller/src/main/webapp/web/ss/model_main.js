	$(function() {

			
			getCodes("../../", 'html_property_type', 'sel_modelPropertyType')
			$('#add').click(function(){
				emptyForm('from_ss_model_add');		
				$('#add_prop_div').empty();
				$('#addselectspecplace').empty();
				add();
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
								url : '../../ssModelController/main.json',
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
											field : 'modelName',
											title : '模型名称',
											align : 'center'
										},
										{
											field : 'userId',
											title : '模型添加人',
											align : 'center'
										},
										{
											field:'operTime',
											title:'添加日期',
											align:'center'
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
												var f = '<a href="#" mce_href="#" onclick="editspec(\''
														+ row.id
														+ '\')"><i/>查看规格    </a> ';    
												return e + d+f;
											}
										} ],

							});

		});
	
//	添加
	$('#btn_add').click(function(){
	
		if(!$('#from_ss_model_add').valid()){
			lrError("请输入必填项！");
			return;
		}

		var index=layer.load(0, {shade: false}); ;  
		var r=$("#from_ss_model_add").serialize();
		$.ajax({
			   type: "POST",
			   url: "../../ssModelController/add.json",
			   dataType:"json",
			   data:r,
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

//	修改
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
				   url: "../../ssModelController/del.json",
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


//添加操作
function add(){
	
	var index_main=layer.open({
	      type: 1, 	
	      title: '添加模型',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['100%', '100%'],
	      content: $('#div_add'),
	      end: function(){ //此处用于演示
	    	 // swal("添加成功!", "信息保存成功", "success");
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

function edit(row){	
	bindForm('from_ss_model_update',row);
	var index_main=layer.open({
	      type: 1,
	      title: '修改信息',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['60%', '55%'],
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

//下面两个click是在添加模型是选项卡来回切换时让创建新属性的按钮显示和隐藏的方法
$('#tab_prop').click(function(){
	$("#btn_add_new_prop").show("fast");
	$("#btn_add_new_spec").hide("fast");	
});

$('#tab_spec').click(function(){
	$("#btn_add_new_spec").show("fast");
	$("#btn_add_new_prop").hide("fast");	
});

//再添加模型中模型属性的创建新属性的按钮的点击事件
$('#btn_add_new_prop').click(function(){
	addnewprop();});
//看上面
function addnewprop(){	
	$('#add_prop_div').append($('#dsb1').clone());		
}
//主界面每行最前面可以点开查看属性的加载数据的
function show_detail(table, toolbar, id) {
	$('#' + table)
			.bootstrapTable(
					{
						url : '../../ssModelController/detilprop.json?modelId='+id,
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
									field : 'modelPropertyName',
									title : '模型属性',
									align : 'center'
								},
								{
									field : 'modelPropertyType',
									title : '模型属性类型',
									align : 'center',
									formatter : function(value, row, index) {
										return 	getCodeKey("../../", 'html_property_type', value);
									}										
								},
								{
									field : 'modelPropertyData',
									title : '属性内容',
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
//编辑属性的
function editprop(row){
	
bindForm('from_ss_modelprop_update',row);
	var index_main=layer.open({
	      type: 1,
	      title: '修改信息',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['100%', '100%'],
	      content: $('#prop_updata'),
	      end: function(){ //此处用于演示
	    	 // swal("添加成功!", "活动信息保存成功", "success");
	    	  $('#table').bootstrapTable('refresh');  	    	  
		  }
	});	
	
	$('#btn_updateprop_close').click(function(){
		layer.close(index_main);
	});	
}

$('#btn_updateprop_submit').click(function(){
	if(!$('#from_ss_modelprop_update').valid()){
		lrError("请输入必填项！");
		return;
	}
	var index=layer.load(0, {shade: false});  ; 
	var data=$("#from_ss_modelprop_update").serialize();
	$.ajax({
		   type: "POST",
		   url: "../../ssModelController/updateprop.json",
		   dataType:"json",
		   data:data,
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

function editDetailprop(index,id,table){
	var row=$('#'+table).bootstrapTable('getData')[index];	
	editprop(row);		
}
//删除属性的
function delDetailprop(id){
	var index=layer.load(0, {shade: false}); ;  
			$.ajax({
				   type: "POST",
				   url: "../../ssModelController/delprop.json",
				   dataType:"json",
				   data: {
					   "id":id
				   },
				   success: function(data){
					   $('#table').bootstrapTable('refresh');  
					   //swal("删除成功", "用户删除成功", "success");
					   //swal.close();
					  layer.close(index);    					   
				   },
				   error:function(){   
					   lrError("删除失败！服务器错误！");
					   layer.close(index); 
				   }
			});		
}
//主界面模型每行后面的查看规格的弹框和加载数据
function editspec(id){
	var a=id;
	if(id!=null){		
	$('#editspec' ).bootstrapTable(
			{				
				url : '../../ssModelController/lookspec.json?modelId='+a,
				striped : true,
				pagination : true,
				method : 'get',
				dataType : "json",
				pageSize : 10,
				pageList : [ 10, 20, 30 ],
				sidePagination : 'server',// 设置为服务器端分页
				pageNumber : 1,
				striped : true, // 是否显示行间隔色
				search : false, // 显示搜索框
				sortable : false, // 是否启用排序
				showToggle : true,
				showRefresh : false, // 是否显示刷新按钮
				selectItemName : 'btSelectItem',
				columns : [
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
//						
			],
			})
			}
	
	$('#editspec' ).bootstrapTable('refresh',{url:'../../ssModelController/lookspec.json?modelId='+a+''});	
	var index_main=layer.open({
	      type: 1, 	
	      title: '编辑规格',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['60%', '55%'],
	      content: $('#spec_edit'),
	      end: function(){ //此处用于演示
	    	 // swal("添加成功!", "信息保存成功", "success");
	    	  $('#table').bootstrapTable('refresh');  
		  }
	});	
};


//选择规格添加后的加载数据的
$('#btn_select_spec').click(function(){
	$('#selectaddnewspec').empty();	
	$.ajax({
		   type: "POST",
		   url: "../../ssModelController/selectspec.json",
		   success: function(data){
			   $.each(data,function(i,n){
					 var r="";
					r+=' <div class="form-group">';
					r+='<div  class="col-sm-1">'
					r+='<button class="btn btn-outline btn-success   col-md-offset-1" type="button" id="select_spec_btn" value="'+n.specName+'"  name="'+n.id+'"  ><i class="fa fa-upload"></i><div style="display: none">';
					r+='  <input  type="hidden" name="Specid"   value="'+n.id+'"> <input  name="specname"   class="form-control required" disabled="true"  value="'+n.specName+'"  >  </div> </button></div> ';
					r+=	'<label class="col-sm-1 control-label">规格名称 </label>  ' ;
					r+=	'<div class="col-sm-4">';
					r+=	'<input type="text" name="specName" class="form-control required" disabled="true" value="'+n.specName+'">';
					r+=	'</div>	</div>	<div class="form-group">	<br/>		<label class="col-sm-2 control-label">规格内容 </label>';
					r+='	<div class="col-sm-8">';
					r+=	'	<input type="text" name="specData" class="form-control required" disabled="true"  value="'+n.specData+'">';
					r+=	'</div>	</div>			<div class="hr-line-dashed"></div>';
					$('#selectaddnewspec').append(r);
//					  alert(r);
			 	 });
			  
		   },
		   error:function(){
			
		   }
	});	
	
	selectaddspec();
});
//选择添加规格后的弹窗
function selectaddspec(){
	$('#div_selectspec').empty();
	var index_main=layer.open({
	      type: 1,
	      title: '选择规格',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['90%', '90%'],
	      content: $('#div_aselectspec'),
	      end: function(){ //此处用于演示
	    	 // swal("添加成功!", "活动信息保存成功", "success");
	    	  $('#table').bootstrapTable('refresh');  
	    	  
		  }
	});
	$('#btn_selectspec_close').click(function(){
		layer.close(index_main);
	});
//	
//	$('#btn_addspec_self').click(function(){
//		window.open('web/ss/model_spec.html');
//	});
//	

}
//选择添加规格后的每个规格前的添加按钮
$(document).on("click","#select_spec_btn",function(){
	var name=$(this).attr("value");
	var c=$(this).attr("id");
	var id=$(this).attr("name");
	
	var b=$("input[value='"+id+"']")[0].outerHTML;
	var c=$("input[value='"+name+"']")[0].outerHTML;		
	var h='';
 	h+= '<div class="form-group">';
	h+='<div  class="col-sm-1">'
	h+='  '+b+'</div> ';
	h+=	'<label class="col-sm-1 control-label">规格名称 </label>  ' ;
	h+=	'<div class="col-sm-4">';
	h+=	''+c+'';
	h+=	'</div>	</div><div class="hr-line-dashed"></div>';
	$('#addselectspecplace').append(h);		
	 swal({
			title :"添加规格成功",
			text : "",
			type : "success",
			confirmButtonText : "确定"
		});
});





//选择规格添加后的 规格管理按钮的方法 可以在新分页打开规格管理
function newtabopen() {
    var o = $(this).attr("href"),
      m = $(this).data("index"),
      l = $.trim($(this).text()),
      k = true;
    if (o == undefined || $.trim(o).length == 0) {
      return false
    }
    $(".J_menuTab").each(function() {
      if ($(this).data("id") == o) {
        if (!$(this).hasClass("active")) {
          $(this).addClass("active").siblings(".J_menuTab").removeClass("active");
          g(this);
          $(".J_mainContent .J_iframe").each(function() {
            if ($(this).data("id") == o) {
              $(this).show().siblings(".J_iframe").hide();
              return false
            }
          })
        }
        k = false;
        return false
      }
    });
    if (k) {
      var p = '<a href="javascript:;" class="active J_menuTab" data-id="' + o + '" >' + l + ' <i class="fa fa-times-circle"></i></a>';
      $(".J_menuTab",window.parent.document).removeClass("active");
      var n = '<iframe class="J_iframe" name="iframe' + m + '" width="100%" height="100%" src="' + o + '" frameborder="0" data-id="' + o + '" seamless></iframe>';
      $('.J_mainContent',window.parent.document).find("iframe.J_iframe").hide();
      var  t=$('#'+this.id+'').closest('.J_menuTab'),
      y=$('div.page-tabs-content',window.parent.document).length;
//      .children('.J_menuTabs').children('.page-tabs-content')    .next('.content-tabs')
      if($('a[data-id="'+o+'"]',window.parent.document).length>0){      
//    	  var x=$('#spec_manager_tab',window.parent.document).attr('id');
//    	  alert(x);
    	  $('a[data-id="'+o+'"]',window.parent.document).addClass("active");
    	  $('iframe[data-id="'+o+'"]',window.parent.document).attr("style","display: inline;");
    	  
      	}else{
      		$('.page-tabs-content',window.parent.document).append(p);
      		$('#content-main',window.parent.document).append(n);
      		}      
      
    }
    return false
  }
  $("#btn_addspec_self").on("click", newtabopen);




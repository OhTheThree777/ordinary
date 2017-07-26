		$(function() {
			laydate({
			    elem: '#referee_start_time', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
			    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
			});
			laydate({
			    elem: '#referee_pract_time', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
			    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
			});
			laydate({
			    elem: '#referee_start_time_updata', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
			    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
			});
			laydate({
			    elem: '#referee_pract_time_updata', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
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
						title : "初始化失败!",
						text : "请选择裁判!",
						type : "error",
						confirmButtonText : "确定"
					});
				}else{
					edit(row[0]);
				}
			});

			$('#del').click(function() {
				// 获取选中行信息
				var row = $('#table').bootstrapTable('getSelections');
				if (row == null) {
					swal({
						title : "初始化失败!",
						text : "请选择裁判!",
						type : "error",
						confirmButtonText : "确定"
					});
					
				} else {
					swal({
						title : "确定到删除",
						text : "确定要删除该裁判，删除后将无法回复",
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
	
			//加载数据
			$('#table')
					.bootstrapTable(
							{
								url : '../../refereeController/main.json',
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
								exportDataType : 'basic',
								advancedSearch : true,
								uniqueId : "id",
								idField:"id",
								clickToSelect:true,
								singleSelect:true,
								strictSearch : true,
								columns : [
										{
											align : 'center',
											width:50,
											checkbox:true
										},
										{
											field : 'refereePic',
											title : '头像',
											align : 'center',
											formatter : function(value, row,
													index) {
												var html="<img src='"+value+"' style='width:65px;height:65px;'>";
												return html;
											}
											
										},
										{
											field : 'refereeName',
											title : '姓名',
											align : 'center',
											sortable : true
										},
										{
											field : 'refereeSex',
											title : '性别',
											align : 'center',
											sortable : true
										},
										{
											field : 'refereeAge',
											title : '年龄',
											align : 'center',
											visible:false
											
										},
										{
											field : 'refereeBirthplace',
											title : '籍贯',
											align : 'center',
											sortable : true,
											visible:false
										},
										{
											field : 'refereePhone',
											title : '电话',
											align : 'center'
										},
										{
											field : 'refereeOccupation',
											title : '职业',
											align : 'center',
											sortable : true
										},
										{
											field : 'refereeTimes',
											title : '裁判次数',
											align : 'center',
											sortable : true
										},
										{
											field : 'refereeStartTime',
											title : '发证日期 ',
											align : 'center',
											sortable : true
										},
										{
											field : 'refereePractTime',
											title : '从业时间 ',
											align : 'center',
											sortable : true,
											visible:false
										},
										
										{
											field : 'refereeAndrank',
											title : '职阶',
											align : 'center',
											sortable : true,
											visible:false
										},
										{
											field : 'refereeWage',
											title : '工资',
											align : 'center',
											sortable : true
										},
										{
											field : 'refereeRemark',
											title : '备注',
											align : 'center',
											sortable : true,
											visible:false
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
														+ '\')"><i class="glyphicon glyphicon-pencil"/></a> ';
												var d = '<a href="#" mce_href="#" onclick="delRight(\''
														+ value
														+ '\')"><i class="glyphicon glyphicon-remove"/></a> ';
												return e + d;
											}
										} ],

							});

		});
		
	
	$('#btn_add').click(function(){
		if(!$('#form_referee_add').valid()){
			lrError("请输入必填项！");
			return;
		}
		var index=layer.load(0, {shade: false});
		$.ajax({
			   type: "POST",
			   url: "../../refereeController/add.json",
			   dataType:"json",
			   data: $("#form_referee_add").serialize(),
			   success: function(data){
				   layer.closeAll('page');
				   layer.close(index);  
				   swal({
						title : "添加成功!",
						text : "裁判信息保存成功!",
						type : "success",
						confirmButtonText : "确定"
					});
			   },
			   error:function(){
				   layer.close(index);    
				   lrError("添加失败！服务器错误！");
			   }
		});	
	});
		
	
	$('#btn_update').click(function(){
		if(!$('#form_referee_update').valid()){
			lrError("请输入必填项！");
			return;
		}
		var index=layer.load(0, {shade: false}); ;  
		$.ajax({
			   type: "POST",
			   url: "../../refereeController/update.json",
			   dataType:"json",
			   data: $("#form_referee_update").serialize(),
			   success: function(data){
				   swal("修改成功", "裁判信息修改成功", "success");
				   layer.closeAll('page');
				   layer.close(index);  
			   },
			   error:function(){
				   layer.close(index);    
				   lrError("添加失败！服务器错误！");
			   }
		});	
	});
		
$("#form_referee_add").validate({
    ignore: [],
    rules : {
        refereePic : {
            required : true
        }
    },
    messages : {
        refereePic : {
            required : "<i class='fa fa-times-circle'></i>请添加头像"
        }
    }
});

$("#form_referee_update").validate({
    ignore: [],
    rules : {
        refereePic : {
            required : true
        }
    },
    messages : {
        refereePic : {
            required : "<i class='fa fa-times-circle'></i>请添加头像"
        }
    }
});


 function delRight(id){
	 swal({
			title : "确定到删除",
			text : "确定要删除该裁判，删除后将无法回复",
			type : "warning",
			showCancelButton : true,
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "确定",
			cancelButtonText : "取消",
			closeOnConfirm : false,
			closeOnCancel : true
		}, function(isConfirm) {
			if (isConfirm) {
				del(id);
			}
		});
 }

//删除
	function del(id){
		var index=layer.load(0, {shade: false});  
		$.ajax({
			   type: "POST",
			   url: "../../refereeController/del.json",
			   dataType:"json",
			   data: {
				   "id":id
			   },
			   success: function(data){
				   $('#table').bootstrapTable('refresh');  
				   swal({
						title : "删除成功!",
						text : "裁判删除成功!",
						type : "success",
						confirmButtonText : "确定"
					});
				 
				   layer.close(index);    
				   
			   },
			   error:function(){   
				   lrError("删除失败！服务器错误！");
				   layer.close(index); 
			   }
		});	
	}



//添加操作
function add(){
	formReset('form_referee_add');
	var index_main=layer.open({
	      type: 1,
	      title: '添加裁判',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['100%', '100%'],
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

function edit(row){
	if(row['refereePic'].indexOf("http")!= -1 ){
		$('#update_pic').attr('src',row['refereePic']);
	}else{
		$('#update_pic').attr('src',"../../img/tx.png");
	}
	bindForm('form_referee_update',row);
	var ue_update = UE.getEditor('updateTeamIntroduction');
	ue_update.ready(function() {//编辑器初始化完成再赋值  
		ue_update.setContent(row['body']);  //赋值给UEditor  
    });  
	var index_main=layer.open({
	      type: 1,
	      title: '修改信息',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['100%', '100%'],
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



swfobject.addDomLoadEvent(function () {
	//以下两行代码正式环境下请删除
var swf = new fullAvatarEditor("fullAvatarEditor.swf", "expressInstall.swf", "swfContainer", {
		    id : 'swf',
			upload_url : '../../common/upload/upPic.json',	//上传接口
			method : 'post',	//传递到上传接口中的查询参数的提交方式。更改该值时，请注意更改上传接口中的查询参数的接收方式
			src_upload : 2,		//是否上传原图片的选项，有以下值：0-不上传；1-上传；2-显示复选框由用户选择
			avatar_box_border_width : 0,
			width: 600,						//flash文件的宽度
			height: 430,
			expressInstall:'../../js/plugins/fullavatareditor/expressInstall.swf',
			file:'../../js/plugins/fullavatareditor/fullAvatarEditor.swf',
			avatar_sizes : '100*100|50*50|32*32',
			avatar_sizes_desc : '100*100像素|50*50像素|32*32像素'
		}, function (msg) {
			switch(msg.code)
			{
				case 1 : break;
				case 2 : 
					//alert("已成功加载图片到编辑面板。");
					document.getElementById("upload").style.display = "inline";
					break;
				case 3 :
					if(msg.type == 0)
					{
						alert("摄像头已准备就绪且用户已允许使用。");
					}
					else if(msg.type == 1)
					{
						alert("摄像头已准备就绪但用户未允许使用！");
					}
					else
					{
						alert("摄像头被占用！");
					}
				break;
				case 5 : 
					var result=eval(msg.content);
					if(result.status=="1"){
						$('#add_pic').attr('src',''+result.list[0].uri);
						$('#update_pic').attr('src','../../'+result.list[0].uri);
						
						$('#hid_referee_pic').val(result.list[0].uri);

						$('#update_hid_referee_pic').val(result.list[0].uri);
					}else{
						alert('图片上传失败');
					}
					layer.close(pic_layer);
						
				break;
			}
		}
	);

});
var pic_layer;
function showPic(type){

	 pic_layer=layer.open({
	      type: 1,
	      title: '上传头像',
	      shadeClose: true,
	      shade: false,
	      maxmin: true, //开启最大化最小化按钮
	      area: ['60%', '95%'],
	      content: $('#div_pic'),
	      end: function(){ //此处用于演示
	    	
		  }
	});
	
	
}

var ue = UE.getEditor('body');



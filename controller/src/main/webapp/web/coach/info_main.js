		$(function() {
			laydate({
			    elem: '#add_birdate', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
			    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
			});
			laydate({
			    elem: '#update_birdate', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
			    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
			});
			laydate({
			    elem: '#add_approvalTime', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
			    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
			});
			laydate({
			    elem: '#update_approvalTime', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
			    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
			});
			
			// 文件初始化
			$('#fileinput_add').fileinput({
		        language: 'zh', // 设置语言
		        uploadUrl: '../../common/upload/up.json', // 上传的地址
		        allowedFileExtensions : ['jpg', 'png','gif'],// 接收的文件后缀
		        showUpload: true, // 是否显示上传按钮
		        enctype: 'multipart/form-data',
		        showCaption: false,// 是否显示标题
		        browseClass: "btn btn-primary", // 按钮样式
		        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>", 
		        
		       
		    }).on("fileuploaded", function(event, data) {
		        if(data.response)
		        {
		            //alert('处理成功'+data.response.data.list[0].uri);
		        	$('#add_file_propagate').val(data.response.data.list[0].uri)
		        }
		    });
			$('#add').click(function(){
				getTeamPart();
			});
			$('#update').click(function(){
				//获取选中行信息
				var row=$('#table').bootstrapTable('getSelections');
				if(row==null||""==row){
					swal({
						title : "初始化失败!",
						text : "请选择教练!",
						type : "error",
						confirmButtonText : "确定"
					});
				}else{
					edit(row[0]);
					getTeamPartUpdate(row[0]);
				}
			});

			$('#del').click(function() {
				// 获取选中行信息
				var row = $('#table').bootstrapTable('getSelections');
				if (row == null) {
					swal({
						title : "初始化失败!",
						text : "请选择教练!",
						type : "error",
						confirmButtonText : "确定"
					});
					
				} else {
					swal({
						title : "确定到删除",
						text : "确定要删除该教练，删除后将无法回复",
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
								url : '../../coachInfoController/main.json',
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
											field : 'coachPortrait',
											title : '头像',
											align : 'center',
											formatter : function(value, row,
													index) {
												var html="<img src='"+value+"' style='width:65px;height:65px;'>";
												return html;
											}
											
										},
										{
											field : 'name',
											title : '姓名',
											align : 'center',
											sortable : true
										},
										{
											field : 'sex',
											title : '性别',
											align : 'center',
											formatter : function(value, row,
													index) {
												var html=getCodeKey('../../','sex_code',isUndefined(value,"String"))
												return html;
											}
										},
										{
											field : 'politicalLandscape',
											title : '政治面貌',
											align : 'center',
											visible:false
											
										},
										{
											field : 'height',
											title : '身高cm',
											align : 'center',
											sortable : true
										},
										{
											field : 'weight',
											title : '体重kg',
											align : 'center',
											sortable : true
										},
										{
											field : 'phone',
											title : '电话',
											align : 'center'
										},
										{
											field : 'incumbentPost',
											title : '现任职务',
											align : 'center',
											formatter : function(value, row,
													index) {
												var html=getCodeKey('../../','coach_job',isUndefined(value,"int"))
												return html;
											}
										},
										{
											field : 'issueState',
											title : '发布状态',
											align : 'center',
											formatter : function(value, row,
													index) {
												var html="";
												var b=getCodeKey("../../", "issue_state",value);
												if("0"==value){
													html="<span class='badge badge-danger'>"+b+"</span>";
												}else{
													html="<span class='badge badge-success'>"+b+"</span>";
												}
												return html;
											}
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
		if(!$('#form_coach_add').valid()){
			lrError("请输入必填项！");
			return;
		}
		var index=layer.load(0, {shade: false});
		$.ajax({
			   type: "POST",
			   url: "../../coachInfoController/add.json",
			   dataType:"json",
			   data: $("#form_coach_add").serialize(),
			   success: function(data){
				   layer.closeAll('page');
				   layer.close(index);  
				   swal({
						title : "添加成功!",
						text : "教练信息保存成功!",
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
		if(!$('#form_coach_update').valid()){
			lrError("请输入必填项！");
			return;
		}
		var index=layer.load(0, {shade: false}); ;  
		$.ajax({
			   type: "POST",
			   url: "../../coachInfoController/update.json",
			   dataType:"json",
			   data: $("#form_coach_update").serialize(),
			   success: function(data){
				   swal({
						title : "修改成功!",
						text : "教练信息修改成功!",
						type : "success",
						confirmButtonText : "确定"
					});
				   layer.closeAll('page');
				   layer.close(index);  
			   },
			   error:function(){
				   layer.close(index);    
				   lrError("添加失败！服务器错误！");
			   }
		});	
	});
		
	


 function delRight(id){
	 swal({
			title : "确定到删除",
			text : "确定要删除该教练，删除后将无法回复",
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
			   url: "../../coachInfoController/del.json",
			   dataType:"json",
			   data: {
				   "id":id
			   },
			   success: function(data){
				   $('#table').bootstrapTable('refresh');  
				   swal({
						title : "删除成功!",
						text : "教练删除成功!",
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
	getCodes('../../','education_background','education');
	getCodes('../../','certificate_grade','incumbentLevel');
	getCodes('../../','political_type','politicalLandscape');
	getCodes('../../','foreign_grade','foreignLevel');
	getCodes('../../','nation','nation');
	getCodes('../../','coach_job','incumbentPost');
	getCodes('../../','major','major');
	formReset('form_coach_add');
	var index_main=layer.open({
	      type: 1,
	      title: '添加教练',
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
	getCodes('../../','education_background','update_education');
	getCodes('../../','nation','update_nation');
	getCodes('../../','certificate_grade','update_incumbentLevel');
	getCodes('../../','political_type','update_politicalLandscape');
	getCodes('../../','foreign_grade','update_foreignLevel');
	getCodes('../../','coach_job','update_incumbentPost');
	getCodes('../../','major','update_major');
	getTeamPartUpdate(row);
	edit(row);
}
//修改操作

function edit(row){
	
	
	bindForm('form_coach_update',row);
	if(row['coachPortrait'].indexOf("http")!= -1 ){
		$('#update_pic').attr('src',row['coachPortrait']);
	}else{
		$('#update_pic').attr('src',"../../img/tx.png");
	}
//	var ue_update1 = UE.getEditor('update_educationCourse');
//	var ue_update2 = UE.getEditor('update_trainCourse');
	var ue_update3 = UE.getEditor('update_coachCourse');
//	ue_update1.ready(function() {//编辑器初始化完成再赋值  
//		ue_update1.setContent(row['educationCourse']); 
//    });  
//	ue_update2.ready(function() {
//		ue_update2.setContent(row['trainCourse']);
//	});
	ue_update3.ready(function() {
		ue_update3.setContent(row['coachCourse']);  //赋值给UEditor 
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
			avatar_sizes : '100*100',
			avatar_sizes_desc : '100*100像素'
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
						$('#update_pic').attr('src',''+result.list[0].uri);
						$('#add_certificate_pic').attr('src',''+result.list[0].uri);
						$('#update_certificate_pic').attr('src',''+result.list[0].uri);
						
						
						$('#hid_coach_pic').val(result.list[0].uri);
						$('#update_coach_pic').val(result.list[0].uri);
						$('#hid_certificate_coach_pic').val(result.list[0].uri);
						$('#update_certificate_coach_pic').val(result.list[0].uri);
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

$("#form_coach_add").validate({
    ignore: [],
    rules : {
        coachPortrait : {
            required : true
        }
    },
    messages : {
        coachPortrait : {
            required : "<i class='fa fa-times-circle'></i>请添加头像"
        }
    }
});

$("#form_coach_update").validate({
    ignore: [],
    rules : {
        coachPortrait : {
            required : true
        }
    },
    messages : {
        coachPortrait : {
            required : "<i class='fa fa-times-circle'></i>请添加头像"
        }
    }
});

$("#issue").click(function(){
	// 获取选中行信息
	var row = $('#table').bootstrapTable('getSelections');
	if (null == row || ""==row) {
		swal({
			title : "发布失败!",
			text : "请选择教练!",
			type : "error",
			confirmButtonText : "确定"
		});
	} else {
		swal({
			title : "确定要发布么",
			text : "确定要发布教练",
			type : "warning",
			showCancelButton : true,
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "确定",
			cancelButtonText : "取消",
			closeOnConfirm : true,
			closeOnCancel : true
		}, function(isConfirm) {
			if (isConfirm) {
				issue(row[0].id);
			}
		});
	}
});
function issue(id){
	var index=layer.load(0, {shade: false}); 
	$.ajax({
        url:'../../postmessageController/issues_coach.json',
        type:"post",
        data:{'coach_id':id},
        dataType:"json",
        success:function(data){
        	if(0==data.status){
        		swal({
					title : "发布失败!",
					text : data.msg,
					type : "error",
					confirmButtonText : "确定"
				});
        		layer.close(index); 
        	}else if(1==data.status){
        		layer.close(index);
        		swal({
					title : "发布成功",
					text : data.msg,
					type: "warning",
					type : "success",
					confirmButtonText : "确定"
        		}, 
        		function(){
            		layer.open({
          		      type: 2,
          		      title: '发布信息',
          		      shadeClose: true,
          		      shade: false,
          		      maxmin: true, //开启最大化最小化按钮
          		      area: ['60%', '95%'],
          		      content:'http://isport.lrkpzx.com/dede/inter_makehtml_all.php',
          		      end: function(){ //此处用于演示
          		    	  layer.close(index);
//          		    	  swal.close();
          		    	  $('#table').bootstrapTable('refresh');
          			  }
          		});
			});
           }
          }
      });
}
//var ue = UE.getEditor('add_educationCourse');
//var ue = UE.getEditor('add_trainCourse');
var ue = UE.getEditor('add_coachCourse');

function getTeamPart() {
	var index=layer.load(0, {shade: false});  
	formReset("form_coach_add");
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
			$('#teamId').empty();

			var item="<option value='0'>无队伍</option>";
			$('#teamId').append(item);
			$.each(infos, function(i, n){
				var item="<option value='"+n.id+"'>"+n['teamName']+"</option>";
				$('#teamId').append(item);
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
			
			var teams=data['data']['list'];
			$('#updateTeamId').empty();
			var item="<option value='0'>无队伍</option>";
			$('#updateTeamId').append(item);
			$.each(teams, function(i, n){
				var item="<option value='"+n.id+"'>"+n['teamName']+"</option>";
				$('#updateTeamId').append(item);
			});
			edit(row);
		}
		,error : function() {
			lrError("获取队伍失败！服务器错误！");
			
		}
	});
}


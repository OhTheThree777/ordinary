		$(function() {
			//地址初始化
			$("#address2").address({
				prov: "内蒙古",
				city: "呼和浩特市",
				district: "",
				scrollToCenter: true,
				footer: true,
				selectEnd: function(json) {
					console.log(JSON.stringify(json));
				}
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
		        	$('#add_team_pic').val(data.response.data.list[0].uri)
		        }
		    });;
			
			
			laydate({
			    elem: '#team_bulid_time', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
			    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
			});
			laydate({
			    elem: '#team_updata_bulid_time', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
			    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
			});
			
			$('#add').click(function(){
				getTeamPart();
			
			});
			$(window).resize(function() {
				$('#table').bootstrapTable('resetView');
			});

			$('#update').click(function(){
				//获取选中行信息
				var row=$('#table').bootstrapTable('getSelections');
				if(row==null||""==row){
					
					swal({
						title : "修改失败!",
						text : "请选择队伍!",
						type : "error",
						confirmButtonText : "确定"
					});
				}else{
					getTeamPartUpdate(row[0]);
				}
			});

			$('#del').click(function(){
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
	
			//加载数据
			$('#table')
					.bootstrapTable(
							{
								url : '../../teamInfoController/main.json',
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
								search : true, //显示搜索框
								toolbar : '#toolbar', //工具按钮用哪个容器
								sortable : true,//是否启用排序
								showColumns : true,
								showToggle:true,
								showRefresh : true, //是否显示刷新按钮
								selectItemName:'btSelectItem',
								showExport : true,
								exportDataType : 'basic',
								uniqueId : "id",
								idField:"id",
								clickToSelect:true,
								singleSelect:true,
								strictSearch : true,
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
											align : 'center',
											width:50,
											checkbox:true
										},{
							
											field : 'teamEmblem',
											title : '队徽',
											align : 'center',
											formatter : function(value, row,
													index) {
												var html="<img src='"+value+"' style='width:65px;height:65px;'>";
												return html;
											}
											
										},
										{
											field : 'teamName',
											title : '队伍名称',
											align : 'center',
											sortable : true
										},
										{
											field : 'teamLeader',
											title : '领队',
											align : 'center',
											sortable : true
										},
										{
											field : 'teamQuantity',
											title : '队伍人数',
											align : 'center',
											sortable : true
										},
										{
											field : 'teamCheck',
											title : '审核状态',
											align : 'center',
											formatter : function(value, row,
													index) {
												var html="";
												var a=getCodeKey("../../", "team_state",value);
												
												if("1"==value){
													html="<span class='badge badge-danger'>"+a+"</span>";
												}else{
													html="<span class='badge badge-success'>"+a+"</span>";
												}
												return html;
											}
											
										},
										{
											field : 'teamBulidTime',
											title : '建立时间',
											align : 'center',
											sortable : true
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
												var e = '<a href="#"  style="margin-right: 10px;"  onclick="editInit(\''
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
		if(!$('#form_teamInfo_add').valid()){
			lrError("请输入必填项！");
			return;
		}
		var index=layer.load(0, {shade: false});
		$.ajax({
			   type: "POST",
			   url: "../../teamInfoController/add.json",
			   dataType:"json",
			   data: $("#form_teamInfo_add").serialize(),
			   success: function(data){
				   layer.closeAll('page');
				   layer.close(index);  
				   swal("添加成功!", "队伍信息保存成功", "success");
			   },
			   error:function(){
				   layer.close(index);    
				   lrError("添加失败！服务器错误！");
			   }
		});	
	});
		
	
	$('#btn_update').click(function(){
		if(!$('#form_teamInfo_update').valid()){
			lrError("请输入必填项！");
			return;
		}
		var index=layer.load(0, {shade: false}); ;  
		$.ajax({
			   type: "POST",
			   url: "../../teamInfoController/update.json",
			   dataType:"json",
			   data: $("#form_teamInfo_update").serialize(),
			   success: function(data){
				   swal("修改成功", "队伍信息修改成功", "success");
				   layer.closeAll('page');
				   layer.close(index);  
			   },
			   error:function(){
				   layer.close(index);    
				   lrError("修改失败！服务器错误！");
			   }
		});	
	});
		
	




//删除
function del(id){
	var index=layer.load(0, {shade: false});  
	$.ajax({
		   type: "POST",
		   url: "../../teamInfoController/del.json",
		   dataType:"json",
		   data: {
			   "id":id
		   },
		   success: function(data){
			   $('#table').bootstrapTable('refresh');  
			   swal({
					title : "删除失败!",
					text : "请选择队伍!",
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

$("#form_teamInfo_add").validate({
    ignore: [],
    rules : {
        teamEmblem : {
            required : true
        }
    },
    messages : {
        teamEmblem : {
            required : "<i class='fa fa-times-circle'></i>请添加头像"
        }
    }
});

$("#form_teamInfo_update").validate({
    ignore: [],
    rules : {
        teamEmblem : {
            required : true
        }
    },
    messages : {
        teamEmblem : {
            required : "<i class='fa fa-times-circle'></i>请添加头像"
        }
    }
});


//添加操作
function add(){	
	getCodes('../../','team_type','teamType');
	
	var index_main=layer.open({
	      type: 1,
	      title: '添加队伍',
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
	getTeamPartUpdate(row);
}
//修改操作

function edit(row){
	bindForm('form_teamInfo_update',row);
	$('#update_pic').attr('src',''+row['teamEmblem']);
	$('#team_pic').attr('src',''+row['teamPic']);
	var ue_update = UE.getEditor('updateTeamIntroduction');
	ue_update.ready(function() {//编辑器初始化完成再赋值  
		ue_update.setContent(row['teamIntroduction']);  //赋值给UEditor  
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

function getTeamPart() {
	var index=layer.load(0, {shade: false});  
	formReset("form_teamInfo_add");
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

			var item="<option value='0'>主队伍</option>";
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
			var item="<option value='0'>主队伍</option>";
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

function show_detail(table, toolbar, id) {
	$('#' + table)
			.bootstrapTable(
					{
						url : '../../teamInfoController/main.json'+id,
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
						search : false, //显示搜索框
						/*toolbar : '#toolbar', //工具按钮用哪个容器
*/						sortable : false,//是否启用排序
						showColumns : false,
						showToggle:false,
						showRefresh : false, //是否显示刷新按钮
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
									field : 'teamName',
									title : '队伍名称',
									align : 'center',
									sortable : true
								},
								{
									field : 'teamLeader',
									title : '领队',
									align : 'center',
									sortable : true
								},
								{
									field : 'teamOwnedName',
									title : '所属队伍',
									align : 'center'
									
								},
								{
									field : 'teamQuantity',
									title : '队伍人数',
									align : 'center',
									sortable : true
								},
								{
									field : 'teamCheck',
									title : '审核状态',
									align : 'center'
								},
								{
									field : 'teamArea',
									title : '所属地区',
									align : 'center',
									sortable : true
								},
								{
									field : 'teamBulidTime',
									title : '建立时间',
									align : 'center',
									sortable : true
								},
								{
									field : 'teamUserId',
									title : '用户',
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
									return e + d;
									}
								} ],

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
						$('#update_pic').attr('src',''+result.list[0].uri);
						
						$('#hid_team_emblem').val(result.list[0].uri);

						$('#update_hid_team_emblem').val(result.list[0].uri);
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

function delRight(id){
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
				del(id);
			}
		});
}
$("#issue").click(function(){
	// 获取选中行信息
	var row = $('#table').bootstrapTable('getSelections');
	if (null == row || ""==row) {
		swal({
			title : "发布失败!",
			text : "请选择队伍!",
			type : "error",
			confirmButtonText : "确定"
		});
	} else {
		swal({
			title : "确定要发布么",
			text : "确定要发布队伍",
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
        url:'../../postmessageController/issues_team.json',
        type:"post",
        data:{'team_id':id},
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
          		    	  swal.close();
          		    	  $('#table').bootstrapTable('refresh');
          			  }
          		});
			});
           }
          }
      });
}
var ue = UE.getEditor('teamIntroduction');
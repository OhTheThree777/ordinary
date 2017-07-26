//ranhongmin 2016.9.22 完成0.1
//



$(function() {
	
	// 文件初始化
	$('#fileinput_add').fileinput({
        language: 'zh', // 设置语言
        uploadUrl: '../../common/upload/up.json', // 上传的地址
        allowedFileExtensions : ['jpg', 'png','gif'],// 接收的文件后缀
        showUpload: true, // 是否显示上传按钮
        enctype: 'multipart/form-data',
        showCaption: false,// 是否显示标题
        browseClass: "btn btn-primary", // 按钮样式
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>"
        
       
    }).on("fileuploaded", function(event, data) {
        if(data.response)
        {
            //alert('处理成功'+data.response.data.list[0].uri);
        	$('#add_file_propagate').val(data.response.data.list[0].uri)
        }
    });;
	
	
	$('#add').click(function() {// 从前台按钮点击执行add函数
		add();
	});
//	
	var index = layer.load(0, {
		shade : false
	});
	
	
	$.ajax({
		type : "POST",
		url : "../../ssProjectController/findproject.json",
		dataType : "json",
		success : function(data) {
			
			var myTemplate=Handlebars.compile($("#project-table-add").html());
			$('#project-where-table-add').html(myTemplate(data['data']['list']));
			layer.close(index);
		},
		error : function() {
			layer.close(index);
			lrError("添加失败！服务器错误！");
		}
	});
	//没找见删除按钮啊0.0 不知道 删除功能要不要做
	$(document).on("click",'#delete-project',function(){
		var data =$(this).attr("name");
		alert(data);swal({//弹出提示框提示用户是否确认删除
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
				$.ajax({
					type : "POST",
					url : "../../ssProjectController/del.json",
					dataType : "json",
					data :{
								'id':data
								},
					success : function(data) {
						
						window.location.reload();
					},
					error : function() {
						layer.close(index);
						lrError("添加失败！服务器错误！");
					}
				});
				
			}
		});	
	
		
	});
	
	//编辑修改功能觉得不应该有，确定了之后就不能修改了不然修改的话好像很多地方都会变
	//修改功能也没做了
	$(document).on("click",'#edit-project',function(){
		var id=$(this).attr("name");
		
		$.ajax({
			type : "POST",
			url : "../../ssProjectController/findoneproject.json",
			dataType : "json",
			data :{
						'id':id
						},
			success : function(data) {
				 edit(data['data']['obj']);
			},
			error : function() {
				layer.close(index);
				lrError("添加失败！服务器错误！");
			}
		});
		
	});
	
	//这里的cookie存在bug，在这个地方保存cookie后虽然可以在赛事活动管理中添加竞赛，但是单独打开竞赛管理时，这个cookie还是会存在
	$(document).on("click",'#project-add-racing',function(){
		var data=$(this).attr("name");
		 $.cookie('projectState', "0");  
		 $.cookie('projectId', data,{expires: 7, path: '/' });
		var index_main = layer.open({
			type : 2,
			title : '竞赛项目管理',
			shadeClose : true,
			shade : false,
			maxmin : true, // 开启最大化最小化按钮
			area : [ '100%', '100%' ],
			content :'racing_main.html?projectId='+data
//			http://localhost:8111/lr_tyss/web/ss/racing_main.html
//			end : function() { // 此处用于演示
//				// swal("添加成功!", "活动信息保存成功", "success");
//				$('#table').bootstrapTable('refresh');
//			}
		});
		
		
	});
});

$('#btn_add').click(function() { // 弹出添加框内的确认按钮
	if (!$('#from_ss_project_add').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});

	$.ajax({
		type : "POST",
		url : "../../ssProjectController/add.json",
		dataType : "json",
		data : $("#from_ss_project_add").serialize(),
		success : function(data) {
			layer.closeAll('page');
			layer.close(index);
			swal({// 弹出提示框提示用户是否确认删除
				title : "添加成功",
//				text : "删除后将无法恢复",
				type : "warning",
				showCancelButton : true,
				confirmButtonColor : "#DD6B55",
				confirmButtonText : "确定",
				cancelButtonText : "取消",
				closeOnConfirm : false,
				closeOnCancel : true
			}, function(isConfirm) {
				if (isConfirm) {
					window.location.reload();
				}
			});		
//			swal("添加成功!", "信息保存成功", "success");
			
		},
		error : function() {
			layer.close(index);
			lrError("添加失败！服务器错误！");
		}
	});
});


//没有修改的功能呢还 上面说了感觉不能要修改的功能，不知道╮(╯▽╰)╭
$('#btn_update_submit').click(function() { // 修改内的修改按钮
	if (!$('#from_ss_project_update').valid()) {
		lrError("请输入必填项！");
		return;
	}
	var index = layer.load(0, {
		shade : false
	});
	;
	$.ajax({
		type : "POST",
		url : "../../ssProjectController/update.json",
		dataType : "json",
		data : $("#from_ss_project_update").serialize(),
		success : function(data) {
			swal("修改成功", "信息修改成功", "success");
			layer.closeAll('page');
			layer.close(index);
		},
		error : function() {
			layer.close(index);
			lrError("修改失败！服务器错误！");
		}
	});
});

// 删除 删除应该不能随便删除 界面没有删除按钮
function del(Id) {// 根据id删除
	var index = layer.load(0, {
		shade : false
	});
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
	
	$.ajax({
		type : "POST",
		url : "../../ssProjectController/del.json",
		dataType : "json",
		data : {
			"Id" : Id
		},
		success : function(data) {
			$('#table').bootstrapTable('refresh');
			swal("删除成功", "信息删除成功", "success");
			layer.close(index);

		},
		error : function() {
			lrError("删除失败！服务器错误！");
			layer.close(index);
		}
	});
		}
	});	
	
}

// 添加操作
function add() {
	$('#btn_add').show();
	$('#btn_update_submit').hide();
	var index_main = layer.open({
		type : 1,
		title : '添加赛事活动',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '100%', '100%' ],
		content : $('#div_project'),
		end : function() { // 此处用于演示
		}
	});

	$('#btn_close').click(function() {
		layer.close(index_main);
	});

}


function edit(row) {
	//$('#img_pic').attr('src','../../'+row['personPic']);
	var ue_update = UE.getEditor('personBody');
	ue_update.ready(function() {//编辑器初始化完成再赋值  
		ue_update.setContent(row['personBody']);  //赋值给UEditor  
    });  
	$('#btn_update_submit').show();
	$('#btn_add').hide();
   bindForm('from_ss_project', row);
	var index_main = layer.open({
		type : 1,
		title : '修改赛事活动信息',
		shadeClose : true,
		shade : false,
		maxmin : true, // 开启最大化最小化按钮
		area : [ '100%', '100%' ],
		content : $('#div_project'),
		end : function() { // 此处用于演示
		}
	});

}
laydate({ // 赛事开始日期选择控件
	elem:'#match_begin_date',
	event:'focus'
});
laydate({// 赛事结束日期选择控件
	elem:'#match_end_date',
	event:'focus'
});


var ue = UE.getEditor('matchIntroduce');



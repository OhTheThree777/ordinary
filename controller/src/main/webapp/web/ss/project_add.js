$(function() {
	var index = layer.load(0, {
		shade : false
	});
//*****************************************************************************加载赛事类型，赛制数据字典************************************************************************
	getCodes("../../","event_type","match_type");
	getCodes("../../","competition_system","match_system");
	
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
	
	//这里的cookie存在bug，在这个地方保存cookie后虽然可以在赛事活动管理中添加竞赛，但是单独打开竞赛管理时，这个cookie还是会存在
	$(document).on("click",'#project-add-racing',function(){
		var data=$(this).attr("name");
		$.cookie("projectState","0",{expires: 7,path: '/'});
		$.cookie("projectId",data,{expires: 7,path: '/'});
		var index_main = layer.open({
			type : 2,
			title : '竞赛项目管理',
			shadeClose : true,
			shade : false,
			maxmin : true, // 开启最大化最小化按钮
			area : [ '90%', '90%' ],
			content :'racing_main.html?projectId='+data,
			cancel: function(){
				$.cookie("projectId",null,{expires: 7,path: '/'});
			  }
		});
		
		
	});
	layer.close(index);
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
		url : "../../ssProjectController/front_add.json",
		dataType : "json",
		data : $("#from_ss_project_add").serialize(),
		success : function(data) {
			layer.closeAll('page');
			layer.close(index);
			swal({// 弹出提示框提示用户是否确认删除
				title : "添加成功",
				type : "success",
				confirmButtonText : "确定",
			},function(){
				window.location.href="sponsor_homepage.html";
			});	
		},
		error : function() {
			layer.close(index);
			lrError("添加失败！服务器错误！");
		}
	});
});
//*******************************************************************************选择日期************************************************************************************************
compareDate("match_begin_date","match_end_date");

$('#btn_closeProject').click(function() {
	alert(1);
	layer.closeAll('loading');
});


var ue = UE.getEditor('matchIntroduce');
	$("#from_ss_project_add").validate({
		 rules : {
			 mainOrganizersPhoneNumber : {
		            required : true,
		            isMobile : true,
		        }
		    },
		    messages : {
		    	mainOrganizersPhoneNumber : {
		            required : "<i class='fa fa-times-circle'></i>请输入手机号码",
		            isMobile : "<i class='fa fa-times-circle'></i>手机号码不符合规则！"
		        }
		    } 
  	});
	

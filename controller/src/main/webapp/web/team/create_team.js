$(function(){
	//拉取队伍类型
	acquireModels();
	//地址初始化
	$("#address").address({
		prov: "内蒙古",
		city: "呼和浩特市",
		district: "",
		scrollToCenter: true,
		footer: true,
		selectEnd: function(json) {
			console.log(JSON.stringify(json));
		}
	});
    laydate({
	    elem: '#teamBulidTime', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
	    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
	});
    
    $('#btn_add').click(function(){
    	if(!$('#form_teamInfo_add').valid()){
    		lrError("请输入必填项！");
    		return;
    	}
    	if($("#teamType").val()==""){
    		lrError("请选择球队类型！");
    		return;
    	}
    	var index=layer.load(0, {shade: false});
    	$.ajax({
    		   type: "POST",
    		   url: "../../teamHomepageController/add.json",
    		   dataType:"json",
    		   data: $("#form_teamInfo_add").serialize(),
    		   success: function(data){
    			   if(0==data.status){
    				   layer.close(index); 
    				   swal({
    						title :data.msg,
    						text : "",
    						type : "error",
    						confirmButtonText : "确定"
    					},function(){
    	    				   parent.layer.closeAll('iframe');
    					});

    			   }else{
    				   layer.close(index);  
    				   swal({
   						title :"创建球队成功",
   						text : "请查看球队管理！",
   						type : "success",
   						confirmButtonText : "确定"
   					},function(){
   						//跳转球队管理页面
   					 $.session.set("createTeam","1");
   					 top.location.href="../../web/team/my_team/tean-infor-manage.html";
   					});
    				  
    			   }
    		   },
    		   error:function(){
    			   layer.close(index);    
    			   lrError("添加失败！服务器错误！");
    		   }
    	});	
    });
});

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

$("#form_teamDoctor").validate({
    ignore: [],
    rules : {
        teamDoctorPic : {
            required : true
        }
    },
    messages : {
        teamDoctorPic : {
            required : "<i class='fa fa-times-circle'></i>请添加头像"
        }
    }
});

$("#form_teamEthos").validate({
    ignore: [],
    rules : {
        teamEthosPic : {
            required : true
        }
    },
    messages : {
        teamEthosPic : {
            required : "<i class='fa fa-times-circle'></i>请添加头像"
        }
    }
});

$("#form_Leader").validate({
    ignore: [],
    rules : {
        teamLeaderPic : {
            required : true
        }
    },
    messages : {
        teamLeaderPic : {
            required : "<i class='fa fa-times-circle'></i>请添加头像"
        }
    }
});

function teamtype(e){
	$("#teamType").val(e);
}

function swal1(){
	swal("添加成功!", "队伍信息保存成功", "success");
}

var pic_layer;
function showPic(type,baby){
	if(baby==1){
		$.session.set("COCKLEBUR",1);
	}else if(baby==2){
		$.session.set("COCKLEBUR",2);
	}else if(baby==3){
		$.session.set("COCKLEBUR",3);
	}else if(baby==4){
		$.session.set("COCKLEBUR",4);
	}
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
						var COCKLEBUR = $.session.get("COCKLEBUR");
						$.session.remove("COCKLEBUR");
						if(COCKLEBUR==1){
							$('#add_pic1').attr('src',''+result.list[0].uri);
							$('#teamEmblem').val(result.list[0].uri);
						}else if(COCKLEBUR==2){
							$('#add_pic2').attr('src',''+result.list[0].uri);
							$('#teamDoctorPic').val(result.list[0].uri);
						}else if(COCKLEBUR==3){
							$('#add_pic3').attr('src',''+result.list[0].uri);
							$('#teamEthosPic').val(result.list[0].uri);
						}else if(COCKLEBUR==4){
							$('#add_pic4').attr('src',''+result.list[0].uri);
							$('#teamLeaderPic').val(result.list[0].uri);
						}
						
						
						

					}else{
						alert('图片上传失败');
					}
					layer.close(pic_layer);
						
				break;
			}
		}
	);

});


//*****************************************************************************队医确定按钮*****************************************************************************************
function btn_Doctor(){
	if(!$('#form_teamDoctor').valid()){
		lrError("请输入必填项！");
		$("#btn_D").attr("data-dismiss","");
		return;
	}else{
		$('#teamDoctor').val($('#xin1').val());
		$('#teamDoctorIdentity').val($('#xin2').val());
		$('#duiyiPic').val($('#teamDoctorPic').val());
		$("#btn_D").attr("data-dismiss","modal");
	}
}

//*****************************************************************************监督员确定按钮*****************************************************************************************
function btn_Ethos(){
	if(!$('#form_teamEthos').valid()){
		lrError("请输入必填项！");
		$("#btn_E").attr("data-dismiss","");
		return;
	}else{
		$('#teamEthos').val($('#hai1').val());
		$('#teamEthosIdentity').val($('#hai2').val());
		$('#jianduyuanPic').val($('#teamEthosPic').val());
		$("#btn_E").attr("data-dismiss","modal");
	}
}

//*****************************************************************************领队确定按钮*****************************************************************************************
function btn_Leader(){
	if(!$('#form_Leader').valid()){
		lrError("请输入必填项！");
		$("#btn_T").attr("data-dismiss","");
		return;
	}else{
		$('#teamLeader').val($('#ling1').val());
		$('#teamLeaderIdentity').val($('#ling2').val());
		$('#lingduiPic').val($('#teamLeaderPic').val());
		$("#btn_T").attr("data-dismiss","modal");
	}
}

//-------------------------------------------------信息验证---------------------------------------------------------------------------------------------------------------------------

$("#form_teamDoctor").validate({
   rules : {
	   xin2 : {
           required : true,
           isIdCardNo : true
       }
   },
   messages : {
	   xin2 : {
           required : "<i class='fa fa-times-circle'></i>请输入身份证号",
           isIdCardNo : "<i class='fa fa-times-circle'></i>请输入正确的身份证号"
       }
   }
});

$("#form_teamEthos").validate({
	   rules : {
	       hai2 : {
	           required : true,
	           isIdCardNo : true
	       }
	   },
	   messages : {
	       hai2 : {
	           required : "<i class='fa fa-times-circle'></i>请输入身份证号",
	           isIdCardNo : "<i class='fa fa-times-circle'></i>请输入正确的身份证号"
	       }
	   }
	});

$("#form_Leader").validate({
	   rules : {
	       ling2 : {
	           required : true,
	           isIdCardNo : true
	       }
	   },
	   messages : {
	       ling2 : {
	           required : "<i class='fa fa-times-circle'></i>请输入身份证号",
	           isIdCardNo : "<i class='fa fa-times-circle'></i>请输入正确的身份证号"
	       }
	   }
	});





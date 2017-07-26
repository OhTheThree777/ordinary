$(function() {
	getCodes('../../', 'company_type', 'companyType');
	
    laydate({
	    elem: '#establishmentTimes', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
	    event: 'focus' //响应事件。如果没有传入event，则按照默认的click
	});
	
});

var pic_layer;
function showPic(type) {
    pic_layer = layer.open({
        type : 1,
        title : '上传头像',
        shadeClose : true,
        shade : false,
        maxmin : true, // 开启最大化最小化按钮
        area : [ '60%', '95%' ],
        content : $('#div_pic'),
        end : function () { // 此处用于演示

        }
    });
}

swfobject.addDomLoadEvent(function () {
    // 以下两行代码正式环境下请删除
    var swf = new fullAvatarEditor(
            "fullAvatarEditor.swf",
            "expressInstall.swf",
            "swfContainer",
		{
			id : 'swf',
			upload_url : '../../common/upload/upPic.json', // 上传接口
			method : 'post', // 传递到上传接口中的查询参数的提交方式。更改该值时，请注意更改上传接口中的查询参数的接收方式
			src_upload : 2, // 是否上传原图片的选项，有以下值：0-不上传；1-上传；2-显示复选框由用户选择
			avatar_box_border_width : 0,
			width : 600, // flash文件的宽度
			height : 430,
			expressInstall : '../../js/plugins/fullavatareditor/expressInstall.swf',
			file : '../../js/plugins/fullavatareditor/fullAvatarEditor.swf',
			avatar_sizes : '100*100',
			avatar_sizes_desc : '100*100像素'
	    },
		function (msg) {
		    switch (msg.code) {
		    case 1:
		        break;
		    case 2:
		        // alert("已成功加载图片到编辑面板。");
		        document.getElementById("upload").style.display = "inline";
		        break;
		    case 3:
		        if (msg.type == 0) {
		            //alert("摄像头已准备就绪且用户已允许使用。");
		        } else if (msg.type == 1) {
		            alert("摄像头已准备就绪但用户未允许使用！");
		        } else {
		            alert("摄像头被占用！");
		        }
		        break;
		    case 5:
		        var result = eval(msg.content);
		        if (result.status == "1") {
		            $('#add_pic').attr('src', result.list[0].uri);
		            // $('#update_pic').attr('src',''+result.list[0].uri);
		
		            $('#headportraitsq').val(result.list[0].uri);
		
		            // $('#update_hid_team_emblem').val(result.list[0].uri);
		        } else {
		            alert('图片上传失败');
		        }
		        layer.close(pic_layer);
		
		        break;
		    }
		}
	);
});

//--------------------------------------------------------表单验证----------------------------------------------------------------
$('#formSponsor').validate({
   ignore: [],
   rules : {
       headportrait : {
           required : true
       },
       name : {
           required : true,
           minlength : 2
       },
//       creditCode : {
//           required : true
//       },
       type : {
           min : 1
       },
       userName : {
       		required : true,
            isNumAndEn : true,
            minlength : 2
       },
       userPass : {
       		required : true
       },
       contacts : {
           required : true,
           minlength : 2
       },
       establishmentTime : {
           required : true
       },
       phone : {
           required : true,
           isMobile : true
       },
       captcha : {
           required : true
       },
       tels : {
    	   required :true,
       	   isTel : true
       }
   },
   messages : {
       headportrait : {
           required : "<i class='fa fa-times-circle'></i>请添加头像"
       },
       name : {
           required : "<i class='fa fa-times-circle'></i>请输入主办方(单位名称)",
           minlength : "<i class='fa fa-times-circle'></i>主办方(单位名称)必需最少由两个字母组成"
       },
//       creditCode : {
//           required : "<i class='fa fa-times-circle'></i>请输入社会信用代码"
//       },
       type : {
           min : "<i class='fa fa-times-circle'></i>请选择主办类型"
       },
       userName : {
       		required : "<i class='fa fa-times-circle'></i>请输入用户名",
            username : "<i class='fa fa-times-circle'></i>用户名必需由数字+字母组成",
            minlength : "<i class='fa fa-times-circle'></i>用户名必需由两个字母组成"
       },
       userPass : {
       		required : "<i class='fa fa-times-circle'></i>请输入密码"
       },
       contacts : {
           required : "<i class='fa fa-times-circle'></i>请输入联系人姓名",
           minlength : ""
       },
       establishmentTime : {
           required : "<i class='fa fa-times-circle'></i>成立时间"
       },
       phone : {
           required : "<i class='fa fa-times-circle'></i>请输入联系人电话",
           isMobile : "<i class='fa fa-times-circle'></i>请输入正确的手机号码"
       },
       captcha : {
           required : "<i class='fa fa-times-circle'></i>请输入手机验证码"
       },
       tels : {
    	   required : "<i class='fa fa-times-circle'></i>请输入座机号码",
       	   isTel : "<i class='fa fa-times-circle'></i>请输入正确的座机号码"
       }
   }
});

$("#sendCaptcha").click(function() {
	var phone = $("#phonesq").val();
	if ($("#phonesq").val() == "" ) {
        lrError("请输入手机号！");
        countdown = 0;
    } else {
    	 var index = layer.load(0, {
 	        shade : false
 	    });
        var mobile = /^1[34578]\d{9}$/;
        if ($("#phonesq").val().length != 11 && !mobile.test($("#phonesq").val())) {
            lrError("请输入正确的手机号！");
            countdown = 0;
        } else {
			$.ajax({
				url : '../../userAction/sendCaptcha.json',
				type : 'POST',
				async : true,
				cache : false,
		    	dataType : "json",
				data : {phone : phone},
				success : function(data) {
					if (data.status == 1) {
						swal({
			                title : "发送验证码!",
			                text : "您的验证码已发送！请注意查收",
			                type : "info",
			                confirmButtonText : "确定"
			            });
						layer.close(index);
					} else {
						swal({
			                title : "发送验证码!",
			                text : data.msg,
			                type : "error",
			                confirmButtonText : "确定"
			            });
						layer.close(index);
					}
				},
				error : function() {
					lrError("用户信息获取失败！请重新登录！");
				}
			});
        }
    }
});
    
$("#sendTel").click(function() {
	$('#input_tel').append($('#div_tel').clone());
});

function addSponsor() {
	if (!$('#formSponsor').valid()) {
        lrError("请输入必填项！");
        return;
    }
	if(!ue.hasContents()){
		lrError("请输入主办方介绍！");
		return;
	}
	var telephoneRule = /^(0\d{2,3}-?\d{7,8})|(4\d{2}-?\d{3}-?\d{4})$/;//固定电话
	if(!telephoneRule.test($("#tels").val())){
		lrError("请输入正确的座机！");
        return;
	}
    var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        url : '../../ssSponsorController/eqUser.json',
        dataType : 'json',
        data : $("#formSponsor").serialize(),
        success : function (date) {
            layer.close(index);
            if (date.status == '0') {
                lrError(date.msg);
            } else {
				$.ajax({
					url : '../../ssSponsorController/addSponsor.json',
					type : 'POST',
			    	dataType : "json",
					data : $("#formSponsor").serialize(),
			        success : function(data) {
			        	if (data.status == '1') {
							layer.close(index);
							if ("1" == data.data.obj.userJob) {
								window.location.href = "../../consoleTabs.html";
							} else {
								$.session.set("setFlag", "5");//主办方
								window.location.href = "../../main";
							}
						} else {
							lrError(date.msg);
						}
			            layer.close(index);
			        },
			        error : function() {
			            layer.close(index);
			            lrError("添加失败！服务器错误！");
			        }
				});
            }
        },
        error : function (data) {
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
}

var ue = UE.getEditor('introduces');
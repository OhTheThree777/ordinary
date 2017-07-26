$(function(){
	$.ajax({
		url : 'userAction/loginUser.json',
		type : 'POST',
		async : true,
		cache : false,
		success : function(data) {
			if (data.data.obj == undefined) {
				switch(data.data.map.type) {
					case 1:// QQ
						$("#uid").val(data.data.map.openid);
						$("#uname").val(data.data.map.nickname);
						$("#portrait").val(data.data.map.headimgurl);
						$("#nickname").val(data.data.map.nickname);
						break;
					case 2:// 微信
						$("#uid").val(data.data.map.unionidNew);
						$("#uname").val(data.data.map.nickname);
						$("#portrait").val(data.data.map.headimgurl);
						$("#nickname").val(data.data.map.nickname);
						break;
					case 3:// 新浪微博
						$("#uid").val(data.data.map.uid);
						$("#uname").val(data.data.map.name);
						$("#portrait").val(data.data.map.avatar_large);
						$("#nickname").val(data.data.map.screen_name);
						break;
					case 4:// 百度
						$("#uid").val(data.data.map.uid);
						$("#uname").val(data.data.map.uname);
						$("#portrait").val(data.data.map.portrait);
						$("#nickname").val(data.data.map.nickname);
						break;
				}
			} else {
				$("body").empty();
				if (data.status == '1') {
					$.cookie("user_id",data.data.obj.pid);
					if("1"==data.data.obj.userJob){
						window.location.href = "consoleTabs.html";
					}else{
					    if (data.data.personFlag == "4") {
                            $.session.set("setFlag", "4");//球队管理者
                        } else if (data.data.personFlag == "5") {
                            window.location.href="web/ss/sponsor_user.html";
                        } else if (data.data.personFlag == "-1") {
                            $.session.set("head_portrait", data.data.obj.headPortrait);
                            $.session.set("user_name", data.data.obj.nickname);
                            window.location.href="web/index/career-info.html";
                        } else {
                            window.location.href="main";
                        }
					}
				} else {
					lrError(data.msg);
				}
			}
		},
		error : function() {
			lrError("用户信息获取失败！请重新登录！");
		}
	});

	$("#form_binding_user").validate({
		rules : {
		    personFlag : {
		        required : true
		    },
		    userPass : {
                required : true
            },
			phone : {
				required : true,
				isMobile : true
			},
			captcha : {
				required : true
			}
		},
		messages : {
            personFlag : {
                required : "<i class='fa fa-times-circle'></i>&nbsp;请选择职业"
            },
            userPass : {
                required : "<i class='fa fa-times-circle'></i>&nbsp;请输入密码"
            },
			phone : {
				required : "<i class='fa fa-times-circle'></i>&nbsp;请输入手机号",
				isMobile : "<i class='fa fa-times-circle'></i>&nbsp;请输入正确的手机号码"
			},
			captcha : {
				required : "<i class='fa fa-times-circle'></i>&nbsp;请输入验证码"
			}
		}
	});
	
	$("#btn_reg_user").click(function() {
		if (!$('#form_binding_user').valid()) {
			lrError("请输入必填项！");
			return;
		}
		var index = layer.load(0, {
	        shade : false
		});
		$.ajax({
			type : "POST",
			url : "userAction/regPhoneUser.json",
			dataType : "json",
			data : $("#form_binding_user").serialize(),
			success : function (data) {
				layer.close(index);
				if (data.status == '1') {
					$.cookie("user_id",data.data.obj.pid);
					if("1"==data.data.obj.userJob){
						window.location.href = "consoleTabs.html";
					}else{
						if (data.data.personFlag == "4") {
						    $.session.set("setFlag", "4");//球队管理者
                            window.location.href="main";
						} else if (data.data.personFlag == "5") {
						    window.location.href="web/ss/sponsor_user.html";
						} else if (data.data.personFlag == "-1") {
						    $.session.set("head_portrait", data.data.obj.headPortrait);
                            $.session.set("user_name", data.data.obj.nickname);
						    window.location.href="web/index/career-info.html";
						} else {
						    window.location.href="main";
						}
					}
				} else {
					lrError(data.msg);
				}
			},
			error : function() {
				layer.close(index);
				lrError("用户信息获取失败！请重新登录！");
			}
		});
	});
});

function sendCaptcha() {
	var phone = $("#phone").val();
	$.ajax({
		url : 'userAction/sendCaptcha.json',
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
			} else {
				swal({
	                title : "发送验证码!",
	                text : data.msg,
	                type : "error",
	                confirmButtonText : "确定"
	            });
			}
		},
		error : function() {
			lrError("用户信息获取失败！请重新登录！");
		}
	});
}

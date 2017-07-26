$(function () {
    $('#btn_reg_user').click(
            function () {
                if (!$('#form_reg_user').valid()) {
                    lrError("请输入必填项！");
                    return;
                }
                var index = layer.load(0, {
                    shade : false
                });
                $.ajax({
                    url : 'userAction/eqUser.json',
                    dataType : 'json',
                    data : $("#form_reg_user").serialize(),
                    success : function (date) {
                        layer.close(index);
                        if (date.status == '0') {
                            lrError(date.msg);
                        } else {
                        	$('#btn_reg_user').html("注册中");
                            $.ajax({
                                type : "POST",
                                url : "userAction/regUser.json",
                                dataType : "json",
                                data : $("#form_reg_user").serialize(),
                                success : function (data) {
                                    if (data.status == '1') {
                                        swal({
                                            title : "注册成功!",
                                            text : "用户信息注册成功!",
                                            type : "success",
                                            confirmButtonText : "确定"
                                        }, function () {
                                        	$('#btn_reg_user').html("跳转中");
                                            login(data.data.obj.loginname,
                                                    data.data.obj.pwdtext, index);
                                        });
                                    } else {
                                    	$('#btn_reg_user').html("提交");
                                        swal({
                                            title : "注册失败!",
                                            text : "用户信息注册失败!",
                                            type : "error",
                                            confirmButtonText : "确定"
                                        });

                                        layer.close(index);
                                    }

                                },
                                error : function () {
                                	$('#btn_reg_user').html("提交");
                                    layer.close(index);
                                    lrError("添加失败！服务器错误！");
                                }
                            });
                        }
                    },
                    error : function () {
                        layer.close(index);
                        lrError("添加失败！服务器错误！");
                    }
                });
            });
});
// 登录操作
var currentUser = null;
function login(name, password, index) {
    // 处理按回车多次请求服务器的问题。
    $.ajax({
        url : 'login.json',
        data : {
            "username" : name,
            "password" : password
        },
        dataType : 'json',
        beforeSend : function (d) {

        },
        success : function (date) {
            if (date.status == '1') {
                layer.close(index);
                if ("1" == date.data.obj.userJob) {
                    window.location.href = "consoleTabs.html";
                } else if ("0" == date.data.obj.isJob){
					window.location.href = "web/index/career-info.html";
                } else {
                    window.location.href = "main";
                }
            } else {
                lrError(date.msg);
            }
            layer.close(index);
        }
    });

}

$("#form_reg_user").validate({
    rules : {
//        loginname : {
//            required : true,
//            isNumAndEn : true,
//            minlength : 2
//        },
        pwdtext : {
            required : true,
            minlength : 5
        },
        confirm_password : {
            required : true,
            minlength : 5,
            equalTo : "#pwdtext"
        },
        agree : "required",
        phoneno : {
            required : true,
            isMobile : true,
        }
    },
    messages : {
//        loginname : {
//            required : "<i class='fa fa-times-circle'></i>请输入用户名",
//            username : "<i class='fa fa-times-circle'></i>用户名必需由数字+字母组成",
//            minlength : "<i class='fa fa-times-circle'></i>用户名必需由两个字母组成"
//        },
        pwdtext : {
            required : "<i class='fa fa-times-circle'></i>请输入密码",
            minlength : "<i class='fa fa-times-circle'></i>密码长度不能小于 5 个字母"
        },
        phoneno : {
            required : "<i class='fa fa-times-circle'></i>请输入手机号码",
            isMobile : "<i class='fa fa-times-circle'></i>手机号码不符合规则！"
        },
        confirm_password : {
            required : "<i class='fa fa-times-circle'></i>请输入密码",
            minlength : "<i class='fa fa-times-circle'></i>密码长度不能小于 5 个字母",
            equalTo : "<i class='fa fa-times-circle'></i>两次密码输入不一致"
        },
        agree : "<i class='fa fa-times-circle'></i>请接受我们的声明"
    }
    
});

var countdown = 60;
function settime(obj) {
    if ($("#phoneno").val() == "" ) {
        lrError("请输入手机号！");
        countdown = 0;
    } else {
        var mobile = /^1[34578]\d{9}$/;
        if ($("#phoneno").val().length != 11 || !mobile.test($("#phoneno").val())) {
            lrError("请输入正确的手机号！");
            countdown = 0;
        } else {
        	if (countdown == 60) {
        	$.ajax({
        		url : 'userAction/eqPhone.json',
        		type : 'POST',
        		async : true,
        		cache : false,
            	dataType : "json",
        		data : {'phoneno' : $("#phoneno").val()},
        		success : function(data) {
        			if (data.status == 1) {
        				sendCaptcha();
        			} else {
        				swal({
        	                title : "发送失败!",
        	                text : data.msg,
        	                type : "error",
        	                confirmButtonText : "确定"
        	            });
        				countdown = 0;
        			}
        		},
        		error : function() {
        			lrError("用户信息获取失败！请重新登录！");
        			countdown = 0;
        		}
        	});
          }
        }
    }
    if (countdown == 0) {
        obj.removeAttribute("disabled");
        $(".vcode-btn").css('color', '#0e90d2');
        obj.value = "重新获取验证码";
        countdown = 60;
        return;
    } else {
        obj.setAttribute("disabled", true);
        $(".vcode-btn").css('color', '#CCCCCC');
        obj.value = "重新获取" + countdown + "秒后";
        countdown--;
    }
    setTimeout(function () {
        settime(obj)
    }, 1000)
} 

function sendCaptcha() {
	var phone = $("#phoneno").val();
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

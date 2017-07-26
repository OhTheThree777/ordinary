$(function(){
//-----------------------------------------------------------下一步---------------------------------------------------------------------------------------------
	$("#btn_retrieve_pwd").click(function(){
		 if (!$('#form_retrieve_pwd').valid()) {
             lrError("请输入必填项！");
             return;
         }
			$.ajax({
				url : 'userAction/retrievePwd.json',
				type : 'POST',
				async : true,
				cache : false,
		    	dataType : "json",
				data : $('#form_retrieve_pwd').serialize(),
				success : function(data) {
					if (data.status == 1) {
						 $("#phonee").val( $("#phoneno").val());
						 $("#ret_pwd>form").eq(1).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
					} else {
						swal({
			                title : "错误信息",
			                text : data.msg,
			                type : "error",
			                confirmButtonText : "确定"
			            });
					}
				},
				error : function() {
					lrError("服务器异常！");
				}
			});
	});
	//------------------------------------------------------------提交---------------------------------------------------------------------------------------------	
	$("#btn_retrieve_pwd2").click(function(){
		if (!$('#form_retrieve_pwd2').valid()) {
            lrError("请输入必填项！");
            return;
        }
		
		$.ajax({
			url : 'userAction/amendPwd.json',
			type : 'POST',
			async : true,
			cache : false,
	    	dataType : "json",
			data : $('#form_retrieve_pwd2').serialize(),
			success : function(data) {
				if (data.status == 1) {
					swal({
		                title : "修改成功",
		                type : "success",
		                confirmButtonText : "确定"
		            },function(){
		            	 window.location.href ='userAction/logout';
		            });
				} else {
					swal({
		                title : "修改失败",
		                text : data.msg,
		                type : "error",
		                confirmButtonText : "确定"
		            });
				}
			},
			error : function() {
				lrError("服务器异常！");
			}
		});
	});
});
//-----------------------------------------------------------发送验证码---------------------------------------------------------------------------------------------
var countdown = 60;
function settime(obj) {
    if ($("#phoneno").val() == "" ) {
        lrError("请输入手机号！");
        countdown = 0;
    } else {
        var mobile = /^1[34578]\d{9}$/;
        if ($("#phoneno").val().length != 11 && !mobile.test($("#phoneno").val())) {
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
    				data : $('#form_retrieve_pwd').serialize(),
    				success : function(data) {
    					if (data.status == 1) {
    						swal({
    			                title : "错误信息",
    			                text : data.msg,
    			                type : "error",
    			                confirmButtonText : "确定"
    			            });
    						 
    					} else {
    						sendCaptcha();
    					}
    				},
    				error : function() {
    					lrError("服务器异常！");
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
        $(".vcode-btn").css('color', 'red');
        obj.value = "稍后重新发送(" + countdown + ")";
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
//-----------------------------------------------------------表单验证---------------------------------------------------------------------------------------------
$("#form_retrieve_pwd").validate({
    rules : {
        captcha : {
            required : true,
            minlength : 6
        },
        phoneno : {
            required : true,
            isMobile : true,
        }
    },
    messages : {
        captcha : {
            required : "<i class='fa fa-times-circle'></i>请输入验证码",
            minlength : "<i class='fa fa-times-circle'></i>密码长度不正确"
        },
        phoneno : {
            required : "<i class='fa fa-times-circle'></i>请输入手机号码",
            isMobile : "<i class='fa fa-times-circle'></i>手机号码不符合规则！"
        },
    }
    
});

$("#form_retrieve_pwd2").validate({
    rules : {
        pwdtext : {
            required : true,
            minlength : 5
        },
        confirm_password : {
            required : true,
            minlength : 5,
            equalTo : "#pwdtext"
        },
    },
    messages : {
        pwdtext : {
            required : "<i class='fa fa-times-circle'></i>请输入密码",
            minlength : "<i class='fa fa-times-circle'></i>密码长度不能小于 5 个字母"
        },
        confirm_password : {
            required : "<i class='fa fa-times-circle'></i>请输入密码",
            minlength : "<i class='fa fa-times-circle'></i>密码长度不能小于 5 个字母",
            equalTo : "<i class='fa fa-times-circle'></i>两次密码输入不一致"
        },
    }
    
});


$(function() {
	getCodes('../../', 'company_type', 'companyType');
	
	var index_a = layer.load(0, {
		shade : false
	});
	$.ajax({
		url:'../../ssSponsorController/findSponsorByUserId.json',
		type:"post",
		async:true,
		cache:false,
		dataType:"json",
		success : function(data) {
			if(data.data.obj == undefined) {
				add();
			} else {
				bindDiv("div_sponsor", data.data.obj);
				var Str = "";
				
				if (data.data.obj.type != "") {
					$("#types").append(getCodeKey('../../','company_type',data.data.obj.type));
				}
				
				if (data.data.obj.approvalFlag == 0) {
					Str = Str + '<div class="Typeface pull-right yz_bg3"><i class="iconfont icon-yinzhang"></i><span>待审批</span></div>';
				} else if (data.data.obj.approvalFlag == 1) {
					Str = Str + '<div class="Typeface pull-right yz_bg2"><i class="iconfont icon-yinzhang"></i><span>审批通过</span></div>';
				} else if (data.data.obj.approvalFlag == 2) {
					Str = Str + '<div class="Typeface pull-right yz_bg1"><i class="iconfont icon-yinzhang"></i><span>审批驳回</span></div>';
				}
				$("#approvalFlag").append(Str);
				layer.close(index_a);
			}
		},
		error : function() {
			layer.close(index_a);
			lrError("授权失败！服务器错误！");
		}
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
		            // $('#update_pic').attr('src','../../../../'+result.list[0].uri);
		
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
		// creditCode : {
		// required : true
		// },
		username : {
			required : true,
			isNumAndEn : true,
			minlength : 2
		},
		type : {
			min : 1
		},
		contacts : {
			required : true,
			minlength : 2
		},
		establishmentTime : {
			required : true
		},
		tels : {
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
		// creditCode : {
		// required : "<i class='fa fa-times-circle'></i>请输入社会信用代码"
		// },
		username : {
			required : "<i class='fa fa-times-circle'></i>请输入用户名",
			username : "<i class='fa fa-times-circle'></i>用户名必需由数字+字母组成",
			minlength : "<i class='fa fa-times-circle'></i>用户名必需由两个字母组成"
		},
		type : {
			min : "<i class='fa fa-times-circle'></i>请选择主办类型"
		},
		contacts : {
			required : "<i class='fa fa-times-circle'></i>请输入联系人姓名",
			minlength : ""
		},
		establishmentTime : {
			required : "<i class='fa fa-times-circle'></i>成立时间"
		},
		tels : {
			isTel : "<i class='fa fa-times-circle'></i>请输入正确的座机号码"
		}
	}
});

function editInit() {
	swal({// 弹出提示框提示用户是否确认删除
		title : "确定要修改信息吗？",
		text : "修改信息后需要重新审核后才可再次创建赛事",
		type : "warning",
		showCancelButton : true,
		confirmButtonColor : "#DD6B55",
		confirmButtonText : "确定",
		cancelButtonText : "取消",
		closeOnConfirm : false,
		closeOnCancel : true
    }, function(isConfirm) {
		if (isConfirm) {
			swal.close();
			var index = layer.load(0, {
				shade : false
			});
			$.ajax({
				url : '../../ssSponsorController/checkJurisdiction.json',
				type : 'POST',
				success : function (data) {
					layer.close(index);
					bindForm('formSponsor', data.data.obj);
					if (data.data.obj.headportrait != undefined) {
						$("#add_pic").attr('src', data.data.obj.headportrait);
					}
					var ue = UE.getEditor('introduces');
					if (data.data.obj.introduce != undefined) {
						ue.ready(function() {
							ue.setContent(data.data.obj.introduce);
						});
					}
					var index_main = layer.open({
						type : 1,
						title : '主办方修改',
						shadeClose : false,
						shade : [0.8, '#393D49'],
						maxmin : false, // 开启最大化最小化按钮
						area : ['95%', '95%'],
						content : $('#div_editSponsor'),
						end : function() { // 此处用于演示
							// swal("添加成功!", "信息保存成功", "success");
						}
					});
					
					$('#btn_edit_close').click(function() {
						layer.close(index_main);
					});
				},
				error : function(data){
					layer.close(index);
					lrError("获取数据失败！服务器错误！");
				}
			});
		}
    });
}

$("#sendCaptcha").click(function() {
	var phone = $("#phonesq").val();
	if ($("#phonesq").val() == "" ) {
        lrError("请输入手机号！");
        countdown = 0;
    } else {
        var mobile = /^1[34578]\d{9}$/;
        if ($("#phonesq").val().length != 11 && !mobile.test($("#phonesq").val())) {
            lrError("请输入正确的手机号！");
            countdown = 0;
        } else {
            var index = layer.load(0, {
                shade : false
            });
			$.ajax({
				url : '../../userAction/sendCaptcha.json',
				type : 'POST',
				async : true,
				cache : false,
		    	dataType : "json",
				data : {phone : phone},
				success : function(data) {
		            layer.close(index);
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
		            layer.close(index);
					lrError("用户信息获取失败！请重新登录！");
				}
			});
        }
    }
});
    
$("#sendTel").click(function() {
	$('#input_tel').append($('#div_tel').clone());
});

function editSponsor() {
	if (!$('#formSponsor').valid()) {
        lrError("请输入必填项！");
        return;
    }
    var index = layer.load(0, {
        shade : false
    });
	$.ajax({
		url : '../../ssSponsorController/editSponsor.json',
		type : 'POST',
    	dataType : "json",
		data : $("#formSponsor").serialize(),
        success : function(data) {
            layer.close(index);
            swal({
				title : "修改成功!",
				text : "信息修改成功",
				type : "success",
				confirmButtonText : "确定"
			}, function () {
				window.location.href="sponsor_main.html";
				layer.closeAll('page');
			});
		},
        error : function() {
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
	});
}

function competition_manage() {
	window.location.href="../../web/ss/sponsor_homepage_new.html";
}
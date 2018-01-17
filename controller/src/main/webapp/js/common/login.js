//-------------------------- 分割线 --------------------------

$(function() {

	$('#e_loading').fadeOut('slow');
	
	document.onkeydown = function(e) {
		var ev = document.all ? window.event : e;
		if (ev.keyCode == 13) {
			login();

		}
	}
	

});

// -------------------------- 分割线 --------------------------

// 刷新验证码
function refreshVCI() {
	$("#exe-VCI-img").prop({
		'src' : "../global/validateCode.jpeg?random=" + Math.random()
	});
}

// 登录操作
var currentUser = null;
function login() {
	// 处理按回车多次请求服务器的问题。
	$.ajax({
		url : 'login.json',
		data : $('#login').serialize(),
		dataType : 'json',
		beforeSend : function(d) {
			$('#exe-logininfo-div').text('正在登录系统，请稍候...');
		},
		success : function(date) {
			if (date.status == '1') {
				$('#exe-logininfo-div').text('登录成功！');
				currentUser = date.data.obj;
				loginSuccessful();
			} else {
				$('#exe-logininfo-div').text(date.msg);
			}
		}
	});

}

function loginSuccessful() {
	// 显示上方 用户欢迎信息
	$('#e_currentuser_info')
			.text('你好：' + currentUser.username + '。 正在进入系统中，请稍等...');

	// 隐藏 登录 模块
	$('#e_platform_page').fadeIn('slow');
	// 跳转页面
	// location.reload('console_I.html');
	// if("1"==currentUser.userJob){
		window.location.href = "consoleTabs.html";
	// }else{
	// 	window.location.href = "main";
	// }
	$('middle-box text-center loginscreen  animated fadeInDown')
			.fadeOut('slow');

}

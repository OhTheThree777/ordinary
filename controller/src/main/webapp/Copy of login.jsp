<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<meta name="renderer" content="webkit">

<title>蓝睿UI框架 - 登录</title>
<meta name="keywords" content="">
<meta name="description" content="">
<link href="css/plugins/bootstrap.min.css" rel="stylesheet">
<link href="css/plugins/font-awesome.min93e3.css?v=4.4.0"
	rel="stylesheet">
<link href="css/plugins/animate.min.css" rel="stylesheet">
<link href="css/plugins/style.min.css" rel="stylesheet">
<link href="css/plugins/login.min.css" rel="stylesheet">
<!--[if lt IE 9]>
    <meta http-equiv="refresh" content="0;ie.html" />
    <![endif]-->
<script>
	if (window.top !== window.self) {
		window.top.location = window.location
	};
</script>
</head>
<body class="signin">
	<div class="signinpanel">
		<div class="row">
			<div class="col-sm-7">
				<div class="signin-info">
					<div class="logopanel m-b">
						<h1>[ LR ]</h1>
					</div>
					<div class="m-b"></div>
					<h4>
						欢迎使用 <strong></strong>
					</h4>
					<ul class="m-b">
						<li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势一</li>
						<li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势二</li>
						<li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势三</li>
						<li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势四</li>
						<li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势五</li>
					</ul>
					<strong>还没有账号？ <a href="#">立即注册&raquo;</a></strong>
				</div>
			</div>
			<div class="col-sm-5">
				<form id="login" method="post" action="login.json">
					<h4 class="no-margins">登录：</h4>
					<p class="m-t-md">登录到蓝睿UI框架</p>
					<input name="username" type="text" class="form-control uname"
						placeholder="用户名" /> <input name="password" type="password"
						class="form-control pword m-b" placeholder="密码" /> <a href="#">忘记密码了？</a>
					<button class="btn btn-success btn-block" type="button" onclick="login()">登录</button>
					<div id="exe-logininfo-div"
						style="position: relative; width: 240px; margin: 9px 0; padding-left: 10px; color: red; font-size: 13px; line-height: 15px;">
						<!-- 用户名或密码错误！ -->
					</div>
				</form>
			</div>
		</div>
		<div class="signup-footer">
			<div class="pull-left">&copy; 2015 All Rights Reserved. Lr</div>
		</div>
	</div>
	<!-- 平台信息页  -->
	<div id="e_platform_page"
		style="position: absolute; width: 100%; height: 100%; font-family: arial, 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif; display: none;">
		<!-- <div style="left: 0px; height: 50px; font-size: 30px; line-height: 50px; position: absolute; right: 0px; font-weight: bold; text-align: center; top: 30px;">内蒙古自治区人口和计划生育委员会人口信息管理平台</div> -->
		<!-- 用户信息图标 -->
		<div id="e_currentuser_info" title="用户信息"
			style="position: absolute; width: 600px; height: 30px; left: 20px; top: 50px;">

		</div>
		<!-- 退出按钮 -->
		<!-- <a id="e_exit" class="aMg_exit"></a> -->

	</div>

	<div id="e_loading"
		style="background-color: #FFFFFF; position: fixed; top: 0; left: 0; right: 0; bottom: 0;">
		正在努力加载中，请稍后...</div>


	<script src="js/plugins/jquery.min.js?v=2.1.4"></script>
	<script src="js/plugins/bootstrap.min.js?v=3.3.6"></script>

	<script type="text/javascript" src="js/common/login.js"></script>
</body>

</html>
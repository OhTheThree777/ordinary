<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>


<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">


<title>蓝睿UI框架 - 500错误</title>
<meta name="keywords" content="">
<meta name="description" content="">

<link rel="shortcut icon" href="favicon.ico">
<link href="<%=basePath %>css/plugins/bootstrap.min14ed.css?v=3.3.6" rel="stylesheet">
<link href="<%=basePath %>css/plugins/font-awesome.min93e3.css?v=4.4.0"
	rel="stylesheet">

<link href="<%=basePath %>css/plugins/animate.min.css" rel="stylesheet">
<link href="<%=basePath %>css/plugins/style.min862f.css?v=4.1.0" rel="stylesheet">

</head>

<body class="gray-bg">
	<div class="middle-box text-center animated fadeInDown">
		<h1>500</h1>
		<h3 class="font-bold">服务器内部错误</h3>

		<div class="error-desc">
			服务器好像出错了... <br />您可以返回主页看看 <br /> <a href="index.html"
				class="btn btn-primary m-t">主页</a>
		</div>
	</div>
	<script src="<%=basePath %>js/plugins/jquery.min.js?v=2.1.4"></script>
	<script src="<%=basePath %>js/plugins/bootstrap.min.js?v=3.3.6"></script>
</body>
</html>

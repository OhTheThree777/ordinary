<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>


<!-- Mirrored from www.zi-han.net/theme/hplus/404.html by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 20 Jan 2016 14:19:52 GMT -->
<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">


<title>内蒙古体彩信息管理系统 - 404 页面</title>
<meta name="keywords" content="">
<meta name="description" content="">

<link rel="shortcut icon" href="favicon.ico">
<link href="<%=basePath%>css/plugins/bootstrap.min14ed.css?v=3.3.6"
	rel="stylesheet">
<link href="<%=basePath%>css/plugins/font-awesome.min93e3.css?v=4.4.0"
	rel="stylesheet">

<link href="<%=basePath%>css/plugins/animate.min.css" rel="stylesheet">
<link href="<%=basePath%>css/plugins/style.min862f.css?v=4.1.0"
	rel="stylesheet">

</head>

<body class="gray-bg">
	<div class="middle-box text-center animated fadeInDown">
		<h1>404</h1>
		<h3 class="font-bold">页面未找到！</h3>

		<div class="error-desc">
			抱歉，页面好像去火星了~
			<form class="form-inline m-t" role="form">
				<div class="form-group">
					<input type="email" class="form-control"
						placeholder="请输入您需要查找的内容 …">
				</div>
				<button type="submit" class="btn btn-primary">搜索</button>
			</form>
		</div>
	</div>
	<script src="<%=basePath%>js/plugins//jquery.min.js?v=2.1.4"></script>
	<script src="<%=basePath%>js/plugins/bootstrap.min.js?v=3.3.6"></script>

</body>


<!-- Mirrored from www.zi-han.net/theme/hplus/404.html by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 20 Jan 2016 14:19:52 GMT -->
</html>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
<meta name="viewport"
	content="width=device-width,initial-scale=1,user-scalable=0">
<meta name="renderer" content="webkit">

<link href="../css/plugins/wechar/weui.min.css" rel="stylesheet">
<script type="text/javascript"
	src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<title>蓝睿在线报名支付</title>
<script type="text/javascript">
	/*
	wx.config({
		debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId : '${appId}', // 必填，公众号的唯一标识
		timestamp : '${sign.timeStamp}', // 必填，生成签名的时间戳
		nonceStr : '${sign.nonceStr}', // 必填，生成签名的随机串
		signature : '${sign.signature}',// 必填，签名，见附录1
		jsApiList : [ 'WeixinJSBridge' ]// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	
	});
	wx.ready(function() {
		
	});
	
	trigger: function (res) {  
	    alert('用户点击发送给朋友');  
	},  
	success: function () {   
	    alert(1);  
	},  
	cancel: function () {   
	    alert(2);  
	},  
	fail: function (res) {  
	    alert(JSON.stringify(res));  
	}  
	wx.error(function(res){  
	    alert(JSON.stringify(res));  
	}); 
	*/
	function jspay123() {
		//var openid = "${openid}";
		//alert(openid);
		var str = window.navigator.userAgent;
		var version = str.substring(8, 11);
		if (version != "5.0") {
			alert("微信浏览器系统版本过低，请将微信升级至5.0以上");
		} else {
			
			WeixinJSBridge.invoke('getBrandWCPayRequest', {
				"appId" : "${appId}", //公众号名称，由商户传入
				"timeStamp" : "${timeStamp}", //时间戳
				"nonceStr" : "${nonceStr}", //随机串
				"package" : "${wxPackage}",//统一支付接口返回的prepay_id 参数值，提交格式如：prepay_id=***
				"signType" : "${signType}", //微信签名方式:sha1
				"paySign" : "${paySign}" //微信签名
			}, function(res) {
				// get_brand_wcpay_request:cancel 用户取消
				// get_brand_wcpay_request:fail 发送失败
				// get_brand_wcpay_request:ok //发送成功
				// WeixinJSBridge.log(res.err_msg);alert(res);
				//alert(res.err_code + res.err_desc);
				//alert(res.err_msg);
				if (res.err_msg == "get_brand_wcpay_request:ok") {
					
				} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
					alert("取消支付");
				} else if (res.err_msg == "get_brand_wcpay_request:fail") {
					alert("支付失败");
				}
			});

		}

	}
</script>
</head>
<body style="background: #f5f5f5">

	<div class="page">
		<div class="weui_icon_area" align="center">
			<i class="weui_icon_info weui_icon_msg"></i>
		</div>
		<div class="hd">
			<h1 class="page_title" align="center">￥${payMoney*0.01}元</h1>
		</div>

		<div class="bd">
			<div class="weui_cells_title">支付说明</div>
			<div class="weui_cells">
				<div class="weui_cell">
					<div class="weui_cell_bd weui_cell_primary">
						<p>收款方</p>
					</div>
					<div class="weui_cell_ft">蓝睿科普在线</div>
				</div>
			</div>
			<div class="weui_cells">
				<div class="weui_cell">
					<div class="weui_cell_bd weui_cell_primary">
						<p>商 品</p>
					</div>
					<div class="weui_cell_ft">活动报名费用</div>
				</div>
			</div>

		</div>
		<div class="weui_opr_area">
			<p class="weui_btn_area">
				<a class="weui_btn weui_btn_primary" onclick="jspay123();">立即支付</a>
			</p>
		</div>
	</div>

	<script src="../css/plugins/wechar/zepto.min.js"></script>
</body>
</html>

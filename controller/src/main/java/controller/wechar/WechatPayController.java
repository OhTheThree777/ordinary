package controller.wechar;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Enumeration;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import common.model.ResponseModelJqGrid;
import common.util.SysConstants;
import controller.wechar.util.*;
import org.jdom.JDOMException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import com.alibaba.fastjson.JSONObject;

/**
 * 微信支付
 * http://lrkpzx.tunnel.qydev.com/lr_webSystem/oAuth2/getCode?resultUrl=../app
 * /sign_up.html
 * 
 * @author imisi
 *
 */
@Controller
@RequestMapping("/wecharPay")
public class WechatPayController {
	// 统一下单地址

	private static final Logger log = LoggerFactory
			.getLogger(WechatPayController.class);

	private String oAuth2Url(String appid, String redirect_uri) {
		try {
			redirect_uri = java.net.URLEncoder.encode(redirect_uri, "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		String oauth2Url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
				+ appid
				+ "&redirect_uri="
				+ redirect_uri
				+ "&response_type=code&scope=snsapi_base&state=sunlight#wechat_redirect";
		System.out.println("oauth2Url=" + oauth2Url);
		return oauth2Url;
	}

	/**
	 * 初始化支付
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("payJsInit")
	public String payJsInit(HttpServletRequest request) {
		String Appid = SysConstants.APPID;
		String redirectUrl = "";
		String backUrl = SysConstants.ServerAddr + "wecharPay/payJsApi";
		System.out.println("backUrl=" + backUrl);
		redirectUrl = oAuth2Url(Appid, backUrl);

		return "redirect:" + redirectUrl;
	}

	/**
	 * 
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("payJsApi")
	public String payJsApi(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		// ---------------生成订单号 开始------------------------
		// 当前时间 yyyyMMddHHmmss
		String currTime = TenpayUtil.getCurrTime();
		// 8位日期
		String strTime = currTime.substring(8, currTime.length());
		// 四位随机数
		String strRandom = TenpayUtil.buildRandom(4) + "";
		// 10位序列号,可以自行调整。
		String strReq = strTime + strRandom;
		// 订单号，此处用时间加随机数生成，商户根据自己情况调整，只要保持全局唯一就行

		// ---------------生成订单号 结束------------------------
		String out_trade_num = strReq;

		Map<String, String> wxPayParamMap = null;

		String code = request.getParameter("code");
		ResponseModelJqGrid model = new ResponseModelJqGrid();
		AccessToken accessToken = WchartOAuth2Controller.getAccessToken(
				SysConstants.APPID, SysConstants.AppSecret, code);
		HttpSession session = request.getSession();
		if (accessToken != null && accessToken.getToken() != null) {
			session.setAttribute("ACCESSTOKEN", accessToken);
			model.put("accessToken", accessToken);
		}

		String operid = accessToken.getOpenid();
		log.info("operid_:" + accessToken.getOpenid());
		log.info("token_:" + accessToken.getToken());
		try {
			int payMoney = 20 * 100;
			wxPayParamMap = WXJSPay.jsApiPay(operid, payMoney + "",
					out_trade_num);// 测试金额为1分钱
		} catch (JDOMException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		request.setAttribute("appId", wxPayParamMap.get("appId"));
		request.setAttribute("timeStamp", wxPayParamMap.get("timeStamp"));
		request.setAttribute("nonceStr", wxPayParamMap.get("nonceStr"));
		request.setAttribute("wxPackage", wxPayParamMap.get("package"));
		request.setAttribute("signType", wxPayParamMap.get("signType"));
		request.setAttribute("paySign", wxPayParamMap.get("paySign"));
		request.setAttribute("payMoney", wxPayParamMap.get("payMoney"));
		request.setAttribute("out_trade_num", out_trade_num);

		return "wechar/wecharPay";
	}

	/**
	 * 
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("payJsApiJson")
	@ResponseBody
	public Map<String, Object> payJsApiJson(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		// ---------------生成订单号 开始------------------------
		// 当前时间 yyyyMMddHHmmss
		String currTime = TenpayUtil.getCurrTime();
		// 8位日期
		String strTime = currTime.substring(8, currTime.length());
		// 四位随机数
		String strRandom = TenpayUtil.buildRandom(4) + "";
		// 10位序列号,可以自行调整。
		String strReq = strTime + strRandom;
		// 订单号，此处用时间加随机数生成，商户根据自己情况调整，只要保持全局唯一就行

		// ---------------生成订单号 结束------------------------
		String out_trade_num = strReq;

		Map<String, Object> wxPayParamMap = null;

		HttpSession session = request.getSession();
		AccessToken accessToken = (AccessToken) session
				.getAttribute("AccessToken");
		String pay = request.getParameter("payMoney");
		int payMoney = 1;
		if (null == pay || "".equals(pay)) {
			payMoney=1;
		} else {
			payMoney=Integer.parseInt(pay)*100;
		}

		String operid = accessToken.getOpenid();
		log.info("operid_:" + accessToken.getOpenid());
		log.info("token_:" + accessToken.getToken());
		try {
			wxPayParamMap = WXJSPay.jsApiPay(operid, payMoney + "",
					out_trade_num);// 测试金额为1分钱
		} catch (JDOMException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		wxPayParamMap.put("out_trade_num", out_trade_num);
		wxPayParamMap.put("AccessToken", accessToken);

		request.setAttribute("appId", wxPayParamMap.get("appId"));
		request.setAttribute("timeStamp", wxPayParamMap.get("timeStamp"));
		request.setAttribute("nonceStr", wxPayParamMap.get("nonceStr"));
		request.setAttribute("wxPackage", wxPayParamMap.get("package"));
		request.setAttribute("signType", wxPayParamMap.get("signType"));
		request.setAttribute("paySign", wxPayParamMap.get("paySign"));
		request.setAttribute("payMoney", wxPayParamMap.get("payMoney"));
		request.setAttribute("outTradeNum", out_trade_num);
		String jsurl = SysConstants.ServerAddr + "app/sign_up.html?date="
				+ new Date().getTime();

		String jsapi_ticket = getJsTicket(null);
		Map<String, String> sign = WcharSign.sign(jsapi_ticket,
				jsurl.toLowerCase());
		sign.put("appid", SysConstants.APPID);
		request.setAttribute("sign", sign);
		wxPayParamMap.put("sign", sign);
		return wxPayParamMap;
	}

	/**
	 * 初始化js
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("jsApiInit")
	@ResponseBody
	public Map<String, String> jsApiInit(HttpServletRequest request,
			HttpServletResponse response) {
		String jsapi_ticket = getJsTicket(null);

		String jsurl = SysConstants.ServerAddr + "app/sign_up.html?date="
				+ new Date().getTime();
		Map<String, String> sign = WcharSign.sign(jsapi_ticket,
				jsurl.toLowerCase());
		sign.put("appid", SysConstants.APPID);
		request.setAttribute("sign", sign);
		return sign;
	}

	/**
	 * 获取jsticket
	 * 
	 * @return
	 */
	public static String getJsTicket(String token) {
		try {
			String token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="
					+ SysConstants.APPID + "&secret=" + SysConstants.AppSecret;
			JSONObject json = new JSONObject(HttpTool.httpRequest(token_url,
					"GET", null));
			token = json.getString("access_token");
			String url = "";
			if (null == token || "".equals(token)) {
				url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=0RxrP5Zfvx4YygWNjGXGvDUeb2EUwOO-79d5pY_fJMezJ-svRuIZ-yiFqAo3YyPAqIN5xasJaIPD2wKO8PJeaKP2D1tB62YRqIQmSB0q_gTmOJ_9GywtcNG_KjckQvudTQGhAHAWTJ&type=jsapi";
				//
			} else {
				url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="
						+ token + "&type=jsapi";
			}
			// log.info("获得接口Token:" + json.getString("access_token"));
			json = new JSONObject(HttpTool.httpRequest(url, "GET", null));
			//
			return json.getString("ticket");
		} catch (Exception e) {
			e.printStackTrace();

			return null;
		}
	}

	/**
	 * 微信支付成功回调函数
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("payRedicate")
	public void payRedicate(HttpServletRequest request,
			HttpServletResponse response) {
		// 获得成功调用代码

		System.out.println("调用了回调函数");

	}
}

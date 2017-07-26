package controller.wechar;

import java.io.UnsupportedEncodingException;
import java.rmi.RemoteException;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import common.model.ResponseModelJqGrid;
import common.util.SysConstants;
import controller.wechar.util.AccessToken;
import controller.wechar.util.EnumMethod;
import controller.wechar.util.HttpRequestUtil;
import controller.wechar.util.Result;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * 微信认证，只需调用getCode即可
 * 
 * @author imisi
 *         http://127.0.0.1:8111/lr_webSystem/oAuth2/getCode?resultUrl=oauth2
 *         .html http://1479959ja8.iok.la:8111/lr_webSystem/oAuth2/getCode
 *         ?resultUrl=oauth2.html
 *         http://1479959ja8.iok.la:8111/lr_webSystem/oAuth2/getCodeByJson
 *         http://lanruionline.tunnel.qydev.com/lr_webSystem/oAuth2/getCode?resultUrl=app/event/event_main.html
 */
@Controller
@RequestMapping("/oAuth2")
public class WchartOAuth2Controller {
	// 获取微信公众号：access_token的接口地址（GET） 限2000（次/天）
	public final static String access_token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=APPSECRET&code=APPCODE&grant_type=authorization_code";
	// 获取企业号access_token
	public final static String company_access_token_url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=CORPID&corpsecret=CORPSECRET";

	private static final String get_qy_oauth2_url = "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=ACCESS_TOKEN&code=CODE&agentid=AGENTID";

	private static final String get_oauth2_url = "https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN";

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
	private String oAuth2UrlByScope(String appid, String redirect_uri) {
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
	 * 获取Code
	 * 
	 * @param request
	 * @param resultUrl
	 * @return
	 */
	@RequestMapping("getCode")
	public String getCode(HttpServletRequest request,
			@RequestParam String resultUrl) {
		String Appid = SysConstants.APPID;
		String redirectUrl = "";
		if (resultUrl != null) {
			// request.getLocalAddr()
			String backUrl = SysConstants.ServerAddr
					+ "oAuth2/getTonken?oauth2url=" + resultUrl;
			System.out.println("backUrl=" + backUrl);
			redirectUrl = oAuth2Url(Appid, backUrl);
		}
		return "redirect:" + redirectUrl;
	}

	@RequestMapping("getCodeByJson")
	public String getCodeByJson(HttpServletRequest request) {
		String Appid = SysConstants.APPID;
		String redirectUrl = "";
		String backUrl = SysConstants.ServerAddr + "oAuth2/getTonkenByJson";
		System.out.println("backUrl=" + backUrl);
		redirectUrl = oAuth2Url(Appid, backUrl);

		return "redirect:" + redirectUrl;
	}

	/**
	 * 获取Code
	 * 
	 * @param request
	 * @param resultUrl
	 * @return
	 */
	@RequestMapping("getCodeByVip")
	public String getCodeByVip(HttpServletRequest request,
			@RequestParam String resultUrl) {
		String Appid = SysConstants.APPID;
		String redirectUrl = "";
		if (resultUrl != null) {
			// request.getLocalAddr()
			String backUrl = SysConstants.ServerAddr
					+ "oAuth2/getTonkenByVip?oauth2url=" + resultUrl;
			System.out.println("backUrl=" + backUrl);
			redirectUrl = oAuth2Url(Appid, backUrl);
		}
		return "redirect:" + redirectUrl;
	}
	/**
	 * 获取Token跳转到验证用户
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("getTonkenByVip")
	public String getTonkenByVip(HttpServletRequest request) {
		String code = request.getParameter("code");
		String oauth2url = request.getParameter("oauth2url");
		AccessToken accessToken = getAccessToken(SysConstants.APPID,
				SysConstants.AppSecret, code);
		HttpSession session = request.getSession();
		if (accessToken != null && accessToken.getToken() != null) {
			session.setAttribute("AccessToken", accessToken);
		}
		String backUrl = SysConstants.ServerAddr + "appInterface/appServiceInterface/validateVip?redirectUrl="+oauth2url;
		// 这里简单处理,存储到session中
		return "redirect:" + backUrl;
	}

	/**
	 * 获取Token
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("getTonkenByJson")
	@ResponseBody
	public ResponseModelJqGrid getTonkenByJson(HttpServletRequest request) {
		String code = request.getParameter("code");
		ResponseModelJqGrid model = new ResponseModelJqGrid();
		AccessToken accessToken = getAccessToken(SysConstants.APPID,
				SysConstants.AppSecret, code);
		HttpSession session = request.getSession();
		if (accessToken != null && accessToken.getToken() != null) {
			session.setAttribute("AccessToken", accessToken);
			model.put("AccessToken", accessToken);
		}
		// 这里简单处理,存储到session中
		return model;
	}

	
	/**
	 * 获取Token
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("getTonken")
	public String getTonken(HttpServletRequest request) {
		String code = request.getParameter("code");
		String oauth2url = request.getParameter("oauth2url");
		AccessToken accessToken = getAccessToken(SysConstants.APPID,
				SysConstants.AppSecret, code);
		HttpSession session = request.getSession();
		if (accessToken != null && accessToken.getToken() != null) {
			session.setAttribute("AccessToken", accessToken);
		}
		
		// 这里简单处理,存储到session中
		return "redirect:" + oauth2url;
	}
	/**
	 * 获取access_token
	 * 
	 * @param appid
	 *            凭证
	 * @param appsecret
	 *            密钥
	 * @return
	 */
	public static AccessToken getAccessToken(String appid, String appsecret,
			String code) {
		AccessToken accessToken = null;
		String requestUrl = access_token_url.replace("APPID", appid)
				.replace("APPSECRET", appsecret).replace("APPCODE", code);

		JSONObject jsonObject = HttpRequestUtil.httpRequest(requestUrl,
				EnumMethod.GET.name(), null);
		if (jsonObject == null) {
			jsonObject = HttpRequestUtil.httpRequest(requestUrl,
					EnumMethod.GET.name(), null);
		}
		// 如果请求成功
		if (null != jsonObject) {
			try {
				accessToken = new AccessToken();
				accessToken.setToken(jsonObject.getString("access_token"));
				accessToken.setExpiresIn(jsonObject.getInt("expires_in"));

				accessToken.setOpenid(jsonObject.getString("openid"));
				accessToken.setRefreshToken(jsonObject
						.getString("refresh_token"));
				accessToken.setScope(jsonObject.getString("scope"));

			} catch (JSONException e) {
				accessToken = null;
				// 获取token失败
			}
		}
		return accessToken;
	}

	/**
	 * 刷新token
	 * @param accessToken
	 * @param accessToken
	 * @return
	 */
	public static AccessToken refreshAccessToken(AccessToken accessToken) {
		String requestVerUrl = "https://api.weixin.qq.com/sns/auth?access_token="+accessToken.getToken()+"&openid="+accessToken.getOpenid();
		JSONObject jsonObject = HttpRequestUtil.httpRequest(requestVerUrl,
				EnumMethod.GET.name(), null);
		if(null!=jsonObject){
			String code=jsonObject.getString("errcode");
			if("0".equals(code)){
				return accessToken;
			}
		}
		
		String requestUrl = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid="
				+ accessToken.getOpenid() + "&grant_type=refresh_token&refresh_token="+accessToken.getRefreshToken();
	   jsonObject = HttpRequestUtil.httpRequest(requestUrl,
				EnumMethod.GET.name(), null);
		if (jsonObject == null) {
			jsonObject = HttpRequestUtil.httpRequest(requestUrl,
					EnumMethod.GET.name(), null);
		}
		// 如果请求成功
		if (null != jsonObject) {
			try {
				accessToken = new AccessToken();
				accessToken.setToken(jsonObject.getString("access_token"));
				accessToken.setExpiresIn(jsonObject.getInt("expires_in"));

				accessToken.setOpenid(jsonObject.getString("openid"));
				accessToken.setRefreshToken(jsonObject
						.getString("refresh_token"));
				accessToken.setScope(jsonObject.getString("scope"));

			} catch (JSONException e) {
				accessToken = null;
				// 获取token失败
			}
		}
		return accessToken;
	}

	/**
	 * 公众号获取用户
	 * 
	 * @return
	 */
	@RequestMapping("getUserByGzh")
	@ResponseBody
	public ResponseModelJqGrid getUserByGzh(String operid, String token) {

		String menuUrl = get_oauth2_url.replace("ACCESS_TOKEN", token).replace(
				"OPENID", operid + "");
		JSONObject jo = HttpRequestUtil.httpRequest(menuUrl,
				EnumMethod.GET.name(), null);
		ResponseModelJqGrid model = new ResponseModelJqGrid();
		if (jo != null) {
			try {
				String nickname = jo.getString("nickname");
				if (nickname != null && nickname.length() > 0) {
					model.setObject(jo);
					model.success();

				} else {
					model.error(jo.getString("errmsg"));
					jo.getString("errcode");
				}

			} catch (Exception e) {
				model.error("accessToken 超时......");
			}
		}

		return model;
	}

	// ////////////////////以下是企业号获取方式////////////////////////
	/**
	 * 调用接口获取用户信息
	 * 
	 * @param token
	 * @param code
	 * @param agentId
	 * @return
	 * @throws SQLException
	 * @throws RemoteException
	 */
	public String getMemberGuidByCode(String token, String code, int agentId) {
		System.out.println("code==" + code + "\ntoken=" + token + "\nagentid="
				+ agentId);
		Result<String> result = this.oAuth2GetUserByCode(token, code, agentId);
		System.out.println("result=" + result);
		if (result.getErrcode() == "0") {
			if (result.getObj() != null) {
				// 此处可以通过微信授权用code还钱的Userid查询自己本地服务器中的数据
				return result.getObj();
			}
		}
		return "";
	}

	/**
	 * OAuth2验证接口根据code获取成员信息
	 * 
	 * @param token
	 * @param code
	 * @param AgentID
	 * @return
	 */
	public static Result<String> oAuth2GetUserByCode(String token, String code,
			int AgentID) {
		Result<String> result = new Result<String>();
		JSONObject jo = getUserByCode(token, code, AgentID);
		if (jo != null) {
			try {
				String userId = jo.getString("UserId");
				if (userId != null && userId.length() > 0) {
					result.setErrmsg("");
					result.setErrcode("0");
					result.setObj(userId);
				} else {
					result.setErrmsg(jo.getString("errmsg"));
					result.setErrcode(jo.getString("errcode"));
				}

			} catch (Exception e) {
				result.setErrmsg("accessToken 超时......");
				result.setErrcode("42001");
			}
		}
		return result;
	}

	public static JSONObject getUserByCode(String token, String code,
			int AgentID) {
		String menuUrl = get_qy_oauth2_url.replace("ACCESS_TOKEN", token)
				.replace("CODE", code).replace("AGENTID", AgentID + "");
		JSONObject jo = HttpRequestUtil.httpRequest(menuUrl,
				EnumMethod.GET.name(), null);
		System.out.println("jo=" + jo);
		return jo;
	}
}

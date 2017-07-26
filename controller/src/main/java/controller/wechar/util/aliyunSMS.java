package controller.wechar.util;

import com.aliyun.oss.ClientException;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import com.aliyuncs.sms.model.v20160927.SingleSendSmsRequest;
import com.aliyuncs.sms.model.v20160927.SingleSendSmsResponse;

import java.rmi.ServerException;

public class aliyunSMS {

	private final static String access_key = "LTAImqqnY7nrU6XD";
	private final static String access_secret = "Tnah0cB8IGGmdIcwNCyIISwiW1kEGa";
	private final static String sms_name_key = "内蒙古体育在线";

	public static void sample(String code, String Phone, String sms_key) {
		try {
			IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", access_key, access_secret);
			try {
				DefaultProfile.addEndpoint("cn-hangzhou", "cn-hangzhou", "Sms", "sms.aliyuncs.com");
			} catch (com.aliyuncs.exceptions.ClientException e) {
				e.printStackTrace();
			}
			IAcsClient client = new DefaultAcsClient(profile);
			SingleSendSmsRequest request = new SingleSendSmsRequest();
			request.setSignName(sms_name_key);// 控制台创建的签名名称
			request.setTemplateCode(sms_key);// 控制台创建的模板CODE
			request.setParamString("{\"code\":\"" + code + "\"}");// 短信模板中的变量；数字需要转换为字符串；个人用户每个变量长度必须小于15个字符。"
			request.setRecNum(Phone);// 接收号码
			try {
				SingleSendSmsResponse httpResponse = client.getAcsResponse(request);
			} catch (com.aliyuncs.exceptions.ClientException e) {
				e.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void sample(String message, String Phone) {
//		try {
//			IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", access_key, access_secret);
//			DefaultProfile.addEndpoint("cn-hangzhou", "cn-hangzhou", "Sms", "sms.aliyuncs.com");
//			IAcsClient client = new DefaultAcsClient(profile);
//			SingleSendSmsRequest request = new SingleSendSmsRequest();
//			request.setSignName(sms_name_key);// 控制台创建的签名名称
//			request.setTemplateCode("SMS_59740085");// 控制台创建的模板CODE
//			request.setParamString("{\"message\":\"" + message + "\"}");// 短信模板中的变量；数字需要转换为字符串；个人用户每个变量长度必须小于15个字符。"
//			request.setRecNum(Phone);// 接收号码
//			SingleSendSmsResponse httpResponse = client.getAcsResponse(request);
//		} catch (ServerException e) {
//			e.printStackTrace();
//		} catch (ClientException e) {
//			e.printStackTrace();
//		}
		System.out.println("===========================================================");
		System.out.println(Phone + "手机接收到的信息：" + message);
		System.out.println("===========================================================");
	}
	
	public static void main(String[] args) {
		aliyunSMS.sample("766654", "18147384920", "SMS_48435136");
	}
}

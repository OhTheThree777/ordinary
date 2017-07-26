package common.util;

import java.util.List;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class JSONUtil {
	public static String list2JSON(List<?> list) {
		JSONArray ja = JSONArray.fromObject(list);
		String s = htmlEncode(ja.toString());
		return s;
	}
	
	public static String obj2JSON(Object o) {
		JSONObject obj = JSONObject.fromObject(o);
		String s = htmlEncode(obj.toString());
		return s;
	}

  	public static String htmlEncode(String str) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < str.length(); i++) {
			int c = (int)str.charAt(i);
			if (c>127 && c!=160) {
				sb.append("&#").append(c).append(";");
			} else {
				sb.append((char)c);
			}
		}
		return sb.toString();
  	}
}


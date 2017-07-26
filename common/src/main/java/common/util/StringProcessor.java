package common.util;

import java.util.ArrayList;
import java.util.List;

/**
 * 字符串处理器
 * 
 * @author qinhuan
 * @version 20120908
 * 
 */
public class StringProcessor {

	/**
	 * 判断字符串是否为空字符 To determine whether the string is empty character
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isEmptyStr(String str) {
		return (str == null || "".equals(str));
	}

	public static boolean isNotEmptyStr(String str) {
		return !(str == null || "".equals(str));
	}

	/**
	 * 根据指定的字符截断字符串 Truncate the string according to the specified character
	 * 
	 * @param str
	 * @param c
	 * @return
	 */
	public static List<String> truncateString(String str, char c) {
		List<String> result = new ArrayList<String>();
		Integer i = 0;
		Integer n = 0;
		while (n != str.length()) {
			String s = null;
			n = str.indexOf(c, i);
			if (n == -1) {
				n = str.length();
			}
			s = str.substring(i, n);
			result.add(s);
			i = n + 1;
		}
		return result;
	}

	/**
	 * 将英文单词的首字母转换为大写
	 * 
	 * @param str
	 * @return
	 */
	public static String firstCapital(String str) {
		try {
			return str.substring(0, 1).toUpperCase() + str.substring(1);
		} catch (Exception e) {
			return "";
		}
	}

	/**
	 * 将英文单词的首字母转换为小写
	 * 
	 * @param str
	 * @return
	 */
	public static String firstLowerCase(String str) {
		try {
			return str.substring(0, 1).toLowerCase() + str.substring(1);
		} catch (Exception e) {
			return "";
		}
	}

	/**
	 * 将英文语句的首字母转换为大写
	 * 
	 * @param str
	 * @return
	 */
	public static String firstCapital4Sentence(String str) {
		String[] s = str.split(" ");
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < s.length; i++) {
			if (i != 0) {
				sb.append(" ");
			}
			sb.append(firstCapital(s[i]));
		}
		return sb.toString();
	}

	/**
	 * 将英文语句的首字母转换为小写
	 * 
	 * @param str
	 * @return
	 */
	public static String firstLowerCase4Sentence(String str) {
		String[] s = str.split(" ");
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < s.length; i++) {
			if (i != 0) {
				sb.append(" ");
			}
			sb.append(firstLowerCase(s[i]));
		}
		return sb.toString();
	}

	public static String getDMString(String str) {
		try {
			if (Integer.parseInt(str) < 10 && str.length() > 1) {

				return str.substring(1);
			} else {

				return str;
			}
		} catch (Exception e) {
			// TODO: handle exception
			return str;
		}
	}

	public static String setDMString(String str) {
		try {
			if (str.length() < 2) {

				str = "0" + str;
			}
		} catch (Exception e) {
		}
		return str;
	}

	// TODO 需要增加方法：字符串全部转换为大写、小写

	public static void main(String args[]) {
		// for (String s :
		// truncateString("\"13844\",\"王怡惠\",\"2\",\"甘肃省兰州市城关区五泉街道闵家桥社区\",\"620102006001000\",\"内蒙古自治区呼和浩特市武川县西乌兰不浪镇\",\"150125102000000\",\"000000000000000000\",\"2010-10-13\",\"\",\"1\",\"10\",\"2011-01-01\",\"\",\"10\",\"10\"",
		// ',')) {
		// System.out.println(s);
		// }
		// String str = "1ABCd";
		// System.out.println(str.toUpperCase());
		// System.out.println(firstCapital(str));
		// System.out.println(str.toLowerCase());
		// System.out.println(firstLowerCase(str));

		String str = "hellow world!  My name Is Qin huan.";

		System.out.println(firstCapital4Sentence(str));

		System.out.println(firstLowerCase4Sentence(str));

	}

	public static String substring(String str, int toCount) {
		int reInt = 0;
		String reStr = "";
		if (str == null)
			return "";
		char[] tempChar = str.toCharArray();
		for (int kk = 0; (kk < tempChar.length && toCount > reInt); kk++) {
			String s1 = str.valueOf(tempChar[kk]);
			byte[] b = s1.getBytes();
			reInt += b.length;
			reStr += tempChar[kk];
		}

		return reStr;
	}
}

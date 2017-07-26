package controller.wechar.util;

import java.util.UUID;

public class ToolsUtil {

	/**
	 * 获取UUID
	 * 
	 * @return
	 */
	public static String UUID() {
		return UUID.randomUUID().toString();
	}

	/**
	 * 数组判断
	 */
	public static boolean useLoop(String[] arr, String targetValue) {
		for (String s : arr) {
			if (s.equals(targetValue))
				return true;
		}
		return false;
	}
}

package common.util;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author 郭爱
 * @Description 新版JSON处理程序（依赖Jackson2.4.1）
 * @Date 2014-7-9
 * @version 2.0
 */
public class JSONHandler {

	private static final ObjectMapper mapper = new ObjectMapper();

	/**
	 * 将对象转换为JSON字符串
	 * 
	 * @param object
	 * @return JSON字符串
	 */
	public static String toJSON(Object object) {
		try {
			return mapper.writeValueAsString(object);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return "";
		}
	}
	
	/**
	 * 将JSON字符串转换为Map对象，要求JSON字符串为对象形式{"":"" ... }。
	 * @param json
	 * @return Map对象
	 */
	public static Map<Object, Object> convert2Map(String json) {
		Map<Object, Object> map = null;
		try {
			map = mapper.readValue(json, new TypeReference<Map<?, ?>>(){});
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}
	
	/**
	 * 将JSON字符串转换为Map对象，要求JSON字符串为对象形式{"":"" ... }。
	 * @param json
	 * @return Map对象
	 */
	public static Map<String, String> convert2StringMap(String json) {
		Map<String, String> map = null;
		try {
			map = mapper.readValue(json, new TypeReference<Map<String, String>>(){});
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}
	
	/**
	 * 将JSON字符串转换为List[Map]对象，要求JSON字符串为对象形式[{},{} ... ]。
	 * @param json
	 * @return List[Map]对象
	 */
	public static List<Object> convert2ListMap(String json) {
		List<Object> list = null;
		try {
			list = mapper.readValue(json, new TypeReference<List<Map<?, ?>>>(){});
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	/**
	 * 将JSON字符串转换为List[Map]对象，要求JSON字符串为对象形式[{},{} ... ]。
	 * @param json
	 * @return List[Map]对象
	 */
	public static List<Object> convert2ListStringMap(String json) {
		List<Object> list = null;
		try {
			list = mapper.readValue(json, new TypeReference<List<Map<String, String>>>(){});
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	/**
	 * 将JSON字符串转换为指定类型的对象
	 * @param json
	 * @param type
	 * @return 指定类型的对象实例
	 */
	public static Object convert2Object(String json, Type type) {
		return convert2Object(json, (Class<?>) type);
	}
	
	/**
	 * 将JSON字符串转换为指定类型的对象
	 * @param json
	 * @param type
	 * @return 指定类型的对象实例
	 */
	public static <T> T convert2Object(String json, Class<T> type) {
		T t =null;
		try {
			t = mapper.readValue(json, type);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return t;
	}
	
	/**
	 * 将JSON字符串转换为指定类型的对象
	 * @param json
	 * @param type
	 * @return 指定类型的对象实例
	 */
	public static <T> T convert2Object(String json, TypeReference<T> type) {
		T t = null;
		try {
			t = mapper.readValue(json, type);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return t;
	}
	
	/**
	 * 将JSON字符串转换成List，并且List的内容为复合类型。
	 * @param json
	 * @param type
	 * @return
	 */
	public static List<?> convert2ListCompositeType(String json, Class<?> type) {
		List<Object> result = new ArrayList<Object>();
		List<Object> list = convert2ListStringMap(json);
		while (list.size() > 0) {
			Object rem = list.remove(0);
			result.add(convert2Object(toJSON(rem), type));
		}
		return result;
	}
	
	/**
	 * 将Map对象转换为指定类型的对象
	 * @param map
	 * @param type
	 * @return 指定类型的对象实例
	 */
	public static Object map2Object(Map<String, Object> map, Type type) {
		return mapper.convertValue(map, (Class<?>)type);
	}
	
	public static <T> T map2Object(Map<String, Object> map, Class<T> type) {
		return mapper.convertValue(map, type);
	}
	
	public static <T> T map2Object(Map<String, Object> map, TypeReference<T> type) {
		return mapper.convertValue(map, type);
	}

	public static ObjectMapper getMapper() {
		return mapper;
	}
	
}
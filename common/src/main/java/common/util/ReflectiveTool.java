package common.util;

import java.io.BufferedReader;
import java.io.Reader;
import java.lang.reflect.Field;
import java.sql.Clob;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


/**
 * java 反射工具类
 *
 * @author qinhuan
 */
public class ReflectiveTool {

	public static boolean fieldIsByte(Field field) {
		String name = field.getType().getName();
		return name.equals("byte") || name.equals("java.lang.Byte");
	}

	public static boolean fieldIsChar(Field field) {
		String name = field.getType().getName();
		return name.equals("char") || name.equals("java.lang.Character");
	}

	public static boolean fieldIsShort(Field field) {
		String name = field.getType().getName();
		return name.equals("short") || name.equals("java.lang.Short");
	}

	public static boolean fieldIsInt(Field field) {
		String name = field.getType().getName();
		return name.equals("int") || name.equals("java.lang.Integer");
	}

	public static boolean fieldIsFloat(Field field) {
		String name = field.getType().getName();
		return name.equals("float") || name.equals("java.lang.Float");
	}

	public static boolean fieldIsDouble(Field field) {
		String name = field.getType().getName();
		return name.equals("double") || name.equals("java.lang.Double");
	}

	public static boolean fieldIsLong(Field field) {
		String name = field.getType().getName();
		return name.equals("long") || name.equals("java.lang.Long");
	}

	public static boolean fieldIsBoolean(Field field) {
		String name = field.getType().getName();
		return name.equals("boolean") || name.equals("java.lang.Boolean");
	}

	public static boolean fieldIsString(Field field) {
		return field.getType().getName().equals("java.lang.String");
	}

	public static boolean fieldIsDate(Field field) {
		return field.getType().getName().equals("java.util.Date");
	}

	/**
	 * 将Map转换为指定类型的对象，按照类型中的属性名到Map中查找，并进行对应的类型转换。
	 * (主要用于springMVC中的AJAX提交上的map转换为指定Bean)
	 * （当目标Field为Date对象时，按照value的toString()值的长度进行转换，目前支持的格式有：yyyyMMdd、yyyy-MM-dd、yyyy-MM-dd HH:mm:ss 。）
	 *
	 * @param class1
	 * @param map
	 * @return 指定类型的对象实例
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 */
	public static Object convertMap2Object(Class<?> class1, Map<String, Object> map) throws InstantiationException, IllegalAccessException {
		Object result = null;

		result = class1.newInstance();

		Field[] declaredFields = class1.getDeclaredFields();
		for (Field f : declaredFields) {
			f.setAccessible(true);

			Object value = map.get(f.getName());

			if (value != null && StringProcessor.isNotEmptyStr(value.toString())) {
				setObjectFieldAndConvert(result, f, value);
			} else if (value != null && fieldIsString(f)) { // 2013.08.31 解决页面将表单值删除（空），保存后自定字段不变化。
				setObjectFieldAndConvert(result, f, value);
			}

		}
		return result;
	}

	/**
	 * 将Map[String][String]转换为指定类型的对象，按照类型中的属性名到Map中查找，并进行对应的类型转换。
	 * （当目标Field为Date对象时，按照value的toString()值的长度进行转换，目前支持的格式有：yyyyMMdd、yyyy-MM-dd、yyyy-MM-dd HH:mm:ss 。）
	 *
	 * @param class1
	 * @param map
	 * @return 指定类型的对象实例
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 */
	public static Object convertStringMap2Object(Class<?> class1, Map<String, String> map) throws InstantiationException, IllegalAccessException {
		Object result = null;

		result = class1.newInstance();

		Field[] declaredFields = class1.getDeclaredFields();
		for (Field f : declaredFields) {
			f.setAccessible(true);

			Object value = map.get(f.getName());

			if (value != null && StringProcessor.isNotEmptyStr(value.toString())) {
				setObjectFieldAndConvert(result, f, value);
			} else if (value != null && fieldIsString(f)) { // 2013.08.29 解决页面将表单值删除（空），保存后自定字段不变化。
				setObjectFieldAndConvert(result, f, value);
			}

		}
		return result;
	}

	/**
	 * 设置对象的属性，并且按照属性定义类型转换数据。
	 * （当目标Field为Date对象时，按照value的toString()值的长度进行转换，目前支持的格式有：yyyyMMdd、yyyy-MM-dd、yyyy-MM-dd HH:mm:ss 。）
	 *
	 * @param result
	 * @param f
	 * @param value
	 * @throws IllegalAccessException
	 * @version 2013-05-28 18:19:52 （增加日期类型java.sql.Timestamp处理。）
	 */
	private static void setObjectFieldAndConvert(Object result, Field f, Object value) throws IllegalAccessException {
		if (fieldIsByte(f)) {
			f.set(result, Byte.parseByte(value.toString()));
		} else if (ReflectiveTool.fieldIsChar(f)) {
			f.set(result, (value.toString()).charAt(0));
		} else if (ReflectiveTool.fieldIsShort(f)) {
			f.set(result, Short.parseShort(value.toString()));
		} else if (ReflectiveTool.fieldIsInt(f)) {
			f.set(result, Integer.parseInt(value.toString()));
		} else if (ReflectiveTool.fieldIsFloat(f)) {
			f.set(result, Float.parseFloat(value.toString()));
		} else if (ReflectiveTool.fieldIsDouble(f)) {
			f.set(result, Double.parseDouble(value.toString()));
		} else if (ReflectiveTool.fieldIsLong(f)) {
			f.set(result, Long.parseLong(value.toString()));
		} else if (ReflectiveTool.fieldIsBoolean(f)) {
			f.set(result, Boolean.parseBoolean(value.toString()));
		} else if (ReflectiveTool.fieldIsDate(f)) {
			// 对于使用MyBatis查询出的结果中，Timestamp类型的对象，直接gatTime()后创建java.util.Date对象并赋值。
			if (value instanceof Timestamp) {
				Timestamp tt = (Timestamp) value;
				f.set(result, new Date(tt.getTime()));
				return;
			}
			String tempString = value.toString();
			if (StringProcessor.isNotEmptyStr(tempString)) {
				if (tempString.length() == 8) {
					f.set(result, DateUtil.string2Date(value.toString(), "yyyyMMdd"));
				} else if (tempString.length() == 10) {
					f.set(result, DateUtil.string2Date(value.toString(), "yyyy-MM-dd"));
				} else if (tempString.length() == 19) {
					f.set(result, DateUtil.string2Date(value.toString(), "yyyy-MM-dd HH:mm:ss"));
				} else {
					try {
						long l = Long.parseLong(tempString);
						f.set(result, new Date(l));
					} catch (Exception e) {
						e.printStackTrace();
						f.set(result, DateUtil.string2Date(value.toString()));
					}

				}
			}
			//			f.set(result, DateUtil.string2Date(value.toString()));
		} else {
			try {
				if (value instanceof Clob) {
					f.set(result, ClobToString((Clob) value));
				} else {
					f.set(result, value);
				}
			} catch (IllegalArgumentException e) {
				System.out.println("==================================");
				System.out.println("Tools Exception ： 设置对象的属性 ！ [result = " + result + ", Field = " + f + ",  value = " + value + "]");
				throw e;
			}
		}
	}

	public static String ClobToString(Clob clob) {
		StringBuffer sb = new StringBuffer();
		try {
			Reader is = clob.getCharacterStream();
			BufferedReader br = new BufferedReader(is);
			String s = br.readLine();
			while (s != null) {
				sb.append(s);
				s = br.readLine();
			}
			br.close();
			is.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sb.toString();
	}

	/**
	 * 将对象转换成Map对象
	 *
	 * @param obj
	 * @return
	 */
	public static Map<String, Object> convertObject2Map(Object obj) {
		if (ProxyUtil.isProxy(obj)) {
			try {
				obj = ProxyUtil.getAgentTarget(obj);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		Map<String, Object> result = new HashMap<String, Object>();
		Field[] declaredFields = obj.getClass().getDeclaredFields();
		for (Field f : declaredFields) {
			f.setAccessible(true);
			try {
				result.put(f.getName(), f.get(obj));
			} catch (IllegalArgumentException e) {
				// TODO Auto-generated catch block
				//				e.printStackTrace();
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				//				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return result;
	}
}

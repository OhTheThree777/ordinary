package common.util;

import java.lang.reflect.Field;

/**
 * 对象工具，用于判断对象或成员变量的类型。
 */
public class ObjectTools {
	public static final String _BYTE = "byte";
	public static final String _CHAR = "char";
	public static final String _SHORT = "short";
	public static final String _INT = "int";
	public static final String _FLOAT = "float";
	public static final String _DOUBLE = "double";
	public static final String _LONG = "long";
	public static final String _BOOLEAN = "boolean";

	public static final String BYTE = "java.lang.Byte";
	public static final String CHARACTER = "java.lang.Character";
	public static final String SHORT = "java.lang.Short";
	public static final String INTEGER = "java.lang.Integer";
	public static final String FLOAT = "java.lang.Float";
	public static final String DOUBLE = "java.lang.Double";
	public static final String LONG = "java.lang.Long";
	public static final String BOOLEAN = "java.lang.Boolean";
	public static final String STRING = "java.lang.String";
	public static final String OBJECT = "java.lang.Object";

	public static final String BIGDECIMAL = "java.math.BigDecimal";

	public static final String DATE = "java.util.Date";

	public static final String NULL = "null";

	/**
	 * 判断对象类型，返回DataType枚举类型。
	 *
	 * @param object
	 * @return 对象类型（枚举类型DataType）
	 */
	@SuppressWarnings("deprecation")
	public static DataType getObjectType(Object object) {
		String className;
		try {
			className = object.getClass().getName();
		} catch (Exception e) {
			return DataType._unknow;
		}
		return judge(className);
	}

	/**
	 * 判断类中的成员变量Field的类型，返回DataType枚举类型。
	 *
	 * @param field
	 * @return Field的类型（枚举类型DataType）
	 */
	public static DataType getFieldType(Field field) {
		String className;
		try {
			className = field.getType().getName();
		} catch (Exception e) {
			return DataType._unknow;
		}
		return judge(className);
	}

	/**
	 * @param className
	 * @return
	 */
	private static DataType judge(String className) {
		if (_BYTE.equals(className) || BYTE.equals(className)) {
			return DataType._byte;
		} else if (_CHAR.equals(className) || CHARACTER.equals(className)) {
			return DataType._char;
		} else if (_SHORT.equals(className) || SHORT.equals(className)) {
			return DataType._short;
		} else if (_INT.equals(className) || INTEGER.equals(className)) {
			return DataType._int;
		} else if (_FLOAT.equals(className) || FLOAT.equals(className)) {
			return DataType._float;
		} else if (_DOUBLE.equals(className) || DOUBLE.equals(className)) {
			return DataType._double;
		} else if (_LONG.equals(className) || LONG.equals(className)) {
			return DataType._long;
		} else if (_BOOLEAN.equals(className) || BOOLEAN.equals(className)) {
			return DataType._boolean;
		} else if (STRING.equals(className)) {
			return DataType._string;
		} else if (OBJECT.equals(className)) {
			return DataType._object;
		} else if (BIGDECIMAL.equals(className)) {
			return DataType._bigDecimal;
		} else if (DATE.equals(className)) {
			return DataType._date;
		} else {
			return DataType._unknow;
		}
	}
}

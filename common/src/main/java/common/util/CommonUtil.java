package common.util;

import java.io.IOException;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

/**
 * 公共工具
 *
 */
public class CommonUtil {
	
	/**
	 * 字符编码转换（"ISO8859-1" --> "UTF-8"）
	 * @param fileName
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public static String toCNCode(String fileName) throws UnsupportedEncodingException {
		fileName = new String(fileName.getBytes("ISO8859-1"), "UTF-8");
		return fileName;
	}
	
	/**
	 * 字符编码转换（"UTF-8" --> "ISO8859-1"）
	 * @param fileName
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public static String toENCode(String fileName) throws UnsupportedEncodingException {
		fileName = new String(fileName.getBytes("UTF-8"), "ISO8859-1");
		return fileName;
	}
	public static String toUtf8String(String fileName) throws UnsupportedEncodingException { 
	     StringBuffer sb = new StringBuffer(); 
	       for (int i=0;i<fileName.length();i++){ 
	          char c = fileName.charAt(i); 
	          if (c >= 0 && c <= 255){sb.append(c);} 
	        else{ 
	        byte[] b; 
	         try { b = Character.toString(c).getBytes("utf-8");} 
	         catch (Exception ex) { 
	             System.out.println(ex); 
	                  b = new byte[0]; 
	         } 
	            for (int j = 0; j < b.length; j++) { 
	             int k = b[j]; 
	              if (k < 0) k += 256; 
	              sb.append("%" + Integer.toHexString(k).toUpperCase()); 
	              } 
	     } 
	  } 
	  return sb.toString(); 
	}
	/**
	 * 将POJO对象转换为JSON字符串
	 * @param bean
	 * @return
	 */
	public static String toJSON(Object bean) {
		ObjectMapper mapper = new ObjectMapper(); 
		StringWriter sw = new StringWriter();  
		JsonGenerator gen = null;
		try {
			gen = new JsonFactory().createJsonGenerator(sw);  
			mapper.writeValue(gen, bean);
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				gen.close();
			} catch (IOException e) {
				e.printStackTrace();
				return "{}";
			}
		}
		String json = sw.toString();
		return json;
	}
	
	/**
	 * test
	 * @param args
	 */
	public static void main(String args[]) {
		
//		System.out.println(pagingCalculate(10, 2));
		
//		Map<String, Object> map = new HashMap<String, Object>();
//		map.put("str", "abcd");
//		List<String> list = new ArrayList<String>();
//		list.add("1");
//		list.add("2");
//		map.put("list", list);
//		System.out.println(toJSON(map));
		
		
	}

}

package common.word;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;


import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

/**
 * @author
 * @version 1.0
 * @Description 使用FreeMarker将xml模板解析成word文档。xml模板的格式为word文件的xml格式。
 * @Date 2013-12-2
 */
public class WordHandler {

	private Configuration cfg;
	private Template tem;
	private Map<String, Object> dataMap;

	public WordHandler(String ftlPath, String ftlName) {
		dataMap = new HashMap<String, Object>();
		cfg = new Configuration();
		cfg.setDefaultEncoding("utf-8");
		ftlPath = ftlPath.replace("\\", System.getProperty("file.separator"));
		try {
			cfg.setDirectoryForTemplateLoading(new File(ftlPath));
			cfg.setClassicCompatible(true);
			tem = cfg.getTemplate(ftlName);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void createWord(String docPath) {
		docPath = docPath.replace("\\", System.getProperty("file.separator"));
		try {
			PrintWriter out = new PrintWriter(docPath);
			tem.process(dataMap, out);
			out.flush();
			out.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void createWordFile(String docPath) {
		docPath = docPath.replace("\\", System.getProperty("file.separator"));
		File outFile = new File(docPath);

		if (outFile.exists()) {
			FileUtils.deleteQuietly(outFile);
		}
		Writer out = null;
		try {
			out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(outFile), "utf-8"));
			tem.process(dataMap, out);

			out.flush();
			out.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void createWord2Http(HttpServletResponse response, String filename) {
		try {
			filename = new String(filename.getBytes("gb2312"), "ISO8859-1");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		response.setCharacterEncoding("utf-8");
		response.setContentType("multipart/form-data");
		response.setHeader("content-disposition", "attachment;filename=\""
				+ filename + ".doc\"");
		response.setContentType("application/msword;charset=UTF-8");
		try {
			PrintWriter out = response.getWriter();
			tem.process(dataMap, out);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
	}

	public void setDataMap(Map<String, Object> dataMap) {
		this.dataMap = dataMap;
	}

	public void putData(String key, Object value) {
		this.dataMap.put(key, value);
	}

	public static void main(String[] args) {
		// WordHandler handler = new WordHandler("C:\\YQ", "djk.ftl");
		// User user = new User();
		// user.setBmmc("测试");
		// ryjbxx.setYhzgx("户主");
		// ryjbxx.setZjlx("身份证");
		// ryjbxx.setZjhm("150101198801115782");
		// ryjbxx.setCsrq(new Date(System.currentTimeMillis()));
		// Map<String, Object> map = new HashMap<String, Object>();
		// map.put("ryjbxx", ryjbxx);
		// handler.setDataMap(map);
		// handler.createWord("C:/Users/郭爱/Desktop/out.doc");
	}

}

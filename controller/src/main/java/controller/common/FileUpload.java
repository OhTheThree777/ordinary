package controller.common;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import common.model.ResponseModelJqGrid;
import common.util.JSONHandler;
import common.util.StringProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@RequestMapping("/common/upload")
public class FileUpload {

	private static Logger logger = LoggerFactory.getLogger(FileUpload.class);

	private static String upDiv = "tempFile\\";

	/**
	 * 公共文件上传接口（客户端使用“uploadify”）。 参数：savePath 文件在服务器保存的相对路径；
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "up.json", method = RequestMethod.POST)
	public void upOne(HttpServletRequest request, HttpServletResponse response) {
		Map<String, String[]> parameterMap = request.getParameterMap(); // 通过
																		// “uploadify”上传的数据格式为Map<String,
																		// String[]>。
		Map<String, String> map = new HashMap<String, String>();
		// 客户端传入的参数转换，Map<String, String[]> -- Map<String, String>，
		// 去数组中第一个元素，同时要求客户端不要使用相同的Key传入数据。
		for (Map.Entry<String, String[]> e : parameterMap.entrySet()) {
			String key = e.getKey();
			String[] value = e.getValue();
			if (value.length > 0) {
				map.put(key, value[0]);
			}
		}

		if (StringProcessor.isNotEmptyStr(map.get("savePath"))) {
			upDiv = map.get("savePath");
		}

		ResponseModelJqGrid model = new ResponseModelJqGrid();
		List<Map<String, String>> fileInfo = null;
		try {
			fileInfo = UploadProcessing.uploder(request, upDiv);
			model.success();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("控制：处理上传文件发生异常。");
			model.error("控制：处理上传文件发生异常。");
		}

		try {
			// 设置HTTP响应头
			response.setHeader("Pragma", "No-cache");
			response.setHeader("Cache-Control", "No-cache");
			response.setDateHeader("Expires", 0);
			response.setContentType("application/json; charset=utf-8");
			if (fileInfo != null && fileInfo.size() > 0) {
				model.setList(fileInfo);
			}
			logger.info("控制：" + fileInfo);
			logger.info("数据：" + map);

			response.getWriter().write(JSONHandler.toJSON(model));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "upPic.json", method = RequestMethod.POST)
	public void upPic(HttpServletRequest request, HttpServletResponse response) {
		Map<String, String[]> parameterMap = request.getParameterMap(); // 通过
																		// “uploadify”上传的数据格式为Map<String,
																		// String[]>。
		Map<String, String> map = new HashMap<String, String>();
		// 客户端传入的参数转换，Map<String, String[]> -- Map<String, String>，
		// 去数组中第一个元素，同时要求客户端不要使用相同的Key传入数据。
		for (Map.Entry<String, String[]> e : parameterMap.entrySet()) {
			String key = e.getKey();
			String[] value = e.getValue();
			if (value.length > 0) {
				map.put(key, value[0]);
			}
		}

		if (StringProcessor.isNotEmptyStr(map.get("savePath"))) {
			upDiv = map.get("savePath");
		}

		ResponseModelJqGrid model = new ResponseModelJqGrid();
		List<Map<String, String>> fileInfo = null;
		try {
			fileInfo = UploadProcessing.uploderPic(request, upDiv);
			model.success();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("控制：处理上传文件发生异常。");
			model.error("控制：处理上传文件发生异常。");
		}

		try {
			// 设置HTTP响应头
			response.setHeader("Pragma", "No-cache");
			response.setHeader("Cache-Control", "No-cache");
			response.setDateHeader("Expires", 0);
			response.setContentType("application/json; charset=utf-8");
			if (fileInfo != null && fileInfo.size() > 0) {
				model.setList(fileInfo);
			}
			response.getWriter().write(JSONHandler.toJSON(model));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

package controller.common;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import common.util.AliyunOssUtil;
import common.util.DateUtil;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;



/**
 * 上传文件处理
 * @author qinhuan
 *
 */
public class UploadProcessing {
	
	/**
	 * 处理上传文件的request，将文件存入指定目录中，并返回文件名List
	 * @param request http请求对象
	 * @param upDiv 存储目录 （例："\\upload\\"）
	 * @return 返回request中包含的所有文件存储情况 List<Map> (结构:[{wjm: 上传文件名,ccwjm: 存储文件名,wjlj: 文件路径,uri：WEB URI}])
	 * @throws Exception 
	 */
	public static List<Map<String, String>> uploder(HttpServletRequest request, String upDiv) throws Exception {
		List<Map<String, String>> result = new ArrayList<Map<String, String>>();
		String webappRoot = System.getProperty("webapp.root");
		if (webappRoot == null) {
			webappRoot = request.getSession().getServletContext().getRealPath("/");
		}
		
		// 获取路径
		File dir = new File(webappRoot + upDiv);
		if (!dir.exists()) {
			dir.mkdirs();
		}
		
		// 转型为MultipartHttpRequest
		HttpServletRequestWrapper httpServletRequest = (HttpServletRequestWrapper)request;
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) httpServletRequest;
		
		Map<String,MultipartFile> fileMap = multipartRequest.getFileMap();
		for (Map.Entry<String, MultipartFile> e : fileMap.entrySet()) {
			String fileName = e.getValue().getOriginalFilename();
			String saveFileName = DateUtil.nowDateAddDays4Format(0, "yyyyMMddhhmmss") + fileName;
			String filePath = webappRoot + upDiv + saveFileName;
			
			// 创建路径
			File dirPath = new File((webappRoot + upDiv).replace("\\", System.getProperty("file.separator")));
			if (!dirPath.exists()) {
				dirPath.mkdir();
			}
			File uploadFile = new File(filePath.replace("\\", System.getProperty("file.separator")));
			
			// 复制文件
			FileCopyUtils.copy(e.getValue().getBytes(), uploadFile);
			//添加阿里云OSS上传
			AliyunOssUtil oss=new AliyunOssUtil();
			oss.uploadImg2Oss(filePath.replace("\\", System.getProperty("file.separator")),saveFileName);
			String fileUrl=oss.getImgUrl(saveFileName);
			// 文件信息
			Map<String, String> fileInfo = new HashMap<String, String>();
			fileInfo.put("fileName", fileName); // 文件名
			fileInfo.put("saveName", saveFileName); // 服务器存储文件名
			fileInfo.put("absolutePath", filePath); // 绝对路径 
			//fileInfo.put("uri", (upDiv + saveFileName).replace("\\", "/")); // 服务器资源相对路径
			fileInfo.put("uri", fileUrl);//阿里云文件路径
			result.add(fileInfo);
		}
		
		return result;
	}
	
	
	/**
	 * 处理上传文件的request，将文件存入指定目录中，并返回文件名List
	 * @param request http请求对象
	 * @param upDiv 存储目录 （例："\\upload\\"）
	 * @return 返回request中包含的所有文件存储情况 List<Map> (结构:[{wjm: 上传文件名,ccwjm: 存储文件名,wjlj: 文件路径,uri：WEB URI}])
	 * @throws Exception 
	 */
	public static List<Map<String, String>> uploderPic(HttpServletRequest request, String upDiv) throws Exception {
		List<Map<String, String>> result = new ArrayList<Map<String, String>>();
		String webappRoot = System.getProperty("webapp.root");
		if (webappRoot == null) {
			webappRoot = request.getSession().getServletContext().getRealPath("/");
		}
		
		// 获取路径
		String ctxPath = webappRoot + upDiv;
		File dir = new File(ctxPath);
		if (!dir.exists()) {
			dir.mkdirs();
		}
		
		// 转型为MultipartHttpRequest
		HttpServletRequestWrapper httpServletRequest = (HttpServletRequestWrapper)request;
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) httpServletRequest;
		
		Map<String,MultipartFile> fileMap = multipartRequest.getFileMap();
		for (Map.Entry<String, MultipartFile> e : fileMap.entrySet()) {
			String fileName = e.getValue().getOriginalFilename();
			String saveFileName = DateUtil.nowDateAddDays4Format(0, "yyyyMMddhhmmss") + fileName+".jpg";
			String filePath = ctxPath + saveFileName;
			
			// 创建路径
			File dirPath = new File(ctxPath.replace("\\", System.getProperty("file.separator")));
			if (!dirPath.exists()) {
				dirPath.mkdir();
			}
			File uploadFile = new File(filePath.replace("\\", System.getProperty("file.separator")));
			// 复制文件
			FileCopyUtils.copy(e.getValue().getBytes(), uploadFile);
			//添加阿里云OSS上传
			AliyunOssUtil oss=new AliyunOssUtil();
			oss.uploadImg2Oss(filePath.replace("\\", System.getProperty("file.separator")),saveFileName);
			String fileUrl=oss.getImgUrl(saveFileName);
			// 文件信息
			Map<String, String> fileInfo = new HashMap<String, String>();
			fileInfo.put("fileName", fileName); // 文件名
			fileInfo.put("saveName", saveFileName); // 服务器存储文件名
			fileInfo.put("absolutePath", filePath); // 绝对路径 
			//fileInfo.put("uri", (upDiv + saveFileName).replace("\\", "/")); // 服务器资源相对路径
			fileInfo.put("uri", fileUrl);//阿里云文件路径
			result.add(fileInfo);
		}
		
		return result;
	}
}

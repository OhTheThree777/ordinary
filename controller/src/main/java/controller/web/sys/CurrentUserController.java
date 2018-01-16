package controller.web.sys;

import common.model.ResponseModelBootstrapTable;
import common.model.ResponseModelJqGrid;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.CurrentUserService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author  do no know name
 */
@Controller
@RequestMapping("/currentUser")
public class CurrentUserController {


	@Resource
	private CurrentUserService currentUserService;
	
	/**
	 * 获得当前用户信息
	 * @return
	 */
	@RequestMapping("/getUserInfo.json")
	@ResponseBody
	public ResponseModelJqGrid doGetCurrentUser(Map<String, Object> map) {
			ResponseModelJqGrid model = currentUserService.doGetCurrentUser(map);

		return model;
	}

	/**
	 * 获得当前系统用户信息
	 * @param request
	 * @return
	 */
	@RequestMapping("getSysUserInfo.json")
	@ResponseBody
	public ResponseModelBootstrapTable getCurrentUserInfo(HttpServletRequest request){

		String userId = String.valueOf(request.getSession().getAttribute("user_id"));
		ResponseModelBootstrapTable modelBootstrapTable= currentUserService.getCurrentUserInfo(userId);
		return null;
	}

	
}

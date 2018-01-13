package controller.web.sys;

import java.util.Map;

import javax.annotation.Resource;

import common.model.ResponseModelJqGrid;
import common.util.ProxyUtil;
import common.util.SysConstants;
import mapper.model.sys.SysUser;
import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.abel533.entity.EntityMapper;


@Controller
@RequestMapping("/currentUser")
public class CurrentUserController {

	@Resource
	private EntityMapper entityMapper;

	/**
	 * 获得当前用户信息
	 *
	 * @return
	 */
	@RequestMapping("/getUserInfo.json")
	@ResponseBody
	public ResponseModelJqGrid doGetCurrentUser(Map<String, Object> map) {
		ResponseModelJqGrid model = new ResponseModelJqGrid();

		// 判断是否登录认证
		if (!SecurityUtils.getSubject().isAuthenticated()) {
			model.error("用户未登录");
			return model;
		}
		SysUser user = (SysUser) SecurityUtils.getSubject().getSession().getAttribute(SysConstants.SESSION_USER_KEY);
		if (user == null) {
			model.error("用户未登录");
			return model;
		}

		String reload = (String) map.get("reload");

		try {
			if ("1".equals(reload)) {
				user = entityMapper.selectByPrimaryKey(SysUser.class, user.getFid());
				// 向Session中添加用户对象
				SecurityUtils.getSubject().getSession().setAttribute(SysConstants.SESSION_USER_KEY, user);

			}

			model.setObject(ProxyUtil.getAgentTarget(user));
			if (model.get("obj") == null) {
				// session中没用用户对象
				throw new Exception("session中没用用户对象");
			}
		} catch (Exception e) {
			e.printStackTrace();
			model.error("未找到当前用户");
		}

		return model;
	}


}

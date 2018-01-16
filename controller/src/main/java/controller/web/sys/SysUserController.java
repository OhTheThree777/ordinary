package controller.web.sys;


import common.annotation.SystemControllerLog;
import common.model.DataBootstrapTable;
import common.model.ResponseModelBootstrapTable;
import common.util.SysConstants;
import controller.shiro.CommonRealm;
import mapper.model.sys.SysUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.SysUserService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 活动报名控制器
 * 主要来接受前端控制器数据
 *
 * @author zhangZhigang
 */
@Controller
@RequestMapping("sysuserController")
public class SysUserController {


	private static Logger logger = LoggerFactory
			.getLogger(SysUserController.class);

	@Resource
	private SysUserService sysUserService;

	/**
	 * @param dbt
	 * @return
	 */
	@SystemControllerLog(description = "查看用户")
	@RequestMapping("main.json")
	@ResponseBody
	public ResponseModelBootstrapTable main(DataBootstrapTable dbt, @RequestParam String userName, @RequestParam String phoneNo) {
		ResponseModelBootstrapTable model = sysUserService.main(dbt, userName, phoneNo);


		return model;

	}

	/**
	 * 添加
	 *
	 * @param request
	 * @param sysUser
	 * @return
	 */
	@RequestMapping("add.json")
	@ResponseBody
	public ResponseModelBootstrapTable add(HttpServletRequest request,
										   SysUser sysUser) {

		String role = request.getParameter("role");

		SysUser user = (SysUser) request.getSession().getAttribute(
				SysConstants.SESSION_USER_KEY);
		ResponseModelBootstrapTable model = sysUserService.add(role, sysUser);
		return model;
	}

	/**
	 * 查询单个信息
	 *
	 * @param request
	 * @param sysUserDetail
	 * @return
	 */
	@RequestMapping("selectObjById.json")
	@ResponseBody
	public ResponseModelBootstrapTable selectObjById(
			HttpServletRequest request, SysUser sysUserDetail) {
		ResponseModelBootstrapTable model = sysUserService.selectObjById(sysUserDetail);
		return model;
	}

	/**
	 * 修改信息
	 *
	 * @param request
	 * @param sysUser
	 * @return
	 */
	@RequestMapping("update.json")
	@ResponseBody
	//	@Transactional
	public ResponseModelBootstrapTable update(HttpServletRequest request,
											  SysUser sysUser) {
		ResponseModelBootstrapTable model;
		sysUser.setPassword(CommonRealm.encryptionBySha256Hash(sysUser.getPwdText()));
		String role = request.getParameter("role");

		model = sysUserService.update(role, sysUser);
		////		if (role != null) {
		////
		////		} else {
		////			model = sysUserService.update(sysUser);
		////		}
		return model;
	}

	/**
	 * 删除信息
	 *
	 * @param request
	 * @param sysUserDetail
	 * @return
	 */
	@RequestMapping("del.json")
	@ResponseBody
	public ResponseModelBootstrapTable del(HttpServletRequest request,
										   SysUser sysUserDetail) {
		ResponseModelBootstrapTable model = sysUserService.del(sysUserDetail);
		return model;
	}

	/**
	 * 获取角色信息
	 *
	 * @param request
	 * @return
	 */
	@RequestMapping("findRoles.json")
	@ResponseBody
	public ResponseModelBootstrapTable findRoles(HttpServletRequest request) {


		ResponseModelBootstrapTable model = sysUserService.findRoles();
		return model;
	}

	/**
	 * 获取角色修改信息
	 *
	 * @param request
	 * @return
	 */
	@RequestMapping("findRolesByUserId.json")
	@ResponseBody
	public ResponseModelBootstrapTable findRolesByUserId(
			HttpServletRequest request) {
		String pid = request.getParameter("id");

		ResponseModelBootstrapTable model = sysUserService.findRolesByUserId(pid);

		return model;
	}

	/**
	 * 查询菜单信息，用于用户登陆授权使用
	 *
	 * @param request
	 * @return
	 */
	@RequestMapping("findMenus.json")
	@ResponseBody
	public ResponseModelBootstrapTable findMenus(HttpServletRequest request) {

		SysUser user = (SysUser) request.getSession().getAttribute(
				SysConstants.SESSION_USER_KEY);
		ResponseModelBootstrapTable model = sysUserService.findMenus(user);


		return model;

	}

	/**
	 * 退出清除session
	 *
	 * @param request
	 */
	@RequestMapping("logout.json")
	@ResponseBody
	public void logout(HttpServletRequest request) {
		request.getSession().invalidate();
	}

}

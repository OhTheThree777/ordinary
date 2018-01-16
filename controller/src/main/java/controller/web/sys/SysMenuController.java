package controller.web.sys;

import common.model.DataBootstrapTable;
import common.model.ResponseModelBootstrapTable;
import common.util.SysConstants;
import mapper.model.sys.SysMenu;
import mapper.model.sys.SysUser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.SysMenuService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;


/**
 * 权限控制器
 * 主要来接受前端控制器数据
 * @author zhangZhigang
 * 
 *
 *
 */
@Controller
@RequestMapping("sysmenuController")
public class SysMenuController {

	private static final String roleId = null;

	private static Logger logger = LoggerFactory
			.getLogger(SysMenuController.class);
	
	@Resource
	private SysMenuService sysMenuService;

	/**
	 *
	 * @param dbt
	 * @param request
	 * @param sysMenu
	 * @return
	 */
	@RequestMapping("main.json")
	@ResponseBody
	public ResponseModelBootstrapTable main(DataBootstrapTable dbt, HttpServletRequest request, SysMenu sysMenu, @RequestParam String menuName, @RequestParam String menuType) {
		ResponseModelBootstrapTable model = sysMenuService.main(dbt,menuName,menuType);
		return model;

	}

	/**
	 * 添加
	 * 
	 * @param request
	 * @param sysMenu
	 * @return
	 */
	@RequestMapping("add.json")
	@ResponseBody
	public ResponseModelBootstrapTable add(HttpServletRequest request,
			SysMenu sysMenu) {

		ResponseModelBootstrapTable model = sysMenuService.add(sysMenu);
		return model;
	}

	/**
	 * 查询单个信息
	 * 
	 * @param request
	 * @param sysMenuDetail
	 * @return
	 */
	@RequestMapping("selectObjById.json")
	@ResponseBody
	public ResponseModelBootstrapTable selectObjById(
			HttpServletRequest request, SysMenu sysMenuDetail) {
		ResponseModelBootstrapTable model = sysMenuService.selectObjById(sysMenuDetail);
		return model;
	}

	/**
	 * 修改信息
	 * 
	 * @param request
	 * @param sysMenuDetail
	 * @return
	 */
	@RequestMapping("update.json")
	@ResponseBody
	public ResponseModelBootstrapTable update(HttpServletRequest request,
			SysMenu sysMenuDetail) {
		ResponseModelBootstrapTable model = sysMenuService.update(sysMenuDetail);
		return model;
	}

	/**
	 * 删除信息
	 * 
	 * @param request
	 * @param sysMenuDetail
	 * @return
	 */
	@RequestMapping("del.json")
	@ResponseBody
	public ResponseModelBootstrapTable del(HttpServletRequest request,
			SysMenu sysMenuDetail) {
		ResponseModelBootstrapTable model = sysMenuService.del(sysMenuDetail);
		return model;
	}

	/**
	 * 获取所有用户菜单信息，用于添加菜单使用
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("findMenuAll.json")
	@ResponseBody
	public ResponseModelBootstrapTable findMenuAll(HttpServletRequest request) {
		ResponseModelBootstrapTable model = sysMenuService.findMenuAll();
		return model;
	}


	@ResponseBody
	@RequestMapping("findPrebyMenuid.json")
	public ResponseModelBootstrapTable findPreByMenuId(HttpServletRequest request){
		//TODO shiro work
        ResponseModelBootstrapTable modelBootstrapTable ;
		String menuId=request.getParameter("menuId");
		Subject subject= SecurityUtils.getSubject();
		Session session=subject.getSession();
		SysUser sysUser = (SysUser) SecurityUtils.getSubject().getSession()
				.getAttribute(SysConstants.SESSION_USER_KEY);
		String userId = String.valueOf(sysUser.getId());
		System.out.println(userId+menuId);
		modelBootstrapTable = sysMenuService.findPreByMenuId(menuId,userId);
		return modelBootstrapTable;
	}

}

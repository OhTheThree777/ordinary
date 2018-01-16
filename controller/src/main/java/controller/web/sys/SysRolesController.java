package controller.web.sys;


import common.model.DataBootstrapTable;
import common.model.ResponseModelBootstrapTable;
import mapper.model.sys.SysRoles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.SysRolesService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * 角色控制器
 *主要来接受前端控制器数据
 * @author zhangZhigang
 *
 *
 *
 */
@Controller
@RequestMapping("sysrolesController")
public class SysRolesController {

	private static final String roleId = null;

	// 注入Dao层操作对象

	private static Logger logger = LoggerFactory
			.getLogger(SysRolesController.class);
	
	@Resource
	private SysRolesService sysRolesService;

	/**
	 *
	 * @param dbt
	 * @return
	 */
	@RequestMapping("main.json")
	@ResponseBody
	public ResponseModelBootstrapTable main(DataBootstrapTable dbt, @RequestParam String roleName, @RequestParam String roleDesc, @RequestParam String roleType) {

		ResponseModelBootstrapTable model = sysRolesService.main(dbt,roleName,roleDesc,roleType);

		return model;

	}

	/**
	 * 添加
	 *
	 * @param request
	 * @param sysRoles
	 * @return
	 */
	@RequestMapping("add.json")
	@ResponseBody
	public ResponseModelBootstrapTable add(HttpServletRequest request,
										   SysRoles sysRoles) {
		ResponseModelBootstrapTable model = sysRolesService.add(sysRoles);

		return model;
	}

	/**
	 * 查询单个信息
	 *
	 * @param request
	 * @param  sysRolesDetail
	 * @return
	 */
	@RequestMapping("selectObjById.json")
	@ResponseBody
	public ResponseModelBootstrapTable selectObjById(
			HttpServletRequest request, SysRoles sysRolesDetail) {
		ResponseModelBootstrapTable model = sysRolesService.selectObjById(sysRolesDetail);
		return model;
	}

	/**
	 * 修改信息
	 *
	 * @param request
	 * @param sysRolesDetail
	 * @return
	 */
	@RequestMapping("update.json")
	@ResponseBody
	public ResponseModelBootstrapTable update(HttpServletRequest request,
											  SysRoles sysRolesDetail) {
		ResponseModelBootstrapTable model = sysRolesService.update(sysRolesDetail);
		return model;
	}

	/**
	 * 删除信息
	 *
	 * @param request
	 * @param sysRolesDetail
	 * @return
	 */
	@RequestMapping("del.json")
	@ResponseBody
	public ResponseModelBootstrapTable del(HttpServletRequest request,
										   SysRoles sysRolesDetail) {
		ResponseModelBootstrapTable model = sysRolesService.del(sysRolesDetail);
		return model;
	}

	/**
	 * 查询指定角色的权限树
	 *
	 * @param request
	 * @return 查询结果数据（ResponseModel）
	 */
	@RequestMapping("getMenuTree.json")
	@ResponseBody
	public ResponseModelBootstrapTable doGetMenuTree(HttpServletRequest request) {
		String id=request.getParameter("id");
		if(null==id||"".equals(id)){
			id="2";
		}
		Integer i_id=Integer.parseInt(id);
		ResponseModelBootstrapTable model = sysRolesService.doGetMenuTree(i_id);

		return model;
	}

	/**
	 * 给指定角色授权
	 *
	 * @param map
	 * @return 服务器处理结果（ResponseModel）
	 */
	@RequestMapping("authorize.json")
	@ResponseBody
	public ResponseModelBootstrapTable doAuthorizeRole(
			HttpServletRequest request,@RequestBody Map<String,Object> map) {
		ResponseModelBootstrapTable model = sysRolesService.doAuthorizeRole(map);
		return model;
	}

}

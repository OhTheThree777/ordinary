package service;

import cn.imfc.common.model.DataBootstrapTable;
import cn.imfc.common.model.ResponseModelBootstrapTable;
import cn.imfc.mapper.model.sys.SysUser;

import java.util.List;

/**
 * 活动报名控制器
 * 主要来接受前端控制器数据
 * Created by r958403448 on 2017/7/27.
 */
public interface SysUserService {
	/**
	 * @param dbt
	 * @return
	 */
	ResponseModelBootstrapTable main(DataBootstrapTable dbt, String userName, String phoneNo);
	//ResponseModelBootstrapTable main(DataBootstrapTable dbt,
	//                                  SysUser sysUser);

	/**
	 * 添加
	 *
	 * @param role
	 * @param sysUser
	 * @return
	 */
	ResponseModelBootstrapTable add(String role, SysUser sysUser);

	/**
	 * 查询单个信息
	 *
	 * @param sysUserDetail
	 * @return
	 */
	ResponseModelBootstrapTable selectObjById(SysUser sysUserDetail);

	/**
	 * 修改信息
	 *
	 * @param role
	 * @param sysUser
	 * @return
	 */
	ResponseModelBootstrapTable update(String role, SysUser sysUser);

	/**
	 * 删除信息
	 *
	 * @param sysUserDetail
	 * @return
	 */
	ResponseModelBootstrapTable del(SysUser sysUserDetail);

	/**
	 * 获取角色信息
	 *
	 * @return
	 */
	ResponseModelBootstrapTable findRoles();

	/**
	 * 获取角色修改信息
	 *
	 * @param pid
	 * @return
	 */
	ResponseModelBootstrapTable findRolesByUserId(
			String pid);

	/**
	 * 查询菜单信息，用于用户登陆授权使用
	 *
	 * @param user
	 * @return
	 */
	ResponseModelBootstrapTable findMenus(SysUser user);

	//ResponseModelBootstrapTable findMenus(HttpServletRequest request);


	List<SysUser> findUsers(String username);


}



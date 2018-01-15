package service;

import common.model.DataBootstrapTable;
import common.model.ResponseModelBootstrapTable;
import mapper.model.sys.SysRoles;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

/**
 *  角色控制器
 *主要来接受前端控制器数据
 * Created by r958403448 on 2017/7/27.
 */
public interface SysRolesService  {
    /**
     *
     * @param dbt
     * @return
     */
    ResponseModelBootstrapTable main(DataBootstrapTable dbt, String roleName, String roleDesc, String roleType);

    /**
     *添加
     * @param sysRoles
     * @return
     */
    ResponseModelBootstrapTable add(
			SysRoles sysRoles);

    /**
     *查询单个信息
     * @param sysRolesDetail
     * @return
     */
    ResponseModelBootstrapTable selectObjById(
			SysRoles sysRolesDetail);

    /**
     *修改信息
     * @param sysRolesDetail
     * @return
     */
    ResponseModelBootstrapTable update(
			SysRoles sysRolesDetail);

    /**
     *删除信息
     * @param sysRolesDetail
     * @return
     */
    ResponseModelBootstrapTable del(
			SysRoles sysRolesDetail);

    /**
     *查询指定角色的权限树
     * @param id
     * @return
     */
    ResponseModelBootstrapTable doGetMenuTree(Integer id);

    /**
     *给指定角色授权
     * @param map
     * @return
     */
    ResponseModelBootstrapTable doAuthorizeRole(
			@RequestBody Map<String, Object> map);
}

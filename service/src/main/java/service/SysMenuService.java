package service;

import common.model.DataBootstrapTable;
import common.model.ResponseModelBootstrapTable;
import mapper.model.sys.SysMenu;

/**
 * 权限控制器
 * 主要来接受前端控制器数据
 * Created by r958403448 on 2017/7/27.
 */
public interface SysMenuService {
    /**
     *
     * @param dbt
     *
     * @return
     */
    ResponseModelBootstrapTable main(DataBootstrapTable dbt, String menuName, String menuType);

    /**
     * 添加
     *
     * @param sysMenu
     * @return
     */
    ResponseModelBootstrapTable add(SysMenu sysMenu);

    /**
     * 查询单个信息
     *
     * @param sysMenuDetail
     * @return
     */
    ResponseModelBootstrapTable selectObjById(SysMenu sysMenuDetail);

    /**
     *修改信息
     * @param sysMenuDetail
     * @return
     */
    ResponseModelBootstrapTable update(SysMenu sysMenuDetail);

    /**
     *删除信息
     * @param sysMenuDetail
     * @return
     */
    ResponseModelBootstrapTable del(SysMenu sysMenuDetail);

    /**
     *获取所有用户菜单信息，用于添加菜单使用
     * @return
     */
    ResponseModelBootstrapTable findMenuAll();

    ResponseModelBootstrapTable findPreByMenuId(String menuid, String userId);



}

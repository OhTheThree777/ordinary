package service.impl;

import common.model.DataBootstrapTable;
import common.model.ResponseModelBootstrapTable;
import common.util.Page;
import mapper.mapper.sys.SysMenuMapper;
import mapper.mapper.sys.SysRelationMenuRoleMapper;
import mapper.mapper.sys.SysRolesMapper;
import mapper.mapper.sys.VSysRoleMenuMapper;
import mapper.model.sys.SysMenu;
import mapper.model.sys.SysRelationMenuRole;
import mapper.model.sys.SysRoles;
import mapper.model.sys.VSysRoleMenu;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.SysRolesService;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 角色控制器
 * 主要来接受前端控制器数据
 * Created by r958403448 on 2017/7/27.
 */
@Service
public class SysRolesServiceImpl implements SysRolesService {

    private static final String roleId = null;

    // 注入Dao层操作对象
    @Resource
    private SysRolesMapper sysRolesMapper;
    @Resource
    private VSysRoleMenuMapper vSysRoleMenuMapper;
    @Resource
    private SysMenuMapper sysMenuMapper;
    @Resource
    private SysRelationMenuRoleMapper sysRelationMenuRoleMapper;

    private static Logger logger = LoggerFactory
            .getLogger(SysRolesServiceImpl.class);

    /**
     * '
     *
     * @param dbt
     * @return
     */
    @Override
    public ResponseModelBootstrapTable main(DataBootstrapTable dbt, String roleName, String roleDesc, String roleType) {

        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
            try {
                Integer offset = dbt.getOffset();
                Integer pageSize = dbt.getLimit();
                Integer currentPage = 1;
                if (offset == 0) {
                    currentPage = 1;
                } else {
                    currentPage = (pageSize + offset) / pageSize;
                }

                Page page = new Page(currentPage, pageSize);

                Example example = new Example(SysRoles.class);
                Example.Criteria cri = example.createCriteria();
                if(!roleType.equals("0") && ((roleName.isEmpty() || roleName == null) && (roleDesc.isEmpty() || roleDesc == null))) {
                    cri.andEqualTo("roleType",roleType);
                }
                if (roleType.equals("0") && ((!roleName.isEmpty() || roleName != null) && (!roleDesc.isEmpty() || roleDesc != null))){
                    cri.andLike("roleName","%"+roleName+"%");
                    cri.andLike("roleDesc","%"+roleDesc+"%");
                }
                List<?> sysroles = null;
                if (currentPage == null || pageSize == null) {
                    sysroles = sysRolesMapper.selectByExample(example);
                } else {
                    sysroles = sysRolesMapper.selectByExampleAndRowBounds(example,
                            new RowBounds(page.getStartLine(), pageSize));
                }
                page.setTotalLine(sysRolesMapper.selectCountByExample(example));

                model.bing(sysroles, page.getTotalLine(), page.getTotalPage());
            } catch (Exception e) {
                model.error();
                logger.error("Controller:条件查询人员信息发送异常。 -- " + e.getMessage());
            }
        return model;
    }

    /**
     * 添加
     *
     * @param sysRoles
     * @return
     */
    @Override
    public ResponseModelBootstrapTable add(SysRoles sysRoles) {
        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
         sysRoles.setCreateTime(new Date());
        sysRolesMapper.insertSelective(sysRoles);
        model.success();
        return model;
    }

    /**
     * 查询单个信息
     *
     * @param sysRolesDetail
     * @return
     */
    @Override
    public ResponseModelBootstrapTable selectObjById(SysRoles sysRolesDetail) {
        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        sysRolesDetail = sysRolesMapper.selectByPrimaryKey(sysRolesDetail);
        model.setObject(sysRolesDetail);
        return model;
    }

    /**
     * 修改信息
     *
     * @param sysRolesDetail
     * @return
     */
    @Override
    public ResponseModelBootstrapTable update(SysRoles sysRolesDetail) {
        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        sysRolesMapper.updateByPrimaryKeySelective(sysRolesDetail);
        model.setObject(sysRolesDetail);
        return model;
    }

    /**
     * 删除信息
     *
     * @param sysRolesDetail
     * @return
     */
    @Override
    public ResponseModelBootstrapTable del(SysRoles sysRolesDetail) {
        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        sysRolesMapper.deleteByPrimaryKey(sysRolesDetail);
        model.setObject(sysRolesDetail);
        return model;
    }

    /**
     * 查询指定角色的权限树
     *
     * @param id
     * @return
     */
    @Override
    public ResponseModelBootstrapTable doGetMenuTree(Integer id) {
        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        try {
            Example example = new Example(VSysRoleMenu.class);
            Example.Criteria cri = example.createCriteria();
            cri.andEqualTo("roleId", id);
            List<VSysRoleMenu> list = vSysRoleMenuMapper.selectByExample(example);
            List<SysMenu> menus = sysMenuMapper.selectAll();
            for (SysMenu sysMenu : menus) {
                Map<String, Object> treeNode = new HashMap<String, Object>();
                treeNode.put("id", sysMenu.getId());
                treeNode.put("pId", sysMenu.getParentId());
                treeNode.put("name", sysMenu.getMenuName());
                boolean checked = false;
                for (VSysRoleMenu vSysRoleMenu : list) {
                    if (sysMenu.getId().toString()
                            .equals(vSysRoleMenu.getMenuId().toString())) {
                        checked = true;
                    }
                }
                treeNode.put("checked", checked);
                model.add2List(treeNode);
            }
            model.success();
        } catch (Exception e) {
            e.printStackTrace();
            model.error();
        }
        return model;
    }

    /**
     * 给指定角色授权
     *
     * @param map
     * @return
     */
    @Override
    public ResponseModelBootstrapTable doAuthorizeRole(Map<String, Object> map) {
        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        Integer add = 0;
        Integer del = 0;
        try {
            Integer id = Integer
                    .parseInt(map.get("id").toString());

            List<Map<String, Object>> list = (List<Map<String, Object>>) map.get("list");
            for (Map<String, Object> m : list) {
                Integer pId = Integer.parseInt(m.get("id").toString());
                Boolean checked = (Boolean) m.get("checked");
                // 给角色删除权限
                Example example = new Example(SysRelationMenuRole.class);
                Example.Criteria cri = example.createCriteria();
                cri.andEqualTo("roleId", id);
                cri.andEqualTo("menuId", pId);
                del += sysRelationMenuRoleMapper.deleteByExample(example);
                if (checked) {
                    // 给角色增加权限
                    SysRelationMenuRole rp = new SysRelationMenuRole();
                    rp.setRoleId(id);
                    rp.setMenuId(pId);
                    add += sysRelationMenuRoleMapper.insertSelective(rp);
                }
            }

            model.success("成功为角色[" + id + "]，增加[" + add + "]个权限，删除[" + del
                    + "]个权限。");
        } catch (Exception e) {
            e.printStackTrace();
            model.error();
        }
        return model;
    }
}

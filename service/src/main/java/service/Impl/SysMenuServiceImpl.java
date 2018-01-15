package service.Impl;

import common.model.DataBootstrapTable;
import common.model.ResponseModelBootstrapTable;
import common.util.Page;
import mapper.mapper.sys.SysMenuMapper;
import mapper.mapper.sys.VSysUserMenuMapper;
import mapper.model.sys.SysMenu;
import mapper.model.sys.VSysUserMenu;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import service.SysMenuService;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.List;

/**
 * 权限控制器
 * 主要来接受前端控制器数据
 * Created by r958403448 on 2017/7/27.
 */
@Service
public class SysMenuServiceImpl implements SysMenuService {
    private static final String roleId = null;

    // 注入Dao层操作对象
    @Resource
    private SysMenuMapper sysMenuMapper;

    @Resource
    private VSysUserMenuMapper vSysUserMenuMapper;

    private static Logger logger = LoggerFactory
            .getLogger(SysMenuServiceImpl.class);

    /**
     *
     * @param dbt
     * @return
     */
    @Override
    public ResponseModelBootstrapTable main(DataBootstrapTable dbt, String menuName, String menuType) {

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

                Example example = new Example(SysMenu.class);
                Example.Criteria cri = example.createCriteria();
                if(!menuType.equals("0") && (menuName.isEmpty() || menuName == null)){
                    cri.andEqualTo("menuType",menuType);
                }
                if (menuType.equals("0") && (!menuName.isEmpty() || menuName != null)){
                    cri.andLike("menuName","%"+menuName+"%");
                }
                List<?> sysmenu = null;
                if (currentPage == null || pageSize == null) {
                    sysmenu = sysMenuMapper.selectByExample(example);
                } else {
                    // if (null != sidx && !"".equals(sidx)) {
                    // example.setOrderByClause(sidx + " " + sord);
                    // }
                    sysmenu = sysMenuMapper.selectByExampleAndRowBounds(example,
                            new RowBounds(page.getStartLine(), pageSize));
                }
                page.setTotalLine(sysMenuMapper.selectCountByExample(example));

                model.bing(sysmenu, page.getTotalLine(), page.getTotalPage());
            } catch (Exception e) {
                model.error();
                logger.error("Controller:条件查询人员信息发送异常。 -- " + e.getMessage());
            }
        return model;
    }

    /**
     * 添加
     *
     * @param sysMenu
     * @return
     */
    @Override
    public ResponseModelBootstrapTable add(SysMenu sysMenu) {

        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        sysMenuMapper.insertSelective(sysMenu);
        model.success();
        return model;
    }

    /**
     * 查询单个信息
     *
     * @param sysMenuDetail
     * @return
     */
    @Override
    public ResponseModelBootstrapTable selectObjById( SysMenu sysMenuDetail) {
        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        sysMenuDetail = sysMenuMapper.selectByPrimaryKey(sysMenuDetail);
        model.setObject(sysMenuDetail);
        return model;
    }

    /**
     *修改信息
     * @param sysMenuDetail
     * @return
     */
    @Override
    public ResponseModelBootstrapTable update( SysMenu sysMenuDetail) {
        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        sysMenuMapper.updateByPrimaryKeySelective(sysMenuDetail);
        model.setObject(sysMenuDetail);
        return model;
    }

    /**
     *删除信息
     * @param sysMenuDetail
     * @return
     */
    @Override
    public ResponseModelBootstrapTable del( SysMenu sysMenuDetail) {
        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        sysMenuMapper.deleteByPrimaryKey(sysMenuDetail);
        model.setObject(sysMenuDetail);
        return model;
    }

    /**
     *获取所有用户菜单信息，用于添加菜单使用
     * @return
     */
    @Override
    public ResponseModelBootstrapTable findMenuAll() {
        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        List<SysMenu> menus = sysMenuMapper.selectAll();
        model.setList(menus);
        return model;
    }

    @Override
    public ResponseModelBootstrapTable findPreByMenuId(String menuid, String userId) {
        ResponseModelBootstrapTable modelBootstrapTable = new ResponseModelBootstrapTable();
        Example example = new Example(VSysUserMenu.class);
        Example.Criteria cri = example.createCriteria();
        cri.andEqualTo("parentId",menuid).andEqualTo("userId",userId);
        modelBootstrapTable.setObject(vSysUserMenuMapper.selectByExample(example));
        return modelBootstrapTable;
    }
}

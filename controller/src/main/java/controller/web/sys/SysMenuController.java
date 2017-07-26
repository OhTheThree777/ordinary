package controller.web.sys;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import common.model.DataBootstrapTable;
import common.model.ResponseModelBootstrapTable;
import common.util.Page;
import common.util.SysConstants;
import mapper.mapper.sys.SysMenuMapper;
import mapper.model.sys.SysMenu;
import mapper.model.sys.SysUser;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

/**
 * 权限控制器
 * 
 * @author zhangZhigang
 * 
 *         主要来接受前端控制器数据
 *
 */
@Controller
@RequestMapping("sysmenuController")
public class SysMenuController {

	private static final String roleId = null;

	// 注入Dao层操作对象
	@Resource
	private SysMenuMapper sysMenuMapper;

	private static Logger logger = LoggerFactory
			.getLogger(SysMenuController.class);

	@RequestMapping("main.json")
	@ResponseBody
	public ResponseModelBootstrapTable main(DataBootstrapTable dbt,
											HttpServletRequest request, SysMenu sysMenu) {
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
			Criteria cri = example.createCriteria();
			// if (null != roles.getName() && !"".equals(roles.getName())) {
			// cri.andEqualTo("name", roles.getName());
			// }

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
	 * @param request
	 * @param sysMenu
	 * @return
	 */
	@RequestMapping("add.json")
	@ResponseBody
	public ResponseModelBootstrapTable add(HttpServletRequest request,
			SysMenu sysMenu) {

		SysUser user = (SysUser) request.getSession().getAttribute(
				SysConstants.SESSION_USER_KEY);
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		// sysRoles.setCreatetime(new Date());
		// sysRoles.setRoleId(new Long(roleId));
		sysMenuMapper.insertSelective(sysMenu);
		model.success();
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
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysMenuDetail = sysMenuMapper.selectByPrimaryKey(sysMenuDetail);
		model.setObject(sysMenuDetail);
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
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysMenuMapper.updateByPrimaryKeySelective(sysMenuDetail);
		model.setObject(sysMenuDetail);
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
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysMenuMapper.deleteByPrimaryKey(sysMenuDetail);
		model.setObject(sysMenuDetail);
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
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		List<SysMenu> menus = sysMenuMapper.selectAll();
		model.setList(menus);
		return model;
	}

}

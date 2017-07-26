package controller.web.sys;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import common.model.DataBootstrapTable;
import common.model.ResponseModelBootstrapTable;
import common.util.Page;
import common.util.SysConstants;
import mapper.mapper.sys.SysMenuMapper;
import mapper.mapper.sys.SysRelationMenuRoleMapper;
import mapper.mapper.sys.SysRolesMapper;
import mapper.mapper.sys.VSysRoleMenuMapper;
import mapper.model.sys.*;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
//import org.sonatype.guice.plexus.config.Roles;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

/**
 * 角色控制器
 * 
 * @author zhangZhigang
 * 
 *         主要来接受前端控制器数据
 *
 */
@Controller
@RequestMapping("sysrolesController")
public class SysRolesController {

	private static final String roleId = null;

	// 注入Dao层操作对象
	@Resource
	private SysRolesMapper sysRolesMapper;
	@Autowired
	private VSysRoleMenuMapper sysRoleMenuMapper;
	@Autowired
	private SysMenuMapper sysMenuMapper;
	@Autowired
	private SysRelationMenuRoleMapper sysRelationMenuRoleMapper;

	private static Logger logger = LoggerFactory
			.getLogger(SysRolesController.class);

	@RequestMapping("main.json")
	@ResponseBody
	public ResponseModelBootstrapTable main(DataBootstrapTable dbt,
											HttpServletRequest

			request, SysRoles sysRoles) {
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
			Criteria cri = example.createCriteria();
			// if (null != roles.getName() && !"".equals(roles.getName())) {
			// cri.andEqualTo("name", roles.getName());
			// }

			List<?> sysroles = null;
			if (currentPage == null || pageSize == null) {
				sysroles = sysRolesMapper.selectByExample(example);
			} else {
				// if (null != sidx && !"".equals(sidx)) {
				// example.setOrderByClause(sidx + " " + sord);
				// }
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
	 * @param request
	 * @param sysRoles
	 * @return
	 */
	@RequestMapping("add.json")
	@ResponseBody
	public ResponseModelBootstrapTable add(HttpServletRequest request,
			SysRoles sysRoles) {

		SysUser user = (SysUser) request.getSession().getAttribute(
				SysConstants.SESSION_USER_KEY);
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		// sysRoles.setCreatetime(new Date());
		// sysRoles.setRoleId(new Long(roleId));
		sysRolesMapper.insertSelective(sysRoles);
		model.success();
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
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysRolesDetail = sysRolesMapper.selectByPrimaryKey(sysRolesDetail);
		model.setObject(sysRolesDetail);
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
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysRolesMapper.updateByPrimaryKeySelective(sysRolesDetail);
		model.setObject(sysRolesDetail);
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
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysRolesMapper.deleteByPrimaryKey(sysRolesDetail);
		model.setObject(sysRolesDetail);
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
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		try {

			Integer id = Integer
					.parseInt(request.getParameter("id").toString());

			Example example = new Example(VSysRoleMenu.class);
			Criteria cri = example.createCriteria();
			cri.andEqualTo("roleId", id);
			List<VSysRoleMenu> list = sysRoleMenuMapper
					.selectByExample(example);

			List<SysMenu> menus = sysMenuMapper.selectAll();
			for (SysMenu sysMenu : menus) {
				Map<String, Object> treeNode = new HashMap<String, Object>();
				treeNode.put("id", sysMenu.getMenuId());
				treeNode.put("pId", sysMenu.getParentId());
				treeNode.put("name", sysMenu.getMenuName());
				boolean checked = false;
				for (VSysRoleMenu p1 : list) {
					if (sysMenu.getMenuId().toString()
							.equals(p1.getMenuId().toString())) {
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
	 * @return 服务器处理结果（ResponseModel）
	 */
	@RequestMapping("authorize.json")
	@ResponseBody
	public ResponseModelBootstrapTable doAuthorizeRole(
			HttpServletRequest request,@RequestBody Map<String,Object> map) {
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		Integer add = 0;
		Integer del = 0;
		try {
			Integer id = Integer
					.parseInt(map.get("id").toString());
			
			List<Map<String,Object>> list=(List<Map<String, Object>>) map.get("list");
			for (Map<String, Object> m : list) {
				Integer pId = Integer.parseInt(m.get("id").toString());
				Boolean checked = (Boolean) m.get("checked");
				// 给角色删除权限
				Example example=new Example(SysRelationMenuRole.class);
				Criteria cri = example.createCriteria();
				cri.andEqualTo("roleId", id);
				cri.andEqualTo("menuId",pId);
				del += sysRelationMenuRoleMapper.deleteByExample(example);
				if (checked) {
					// 给角色增加权限
					SysRelationMenuRole rp = new SysRelationMenuRole();
					rp.setRoleId(id);
					rp.setMenuId(pId.toString());
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

package controller.web.sys;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import common.model.*;
import common.util.Page;
import common.util.SysConstants;
import controller.shiro.CommonRealm;
import mapper.mapper.sys.SysRelationUserRoleMapper;
import mapper.mapper.sys.SysRolesMapper;
import mapper.mapper.sys.SysUserMapper;
import mapper.mapper.sys.VSysUserMenuMapper;
import mapper.model.sys.SysRelationUserRole;
import mapper.model.sys.SysRoles;
import mapper.model.sys.SysUser;
import mapper.model.sys.VSysUserMenu;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;
import tk.mybatis.mapper.entity.Example.OrderBy;

/**
 * 活动报名控制器
 * 
 * @author zhangZhigang
 * 
 *         主要来接受前端控制器数据
 *
 */
@Controller
@RequestMapping("sysuserController")
public class SysUserController {

	// 注入Dao层操作对象
	@Resource
	private SysUserMapper sysUserMapper;
	@Resource
	private SysRolesMapper sysRolesMapper;
	@Resource
	private SysRelationUserRoleMapper sysRelationUserRoleMapper;

	@Resource
	private VSysUserMenuMapper sysUserMenuMapper;
	private static Logger logger = LoggerFactory
			.getLogger(SysUserController.class);

	@RequestMapping("main.json")
	@ResponseBody
	public ResponseModelBootstrapTable main(DataBootstrapTable dbt,
											HttpServletRequest request, SysUser sysUser) {
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

			Example example = new Example(SysUser.class);
			Criteria cri = example.createCriteria();
			if(null!=dbt.getSearch()&&!"".equals(dbt.getSearch())){
				cri.andLike("catName","%"+dbt.getSearch()+"%");
			}
			List<?> sysuser = null;
			if (currentPage == null || pageSize == null) {
				sysuser = sysUserMapper.selectByExample(example);
			} else {
				if (null != dbt.getSort() && !"".equals(dbt.getSort())) {
					OrderBy orderby = example.orderBy(dbt.getSort());
					if ("asc".equals(dbt.getOrder())) {
						orderby.asc();
					}else{
						orderby.desc();
					}

				}
				sysuser = sysUserMapper.selectByExampleAndRowBounds(example,
						new RowBounds(page.getStartLine(), pageSize));
			}
			page.setTotalLine(sysUserMapper.selectCountByExample(example));

			model.bing(sysuser, page.getTotalLine(), page.getTotalPage());
		} catch (Exception e) {
			model.error();
			logger.error("Controller:条件查询用户信息发送异常。 -- " + e.getMessage());
		}

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
		String[] roles = role.split(",");

		SysUser user = (SysUser) request.getSession().getAttribute(
				SysConstants.SESSION_USER_KEY);

		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysUser.setFid(new Long(0));
		sysUser.setPassword(CommonRealm.encryptionBySha256Hash(sysUser
				.getPwdtext()));
		sysUser.setCreatetime(new Date());
		sysUserMapper.insertSelective(sysUser);
		for (int i = 0; i < roles.length; i++) {
			SysRelationUserRole userRole = new SysRelationUserRole();
			userRole.setUserId(sysUser.getPid());
			userRole.setRoleId(Long.parseLong(roles[i]));
			sysRelationUserRoleMapper.insertSelective(userRole);
		}
		model.success();
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
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysUserDetail = sysUserMapper.selectByPrimaryKey(sysUserDetail);
		model.setObject(sysUserDetail);
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
	@Transactional
	public ResponseModelBootstrapTable update(HttpServletRequest request,
			SysUser sysUser) {
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysUser.setPassword(CommonRealm.encryptionBySha256Hash(sysUser
				.getPwdtext()));
		sysUserMapper.updateByPrimaryKeySelective(sysUser);
		model.setObject(sysUser);
		String role = request.getParameter("role");
		String[] roles = role.split(",");
		Example example = new Example(SysRelationUserRole.class);
		example.createCriteria().andEqualTo("userId", sysUser.getPid());
		sysRelationUserRoleMapper.deleteByExample(example);
		for (int i = 0; i < roles.length; i++) {
			SysRelationUserRole userRole = new SysRelationUserRole();
			userRole.setUserId(sysUser.getPid());
			userRole.setRoleId(Long.parseLong(roles[i]));
			sysRelationUserRoleMapper.insertSelective(userRole);
		}
		model.success();
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
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysUserMapper.deleteByPrimaryKey(sysUserDetail);
		model.setObject(sysUserDetail);
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

		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		List<SysRoles> roles = sysRolesMapper.selectAll();
		model.setList(roles);
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
		String userId = request.getParameter("pid");
		Example example = new Example(SysRelationUserRole.class);

		Criteria cri = example.createCriteria();
		cri.andEqualTo("userId", userId);
		List<SysRelationUserRole> userRoles = sysRelationUserRoleMapper
				.selectByExample(example);
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		List<SysRoles> roles = sysRolesMapper.selectAll();
		List<Role> returnRoles = new ArrayList<Role>();
		for (SysRoles sysRoles : roles) {
			Role ro = new Role();
			ro.setRoleId(sysRoles.getRoleId().toString());
			ro.setRoleName(sysRoles.getRoleName());
			ro.setCheck("2");
			for (SysRelationUserRole userRole : userRoles) {
				if (sysRoles.getRoleId() == userRole.getRoleId()) {
					ro.setCheck("1");
				}
			}
			returnRoles.add(ro);
		}
		roles.clear();
		userRoles.clear();

		model.setList(returnRoles);
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

		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		SysUser user = (SysUser) request.getSession().getAttribute(
				SysConstants.SESSION_USER_KEY);
		try {
			Example example = new Example(VSysUserMenu.class);
			Criteria cri = example.createCriteria();
			cri.andEqualTo("userId", user.getPid());

			List<VSysUserMenu> userMenus = sysUserMenuMapper
					.selectByExample(example);
			List<Tree> list = new ArrayList<Tree>();

			for (VSysUserMenu p : userMenus) {
				Tree tree = new Tree();
				tree.setId(p.getMenuId().intValue());
				tree.setText(p.getMenuName());
				tree.setState("closed");
				tree.setParent(Integer.parseInt(p.getParentId()));
				tree.setUrl(p.getMenuUrl());
				tree.setIconCls(p.getImgUrl());
				list.add(tree);

			}
			MenuTree menuTree = new MenuTree();
			model.setList(menuTree.createTree(list, 0));

		} catch (Exception e) {
			model.error();
			e.printStackTrace();
		}
		return model;
	}

}

package service.impl;

import com.github.abel533.entity.EntityMapper;
import common.model.*;
import common.util.Page;
import mapper.mapper.sys.SysRelationUserRoleMapper;
import mapper.mapper.sys.SysRolesMapper;
import mapper.mapper.sys.SysUserMapper;
import mapper.mapper.sys.VSysUserMenuMapper;
import mapper.model.sys.SysRelationUserRole;
import mapper.model.sys.SysRoles;
import mapper.model.sys.SysUser;
import mapper.model.sys.VSysUserMenu;
import org.apache.ibatis.session.RowBounds;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import service.SysUserService;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

 /**
 * 活动报名控制器
 * 主要来接受前端控制器数据
 * Created by r958403448 on 2017/7/27.
 */
@Service
public class SysUserServiceImpl implements SysUserService {

	// 注入Dao层操作对象
	@Resource
	private SysUserMapper sysUserMapper;
	@Resource
	private SysRolesMapper sysRolesMapper;
	@Resource
	private SysRelationUserRoleMapper sysRelationUserRoleMapper;

	@Resource
	private VSysUserMenuMapper sysUserMenuMapper;
	@Resource
	private EntityMapper entityMapper;
	private static Logger logger = LoggerFactory
			.getLogger(SysUserServiceImpl.class);

	/**
	 * @param dbt
	 * @return
	 */
	@Override
	public ResponseModelBootstrapTable main(DataBootstrapTable dbt, String userName, String phoneNo) {
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
			Example.Criteria cri = example.createCriteria();
			//查询条件判断
			if((!userName.isEmpty() || userName != null) && (!phoneNo.isEmpty() || phoneNo != null)){
				cri.andLike("userName", "%" + userName + "%");
				cri.andLike("phoneNo", "%" + phoneNo + "%");
			}
			if (null != dbt.getSearch() && !"".equals(dbt.getSearch())) {
				cri.andLike("catName", "%" + dbt.getSearch() + "%");
			}
			List<?> sysuser = null;
			if (currentPage == null || pageSize == null) {

				sysuser = sysUserMapper.selectByExample(example);
			} else {
				if (null != dbt.getSort() && !"".equals(dbt.getSort())) {
					Example.OrderBy orderby = example.orderBy(dbt.getSort());
					if ("asc".equals(dbt.getOrder())) {
						orderby.asc();
					} else {
						orderby.desc();
					}

				}
				sysuser = sysUserMapper.selectByExampleAndRowBounds(example,
						new RowBounds(page.getStartLine(), pageSize));
			}
			page.setTotalLine(sysUserMapper.selectCountByExample(example));
			model.bing(sysuser, page.getTotalLine(), page.getTotalPage());
		} catch (Exception e){
			model.error();
			logger.error("Controller:条件查询用户信息发送异常。 -- " + e.getMessage());
		}
		return model;
	}

	/**
	 * 添加
	 *
	 * @param role
	 * @param sysUser
	 * @return
	 */
	@Override
	public ResponseModelBootstrapTable add(String role, SysUser sysUser) {

		String[] roles = role.split(",");


		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysUser.setId(new Integer(0));
		sysUser.setPassword(encryptionBySha256Hash(sysUser.getPwdText()));
		sysUser.setCreateTime(new Date());
		sysUserMapper.insertSelective(sysUser);
		for (int i = 0; i < roles.length; i++) {
			SysRelationUserRole userRole = new SysRelationUserRole();
			userRole.setUserId(sysUser.getId());
			userRole.setRoleId((int) Long.parseLong(roles[i]));
			sysRelationUserRoleMapper.insertSelective(userRole);
		}
		model.success();
		return model;
	}

	/**
	 * 查询单个信息
	 *
	 * @param sysUserDetail
	 * @return
	 */
	@Override
	public ResponseModelBootstrapTable selectObjById(SysUser sysUserDetail) {
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysUserDetail = sysUserMapper.selectByPrimaryKey(sysUserDetail);
		model.setObject(sysUserDetail);
		return model;
	}

	/**
	 * 修改信息
	 *
	 * @param role
	 * @param sysUser
	 * @return
	 */
	@Override
	public ResponseModelBootstrapTable update(String role, SysUser sysUser) {
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysUser.setPassword(encryptionBySha256Hash(sysUser.getPwdText()));
		//		修改系统用户信息
		sysUserMapper.updateByPrimaryKeySelective(sysUser);
		model.setObject(sysUser);
		//		修改系统用户角色信息
		String[] roles = role.split(",");
		Example example = new Example(SysRelationUserRole.class);
		example.createCriteria().andEqualTo("userId", sysUser.getId());
		//删除旧的角色信息
		sysRelationUserRoleMapper.deleteByExample(example);
		//		添加新的角色信息
		for (int i = 0; i < roles.length; i++) {
			SysRelationUserRole userRole = new SysRelationUserRole();
			userRole.setUserId(sysUser.getId());
			userRole.setRoleId(Integer.parseInt(roles[i]));
			sysRelationUserRoleMapper.insert(userRole);
		}
		model.success();
		return model;
	}



	/**
	 * 删除信息
	 *
	 * @param sysUserDetail
	 * @return
	 */
	@Override
	public ResponseModelBootstrapTable del(SysUser sysUserDetail) {
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysUserMapper.deleteByPrimaryKey(sysUserDetail);
		model.setObject(sysUserDetail);
		return model;
	}

	/**
	 * 获取角色信息
	 *
	 * @return
	 */
	@Override
	public ResponseModelBootstrapTable findRoles() {
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		List<SysRoles> roles = sysRolesMapper.selectAll();
		model.setList(roles);
		return model;
	}

	/**
	 * 获取角色修改信息
	 *
	 * @param pid
	 * @return
	 */
	@Override
	public ResponseModelBootstrapTable findRolesByUserId(String pid) {

		String userId = pid;
		Example example = new Example(SysRelationUserRole.class);

		Example.Criteria cri = example.createCriteria();
		cri.andEqualTo("userId", userId);
		List<SysRelationUserRole> userRoles = sysRelationUserRoleMapper
				.selectByExample(example);
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		List<SysRoles> roles = sysRolesMapper.selectAll();
		List<Role> returnRoles = new ArrayList<Role>();
		//Serialized class cn.imfc.common.model.Role must implement java.io.Serializable
		//TODO
		for (SysRoles sysRoles : roles) {
			Role ro = new Role();
			ro.setRoleId(sysRoles.getId().toString());
			ro.setRoleName(sysRoles.getRoleName());
			ro.setCheck("2");
			for (SysRelationUserRole userRole : userRoles) {
				if (sysRoles.getId() == userRole.getRoleId()) {
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
	 * @param user
	 * @return
	 */
	@Override
	public ResponseModelBootstrapTable findMenus(SysUser user) {
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		try {
			Example example = new Example(VSysUserMenu.class);
			Example.Criteria cri = example.createCriteria();
			cri.andEqualTo("userId", user.getId());

			List<VSysUserMenu> userMenus = sysUserMenuMapper.selectByExample(example);
			List<Tree> list = new ArrayList<Tree>();

			for (VSysUserMenu p : userMenus) {
				Tree tree = new Tree();
				tree.setId(p.getMenuId().intValue());
				tree.setText(p.getMenuName());
				tree.setState("closed");
				tree.setParent(Integer.parseInt(String.valueOf(p.getParentId())));
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

	@Override
	public List<SysUser> findUsers(String username) {
		com.github.abel533.entity.Example example = new com.github.abel533.entity.Example(SysUser.class);
		example.createCriteria().andEqualTo("loginName", username);
		List<SysUser> userList = entityMapper.selectByExample(example);
		return userList;
	}

	public String encryptionBySha256Hash(String string) {
		Sha256Hash sha256Hash = new Sha256Hash(string);
		return sha256Hash.toBase64();
	}

}
package mapper.model.sys;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@Table(name = "sys_roles")
public class SysRoles implements Serializable {
	@Id
	private Integer id;

	@Column(name = "role_name")
	private String roleName;

	@Column(name = "create_time")
	@DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	private Date createTime;

	@Column(name = "role_desc")
	private String roleDesc;

	/**
	 * 角色类型（1:系统管理员，2）
	 */
	@Column(name = "role_type")
	private String roleType;

	private static final long serialVersionUID = 1L;

	/**
	 * @return id
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * @param id
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return role_name
	 */
	public String getRoleName() {
		return roleName;
	}

	/**
	 * @param roleName
	 */
	public void setRoleName(String roleName) {
		this.roleName = roleName == null ? null : roleName.trim();
	}

	/**
	 * @return create_time
	 */
	public Date getCreateTime() {
		return createTime;
	}

	/**
	 * @param createTime
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	 * @return role_desc
	 */
	public String getRoleDesc() {
		return roleDesc;
	}

	/**
	 * @param roleDesc
	 */
	public void setRoleDesc(String roleDesc) {
		this.roleDesc = roleDesc == null ? null : roleDesc.trim();
	}

	/**
	 * 获取角色类型（1:系统管理员，2）
	 *
	 * @return role_type - 角色类型（1:系统管理员，2）
	 */
	public String getRoleType() {
		return roleType;
	}

	/**
	 * 设置角色类型（1:系统管理员，2）
	 *
	 * @param roleType 角色类型（1:系统管理员，2）
	 */
	public void setRoleType(String roleType) {
		this.roleType = roleType == null ? null : roleType.trim();
	}
}
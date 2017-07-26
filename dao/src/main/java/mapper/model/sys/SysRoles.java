package mapper.model.sys;

import java.util.Date;
import javax.persistence.*;

@Table(name = "sys_roles")
public class SysRoles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_Id")
    private Long roleId;

    @Column(name = "role_Name")
    private String roleName;

    @Column(name = "create_Time")
    private Date createTime;

    @Column(name = "role_Desc")
    private String roleDesc;

    /**
     * 角色类型（1:系统管理员，2）
     */
    @Column(name = "role_type")
    private String roleType;

    /**
     * @return role_Id
     */
    public Long getRoleId() {
        return roleId;
    }

    /**
     * @param roleId
     */
    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    /**
     * @return role_Name
     */
    public String getRoleName() {
        return roleName;
    }

    /**
     * @param roleName
     */
    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    /**
     * @return create_Time
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
     * @return role_Desc
     */
    public String getRoleDesc() {
        return roleDesc;
    }

    /**
     * @param roleDesc
     */
    public void setRoleDesc(String roleDesc) {
        this.roleDesc = roleDesc;
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
        this.roleType = roleType;
    }
}
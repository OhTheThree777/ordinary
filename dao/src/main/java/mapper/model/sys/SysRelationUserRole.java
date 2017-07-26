package mapper.model.sys;

import javax.persistence.*;

@Table(name = "sys_relation_user_role")
public class SysRelationUserRole {
    /**
     * 唯一标识
     */
    @Id
    @Column(name = "relation_id")
    private Long relationId;

    /**
     * 用户id
     */
    @Column(name = "user_id")
    private Long userId;

    /**
     * 角色id
     */
    @Column(name = "role_id")
    private Long roleId;

    /**
     * 获取唯一标识
     *
     * @return relation_id - 唯一标识
     */
    public Long getRelationId() {
        return relationId;
    }

    /**
     * 设置唯一标识
     *
     * @param relationId 唯一标识
     */
    public void setRelationId(Long relationId) {
        this.relationId = relationId;
    }

    /**
     * 获取用户id
     *
     * @return user_id - 用户id
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * 设置用户id
     *
     * @param userId 用户id
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * 获取角色id
     *
     * @return role_id - 角色id
     */
    public Long getRoleId() {
        return roleId;
    }

    /**
     * 设置角色id
     *
     * @param roleId 角色id
     */
    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }
}
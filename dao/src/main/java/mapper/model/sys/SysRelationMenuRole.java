package mapper.model.sys;

import javax.persistence.*;

@Table(name = "sys_relation_menu_role")
public class SysRelationMenuRole {
    /**
     * 唯一标识
     */
    @Id
    @Column(name = "relation_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer relationId;

    /**
     * 菜单id，sys_menu表的menu_id
     */
    @Column(name = "menu_id")
    private String menuId;

    /**
     * 角色id，关联sys_roles表role_id
     */
    @Column(name = "role_id")
    private Integer roleId;

    /**
     * 获取唯一标识
     *
     * @return relation_id - 唯一标识
     */
    public Integer getRelationId() {
        return relationId;
    }

    /**
     * 设置唯一标识
     *
     * @param relationId 唯一标识
     */
    public void setRelationId(Integer relationId) {
        this.relationId = relationId;
    }

    /**
     * 获取菜单id，sys_menu表的menu_id
     *
     * @return menu_id - 菜单id，sys_menu表的menu_id
     */
    public String getMenuId() {
        return menuId;
    }

    /**
     * 设置菜单id，sys_menu表的menu_id
     *
     * @param menuId 菜单id，sys_menu表的menu_id
     */
    public void setMenuId(String menuId) {
        this.menuId = menuId;
    }

    /**
     * 获取角色id，关联sys_roles表role_id
     *
     * @return role_id - 角色id，关联sys_roles表role_id
     */
    public Integer getRoleId() {
        return roleId;
    }

    /**
     * 设置角色id，关联sys_roles表role_id
     *
     * @param roleId 角色id，关联sys_roles表role_id
     */
    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
}
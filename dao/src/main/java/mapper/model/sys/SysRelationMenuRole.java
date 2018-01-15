package mapper.model.sys;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Table(name = "sys_relation_menu_role")
public class SysRelationMenuRole implements Serializable {
    /**
     * 唯一标识
     */
    @Id
    private Integer id;

    /**
     * 菜单id，sys_menu表的menu_id
     */
    @Column(name = "menu_id")
    private Integer menuId;

    /**
     * 角色id，关联sys_roles表role_id
     */
    @Column(name = "role_id")
    private Integer roleId;

    private static final long serialVersionUID = 1L;

    /**
     * 获取唯一标识
     *
     * @return id - 唯一标识
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置唯一标识
     *
     * @param id 唯一标识
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取菜单id，sys_menu表的menu_id
     *
     * @return menu_id - 菜单id，sys_menu表的menu_id
     */
    public Integer getMenuId() {
        return menuId;
    }

    /**
     * 设置菜单id，sys_menu表的menu_id
     *
     * @param menuId 菜单id，sys_menu表的menu_id
     */
    public void setMenuId(Integer menuId) {
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
package mapper.model.sys;

import java.util.Date;
import javax.persistence.*;

@Table(name = "v_sys_role_menu")
public class VSysRoleMenu {
    @Column(name = "role_Id")
    private Long roleId;

    @Column(name = "role_Name")
    private String roleName;

    @Column(name = "create_Time")
    private Date createTime;

    @Column(name = "role_Desc")
    private String roleDesc;

    /**
     * 菜单ID
     */
    @Column(name = "menu_id")
    private Long menuId;

    /**
     * 父菜单id
     */
    @Column(name = "parent_id")
    private String parentId;

    /**
     * 系统签名，如果有多个系统用此菜单的话可以用该字段区分
     */
    @Column(name = "sign_name")
    private String signName;

    /**
     * 菜单名称
     */
    @Column(name = "menu_name")
    private String menuName;

    /**
     * 菜单访问路径
     */
    @Column(name = "menu_url")
    private String menuUrl;

    /**
     * 菜单自定义图标路径
     */
    @Column(name = "img_url")
    private String imgUrl;

    /**
     * 菜单显示顺序
     */
    @Column(name = "menu_order")
    private Integer menuOrder;

    /**
     * 是否启用此菜单，1：启用，0：关闭
     */
    @Column(name = "menu_visible")
    private Short menuVisible;

    /**
     * 此字段暂时不用了
     */
    @Column(name = "backgroud_color")
    private String backgroudColor;

    /**
     * 唯一标识
     */
    @Column(name = "relation_id")
    private Integer relationId;

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
     * 获取菜单ID
     *
     * @return menu_id - 菜单ID
     */
    public Long getMenuId() {
        return menuId;
    }

    /**
     * 设置菜单ID
     *
     * @param menuId 菜单ID
     */
    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    /**
     * 获取父菜单id
     *
     * @return parent_id - 父菜单id
     */
    public String getParentId() {
        return parentId;
    }

    /**
     * 设置父菜单id
     *
     * @param parentId 父菜单id
     */
    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    /**
     * 获取系统签名，如果有多个系统用此菜单的话可以用该字段区分
     *
     * @return sign_name - 系统签名，如果有多个系统用此菜单的话可以用该字段区分
     */
    public String getSignName() {
        return signName;
    }

    /**
     * 设置系统签名，如果有多个系统用此菜单的话可以用该字段区分
     *
     * @param signName 系统签名，如果有多个系统用此菜单的话可以用该字段区分
     */
    public void setSignName(String signName) {
        this.signName = signName;
    }

    /**
     * 获取菜单名称
     *
     * @return menu_name - 菜单名称
     */
    public String getMenuName() {
        return menuName;
    }

    /**
     * 设置菜单名称
     *
     * @param menuName 菜单名称
     */
    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    /**
     * 获取菜单访问路径
     *
     * @return menu_url - 菜单访问路径
     */
    public String getMenuUrl() {
        return menuUrl;
    }

    /**
     * 设置菜单访问路径
     *
     * @param menuUrl 菜单访问路径
     */
    public void setMenuUrl(String menuUrl) {
        this.menuUrl = menuUrl;
    }

    /**
     * 获取菜单自定义图标路径
     *
     * @return img_url - 菜单自定义图标路径
     */
    public String getImgUrl() {
        return imgUrl;
    }

    /**
     * 设置菜单自定义图标路径
     *
     * @param imgUrl 菜单自定义图标路径
     */
    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    /**
     * 获取菜单显示顺序
     *
     * @return menu_order - 菜单显示顺序
     */
    public Integer getMenuOrder() {
        return menuOrder;
    }

    /**
     * 设置菜单显示顺序
     *
     * @param menuOrder 菜单显示顺序
     */
    public void setMenuOrder(Integer menuOrder) {
        this.menuOrder = menuOrder;
    }

    /**
     * 获取是否启用此菜单，1：启用，0：关闭
     *
     * @return menu_visible - 是否启用此菜单，1：启用，0：关闭
     */
    public Short getMenuVisible() {
        return menuVisible;
    }

    /**
     * 设置是否启用此菜单，1：启用，0：关闭
     *
     * @param menuVisible 是否启用此菜单，1：启用，0：关闭
     */
    public void setMenuVisible(Short menuVisible) {
        this.menuVisible = menuVisible;
    }

    /**
     * 获取此字段暂时不用了
     *
     * @return backgroud_color - 此字段暂时不用了
     */
    public String getBackgroudColor() {
        return backgroudColor;
    }

    /**
     * 设置此字段暂时不用了
     *
     * @param backgroudColor 此字段暂时不用了
     */
    public void setBackgroudColor(String backgroudColor) {
        this.backgroudColor = backgroudColor;
    }

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
}
package mapper.model.sys;

import javax.persistence.*;

@Table(name = "v_sys_user_menu")
public class VSysUserMenu {
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
     * 用户id
     */
    @Column(name = "user_id")
    private Long userId;

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
}
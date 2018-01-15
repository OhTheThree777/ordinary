package mapper.model.sys;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@Table(name = "sys_menu")
public class SysMenu implements Serializable {
    /**
     * 菜单ID
     */
    @Id
    private Integer id;

    /**
     * 父菜单id
     */
    @Column(name = "parent_id")
    private Integer parentId;

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
     * 菜单类型（1：菜单,2:功能点）
     */
    @Column(name = "menu_type")
    private String menuType;

    /**
     * 菜单访问路径
     */
    @Column(name = "menu_url")
    private String menuUrl;

    /**
     * 图片路径
     */
    @Column(name = "img_url")
    private String imgUrl;

    /**
     * 菜单自定义图标css样式
     */
    private String style;

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

    @Column(name = "create_time")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date createTime;

    @Column(name = "update_time")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date updateTime;

    @Column(name = "is_del")
    private String isDel;

    private static final long serialVersionUID = 1L;

    /**
     * 获取菜单ID
     *
     * @return id - 菜单ID
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置菜单ID
     *
     * @param id 菜单ID
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取父菜单id
     *
     * @return parent_id - 父菜单id
     */
    public Integer getParentId() {
        return parentId;
    }

    /**
     * 设置父菜单id
     *
     * @param parentId 父菜单id
     */
    public void setParentId(Integer parentId) {
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
        this.signName = signName == null ? null : signName.trim();
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
        this.menuName = menuName == null ? null : menuName.trim();
    }

    /**
     * 获取菜单类型（1：菜单,2:功能点）
     *
     * @return menu_type - 菜单类型（1：菜单,2:功能点）
     */
    public String getMenuType() {
        return menuType;
    }

    /**
     * 设置菜单类型（1：菜单,2:功能点）
     *
     * @param menuType 菜单类型（1：菜单,2:功能点）
     */
    public void setMenuType(String menuType) {
        this.menuType = menuType == null ? null : menuType.trim();
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
        this.menuUrl = menuUrl == null ? null : menuUrl.trim();
    }

    /**
     * 获取图片路径
     *
     * @return img_url - 图片路径
     */
    public String getImgUrl() {
        return imgUrl;
    }

    /**
     * 设置图片路径
     *
     * @param imgUrl 图片路径
     */
    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl == null ? null : imgUrl.trim();
    }

    /**
     * 获取菜单自定义图标css样式
     *
     * @return style - 菜单自定义图标css样式
     */
    public String getStyle() {
        return style;
    }

    /**
     * 设置菜单自定义图标css样式
     *
     * @param style 菜单自定义图标css样式
     */
    public void setStyle(String style) {
        this.style = style == null ? null : style.trim();
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
        this.backgroudColor = backgroudColor == null ? null : backgroudColor.trim();
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
     * @return update_time
     */
    public Date getUpdateTime() {
        return updateTime;
    }

    /**
     * @param updateTime
     */
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    /**
     * @return is_del
     */
    public String getIsDel() {
        return isDel;
    }

    /**
     * @param isDel
     */
    public void setIsDel(String isDel) {
        this.isDel = isDel == null ? null : isDel.trim();
    }
}
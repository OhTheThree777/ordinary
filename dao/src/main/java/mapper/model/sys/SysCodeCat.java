package mapper.model.sys;

import javax.persistence.*;

@Table(name = "sys_code_cat")
public class SysCodeCat {
    /**
     * 数据字典分类表
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 分类编码
     */
    @Column(name = "cat_code")
    private String catCode;

    /**
     * 分类名称
     */
    @Column(name = "cat_name")
    private String catName;

    /**
     * 备注
     */
    private String reamk;

    /**
     * 获取数据字典分类表
     *
     * @return id - 数据字典分类表
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置数据字典分类表
     *
     * @param id 数据字典分类表
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取分类编码
     *
     * @return cat_code - 分类编码
     */
    public String getCatCode() {
        return catCode;
    }

    /**
     * 设置分类编码
     *
     * @param catCode 分类编码
     */
    public void setCatCode(String catCode) {
        this.catCode = catCode;
    }

    /**
     * 获取分类名称
     *
     * @return cat_name - 分类名称
     */
    public String getCatName() {
        return catName;
    }

    /**
     * 设置分类名称
     *
     * @param catName 分类名称
     */
    public void setCatName(String catName) {
        this.catName = catName;
    }

    /**
     * 获取备注
     *
     * @return reamk - 备注
     */
    public String getReamk() {
        return reamk;
    }

    /**
     * 设置备注
     *
     * @param reamk 备注
     */
    public void setReamk(String reamk) {
        this.reamk = reamk;
    }
}
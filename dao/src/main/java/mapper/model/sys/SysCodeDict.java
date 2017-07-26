package mapper.model.sys;

import javax.persistence.*;

@Table(name = "sys_code_dict")
public class SysCodeDict {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 数据字典健
     */
    @Column(name = "dict_key")
    private String dictKey;

    /**
     * 数据字典值
     */
    @Column(name = "dict_value")
    private String dictValue;

    /**
     * 分类编码
     */
    @Column(name = "cat_code")
    private String catCode;

    /**
     * 级别
     */
    @Column(name = "dict_level")
    private Integer dictLevel;

    /**
     * 状态（1:启用,2:禁用）
     */
    @Column(name = "dict_state")
    private String dictState;

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
     * 获取数据字典健
     *
     * @return dict_key - 数据字典健
     */
    public String getDictKey() {
        return dictKey;
    }

    /**
     * 设置数据字典健
     *
     * @param dictKey 数据字典健
     */
    public void setDictKey(String dictKey) {
        this.dictKey = dictKey;
    }

    /**
     * 获取数据字典值
     *
     * @return dict_value - 数据字典值
     */
    public String getDictValue() {
        return dictValue;
    }

    /**
     * 设置数据字典值
     *
     * @param dictValue 数据字典值
     */
    public void setDictValue(String dictValue) {
        this.dictValue = dictValue;
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
     * 获取级别
     *
     * @return dict_level - 级别
     */
    public Integer getDictLevel() {
        return dictLevel;
    }

    /**
     * 设置级别
     *
     * @param dictLevel 级别
     */
    public void setDictLevel(Integer dictLevel) {
        this.dictLevel = dictLevel;
    }

    /**
     * 获取状态（1:启用,2:禁用）
     *
     * @return dict_state - 状态（1:启用,2:禁用）
     */
    public String getDictState() {
        return dictState;
    }

    /**
     * 设置状态（1:启用,2:禁用）
     *
     * @param dictState 状态（1:启用,2:禁用）
     */
    public void setDictState(String dictState) {
        this.dictState = dictState;
    }
}
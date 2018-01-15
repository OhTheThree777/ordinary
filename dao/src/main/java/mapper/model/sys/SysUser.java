package mapper.model.sys;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@Table(name = "sys_user")
public class SysUser implements Serializable {
    /**
     * 主键，记录标识
     */
    @Id
    private Integer id;

    /**
     * 登陆账号
     */
    @Column(name = "login_name")
    private String loginName;

    /**
     * 登陆密码
     */
    private String password;

    /**
     * 未加密密码
     */
    @Column(name = "pwd_text")
    private String pwdText;

    /**
     * 用户姓名
     */
    @Column(name = "user_name")
    private String userName;

    @Column(name = "phone_no")
    private String phoneNo;

    private String email;

    /**
     * 登录时间
     */
    @Column(name = "login_time")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date loginTime;

    /**
     * 上次登录时间
     */
    @Column(name = "last_login_time")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date lastLoginTime;

    /**
     * 累计登陆次数
     */
    @Column(name = "login_count")
    private Long loginCount;

    /**
     * 是否锁定用户，1为正常用户，0为锁定
     */
    @Column(name = "is_lock")
    private Short isLock;

    /**
     * 用户介绍
     */
    @Column(name = "user_desc")
    private String userDesc;

    /**
     * 用户编号
     */
    private String uuid;

    @Column(name = "create_time")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date createTime;

    @Column(name = "update_time")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date updateTime;

    /**
     * 是否删除
     */
    @Column(name = "id_delete")
    private String idDelete;

    /**
     * 用户头像
     */
    @Column(name = "head_portrait")
    private String headPortrait;

    /**
     * 用户昵称
     */
    private String nickname;

    /**
     * 职业ID
     */
    @Column(name = "occupation_id")
    private String occupationId;

    /**
     * 百度ID
     */
    @Column(name = "baidu_id")
    private String baiduId;

    /**
     * 微信ID
     */
    @Column(name = "weixin_id")
    private String weixinId;

    /**
     * 新浪微博ID
     */
    @Column(name = "xinlang_id")
    private String xinlangId;

    /**
     * 腾讯QQID
     */
    @Column(name = "qq_id")
    private String qqId;

    private static final long serialVersionUID = 1L;

    /**
     * 获取主键，记录标识
     *
     * @return id - 主键，记录标识
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置主键，记录标识
     *
     * @param id 主键，记录标识
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取登陆账号
     *
     * @return login_name - 登陆账号
     */
    public String getLoginName() {
        return loginName;
    }

    /**
     * 设置登陆账号
     *
     * @param loginName 登陆账号
     */
    public void setLoginName(String loginName) {
        this.loginName = loginName == null ? null : loginName.trim();
    }

    /**
     * 获取登陆密码
     *
     * @return password - 登陆密码
     */
    public String getPassword() {
        return password;
    }

    /**
     * 设置登陆密码
     *
     * @param password 登陆密码
     */
    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    /**
     * 获取未加密密码
     *
     * @return pwd_text - 未加密密码
     */
    public String getPwdText() {
        return pwdText;
    }

    /**
     * 设置未加密密码
     *
     * @param pwdText 未加密密码
     */
    public void setPwdText(String pwdText) {
        this.pwdText = pwdText == null ? null : pwdText.trim();
    }

    /**
     * 获取用户姓名
     *
     * @return user_name - 用户姓名
     */
    public String getUserName() {
        return userName;
    }

    /**
     * 设置用户姓名
     *
     * @param userName 用户姓名
     */
    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    /**
     * @return phone_no
     */
    public String getPhoneNo() {
        return phoneNo;
    }

    /**
     * @param phoneNo
     */
    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo == null ? null : phoneNo.trim();
    }

    /**
     * @return email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email
     */
    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    /**
     * 获取登录时间
     *
     * @return login_time - 登录时间
     */
    public Date getLoginTime() {
        return loginTime;
    }

    /**
     * 设置登录时间
     *
     * @param loginTime 登录时间
     */
    public void setLoginTime(Date loginTime) {
        this.loginTime = loginTime;
    }

    /**
     * 获取上次登录时间
     *
     * @return last_login_time - 上次登录时间
     */
    public Date getLastLoginTime() {
        return lastLoginTime;
    }

    /**
     * 设置上次登录时间
     *
     * @param lastLoginTime 上次登录时间
     */
    public void setLastLoginTime(Date lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    /**
     * 获取累计登陆次数
     *
     * @return login_count - 累计登陆次数
     */
    public Long getLoginCount() {
        return loginCount;
    }

    /**
     * 设置累计登陆次数
     *
     * @param loginCount 累计登陆次数
     */
    public void setLoginCount(Long loginCount) {
        this.loginCount = loginCount;
    }

    /**
     * 获取是否锁定用户，1为正常用户，0为锁定
     *
     * @return is_lock - 是否锁定用户，1为正常用户，0为锁定
     */
    public Short getIsLock() {
        return isLock;
    }

    /**
     * 设置是否锁定用户，1为正常用户，0为锁定
     *
     * @param isLock 是否锁定用户，1为正常用户，0为锁定
     */
    public void setIsLock(Short isLock) {
        this.isLock = isLock;
    }

    /**
     * 获取用户介绍
     *
     * @return user_desc - 用户介绍
     */
    public String getUserDesc() {
        return userDesc;
    }

    /**
     * 设置用户介绍
     *
     * @param userDesc 用户介绍
     */
    public void setUserDesc(String userDesc) {
        this.userDesc = userDesc == null ? null : userDesc.trim();
    }

    /**
     * 获取用户编号
     *
     * @return uuid - 用户编号
     */
    public String getUuid() {
        return uuid;
    }

    /**
     * 设置用户编号
     *
     * @param uuid 用户编号
     */
    public void setUuid(String uuid) {
        this.uuid = uuid == null ? null : uuid.trim();
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
     * 获取是否删除
     *
     * @return id_delete - 是否删除
     */
    public String getIdDelete() {
        return idDelete;
    }

    /**
     * 设置是否删除
     *
     * @param idDelete 是否删除
     */
    public void setIdDelete(String idDelete) {
        this.idDelete = idDelete == null ? null : idDelete.trim();
    }

    /**
     * 获取用户头像
     *
     * @return head_portrait - 用户头像
     */
    public String getHeadPortrait() {
        return headPortrait;
    }

    /**
     * 设置用户头像
     *
     * @param headPortrait 用户头像
     */
    public void setHeadPortrait(String headPortrait) {
        this.headPortrait = headPortrait == null ? null : headPortrait.trim();
    }

    /**
     * 获取用户昵称
     *
     * @return nickname - 用户昵称
     */
    public String getNickname() {
        return nickname;
    }

    /**
     * 设置用户昵称
     *
     * @param nickname 用户昵称
     */
    public void setNickname(String nickname) {
        this.nickname = nickname == null ? null : nickname.trim();
    }

    /**
     * 获取职业ID
     *
     * @return occupation_id - 职业ID
     */
    public String getOccupationId() {
        return occupationId;
    }

    /**
     * 设置职业ID
     *
     * @param occupationId 职业ID
     */
    public void setOccupationId(String occupationId) {
        this.occupationId = occupationId == null ? null : occupationId.trim();
    }

    /**
     * 获取百度ID
     *
     * @return baidu_id - 百度ID
     */
    public String getBaiduId() {
        return baiduId;
    }

    /**
     * 设置百度ID
     *
     * @param baiduId 百度ID
     */
    public void setBaiduId(String baiduId) {
        this.baiduId = baiduId == null ? null : baiduId.trim();
    }

    /**
     * 获取微信ID
     *
     * @return weixin_id - 微信ID
     */
    public String getWeixinId() {
        return weixinId;
    }

    /**
     * 设置微信ID
     *
     * @param weixinId 微信ID
     */
    public void setWeixinId(String weixinId) {
        this.weixinId = weixinId == null ? null : weixinId.trim();
    }

    /**
     * 获取新浪微博ID
     *
     * @return xinlang_id - 新浪微博ID
     */
    public String getXinlangId() {
        return xinlangId;
    }

    /**
     * 设置新浪微博ID
     *
     * @param xinlangId 新浪微博ID
     */
    public void setXinlangId(String xinlangId) {
        this.xinlangId = xinlangId == null ? null : xinlangId.trim();
    }

    /**
     * 获取腾讯QQID
     *
     * @return qq_id - 腾讯QQID
     */
    public String getQqId() {
        return qqId;
    }

    /**
     * 设置腾讯QQID
     *
     * @param qqId 腾讯QQID
     */
    public void setQqId(String qqId) {
        this.qqId = qqId == null ? null : qqId.trim();
    }
}
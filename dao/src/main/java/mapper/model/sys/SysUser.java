package mapper.model.sys;

import java.util.Date;
import javax.persistence.*;

import org.springframework.format.annotation.DateTimeFormat;

@Table(name = "sys_user")
public class SysUser {
    /**
     * 主键，记录标识
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pid;
    /**
     * 外键,所属组织
     */
    private Long fid;

    /**
     * 登陆账号
     */
    @Column(name = "loginName")
    private String loginname;

    /**
     * 登陆密码
     */
    private String password;

    /**
     * 未加密密码
     */
    @Column(name = "pwdText")
    private String pwdtext;

    /**
     * 用户姓名
     */
    @Column(name = "userName")
    private String username;

    @Column(name = "phoneNo")
    private String phoneno;

    @Column(name = "webChatNo")
    private String webchatno;

    private String email;

    /**
     * 用户创建时间
     */
    @Column(name = "createTime")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date createtime;

    /**
     * 登录时间
     */
    @Column(name = "loginTime")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date logintime;

    /**
     * 上次登录时间
     */
    @Column(name = "lastLoginTime")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date lastlogintime;

    /**
     * 累计登陆次数
     */
    @Column(name = "loginCount")
    private Long logincount;

    /**
     * 是否锁定用户，1为正常用户，0为锁定
     */
    @Column(name = "isLock")
    private Short islock;

    @Column(name = "userDesc")
    private String userdesc;

    /**
     * 用户职业
     */
    @Column(name = "user_job")
    private String userJob;

    /**
     * 用户编号
     */
    private String uuid;

    @Column(name = "create_time")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date createTime;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date updatetime;

    /**
     * 是否删除
     */
    @Column(name = "id_delete")
    private String idDelete;

    /**
     * 用户状态
     */
    private String status;

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
     * 是否选择职业（0：未选择，1：已选择）
     */
    @Column(name = "is_job")
    private String isJob;

    /**
     * 职业标记 1、运动员 2、教练 3、裁判
     */
    private String personflag;

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

    /**
     * 球队标记（0没有创建球队，1以创建球队2,获得权限的人员），）
     */
    @Column(name = "team_sign")
    private String teamSign;

    @Column(name = "person_registration")
    private String personRegistration;

    /**
     * 赛事ID
     */
    @Column(name = "racing_id")
    private Integer racingId;

    /**
     * 产品ID
     */
    @Column(name = "product_id")
    private Integer productId;

    /**
     * 是否为主裁判（0否，1是）
     */
    @Column(name = "main_state")
    private String mainState;

    /**
     * 是否执裁（0否，1是）
     */
    private String state;

    /**
     * 获取主键，记录标识
     *
     * @return pid - 主键，记录标识
     */
    public Long getPid() {
        return pid;
    }

    /**
     * 设置主键，记录标识
     *
     * @param pid 主键，记录标识
     */
    public void setPid(Long pid) {
        this.pid = pid;
    }

    /**
     * 获取外键,所属组织
     *
     * @return fid - 外键,所属组织
     */
    public Long getFid() {
        return fid;
    }

    /**
     * 设置外键,所属组织
     *
     * @param fid 外键,所属组织
     */
    public void setFid(Long fid) {
        this.fid = fid;
    }

    /**
     * 获取登陆账号
     *
     * @return loginName - 登陆账号
     */
    public String getLoginname() {
        return loginname;
    }

    /**
     * 设置登陆账号
     *
     * @param loginname 登陆账号
     */
    public void setLoginname(String loginname) {
        this.loginname = loginname;
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
        this.password = password;
    }

    /**
     * 获取未加密密码
     *
     * @return pwdText - 未加密密码
     */
    public String getPwdtext() {
        return pwdtext;
    }

    /**
     * 设置未加密密码
     *
     * @param pwdtext 未加密密码
     */
    public void setPwdtext(String pwdtext) {
        this.pwdtext = pwdtext;
    }

    /**
     * 获取用户姓名
     *
     * @return userName - 用户姓名
     */
    public String getUsername() {
        return username;
    }

    /**
     * 设置用户姓名
     *
     * @param username 用户姓名
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * @return phoneNo
     */
    public String getPhoneno() {
        return phoneno;
    }

    /**
     * @param phoneno
     */
    public void setPhoneno(String phoneno) {
        this.phoneno = phoneno;
    }

    /**
     * @return webChatNo
     */
    public String getWebchatno() {
        return webchatno;
    }

    /**
     * @param webchatno
     */
    public void setWebchatno(String webchatno) {
        this.webchatno = webchatno;
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
        this.email = email;
    }

    /**
     * 获取用户创建时间
     *
     * @return createTime - 用户创建时间
     */
    public Date getCreatetime() {
        return createtime;
    }

    /**
     * 设置用户创建时间
     *
     * @param createtime 用户创建时间
     */
    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    /**
     * 获取登录时间
     *
     * @return loginTime - 登录时间
     */
    public Date getLogintime() {
        return logintime;
    }

    /**
     * 设置登录时间
     *
     * @param logintime 登录时间
     */
    public void setLogintime(Date logintime) {
        this.logintime = logintime;
    }

    /**
     * 获取上次登录时间
     *
     * @return lastLoginTime - 上次登录时间
     */
    public Date getLastlogintime() {
        return lastlogintime;
    }

    /**
     * 设置上次登录时间
     *
     * @param lastlogintime 上次登录时间
     */
    public void setLastlogintime(Date lastlogintime) {
        this.lastlogintime = lastlogintime;
    }

    /**
     * 获取累计登陆次数
     *
     * @return loginCount - 累计登陆次数
     */
    public Long getLogincount() {
        return logincount;
    }

    /**
     * 设置累计登陆次数
     *
     * @param logincount 累计登陆次数
     */
    public void setLogincount(Long logincount) {
        this.logincount = logincount;
    }

    /**
     * 获取是否锁定用户，1为正常用户，0为锁定
     *
     * @return isLock - 是否锁定用户，1为正常用户，0为锁定
     */
    public Short getIslock() {
        return islock;
    }

    /**
     * 设置是否锁定用户，1为正常用户，0为锁定
     *
     * @param islock 是否锁定用户，1为正常用户，0为锁定
     */
    public void setIslock(Short islock) {
        this.islock = islock;
    }

    /**
     * @return userDesc
     */
    public String getUserdesc() {
        return userdesc;
    }

    /**
     * @param userdesc
     */
    public void setUserdesc(String userdesc) {
        this.userdesc = userdesc;
    }

    /**
     * 获取用户职业
     *
     * @return user_job - 用户职业
     */
    public String getUserJob() {
        return userJob;
    }

    /**
     * 设置用户职业
     *
     * @param userJob 用户职业
     */
    public void setUserJob(String userJob) {
        this.userJob = userJob;
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
        this.uuid = uuid;
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
     * @return updatetime
     */
    public Date getUpdatetime() {
        return updatetime;
    }

    /**
     * @param updatetime
     */
    public void setUpdatetime(Date updatetime) {
        this.updatetime = updatetime;
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
        this.idDelete = idDelete;
    }

    /**
     * 获取用户状态
     *
     * @return status - 用户状态
     */
    public String getStatus() {
        return status;
    }

    /**
     * 设置用户状态
     *
     * @param status 用户状态
     */
    public void setStatus(String status) {
        this.status = status;
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
        this.headPortrait = headPortrait;
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
        this.nickname = nickname;
    }

    /**
     * 获取是否选择职业（0：未选择，1：已选择）
     *
     * @return is_job - 是否选择职业（0：未选择，1：已选择）
     */
    public String getIsJob() {
        return isJob;
    }

    /**
     * 设置是否选择职业（0：未选择，1：已选择）
     *
     * @param isJob 是否选择职业（0：未选择，1：已选择）
     */
    public void setIsJob(String isJob) {
        this.isJob = isJob;
    }

    /**
     * 获取职业标记 1、运动员 2、教练 3、裁判
     *
     * @return personflag - 职业标记 1、运动员 2、教练 3、裁判
     */
    public String getPersonflag() {
        return personflag;
    }

    /**
     * 设置职业标记 1、运动员 2、教练 3、裁判
     *
     * @param personflag 职业标记 1、运动员 2、教练 3、裁判
     */
    public void setPersonflag(String personflag) {
        this.personflag = personflag;
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
        this.occupationId = occupationId;
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
        this.baiduId = baiduId;
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
        this.weixinId = weixinId;
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
        this.xinlangId = xinlangId;
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
        this.qqId = qqId;
    }

    /**
     * 获取球队标记（0没有创建球队，1以创建球队2,获得权限的人员），）
     *
     * @return team_sign - 球队标记（0没有创建球队，1以创建球队2,获得权限的人员），）
     */
    public String getTeamSign() {
        return teamSign;
    }

    /**
     * 设置球队标记（0没有创建球队，1以创建球队2,获得权限的人员），）
     *
     * @param teamSign 球队标记（0没有创建球队，1以创建球队2,获得权限的人员），）
     */
    public void setTeamSign(String teamSign) {
        this.teamSign = teamSign;
    }

    /**
     * @return person_registration
     */
    public String getPersonRegistration() {
        return personRegistration;
    }

    /**
     * @param personRegistration
     */
    public void setPersonRegistration(String personRegistration) {
        this.personRegistration = personRegistration;
    }

    /**
     * 获取赛事ID
     *
     * @return racing_id - 赛事ID
     */
    public Integer getRacingId() {
        return racingId;
    }

    /**
     * 设置赛事ID
     *
     * @param racingId 赛事ID
     */
    public void setRacingId(Integer racingId) {
        this.racingId = racingId;
    }

    /**
     * 获取产品ID
     *
     * @return product_id - 产品ID
     */
    public Integer getProductId() {
        return productId;
    }

    /**
     * 设置产品ID
     *
     * @param productId 产品ID
     */
    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    /**
     * 获取是否为主裁判（0否，1是）
     *
     * @return main_state - 是否为主裁判（0否，1是）
     */
    public String getMainState() {
        return mainState;
    }

    /**
     * 设置是否为主裁判（0否，1是）
     *
     * @param mainState 是否为主裁判（0否，1是）
     */
    public void setMainState(String mainState) {
        this.mainState = mainState;
    }

    /**
     * 获取是否执裁（0否，1是）
     *
     * @return state - 是否执裁（0否，1是）
     */
    public String getState() {
        return state;
    }

    /**
     * 设置是否执裁（0否，1是）
     *
     * @param state 是否执裁（0否，1是）
     */
    public void setState(String state) {
        this.state = state;
    }
}
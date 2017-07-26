package mapper.model.sys;

import java.util.Date;
import javax.persistence.*;

@Table(name = "sys_log")
public class SysLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Long logId;

    @Column(name = "oper_type")
    private String operType;

    @Column(name = "oper_content")
    private String operContent;

    @Column(name = "oper_userId")
    private Long operUserid;

    @Column(name = "oper_time")
    private Date operTime;

    private String ip;

    /**
     * 备注
     */
    private String remark;

    /**
     * @return log_id
     */
    public Long getLogId() {
        return logId;
    }

    /**
     * @param logId
     */
    public void setLogId(Long logId) {
        this.logId = logId;
    }

    /**
     * @return oper_type
     */
    public String getOperType() {
        return operType;
    }

    /**
     * @param operType
     */
    public void setOperType(String operType) {
        this.operType = operType;
    }

    /**
     * @return oper_content
     */
    public String getOperContent() {
        return operContent;
    }

    /**
     * @param operContent
     */
    public void setOperContent(String operContent) {
        this.operContent = operContent;
    }

    /**
     * @return oper_userId
     */
    public Long getOperUserid() {
        return operUserid;
    }

    /**
     * @param operUserid
     */
    public void setOperUserid(Long operUserid) {
        this.operUserid = operUserid;
    }

    /**
     * @return oper_time
     */
    public Date getOperTime() {
        return operTime;
    }

    /**
     * @param operTime
     */
    public void setOperTime(Date operTime) {
        this.operTime = operTime;
    }

    /**
     * @return ip
     */
    public String getIp() {
        return ip;
    }

    /**
     * @param ip
     */
    public void setIp(String ip) {
        this.ip = ip;
    }

    /**
     * 获取备注
     *
     * @return remark - 备注
     */
    public String getRemark() {
        return remark;
    }

    /**
     * 设置备注
     *
     * @param remark 备注
     */
    public void setRemark(String remark) {
        this.remark = remark;
    }
}
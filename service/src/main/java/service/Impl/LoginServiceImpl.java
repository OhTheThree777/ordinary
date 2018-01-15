package service.Impl;

import common.model.ResponseModelJqGrid;
import mapper.mapper.sys.SysLogMapper;
import mapper.mapper.sys.SysUserMapper;
import mapper.model.sys.SysLog;
import mapper.model.sys.SysUser;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.LoginService;

import java.util.Date;

/**
 * Created by r958403448 on 2017/7/27.
 */
@Service
public  class LoginServiceImpl implements LoginService {

    private static Logger logger = LoggerFactory.getLogger(LoginServiceImpl.class);

    @Autowired
    private SysLogMapper sysLogMapper;
    @Autowired
    private SysUserMapper sysUserMapper;


    /**
     * 用户登录Controller
     *
     * @param user
     * @return
     */
    @Override
    public ResponseModelJqGrid doLogin(SysUser user) {
        ResponseModelJqGrid model = new ResponseModelJqGrid();


        SysLog log=new SysLog();
        log.setOperTime(new Date());
        //log.setIp(HttpServletTools.getIPFromRequest(request));
        log.setOperUserid(Long.valueOf(user.getId()));
        log.setOperType("1");
        log.setRemark("用户登陆系统");
        sysLogMapper.insertSelective(log);
        long cout = user.getLoginCount().longValue();
        user.setLoginCount(cout++);
        user.setLastLoginTime(user.getLoginTime());
        user.setLoginTime(new Date());
        sysUserMapper.updateByPrimaryKeySelective(user);
        model.setObject(user);
        model.success("登录成功!");



        return model;
    }

    public String encryptionBySha256Hash(String string) {
        Sha256Hash sha256Hash = new Sha256Hash(string);
        return sha256Hash.toBase64();
    }

    @Override
    public String hello(String name) {
        logger.debug("hello" + name);
        System.out.println(name);
        return "hello" + name;
    }
    @Override
    public ResponseModelJqGrid login(String username, String password) {
        ResponseModelJqGrid model = new ResponseModelJqGrid();
        SysUser user=new SysUser();
        user.setId(new Integer(1));
        model.setObject(user);

        model.success("登录成功!");
        return model;
    }
}

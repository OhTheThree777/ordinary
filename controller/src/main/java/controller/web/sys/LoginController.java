package controller.web.sys;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import common.model.ResponseModelJqGrid;
import common.util.HttpServletTools;
import common.util.ProxyUtil;
import common.util.SysConstants;
import controller.shiro.CommonRealm;
import mapper.mapper.sys.SysLogMapper;
import mapper.mapper.sys.SysUserMapper;
import mapper.model.sys.SysLog;
import mapper.model.sys.SysUser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * 用户登录Controller
 *
 */
@Controller
@RequestMapping("/login.json")
public class LoginController {
	private static Logger logger = LoggerFactory.getLogger(LoginController.class);
	@Autowired
	private SysLogMapper sysLogMapper;
	@Autowired
	private SysUserMapper sysUserMapper;
	@RequestMapping()
	@ResponseBody
	@Transactional(rollbackFor=Exception.class)
	public ResponseModelJqGrid doLogin(Map<String, Object> map, HttpServletRequest request) {
		ResponseModelJqGrid model = new ResponseModelJqGrid();
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
	
		logger.info("用户登录.[username="+username+",password="+password+"]["+ CommonRealm.encryptionBySha256Hash(password)+"]");

		
		try {
			SecurityUtils.getSubject().login(new UsernamePasswordToken(username, password));
			SysUser user = (SysUser) ProxyUtil.getAgentTarget(SecurityUtils.getSubject().getSession().getAttribute(SysConstants.SESSION_USER_KEY));
			// Session中增加IP属性
			request.getSession().setAttribute(SysConstants.SESSION_IPADD_KEY, HttpServletTools.getIPFromRequest(request));
			SysLog log=new SysLog();
			log.setOperTime(new Date());
			log.setIp(HttpServletTools.getIPFromRequest(request));
			log.setOperUserid(user.getPid());
			log.setOperType("1");
			log.setRemark("用户登陆系统");
			sysLogMapper.insertSelective(log);
			long cout=user.getLogincount().longValue();
			user.setLogincount(cout++);
			user.setLastlogintime(user.getLogintime());
			user.setLogintime(new Date());
			sysUserMapper.updateByPrimaryKeySelective(user);
			model.setObject(user);
			model.success("登录成功!");
			
		} catch (AuthenticationException e0) {
//			e0.printStackTrace();
			if ("1".equals(e0.getMessage())) {
				model.error("用户不存在！");
			} else if ("2".equals(e0.getMessage())) {
				model.error("用户名在数据库中重复！");
			} else if ("3".equals(e0.getMessage())) {
				model.error("该用户被锁定，暂时禁止登录！");
			} else if ("4".equals(e0.getMessage())) {
				model.error("该用户已注销，禁止登录！");
			} else {
				model.error("用户名或密码错误！");
			}
//			log.setSfcg("0");
		} catch (Exception e1) {
			e1.printStackTrace();
			model.error(e1.getMessage());
		} finally {
			try {
			} catch (Exception e) {
				logger.debug("Controller:记录日用户登录日志发生异常，系统默认忽略。");
			}
		}
		
		return model;
	}
}

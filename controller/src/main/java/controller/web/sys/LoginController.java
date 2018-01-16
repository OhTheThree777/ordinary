package controller.web.sys;

import common.model.ResponseModelJqGrid;
import common.util.ProxyUtil;
import common.util.SysConstants;
import mapper.model.sys.SysUser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.LoginService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;


/**
 * 用户登录Controller
 *
 */

@Controller
@RequestMapping("/login.json")
public class LoginController {


	private static Logger logger = LoggerFactory.getLogger(LoginController.class);


	@Resource
	LoginService loginService;


	@RequestMapping()
	@ResponseBody
	public ResponseModelJqGrid doLogin(Map<String, Object> map, HttpServletRequest request) {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		System.out.println(username+","+password);

        ResponseModelJqGrid model = new ResponseModelJqGrid();


        try {
            SecurityUtils.getSubject().login(new UsernamePasswordToken(username, password));
            SysUser user = (SysUser) ProxyUtil.getAgentTarget(SecurityUtils.getSubject().getSession().getAttribute(SysConstants.SESSION_USER_KEY));
			request.getSession().setAttribute("user_id",user.getId());
			request.getSession().getAttribute("user_id");
            loginService.doLogin(user);
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

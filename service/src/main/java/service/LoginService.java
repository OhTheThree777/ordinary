package service;


import common.model.ResponseModelJqGrid;
import mapper.model.sys.SysUser;

/**
 * Created by r958403448 on 2017/7/27.
 */
public interface LoginService {
     /**
      *用户登录Controller
      * @param user
      * @param user,pwd
      * @return
      */
     //ResponseModelJqGrid doLogin(Map<String,Object> map, HttpServletRequest request);

     ResponseModelJqGrid doLogin(SysUser user);

     String hello(String name);

     ResponseModelJqGrid login(String username, String password);

}

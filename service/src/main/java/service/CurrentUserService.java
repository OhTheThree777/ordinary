package service;

import common.model.ResponseModelBootstrapTable;
import common.model.ResponseModelJqGrid;

import java.util.Map;

/**
 * Created by r958403448 on 2017/7/27.
 */
public interface CurrentUserService {
     /**
      *获得当前用户信息
      * @param map
      * @return
      */
     ResponseModelJqGrid doGetCurrentUser(Map<String, Object> map);

     /**
      * 获取系统用户信息 用于修改信息
      * @param userId
      * @return
      */
     ResponseModelBootstrapTable getCurrentUserInfo(String userId);



}

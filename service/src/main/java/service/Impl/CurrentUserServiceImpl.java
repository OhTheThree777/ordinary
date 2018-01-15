package service.Impl;

import com.github.abel533.entity.EntityMapper;
import com.github.abel533.entity.Example;
import common.model.ResponseModelBootstrapTable;
import common.model.ResponseModelJqGrid;
import common.util.ProxyUtil;
import common.util.SysConstants;
import mapper.mapper.sys.SysUserMapper;
import mapper.model.sys.SysUser;
import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Service;
import service.CurrentUserService;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by r958403448 on 2017/7/27.
 */
@Service
public class CurrentUserServiceImpl implements CurrentUserService {

    @Resource
    private EntityMapper entityMapper;
    @Resource
    private SysUserMapper sysUserMapper;

    /**
     * 获得当前用户信息
     * @param map
     * @return
     */
    @Override
    public ResponseModelJqGrid doGetCurrentUser(Map<String, Object> map) {

        ResponseModelJqGrid model = new ResponseModelJqGrid();

        // 判断是否登录认证
        if (!SecurityUtils.getSubject().isAuthenticated()) {
            model.error("用户未登录");
            return model;
        }
        SysUser user = (SysUser) SecurityUtils.getSubject().getSession().getAttribute(SysConstants.SESSION_USER_KEY);
        if (user == null) {
            model.error("用户未登录");
            return model;
        }

        String reload = (String) map.get("reload");

        try {
//			model.setObject(SecurityUtils.getSubject().getSession().getAttribute(SysConstants.SESSION_USER_KEY));
            if ("1".equals(reload)) {
                user = entityMapper.selectByPrimaryKey(SysUser.class,user.getId());
                // 向Session中添加用户对象
                SecurityUtils.getSubject().getSession().setAttribute(SysConstants.SESSION_USER_KEY, user);

            }

            model.setObject(ProxyUtil.getAgentTarget(user));
            if (model.get("obj") == null) {
                // session中没用用户对象
                throw new Exception("session中没用用户对象");
            }
        } catch (Exception e) {
            e.printStackTrace();
            model.error("未找到当前用户");
        }

        return model;
    }


    /**
     * 获取系统用户信息 用于修改信息
     *
     * @param userId
     * @return
     */
    @Override
    public ResponseModelBootstrapTable getCurrentUserInfo(String userId) {
        ResponseModelBootstrapTable modelBootstrapTable = new ResponseModelBootstrapTable();
        Example example = new Example(SysUser.class);
        Example.Criteria cri = example.createCriteria();
        cri.andEqualTo("id",userId);
        List<SysUser> userList = sysUserMapper.selectByExample(example);
        modelBootstrapTable.setList(userList);
        return modelBootstrapTable;
    }
}

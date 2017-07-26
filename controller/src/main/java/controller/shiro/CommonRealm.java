package controller.shiro;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import common.util.SysConstants;
import mapper.model.sys.SysUser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.github.abel533.entity.EntityMapper;
import com.github.abel533.entity.Example;


/**
 * Shiro 自定义认证对象
 * 
 * @author
 *
 */
public class CommonRealm extends AuthorizingRealm {
	private static Logger logger = LoggerFactory.getLogger(CommonRealm.class);

	@Autowired
	private EntityMapper entityMapper;

	public CommonRealm() {
		setName(SysConstants.SHIRO_REALM_NAME);

		HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(
				Sha256Hash.ALGORITHM_NAME);
		matcher.setStoredCredentialsHexEncoded(false);
		matcher.setHashIterations(1);
		setCredentialsMatcher(matcher);
	}

	/**
	 * 将字符串以 SHA-256 方式加密
	 * 
	 * @param string
	 * @return
	 */
	public static String encryptionBySha256Hash(String string) {
		Sha256Hash sha256Hash = new Sha256Hash(string);
		return sha256Hash.toBase64();
	}

	/**
	 * 认证
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken token) throws AuthenticationException {
		logger.info("用户登录认证开始.....");

		UsernamePasswordToken upToken = (UsernamePasswordToken) token;

		String username = upToken.getUsername();
		// String password = String.copyValueOf(upToken.getPassword());
		Example example = new Example(SysUser.class);
		example.createCriteria().andEqualTo("loginname", username);
		List<SysUser> userList = entityMapper.selectByExample(example);
		SysUser user = null;
		if (userList.size() == 0) {
			throw new AuthenticationException("1");
		} else if (userList.size() != 1) {
			throw new AuthenticationException("2");
		} else {
			user = userList.get(0);
			// 向Session中添加用户对象
			SecurityUtils.getSubject().getSession()
					.setAttribute(SysConstants.SESSION_USER_KEY, user);
			//设置session 永不过期
			SecurityUtils.getSubject().getSession().setTimeout(-1001);
		}
		AuthenticationInfo result = new SimpleAuthenticationInfo(
				user.getLoginname(), user.getPassword(), getName());

		return result;
	}

	/**
	 * 授权
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(
			PrincipalCollection collection) {
		logger.info("用户登录授权开始.....");

		// String userName = (String)
		// collection.fromRealm(getName()).iterator().next();

		SysUser user = (SysUser) SecurityUtils.getSubject().getSession()
				.getAttribute(SysConstants.SESSION_USER_KEY);
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		if (user == null) {
			logger.info("用户未登录！");
		} else {
			Set<String> rolePermission = new HashSet<String>();
			Set<String> purviewPermission = new HashSet<String>();

			info.addRoles(rolePermission);

			info.addStringPermissions(purviewPermission);
		}
		logger.info("current user is " + user);

		return info;
	}
	public static void main(String[] args) {
		System.out.println(CommonRealm.encryptionBySha256Hash("admin"));
	}

}

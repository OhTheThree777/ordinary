package common.util;

import java.lang.reflect.Field;
import java.lang.reflect.Proxy;

import org.springframework.aop.framework.AdvisedSupport;
import org.springframework.aop.framework.AopProxy;
import org.springframework.aop.support.AopUtils;
import org.springframework.util.ClassUtils;

public class ProxyUtil {

	/**
	 * 获得由JDK或从glib代理的目标对象（若未被代理则返回本身）。
	 * 用于对Model对象进行JSON、Xml转换，或反射操作。
	 * @param proxy
	 * @return
	 * @throws Exception
	 */
	public static Object getAgentTarget(Object proxy) throws Exception {
		if (!isProxy(proxy)) {
			return proxy;// 不是代理对象
		}

		if (AopUtils.isJdkDynamicProxy(proxy)) {// JDK
			return getJdkDynamicProxyTargetObject(proxy);
		} else { // cglib
			return getCglibProxyTargetObject(proxy);
		}

	}

	/**
	 * 判断对象是否是被代理的对象
	 * @param proxy
	 * @return
	 */
	public static boolean isProxy(Object proxy) {
		if (proxy == null) {
			return false;
		}
		return Proxy.isProxyClass(proxy.getClass()) || ClassUtils.isCglibProxy(proxy);
	}

	/**
	 * 获得由cglib代理的目标对象
	 * @param proxy
	 * @return
	 * @throws Exception
	 */
	private static Object getCglibProxyTargetObject(Object proxy)
			throws Exception {
		Field h = proxy.getClass().getDeclaredField("CGLIB$CALLBACK_0");
		h.setAccessible(true);
		Object dynamicAdvisedInterceptor = h.get(proxy);

		Field advised = dynamicAdvisedInterceptor.getClass().getDeclaredField("object");
		advised.setAccessible(true);

		Object target = advised.get(dynamicAdvisedInterceptor);

		return target;
	}

	/**
	 * 获得使用JDK对象代理的目标对象
	 * @param proxy
	 * @return
	 * @throws Exception
	 */
	private static Object getJdkDynamicProxyTargetObject(Object proxy)
			throws Exception {
		Field h = proxy.getClass().getSuperclass().getDeclaredField("h");
		h.setAccessible(true);
		AopProxy aopProxy = (AopProxy) h.get(proxy);

		Field advised = aopProxy.getClass().getDeclaredField("advised");
		advised.setAccessible(true);

		Object target = ((AdvisedSupport) advised.get(aopProxy))
				.getTargetSource().getTarget();

		return target;
	}
}

package common.annotation;

import java.lang.annotation.*;

/**
 * \* Created with IntelliJ IDEA.
 * \* User: zhangZhigang
 * \* Date: 2017/12/12
 * \* Time: 下午5:08
 * \* To change this template use File | Settings | File Templates.
 * \* Description:
 * \
 */
@Target({ElementType.PARAMETER, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface SystemServiceLog {

    String description() default "";


}
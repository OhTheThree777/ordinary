package controller.wechar;

import io.github.elkan1788.mpsdk4j.mvc.WechatWebSupport;
import io.github.elkan1788.mpsdk4j.util.ConfigReader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



public class WechatCoreController extends WechatWebSupport{
	
	private static final Logger log = LoggerFactory.getLogger(WechatCoreController.class);
    private static final ConfigReader _cr = new ConfigReader("/mp.properties");

}

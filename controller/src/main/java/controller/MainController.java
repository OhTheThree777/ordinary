package controller;

import org.springframework.mobile.device.Device;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/main")
public class MainController {
	@RequestMapping("")
	public ModelAndView main(Device device) {
		String deviceType = "unknown";
		if (device.isNormal())
			return new ModelAndView("main");	
		else if (device.isMobile())
			deviceType = "mobile";// 手机端
		else if (device.isTablet())
			deviceType = "mobile";// 平板
		String url = deviceType + "/main";
		return new ModelAndView(url);
	}
}

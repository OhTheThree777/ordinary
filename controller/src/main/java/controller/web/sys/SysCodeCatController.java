package controller.web.sys;


import common.model.DataBootstrapTable;
import common.model.ResponseModelBootstrapTable;
import mapper.model.sys.SysCodeCat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.SysCodeCatService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * 数据字典管理表
 *
 * @author mac
 */
@Controller
@RequestMapping("sysCodeCatController")
public class SysCodeCatController {


	private static Logger logger = LoggerFactory
			.getLogger(SysCodeCatController.class);


	@Resource
	private SysCodeCatService sysCodeCatService;

	/**
	 * @param dbt
	 * @param request
	 * @param response
	 * @param sysCodeCat 查询全部信息
	 * @return
	 */
	@RequestMapping("main.json")
	@ResponseBody
	public ResponseModelBootstrapTable main(DataBootstrapTable dbt,
											HttpServletRequest request, HttpServletResponse response,
											SysCodeCat sysCodeCat, @RequestParam String catCode, @RequestParam String catName) {
		ResponseModelBootstrapTable model = sysCodeCatService.main(dbt,catCode,catName);
		return model;
	}

	/**
	 * @param request
	 * @param sysCodeCat 添加
	 * @return
	 */
	@RequestMapping("add.json")
	@ResponseBody
	public ResponseModelBootstrapTable add(HttpServletRequest request,
										   SysCodeCat sysCodeCat) {
		ResponseModelBootstrapTable model = sysCodeCatService.add(sysCodeCat);

		return model;
	}

	/**
	 * @param request
	 * @param sysCodeCat 查询单个 信息
	 * @return
	 */
	@RequestMapping("selectObjById.json")
	@ResponseBody
	public ResponseModelBootstrapTable selectObjById(
			HttpServletRequest request, SysCodeCat sysCodeCat) {
		ResponseModelBootstrapTable model = sysCodeCatService.selectObjById(sysCodeCat);
		return sysCodeCatService.selectObjById(sysCodeCat);

	}

	/**
	 * @param request
	 * @param sysCodeCat 修改
	 * @return
	 */
	@RequestMapping("update.json")
	@ResponseBody
	public ResponseModelBootstrapTable update(HttpServletRequest request,
											  SysCodeCat sysCodeCat) {
		ResponseModelBootstrapTable model = sysCodeCatService.update(sysCodeCat);
		return model;
	}

	/**
	 * @param request
	 * @param sysCodeCat 删除
	 * @return
	 */
	@RequestMapping("del.json")
	@ResponseBody
	public ResponseModelBootstrapTable del(HttpServletRequest request,
										   SysCodeCat sysCodeCat) {
		ResponseModelBootstrapTable model = sysCodeCatService.del(sysCodeCat);
		return model;
	}


}

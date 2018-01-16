package controller.web.sys;


import common.model.DataBootstrapTable;
import common.model.ResponseModelBootstrapTable;
import mapper.model.sys.SysCodeDict;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.SysCodeDictService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 数据字典管理表
 * 
 * @author mac
 *
 */
@Controller
@RequestMapping("sysCodeDictController")
public class SysCodeDictController {


	private static Logger logger = LoggerFactory
			.getLogger(SysCodeDictController.class);

	@Resource
	private SysCodeDictService sysCodeDictService;

	/**
	 * @param dbt
	 * @param request
	 * @param response
	 * @param sysCodeDict
	 *            查询全部信息
	 * @return
	 */
	@RequestMapping("main.json")
	@ResponseBody
	public ResponseModelBootstrapTable main(DataBootstrapTable dbt,
											HttpServletRequest request, HttpServletResponse response,
											SysCodeDict sysCodeDict) {
		ResponseModelBootstrapTable model = sysCodeDictService.main(dbt,sysCodeDict);
		return model;
	}

	/**
	 * @param request
	 * @param sysCodeDict
	 *            添加
	 * @return
	 */
	@RequestMapping("add.json")
	@ResponseBody
	public ResponseModelBootstrapTable add(HttpServletRequest request,
			SysCodeDict sysCodeDict) {
		ResponseModelBootstrapTable modelBootstrapTable = sysCodeDictService.add(sysCodeDict);

		return modelBootstrapTable;
	}

	/**
	 * @param request
	 * @param sysCodeDict
	 *            查询单个 信息
	 * @return
	 */
	@RequestMapping("selectObjById.json")
	@ResponseBody
	public ResponseModelBootstrapTable selectObjById(
			HttpServletRequest request, SysCodeDict sysCodeDict) {
		ResponseModelBootstrapTable modelBootstrapTable = sysCodeDictService.selectObjById(sysCodeDict);
		return modelBootstrapTable;
	}

	/**
	 * @param request
	 * @param sysCodeDict
	 *            修改
	 * @return
	 */
	@RequestMapping("update.json")
	@ResponseBody
	public ResponseModelBootstrapTable update(HttpServletRequest request,
			SysCodeDict sysCodeDict) {
		ResponseModelBootstrapTable modelBootstrapTable = sysCodeDictService.update(sysCodeDict);
		return modelBootstrapTable;
	}

	/**
	 * @param request
	 * @param sysCodeDict
	 *            删除
	 * @return
	 */
	@RequestMapping("del.json")
	@ResponseBody
	public ResponseModelBootstrapTable del(HttpServletRequest request,
			SysCodeDict sysCodeDict) {
		ResponseModelBootstrapTable model = sysCodeDictService.del(sysCodeDict);
		return model;
	}

	/**
	 *
	 * @param request
	 * @param sysCodeDict
	 * @return
	 */
	@RequestMapping("getKeyByValue")
	@ResponseBody
	public String getKeyByValue(HttpServletRequest request,
			SysCodeDict sysCodeDict) {
		String str = sysCodeDictService.getKeyByValue(sysCodeDict);
		return str;
	}

	/**
	 *
	 * @param request
	 * @param sysCodeDict
	 * @return
	 */
	@RequestMapping("getCodes")
	@ResponseBody
	public List<SysCodeDict> getCodes(HttpServletRequest request,
			SysCodeDict sysCodeDict) {
		List<SysCodeDict> list = sysCodeDictService.getCodes(sysCodeDict);
		return list;
	}
}

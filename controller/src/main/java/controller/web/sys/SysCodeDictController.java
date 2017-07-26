package controller.web.sys;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import common.model.DataBootstrapTable;
import common.model.ResponseModelBootstrapTable;
import common.util.Page;
import component.SysCodeCache;
import mapper.mapper.sys.SysCodeDictMapper;
import mapper.model.sys.SysCodeDict;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;
import tk.mybatis.mapper.entity.Example.OrderBy;

/**
 * 数据字典管理表
 * 
 * @author mac
 *
 */
@Controller
@RequestMapping("sysCodeDictController")
public class SysCodeDictController {

	@Autowired
	private SysCodeDictMapper sysCodeDictMapper;

	@Resource
	SysCodeCache sysCodeCache;
	private static Logger logger = LoggerFactory
			.getLogger(SysCodeDictController.class);

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
		// 初始化返回对象
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();

		try {
			// 分页信息
			Integer offset = dbt.getOffset();
			Integer pageSize = dbt.getLimit();
			Integer currentPage = 1;
			if (offset == 0) {
				currentPage = 1;
			} else {
				currentPage = (pageSize + offset) / pageSize;
			}
			// 分页类初始化
			Page page = new Page(currentPage, pageSize);
			Example example = new Example(SysCodeDict.class);

			Criteria cri = example.createCriteria();
			if (null != dbt.getSearch() && !"".equals(dbt.getSearch())) {
				cri.andLike("", "%" + dbt.getSearch() + "%");
			}
			cri.andLike("catCode", sysCodeDict.getCatCode());
			List<?> sysCodeDictes = null;
			if (currentPage == null || pageSize == null) {
				sysCodeDictes = sysCodeDictMapper.selectByExample(example);
			} else {
				if (null != dbt.getSort() && !"".equals(dbt.getSort())) {
					OrderBy orderby = example.orderBy(dbt.getSort());
					
					if ("asc".equals(dbt.getOrder())) {
						orderby.asc();
					} else {
						orderby.desc();
					}
					OrderBy orderby1 = example.orderBy("dictLevel");
					orderby1.asc();

				}
				sysCodeDictes = sysCodeDictMapper.selectByExampleAndRowBounds(
						example,
						new RowBounds(page.getStartLine(), pageSize));

			}
			page.setTotalLine(sysCodeDictMapper.selectCountByExample(example));

			model.bing(sysCodeDictes, page.getTotalLine(), page.getTotalPage());
		} catch (Exception e) {
			model.error();
			logger.error("Controller:条件查询队伍信息发送异常。 -- " + e.getMessage());
		}

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

		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysCodeDictMapper.insertSelective(sysCodeDict);
		model.success();
		return model;
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
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysCodeDict = sysCodeDictMapper.selectByPrimaryKey(sysCodeDict);
		model.setObject(sysCodeDict);
		return model;
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
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysCodeDictMapper.updateByPrimaryKeySelective(sysCodeDict);
		model.setObject(sysCodeDict);
		return model;
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
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysCodeDictMapper.deleteByPrimaryKey(sysCodeDict);
		model.setObject(sysCodeDict);
		return model;
	}

	@RequestMapping("getKeyByValue")
	@ResponseBody
	public String getKeyByValue(HttpServletRequest request,
			SysCodeDict sysCodeDict) {
		return sysCodeCache.getKeyByValue(sysCodeDict.getCatCode(),
				sysCodeDict.getDictValue()).get(sysCodeDict.getDictValue()).toString();
	}

	@RequestMapping("getCodes")
	@ResponseBody
	public List<SysCodeDict> getCodes(HttpServletRequest request,
			SysCodeDict sysCodeDict) {
		return sysCodeCache.getCodes(sysCodeDict.getCatCode());
	}
}

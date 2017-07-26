package controller.web.sys;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import common.model.DataBootstrapTable;
import common.model.ResponseModelBootstrapTable;
import common.util.Page;
import mapper.mapper.sys.SysCodeCatMapper;
import mapper.model.sys.SysCodeCat;
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
 * @author mac
 *
 */
@Controller
@RequestMapping("sysCodeCatController")
public class SysCodeCatController {
	
	@Autowired
	private SysCodeCatMapper sysCodeCatMapper;

	private static Logger logger = LoggerFactory
			.getLogger(SysCodeCatController.class);

	/**
	 * @param dbt
	 * @param request
	 * @param response
	 * @param sysCodeCat
	 *            查询全部信息
	 * @return
	 */
	@RequestMapping("main.json")
	@ResponseBody
	public ResponseModelBootstrapTable main(DataBootstrapTable dbt,
											HttpServletRequest request, HttpServletResponse response,
											SysCodeCat sysCodeCat) {
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
			Example example = new Example(SysCodeCat.class);

			Criteria cri = example.createCriteria();
			if(null!=dbt.getSearch()&&!"".equals(dbt.getSearch())){
				cri.andLike("","%"+dbt.getSearch()+"%");
			}

			List<?> sysCodeCates = null;
			if (currentPage == null || pageSize == null) {
				sysCodeCates = sysCodeCatMapper.selectByExample(example);
			} else {
				if (null != dbt.getSort() && !"".equals(dbt.getSort())) {
					OrderBy orderby = example.orderBy(dbt.getSort());
					if ("asc".equals(dbt.getOrder())) {
						orderby.asc();
					} else {
						orderby.desc();
					}

				}
				sysCodeCates = sysCodeCatMapper.selectByExampleAndRowBounds(
						example,
						new RowBounds(page.getStartLine(), pageSize));

			}
			page.setTotalLine(sysCodeCatMapper.selectCountByExample(example));

			model.bing(sysCodeCates, page.getTotalLine(), page.getTotalPage());
		} catch (Exception e) {
			model.error();
			logger.error("Controller:条件查询队伍信息发送异常。 -- " + e.getMessage());
		}

		return model;
	}

	/**
	 * @param request
	 * @param sysCodeCat
	 *            添加
	 * @return
	 */
	@RequestMapping("add.json")
	@ResponseBody
	public ResponseModelBootstrapTable add(HttpServletRequest request,
			SysCodeCat sysCodeCat) {

		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysCodeCatMapper.insertSelective(sysCodeCat);
		model.success();
		return model;
	}

	/**
	 * @param request
	 * @param sysCodeCat
	 *            查询单个 信息
	 * @return
	 */
	@RequestMapping("selectObjById.json")
	@ResponseBody
	public ResponseModelBootstrapTable selectObjById(
			HttpServletRequest request, SysCodeCat sysCodeCat) {
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysCodeCat = sysCodeCatMapper.selectByPrimaryKey(sysCodeCat);
		model.setObject(sysCodeCat);
		return model;
	}

	/**
	 * @param request
	 * @param sysCodeCat
	 *            修改
	 * @return
	 */
	@RequestMapping("update.json")
	@ResponseBody
	public ResponseModelBootstrapTable update(HttpServletRequest request,
			SysCodeCat sysCodeCat) {
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysCodeCatMapper.updateByPrimaryKeySelective(sysCodeCat);
		model.setObject(sysCodeCat);
		return model;
	}

	/**
	 * @param request
	 * @param sysCodeCat
	 *            删除
	 * @return
	 */
	@RequestMapping("del.json")
	@ResponseBody
	public ResponseModelBootstrapTable del(HttpServletRequest request,
			SysCodeCat sysCodeCat) {
		ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
		sysCodeCatMapper.deleteByPrimaryKey(sysCodeCat);
		model.setObject(sysCodeCat);
		return model;
	}
	

}

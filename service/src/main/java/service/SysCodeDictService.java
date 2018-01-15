package service;

import cn.imfc.common.model.DataBootstrapTable;
import cn.imfc.common.model.ResponseModelBootstrapTable;
import cn.imfc.mapper.model.sys.SysCodeDict;

import java.util.List;

/**
 * 数据字典管理表
 * Created by r958403448 on 2017/7/27.
 */
public interface SysCodeDictService {
	/**
	 * 查询全部信息
	 *
	 * @param dbt
	 * @param sysCodeDict
	 * @return
	 */
	ResponseModelBootstrapTable main(DataBootstrapTable dbt, SysCodeDict sysCodeDict);

	/**
	 * 添加
	 *
	 * @param sysCodeDict
	 * @return
	 */
	ResponseModelBootstrapTable add(SysCodeDict sysCodeDict);

	/**
	 * 查询单个 信息
	 *
	 * @param sysCodeDict
	 * @return
	 */
	ResponseModelBootstrapTable selectObjById(SysCodeDict sysCodeDict);

	/**
	 * 修改
	 *
	 * @param sysCodeDict
	 * @return
	 */
	ResponseModelBootstrapTable update(SysCodeDict sysCodeDict);

	/**
	 * 删除
	 *
	 * @param sysCodeDict
	 * @return
	 */
	ResponseModelBootstrapTable del(SysCodeDict sysCodeDict);

	/**
	 * @param sysCodeDict
	 * @return
	 */
	String getKeyByValue(SysCodeDict sysCodeDict);

	/**
	 * @param sysCodeDict
	 * @return
	 */
	List<SysCodeDict> getCodes(SysCodeDict sysCodeDict);
}

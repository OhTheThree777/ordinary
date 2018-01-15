package service;

import common.model.DataBootstrapTable;
import common.model.ResponseModelBootstrapTable;
import mapper.model.sys.SysCodeCat;

/**
 * 数据字典管理表
 * Created by r958403448 on 2017/7/27.
 */
public interface SysCodeCatService {

    /**
     *查询全部信息
     * @param dataBootStrapTable
     * @return
     */
    ResponseModelBootstrapTable main(DataBootstrapTable dataBootStrapTable, String catCode, String catName);


    /**
     *添加
     * @param sysCodeCat
     * @return
     */
    ResponseModelBootstrapTable add(SysCodeCat sysCodeCat);

    /**
     *查询单个 信息
     *
     * @param sysCodeCat
     * @return
     */
    ResponseModelBootstrapTable selectObjById(SysCodeCat sysCodeCat);

    /**
     *修改
     * @param sysCodeCat
     * @return
     */
    ResponseModelBootstrapTable update(SysCodeCat sysCodeCat);

    /**
     *删除
     * @param sysCodeCat
     * @return
     */
    ResponseModelBootstrapTable del(SysCodeCat sysCodeCat);


}



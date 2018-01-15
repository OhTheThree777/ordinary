package service.Impl;

import common.model.DataBootstrapTable;
import common.model.ResponseModelBootstrapTable;
import common.util.Page;
import mapper.mapper.sys.SysCodeDictMapper;
import mapper.model.sys.SysCodeDict;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.SysCodeDictService;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.List;

/**
 * 数据字典管理表
 * Created by r958403448 on 2017/7/27.
 */
@Service
public class SysCodeDictServiceImpl implements SysCodeDictService {

    @Autowired
    private SysCodeDictMapper sysCodeDictMapper;



    @Resource
    // private SysCodeCache sysCodeCache;
    private static Logger logger = LoggerFactory
            .getLogger(SysCodeDictServiceImpl.class);

    /**
     *查询全部信息
     * @param dbt
     * @param sysCodeDict
     * @return
     */
    @Override
    public ResponseModelBootstrapTable main(DataBootstrapTable dbt, SysCodeDict sysCodeDict) {
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

            Example.Criteria cri = example.createCriteria();
            if (null != dbt.getSearch() && !"".equals(dbt.getSearch())) {
                cri.andLike("", "%" + dbt.getSearch() + "%");
            }
            cri.andLike("catCode", sysCodeDict.getCatCode());
            List<?> sysCodeDictes = null;
            if (currentPage == null || pageSize == null) {
                sysCodeDictes = sysCodeDictMapper.selectByExample(example);
            } else {
                if (null != dbt.getSort() && !"".equals(dbt.getSort())) {
                    Example.OrderBy orderby = example.orderBy(dbt.getSort());

                    if ("asc".equals(dbt.getOrder())) {
                        orderby.asc();
                    } else {
                        orderby.desc();
                    }
                    Example.OrderBy orderby1 = example.orderBy("dictLevel");
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
     *添加
     * @param sysCodeDict
     * @return
     */
    @Override
    public ResponseModelBootstrapTable add( SysCodeDict sysCodeDict) {

        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        sysCodeDictMapper.insertSelective(sysCodeDict);
        model.success();
        return model;
    }

    /**
     *查询单个 信息
     * @param sysCodeDict
     * @return
     */
    @Override
    public ResponseModelBootstrapTable selectObjById(SysCodeDict sysCodeDict) {
        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        sysCodeDict = sysCodeDictMapper.selectByPrimaryKey(sysCodeDict);
        model.setObject(sysCodeDict);
        return model;
    }

    /**
     *修改
     * @param sysCodeDict
     * @return
     */
    @Override
    public ResponseModelBootstrapTable update( SysCodeDict sysCodeDict) {
        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        sysCodeDictMapper.updateByPrimaryKeySelective(sysCodeDict);
        model.setObject(sysCodeDict);
        return model;
    }

    /**
     *删除
     * @param sysCodeDict
     * @return
     */
    @Override
    public ResponseModelBootstrapTable del( SysCodeDict sysCodeDict) {
        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        sysCodeDictMapper.deleteByPrimaryKey(sysCodeDict);
        model.setObject(sysCodeDict);
        return model;
    }

    /**
     *
     * @param sysCodeDict
     * @return
     */
    @Override
    public String getKeyByValue( SysCodeDict sysCodeDict) {
        return sysCodeCache.getKeyByValue(sysCodeDict.getCatCode(),
                sysCodeDict.getDictValue()).get(sysCodeDict.getDictValue()).toString();

    }

    /**
     *
     * @param sysCodeDict
     * @return
     */
    @Override
    public List<SysCodeDict> getCodes( SysCodeDict sysCodeDict) {
        return sysCodeCache.getCodes(sysCodeDict.getCatCode());
    }
}

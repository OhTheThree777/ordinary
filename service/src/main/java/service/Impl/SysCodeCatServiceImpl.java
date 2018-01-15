package service.Impl;

import cn.imfc.common.model.DataBootstrapTable;
import cn.imfc.common.model.ResponseModelBootstrapTable;
import cn.imfc.common.util.Page;
import cn.imfc.mapper.mapper.sys.SysCodeCatMapper;
import cn.imfc.mapper.model.sys.SysCodeCat;
import cn.imfc.sys.service.SysCodeCatService;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.List;

/**
 * 数据字典管理表
 * Created by r958403448 on 2017/7/27.
 */
@Service
@com.alibaba.dubbo.config.annotation.Service
public class SysCodeCatServiceImpl implements SysCodeCatService {

    @Resource
    private SysCodeCatMapper sysCodeCatMapper;

    private static Logger logger = LoggerFactory
            .getLogger(SysCodeCatServiceImpl.class);

    /**
     *查询全部信息
     * @param dbt
     * @return
     * SysCodeCatServiceImpl#main(cn.imfc.common.model.DataBootstrapTable)
     */
    @Override
    public ResponseModelBootstrapTable main(DataBootstrapTable dbt,String catCode,String catName) {
        // 初始化返回对象
        ResponseModelBootstrapTable  model = new ResponseModelBootstrapTable();
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
                Example.Criteria cri = example.createCriteria();
                if((!catCode.isEmpty() || catCode != null) && (!catName.isEmpty() || catName != null)) {
                    cri.andLike("catCode","%"+catCode+"%");
                    cri.andLike("catName","%"+catName+"%");
                }
                if(null!=dbt.getSearch()&&!"".equals(dbt.getSearch())){
                    cri.andLike("","%"+dbt.getSearch()+"%");
                }
                List<?> sysCodeCates = null;
                if (currentPage == null || pageSize == null) {
                    sysCodeCates = sysCodeCatMapper.selectByExample(example);
                } else {
                    if (null != dbt.getSort() && !"".equals(dbt.getSort())) {
                        Example.OrderBy orderby = example.orderBy(dbt.getSort());
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
     *添加
     *
     * @param sysCodeCat
     * @return
     */
    @Override
    public ResponseModelBootstrapTable add( SysCodeCat sysCodeCat) {

        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        sysCodeCatMapper.insertSelective(sysCodeCat);
        model.success();
        return model;
    }

    /**
     *查询单个 信息
     * @param sysCodeCat
     * @return
     */
    @Override
    public ResponseModelBootstrapTable selectObjById(SysCodeCat sysCodeCat) {
        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        sysCodeCat = sysCodeCatMapper.selectByPrimaryKey(sysCodeCat);
        model.setObject(sysCodeCat);
        return model;
    }

    /**
     *修改
     * @param sysCodeCat
     * @return
     */
    @Override
    public ResponseModelBootstrapTable update(SysCodeCat sysCodeCat) {
        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        sysCodeCatMapper.updateByPrimaryKeySelective(sysCodeCat);
        model.setObject(sysCodeCat);
        return model;
    }

    /**
     *删除
     * @param sysCodeCat
     * @return
     */
    @Override
    public ResponseModelBootstrapTable del(SysCodeCat sysCodeCat) {
        ResponseModelBootstrapTable model = new ResponseModelBootstrapTable();
        sysCodeCatMapper.deleteByPrimaryKey(sysCodeCat);
        model.setObject(sysCodeCat);
        return model;
    }
}

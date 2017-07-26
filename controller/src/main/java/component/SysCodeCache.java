package component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import mapper.mapper.sys.SysCodeDictMapper;
import mapper.model.sys.SysCodeDict;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.OrderBy;



/**
 * 
 * 系统初始化加载数据字典
 * @author mac
 *
 */
@Component
public class SysCodeCache {
	
	private SysCodeDictMapper sysCodeDictMapper;
	private static Logger logger = LoggerFactory
			.getLogger(SysCodeCache.class);
	Map<String, List<SysCodeDict>> codeDict;
	//@Autowired
	//public SysCodeCache(@Qualifier("sysCodeDictMapper") SysCodeDictMapper sysCodeDictMapper){
	//	super();
	//	this.sysCodeDictMapper=sysCodeDictMapper;
	//	loadCode();
	//}
	public void loadCode(){
		logger.info("初始化系统代码....");
		codeDict=new HashMap<String,List<SysCodeDict>>();
		Example example=new Example(SysCodeDict.class);
		OrderBy orderby = example.orderBy("catCode");
		orderby.asc();
		List<SysCodeDict> codes=sysCodeDictMapper.selectByExample(example);
		String catCode="";
		List<SysCodeDict> temCodes=new ArrayList<SysCodeDict>();;
		for (SysCodeDict sysCodeDict : codes) {
			if(catCode.equals(sysCodeDict.getCatCode())){
				temCodes.add(sysCodeDict);
				this.codeDict.put(catCode, temCodes);
			}else{
				temCodes=new ArrayList<SysCodeDict>();
				temCodes.add(sysCodeDict);
				catCode=sysCodeDict.getCatCode();
				this.codeDict.put(catCode, temCodes);
				
			}
		}
	}
	
	public void getCode(){
		if(null==this.codeDict){
			loadCode();
		}
	}
	
	
	/**
	 * 更据值获取名称
	 * @param catCode
	 * @param dectValue
	 * @return
	 */
	public Map<String,Object> getKeyByValue(String catCode,String dectValue){
		Map<String,Object> result=new HashMap<String,Object>();
		getCode();
		List<SysCodeDict> codes=this.codeDict.get(catCode);
		String key="无数据字典";
		if(null!=dectValue&&codes!=null&&codes.size()>0){
			for (SysCodeDict sysCodeDict : codes) {
				if(dectValue.equals(sysCodeDict.getDictValue())){
					key=sysCodeDict.getDictKey();
				}
			}
		}
		result.put(dectValue, key);
		return result;
	}
	
	/**
	 * 根据分类代码获取列表
	 * @return
	 */
	public List<SysCodeDict> getCodes(String catCode){
		getCode();
		List<SysCodeDict> codes=this.codeDict.get(catCode);
		return codes;
	}

}

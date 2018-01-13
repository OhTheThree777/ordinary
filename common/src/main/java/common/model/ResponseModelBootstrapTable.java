package common.model;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;


public class ResponseModelBootstrapTable implements Serializable {

	private static final long serialVersionUID = 852675651260882186L;

	public static final String KEY_ROWS = "rows";
	public static final String KEY_TOTAL = "total";
	public static final String KEY_LIST = "list";
	public static final String KEY_OBJECT = "obj";
	public static final String KEY_MAP = "map";

	private List<?> rows;
	private Integer page;
	private Integer total;
	private String status;
	private String msg;
	private Map<String, Object> data;

	public ResponseModelBootstrapTable() {
		super();
		rows = new ArrayList<Object>();
		data = new HashMap<String, Object>();
	}

	public ResponseModelBootstrapTable bing(List<?> rows, Integer total, Integer page) {
		this.rows = rows;
		this.total = total;
		this.page = page;
		return this;
	}

	public ResponseModelBootstrapTable(String status, String msg) {
		this();
		this.status = status;
		this.msg = msg;
	}


	public void setRows(List<?> rows) {
		this.rows = rows;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public String getStatus() {
		return status;
	}

	public String getMsg() {
		return msg;
	}

	public List<?> getRows() {
		return rows;
	}

	public Integer getTotal() {
		return total;
	}


	public Object get(int key) {
		return rows.get(key);
	}

	/**
	 * 成功完成。
	 */
	public ResponseModelBootstrapTable success() {
		this.success("操作成功");
		return this;
	}

	/**
	 * 成功完成。
	 *
	 * @param emsg
	 */
	public ResponseModelBootstrapTable success(String msg) {
		status = "1";
		this.msg = msg;
		return this;
	}

	/**
	 * 服务器错误。
	 */
	public ResponseModelBootstrapTable error() {
		this.error("网络未响应");
		return this;
	}

	/**
	 * 服务器错误。
	 *
	 * @param emsg
	 */
	public ResponseModelBootstrapTable error(String msg) {
		status = "0";
		this.msg = msg;
		return this;
	}

	public Map<String, Object> getData() {
		return data;
	}

	/**
	 * 向返回Model中添加键/值数据。（默认调用success()）
	 *
	 * @param key
	 * @param value
	 */
	public void put(String key, Object value) {
		this.data.put(key, value);
		this.success();
	}

	/**
	 * 向返回Model中添加键/值数据。
	 *
	 * @param key
	 * @param value
	 * @param isSuccess 是否成功返回。
	 */
	public void put(String key, Object value, boolean isSuccess) {
		this.data.put(key, value);
		if (isSuccess) {
			this.success();
		}
	}

	public Object get(String key) {
		return data.get(key);
	}

	/**
	 * 向List中增加一个对象
	 *
	 * @param obj
	 */
	public void add2List(Object obj) {
		List<Object> list;
		if (data.get(KEY_LIST) == null) {
			list = new ArrayList<Object>();
			this.setList(list);
		} else {
			list = (List<Object>) data.get(KEY_LIST);
		}
		list.add(obj);
	}

	/**
	 * 向返回Model中添加数据对象。（使用默认的key[KEY_LIST]，默认调用success()。）
	 *
	 * @param list
	 */
	public void setList(List<?> list) {
		this.put(KEY_LIST, list);
		this.success();
	}

	public List<?> getList() {
		return (List<?>) this.get(KEY_LIST);
	}

	/**
	 * 向返回Model中添加对象。（使用默认的key[KEY_OBJECT]，默认调用success()。）
	 *
	 * @param obj
	 */
	public void setObject(Object obj) {
		this.put(KEY_OBJECT, obj);
		this.success();
	}

	/**
	 * 向返回Model中添加Map对象。（使用默认的key[KEY_MAP]，默认调用success()。）
	 *
	 * @param map
	 */
	public void setMap(Map<?, ?> map) {
		this.put(KEY_MAP, map);
		this.success();
	}

	/**
	 * 向map中增加一个键值对像
	 *
	 * @param key
	 * @param obj
	 */
	public void put2Map(String key, Object obj) {
		Map<String, Object> map;
		if (data.get(KEY_MAP) == null) {
			map = new HashMap<String, Object>();
			data.put(KEY_MAP, map);
		} else {
			map = (Map<String, Object>) data.get(KEY_MAP);
		}
		map.put(key, obj);
	}
	/**
	 * 适用于EasyUI的返回方式（防止IE返回json下载）
	 * @param response
	 */
	//	public void EasyUIResponse(HttpServletResponse response) {
	//		try {
	//			response.setContentType("text/html;charset=UTF-8");
	//			response.getWriter().print(JSONHandler.toJSON(this));
	//		} catch (IOException e) {
	//			e.printStackTrace();
	//		}
	//	}
}

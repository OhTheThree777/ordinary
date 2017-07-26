package common.model;

import java.io.Serializable;


public class DataGridModelJqGrid implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int page; //当前页,名字必须为page
	private int rows ; //每页大小,名字必须为rows
	private String sidx; //排序字段
	private String sord; //排序规则
	private String _search;
	private String  filters;
	
	public void setPage(int page) {
		this.page = page;
	}
	public int getRows() {
		return rows;
	}
	public void setRows(int rows) {
		this.rows = rows;
	}
	public String getSidx() {
		return sidx;
	}
	public void setSidx(String sidx) {
		this.sidx = sidx;
	}
	public String getSord() {
		return sord;
	}
	public void setSord(String sord) {
		this.sord = sord;
	}

	public int getPage() {
		return page;
	}
	
	
	
	public String getFilters() {
		return filters;
	}
	public void setFilters(String filters) {
		this.filters = filters;
	}
	public String get_search() {
		return _search;
	}
	public void set_search(String _search) {
		this._search = _search;
	}
	
	
	

	

}

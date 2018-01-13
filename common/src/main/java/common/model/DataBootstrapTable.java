package common.model;

import java.io.Serializable;

/**
 * DataBootstrapTable 使用方法
 *
 * @author Administrator
 */
public class DataBootstrapTable implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 1403050250042536607L;
	private int offset; // 当前页,名字必须为page
	private int limit; // 每页大小,名字必须为rows
	private String order;
	private String sort;
	private String search;

	public int getOffset() {
		return offset;
	}

	public void setOffset(int offset) {
		this.offset = offset;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}


}

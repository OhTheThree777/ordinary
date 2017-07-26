package common.util;

public class Page {
	/**
	 * 当前页
	 */
	private Integer currentPage = 1;
	/**
	 * 总页数
	 */
	private Integer totalPage;
	/**
	 * 每页总行数
	 */
	private Integer pageSize = 10;
	/**
	 * 数据起始行号
	 */
	private Integer startLine;
	/**
	 * 数据结束行号
	 */
	private Integer endLine;
	/**
	 * 数据总行数
	 */
	private Integer totalLine;

	public Page() {
		calculateStartEnd();
	}

	public Page(Integer currentPage, Integer pageSize) {
		this.currentPage = currentPage;
		this.pageSize = pageSize;
		calculateStartEnd();
	}

	private void calculateStartEnd() {
		startLine = pageSize * (currentPage - 1);
		endLine = pageSize * currentPage;
	}

	public Integer getCurrentPage() {
		return currentPage;
	}

	public Integer getTotalPage() {
		return totalPage;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public Integer getStartLine() {
		calculateStartEnd();
		return startLine;
	}

	public Integer getEndLine() {
		calculateStartEnd();
		return endLine;
	}

	public Integer getTotalLine() {
		return totalLine;
	}

	public void setCurrentPage(Integer currentPage) {
		this.currentPage = currentPage;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public void setTotalLine(Integer totalLine) {
		this.totalLine = totalLine;
		totalPage = totalLine / pageSize
				+ ((totalLine % pageSize == 0) ? 0 : 1);
	}

	@Override
	public String toString() {
		return "Page [currentPage=" + currentPage
				+ ", totalPage=" + totalPage + ", pageSize=" + pageSize
				+ ", startLine=" + startLine + ", endLine=" + endLine
				+ ", totalLine=" + totalLine + "]";
	}

}

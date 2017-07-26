package common.util;

/**
 * 
 * @author imisi
 *
 */
public class TreeNode {
	private Integer id;  
    private Integer pId;  
    private String name;  
    private Boolean checked;  
    private Boolean open;
    
    public TreeNode() {  
        super();  
    }  
	public TreeNode(Integer id, Integer pId, String name, Boolean checked,
			Boolean open) {
		super();
		this.id = id;
		this.pId = pId;
		this.name = name;
		this.checked = checked;
		this.open = open;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getpId() {
		return pId;
	}
	public void setpId(Integer pId) {
		this.pId = pId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Boolean getChecked() {
		return checked;
	}
	public void setChecked(Boolean checked) {
		this.checked = checked;
	}
	public Boolean getOpen() {
		return open;
	}
	public void setOpen(Boolean open) {
		this.open = open;
	}  

    
}

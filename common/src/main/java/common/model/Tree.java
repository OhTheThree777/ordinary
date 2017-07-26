package common.model;

public class Tree {

	private int id ;
	private String text;
	private String children;
	private String state;
	private String url;
	private String checked;
	private String iconCls;
     public String getState() {
            return state ;
     }

      public void setState(String state) {
            this.state = state;
     }
      int parent ;


      public int getParent() {
            return parent ;
     }

      public void setParent(int parent) {
            this.parent = parent;
     }

      public int getId() {
            return id ;
     }
     
      public String getChildren() {
            return children ;
     }

      public void setChildren(String children) {
            this.children = children;
     }

      public void setId(int id) {
            this.id = id;
     }
      public String getText() {
            return text ;
     }
      public void setText(String text) {
            this.text = text;
     }

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getChecked() {
		return checked;
	}

	public void setChecked(String checked) {
		this.checked = checked;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	@Override
	public String toString() {
		return "Tree [id=" + id + ", text=" + text + ", children=" + children
				+ ", state=" + state + ", url=" + url + ", checked=" + checked
				+ ", iconCls=" + iconCls + ", parent=" + parent + "]";
	}
	
}

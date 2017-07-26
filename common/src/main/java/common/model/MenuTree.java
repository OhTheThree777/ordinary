package common.model;

import common.util.StringProcessor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;


public class MenuTree {

	List<Map<String, Object>> parentList = new ArrayList<Map<String, Object>>();

	public List<Map<String, Object>> createTree(List<Tree> list, int pId) {
		for (int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i).toString());
			Map<String, Object> map = null;
			Tree tt = (Tree) list.get(i);
			if (tt.getParent() == pId) {
				map = new TreeMap<String, Object>();
				map.put("id", list.get(i).getId());
				map.put("text", list.get(i).getText());
				map.put("checked", list.get(i).getChecked());
				map.put("state", list.get(i).getState());
				map.put("children", createChildren(list, tt.getId()));
				map.put("iconCls", list.get(i).getIconCls());
				if (StringProcessor.isNotEmptyStr(list.get(i).getUrl())) {
					Map<String, Object> attributes = new HashMap<String, Object>();
					attributes.put("url", list.get(i).getUrl());
					map.put("attributes", attributes);
				}
			}
			if (map != null)
				parentList.add(map);
		}
		return parentList;
	}

	private List<Map<String, Object>> createChildren(List<Tree> list, int pId) {
		List<Map<String, Object>> childList = new ArrayList<Map<String, Object>>();
		for (int j = 0; j < list.size(); j++) {
			//System.out.println(list.get(j).toString());
			Map<String, Object> map = null;
			Tree treeChild = (Tree) list.get(j);
			if (pId == treeChild.getParent()) {
				map = new TreeMap<String, Object>();
				map.put("id", list.get(j).getId());
				map.put("text", list.get(j).getText());
				map.put("checked", list.get(j).getChecked());
				map.put("children", createChildren(list, treeChild.getId()));
				map.put("iconCls", list.get(j).getIconCls());
				if (StringProcessor.isNotEmptyStr(list.get(j).getUrl())) {
					Map<String, Object> attributes = new HashMap<String, Object>();
					attributes.put("url", list.get(j).getUrl());
					map.put("attributes", attributes);
				}
			}
			if (map != null)
				childList.add(map);
		}
		return childList;
	}
}

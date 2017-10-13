package com.myapp.WegGl.dto;

import java.util.HashMap;
import java.util.Map;

public class TransferNode {
	private int id;
	
	private String text;
	
	private String iconCls;
	
	private boolean checked=false;
	
	private String state="open";
	
	private int parentId;
	
	private boolean leaf;
	
	private int type;
	
	private Map<String,String> attributes=new HashMap<>();

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public Map<String, String> getAttributes() {
		return attributes;
	}

	public void setAttributes(String key,String value) {
		this.attributes.put(key, value);
	}

	@Override
	public String toString() {
		return "TransferNode [id=" + id + ", text=" + text + ", iconCls=" + iconCls + ", checked=" + checked
				+ ", state=" + state + ", parentId=" + parentId + ", leaf=" + leaf + ", attributes=" + attributes + "]";
	}
}

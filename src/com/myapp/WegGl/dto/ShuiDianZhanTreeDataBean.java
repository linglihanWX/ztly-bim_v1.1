package com.myapp.WegGl.dto;

public class ShuiDianZhanTreeDataBean {
	public String id;
	
	public String name;
	
	public String pid;
	
	public String isLeaf;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String text) {
		this.name = text;
	}
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public String getIsLeaf() {
		return isLeaf;
	}
	public void setIsLeaf(String isLeaf) {
		this.isLeaf = isLeaf;
	}
	@Override
	public String toString() {
		return "ShuiDianZhanTreeDataBean [id=" + id + ", name=" + name + ", pid=" + pid + ", isLeaf=" + isLeaf + "]";
	}
}

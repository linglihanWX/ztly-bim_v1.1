package com.myapp.WegGl.dto;

public class Pm {

	private Integer nodeId;
	
	private Integer fatherNodeId;
	
	private String name;
	
	private Integer type;
	
	private String parameter;
	
	private Integer projectId;

	private Integer leaf;

	public Integer getNodeId() {
		return nodeId;
	}

	public void setNodeId(Integer nodeId) {
		this.nodeId = nodeId;
	}

	public Integer getFatherNodeId() {
		return fatherNodeId;
	}

	public void setFatherNodeId(Integer fatherNodeId) {
		this.fatherNodeId = fatherNodeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getParameter() {
		return parameter;
	}

	public void setParameter(String parameter) {
		this.parameter = parameter;
	}

	public Integer getProjectId() {
		return projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public Integer getLeaf() {
		return leaf;
	}

	public void setLeaf(Integer leaf) {
		this.leaf = leaf;
	}

	@Override
	public String toString() {
		return "Pm [nodeId=" + nodeId + ", fatherNodeId=" + fatherNodeId + ", name=" + name + ", type=" + type
				+ ", parameter=" + parameter + ", projectId=" + projectId + ", leaf=" + leaf + "]";
	}
	
}

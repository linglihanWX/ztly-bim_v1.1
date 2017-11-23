package com.myapp.WegGl.dto;

import java.util.Date;


public class Ebs {
	private Integer nodeId;

	private Integer fatherNodeId;

	private String name;
	
	private Integer type;

	private Date startDatePlan;

	private Date endDatePlan;
  
	private Date startDate;

	private Date endDate;

	private Integer modelId;

	private Integer projectId;
	
	private Integer leaf;

	private Pm pm;

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

	public Date getStartDatePlan() {
		return startDatePlan;
	}

	public void setStartDatePlan(Date startDatePlan) {
		this.startDatePlan = startDatePlan;
	}

	public Date getEndDatePlan() {
		return endDatePlan;
	}

	public void setEndDatePlan(Date endDatePlan) {
		this.endDatePlan = endDatePlan;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Integer getModelId() {
		return modelId;
	}

	public void setModelId(Integer modelId) {
		this.modelId = modelId;
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

	public Pm getPm() {
		return pm;
	}

	public void setPm(Pm pm) {
		this.pm = pm;
	}

	@Override
	public String toString() {
		return "Ebs [nodeId=" + nodeId + ", fatherNodeId=" + fatherNodeId + ", name=" + name + ", type=" + type
				+ ", startDatePlan=" + startDatePlan + ", endDatePlan=" + endDatePlan + ", startDate=" + startDate
				+ ", endDate=" + endDate + ", modelId=" + modelId + ", projectId=" + projectId + ", leaf=" + leaf
				+ ", pm=" + pm + "]";
	}
}

package com.myapp.WegGl.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class TransferNode2 {
	private int id;
	
	private String text;
	
	private String iconCls;
	
	private boolean checked=false;
	
	private String state="open";
	
	private int parentId;
	
	private boolean leaf;
	
	private int type;
	
	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	private Date startDatePlan;

	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	private Date endDatePlan;
  
	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	private Date startDate;

	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	private Date endDate;

	private Integer modelId;

	private Integer projectId;
	
	private Pm attributes;

	public int getId() {
		return id;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
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

	public Pm getAttributes() {
		return attributes;
	}

	public void setAttributes(Pm attributes) {
		this.attributes = attributes;
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

	@Override
	public String toString() {
		return "TransferNode [id=" + id + ", text=" + text + ", iconCls=" + iconCls + ", checked=" + checked
				+ ", state=" + state + ", parentId=" + parentId + ", leaf=" + leaf + ", attributes=" + attributes + "]";
	}
}

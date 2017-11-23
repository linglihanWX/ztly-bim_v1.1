package com.myapp.WegGl.dto;

import java.util.Date;
import java.util.List;

public class Project {
	private Integer projectId;
	private String Name;					//工程名
	private String des;						//描述
	private String type;					//类型
	private String icnUrl;					//图标对应URL地址
	private double lon;						//经度
	private double lat;						//纬度
	private Integer height;					//高度
	private String userCompany;				//业主单位
	private String designUnit;				//设计单位
	private String constructionUnit;		//承建单位
	private String constructionControlUnit;	//监理单位
	private Date date;						//开工日期
	private String cycle;					//工程周期
	private List<UserBean> userList;
	public Integer getProjectId() {
		return projectId;
	}
	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getDes() {
		return des;
	}
	public void setDes(String des) {
		this.des = des;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getIcnUrl() {
		return icnUrl;
	}
	public void setIcnUrl(String icnUrl) {
		this.icnUrl = icnUrl;
	}
	public double getLon() {
		return lon;
	}
	public void setLon(double lon) {
		this.lon = lon;
	}
	public double getLat() {
		return lat;
	}
	public void setLat(double lat) {
		this.lat = lat;
	}
	public Integer getHeight() {
		return height;
	}
	public void setHeight(Integer height) {
		this.height = height;
	}
	public String getUserCompany() {
		return userCompany;
	}
	public void setUserCompany(String userCompany) {
		this.userCompany = userCompany;
	}
	public String getDesignUnit() {
		return designUnit;
	}
	public void setDesignUnit(String designUnit) {
		this.designUnit = designUnit;
	}
	public String getConstructionUnit() {
		return constructionUnit;
	}
	public void setConstructionUnit(String constructionUnit) {
		this.constructionUnit = constructionUnit;
	}
	public String getConstructionControlUnit() {
		return constructionControlUnit;
	}
	public void setConstructionControlUnit(String constructionControlUnit) {
		this.constructionControlUnit = constructionControlUnit;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getCycle() {
		return cycle;
	}
	public void setCycle(String cycle) {
		this.cycle = cycle;
	}
	public List<UserBean> getUserList() {
		return userList;
	}
	public void setUserList(List<UserBean> userList) {
		this.userList = userList;
	}

	
}
